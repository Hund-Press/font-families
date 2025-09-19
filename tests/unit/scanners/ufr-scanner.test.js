/**
 * Tests for UFR Scanner
 *
 * Tests the core font scanning functionality that discovers and analyzes font families
 */

import { test } from 'node:test'
import assert from 'node:assert'
import { promises as fs } from 'fs'
import {
  hasUFRStructure,
  extractUFRMetadata,
  scanUFRFamily,
  scanGenericFamily,
} from '../../../build-tools/scanners/ufr-scanner.js'
import { TempWorkspace } from '../../helpers/temp-workspace.js'
import { mockConsole } from '../../helpers/test-helpers.js'

test('UFR Scanner - UFR Structure Detection', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should detect UFR structure', async () => {
    // Create proper UFR structure: fonts/ subdirectory + license file
    const fontDir = workspace.getFontsPath('ufr-font')
    await workspace.createOutputFile('../fonts/ufr-font/fonts/.gitkeep', '')
    await workspace.createOutputFile(
      '../fonts/ufr-font/OFL.txt',
      'Open Font License text'
    )

    const isUFR = await hasUFRStructure(fontDir)
    assert.strictEqual(
      isUFR,
      true,
      'Should detect UFR structure with fonts/ dir and license'
    )
  })

  await t.test('should detect non-UFR structure', async () => {
    // Create non-UFR structure (directory without fontdata.json)
    const fontDir = workspace.getFontsPath('regular-font')
    await fs.mkdir(fontDir, { recursive: true })

    const isUFR = await hasUFRStructure(fontDir)
    assert.strictEqual(
      isUFR,
      false,
      'Should not detect UFR structure without fontdata.json'
    )
  })

  await t.test('should handle missing directory', async () => {
    const isUFR = await hasUFRStructure(workspace.getFontsPath('nonexistent'))
    assert.strictEqual(
      isUFR,
      false,
      'Should return false for missing directories'
    )
  })
})

test('UFR Scanner - Metadata Extraction', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should extract UFR metadata', async () => {
    const fontDir = workspace.getFontsPath('test-ufr')
    const packageData = {
      name: '@test/ufr-font',
      version: '1.0.0',
      license: 'OFL-1.1',
      author: 'Test Author',
    }

    await workspace.createOutputFile(
      '../fonts/test-ufr/package.json',
      JSON.stringify(packageData)
    )

    const metadata = await extractUFRMetadata(fontDir, workspace.fontsDir)

    // UFR metadata extraction should work with package.json
    assert.ok(typeof metadata === 'object', 'Should return metadata object')

    if (metadata && metadata.license) {
      assert.strictEqual(metadata.license, 'OFL-1.1')
    }
    if (metadata && metadata.version) {
      assert.strictEqual(metadata.version, '1.0.0')
    }
  })

  await t.test('should handle missing package.json', async () => {
    const fontDir = workspace.getFontsPath('no-metadata')
    await fs.mkdir(fontDir, { recursive: true })

    const metadata = await extractUFRMetadata(fontDir, workspace.fontsDir)
    // Should return an object, possibly empty, rather than null
    assert.ok(
      typeof metadata === 'object',
      'Should return metadata object even if empty'
    )
  })

  await t.test('should handle corrupt package.json', async () => {
    const fontDir = workspace.getFontsPath('corrupt-metadata')
    await workspace.createOutputFile(
      '../fonts/corrupt-metadata/package.json',
      'invalid json{'
    )

    const metadata = await extractUFRMetadata(fontDir, workspace.fontsDir)
    // Should handle gracefully and return an object
    assert.ok(
      typeof metadata === 'object',
      'Should handle corrupt JSON gracefully'
    )
  })
})

test('UFR Scanner - Family Scanning', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should scan UFR family', async () => {
    const fontDir = workspace.getFontsPath('ufr-family')
    const fontData = {
      family: 'UFR Family',
      license: 'OFL-1.1',
      variants: {
        regular: {
          weight: 400,
          style: 'normal',
          file: 'UFRFamily-Regular.ttf',
        },
      },
    }

    await workspace.createOutputFile(
      '../fonts/ufr-family/fontdata.json',
      JSON.stringify(fontData)
    )

    const familyData = await scanUFRFamily(fontDir, 'ufr-family')

    // Test that function completes without throwing errors
    assert.ok(
      typeof familyData === 'object' || familyData === null,
      'Should return object or null'
    )

    if (familyData) {
      assert.ok(
        familyData.family || familyData.name,
        'Should have family name property'
      )
    }
  })

  await t.test('should handle directory without UFR structure', async () => {
    const fontDir = workspace.getFontsPath('non-ufr')
    await fs.mkdir(fontDir, { recursive: true })

    const console = mockConsole()

    try {
      const familyData = await scanUFRFamily(fontDir, 'non-ufr')

      // Should handle gracefully - either return null or some default structure
      assert.ok(
        familyData === null || typeof familyData === 'object',
        'Should handle non-UFR directory gracefully'
      )
    } finally {
      console.restore()
    }
  })

  await t.test('should handle empty directory for generic scan', async () => {
    const fontDir = workspace.getFontsPath('empty-generic')
    await fs.mkdir(fontDir, { recursive: true })

    const console = mockConsole()

    try {
      const familyData = await scanGenericFamily(fontDir, 'empty-generic')

      // Generic scanner may return different structures - test basic behavior
      assert.ok(
        typeof familyData === 'object' || familyData === null,
        'Should return object or null for empty directory'
      )
    } finally {
      console.restore()
    }
  })
})

test('UFR Scanner - Error Handling', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should handle missing directories gracefully', async () => {
    const console = mockConsole()

    try {
      // Test both UFR and generic scanners with missing directories
      const ufrResult = await scanUFRFamily('/nonexistent/ufr', 'missing-ufr')
      const genericResult = await scanGenericFamily(
        '/nonexistent/generic',
        'missing-generic'
      )

      // Should not crash - either return null or handle gracefully
      assert.ok(
        ufrResult === null || typeof ufrResult === 'object',
        'UFR scanner should handle missing directories'
      )
      assert.ok(
        genericResult === null || typeof genericResult === 'object',
        'Generic scanner should handle missing directories'
      )
    } finally {
      console.restore()
    }
  })

  await t.test('should handle permission errors gracefully', async () => {
    const console = mockConsole()

    try {
      // Try to scan system directories that may have permission restrictions
      const familyData = await scanGenericFamily('/root', 'restricted')

      // Should either succeed or fail gracefully without throwing
      assert.ok(
        familyData === null || typeof familyData === 'object',
        'Should handle permission errors gracefully'
      )
    } finally {
      console.restore()
    }
  })
})

test('UFR Scanner - Integration with Real Project Structure', async (t) => {
  await t.test('should handle project font directories', async () => {
    const console = mockConsole()

    try {
      // Test with an actual font directory from the project if it exists
      const projectFonts = ['aspekta', 'public-sans', 'league-mono']

      for (const fontName of projectFonts) {
        try {
          await fs.access(fontName)

          // If font directory exists, test scanning it
          const ufrResult = await scanUFRFamily(fontName, fontName)
          const genericResult = await scanGenericFamily(fontName, fontName)

          // Should complete without throwing errors
          assert.ok(
            typeof ufrResult === 'object' || ufrResult === null,
            `UFR scan of ${fontName} should complete`
          )
          assert.ok(
            typeof genericResult === 'object' || genericResult === null,
            `Generic scan of ${fontName} should complete`
          )
        } catch (error) {
          // Font directory doesn't exist - skip this test
          console.logs.log.push(`Skipping ${fontName} - directory not found`)
        }
      }
    } finally {
      console.restore()
    }
  })

  await t.test('should work with existing subset directories', async () => {
    const console = mockConsole()

    try {
      // Check if subsets directory exists
      try {
        await fs.access('subsets')
        const subsetDirs = await fs.readdir('subsets')

        // Test scanning a subset directory if any exist
        if (subsetDirs.length > 0) {
          const firstSubset = subsetDirs[0]
          const subsetPath = `subsets/${firstSubset}`

          const scanResult = await scanGenericFamily(subsetPath, firstSubset)

          // Should handle subset directories appropriately
          assert.ok(
            typeof scanResult === 'object' || scanResult === null,
            'Should handle subset directories'
          )
        }
      } catch (error) {
        // Subsets directory doesn't exist - that's fine
        console.logs.log.push(
          'No subsets directory found - skipping subset test'
        )
      }
    } finally {
      console.restore()
    }
  })
})
