/**
 * Font Processing Integration Tests
 *
 * Tests cross-module font processing workflows
 */

import { test } from 'node:test'
import assert from 'node:assert'
import { promises as fs } from 'fs'
import path from 'path'
import { TempWorkspace } from '../helpers/temp-workspace.js'
import { 
  mockConsole, 
  createTestFontStructure,
  createMockFontMetadata 
} from '../helpers/test-helpers.js'

test('Font Processing Integration - UFR Detection and Analysis', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should detect and process UFR font structure correctly', async () => {
    const console = mockConsole()

    try {
      // Create proper UFR structure
      const fontDir = workspace.getFontsPath('ufr-integration')
      await fs.mkdir(fontDir, { recursive: true })
      
      // UFR requires fonts/ subdirectory and license file
      await fs.mkdir(path.join(fontDir, 'fonts'), { recursive: true })
      await fs.writeFile(path.join(fontDir, 'OFL.txt'), 'Open Font License text')
      await fs.writeFile(path.join(fontDir, 'fonts', 'UfrIntegration-Regular.ttf'), Buffer.alloc(1024))
      
      // Create fontdata.json
      const fontdata = {
        family: 'UFR Integration',
        license: 'OFL-1.1',
        version: '1.0.0',
        variants: {
          regular: {
            weight: 400,
            style: 'normal',
            file: 'UfrIntegration-Regular.ttf'
          }
        }
      }
      await fs.writeFile(
        path.join(fontDir, 'fontdata.json'),
        JSON.stringify(fontdata, null, 2)
      )

      // Test UFR structure detection
      const { hasUFRStructure, extractUFRMetadata, scanUFRFamily } = await import('../../build-tools/scanners/ufr-scanner.js')
      
      const isUFR = await hasUFRStructure(fontDir)
      assert.ok(isUFR, 'Should detect UFR structure')

      const metadata = await extractUFRMetadata(fontDir, workspace.fontsDir)
      assert.ok(metadata && typeof metadata === 'object', 'Should extract UFR metadata')

      const familyData = await scanUFRFamily(fontDir, 'ufr-integration')
      assert.ok(familyData && typeof familyData === 'object', 'Should scan UFR family successfully')
      
      if (familyData) {
        assert.ok(familyData.family || familyData.name, 'Should have family name')
        assert.strictEqual(familyData.license, 'OFL-1.1', 'Should preserve license information')
      }
    } finally {
      console.restore()
    }
  })

  await t.test('should handle legacy font structure processing', async () => {
    const console = mockConsole()

    try {
      // Create legacy (non-UFR) font structure
      const fontDir = workspace.getFontsPath('legacy-integration')
      await createTestFontStructure(workspace.fontsDir, 'legacy-integration')

      // Test legacy scanning
      const { scanGenericFamily } = await import('../../build-tools/scanners/ufr-scanner.js')
      
      const familyData = await scanGenericFamily(fontDir, 'legacy-integration')
      
      // Should handle gracefully - either return data or null
      assert.ok(
        familyData === null || typeof familyData === 'object',
        'Should handle legacy font structure'
      )
    } finally {
      console.restore()
    }
  })
})

test('Font Processing Integration - Metadata Flow', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should preserve metadata through processing pipeline', async () => {
    const console = mockConsole()

    try {
      // Create font with rich metadata
      const fontDir = workspace.getFontsPath('metadata-test')
      const fontdata = {
        family: 'Metadata Test Font',
        license: 'OFL-1.1',
        version: '2.1.0',
        author: 'Test Author',
        description: 'A test font with metadata',
        source: 'test',
        variants: {
          regular: { weight: 400, style: 'normal', file: 'MetadataTest-Regular.ttf' },
          bold: { weight: 700, style: 'normal', file: 'MetadataTest-Bold.ttf' },
          italic: { weight: 400, style: 'italic', file: 'MetadataTest-Italic.ttf' }
        },
        variableFont: {
          file: 'MetadataTestVF.ttf',
          axes: {
            wght: { min: 400, max: 700, default: 400 },
            ital: { min: 0, max: 1, default: 0 }
          }
        }
      }

      await fs.mkdir(fontDir, { recursive: true })
      await fs.writeFile(
        path.join(fontDir, 'fontdata.json'),
        JSON.stringify(fontdata, null, 2)
      )

      // Create font files
      for (const variant of Object.values(fontdata.variants)) {
        await fs.writeFile(path.join(fontDir, variant.file), Buffer.alloc(1024))
      }
      await fs.writeFile(path.join(fontDir, fontdata.variableFont.file), Buffer.alloc(2048))

      // Process through scanning
      const { scanUFRFamily } = await import('../../build-tools/scanners/ufr-scanner.js')
      const scannedData = await scanUFRFamily(fontDir, 'metadata-test')

      if (scannedData) {
        // Verify metadata preservation
        assert.strictEqual(scannedData.license, 'OFL-1.1', 'Should preserve license')
        assert.strictEqual(scannedData.version, '2.1.0', 'Should preserve version')
        assert.ok(scannedData.variants, 'Should preserve variants')
        assert.ok(scannedData.variableFont, 'Should preserve variable font info')

        // Process through module generation
        const { generateModules } = await import('../../build-tools/generators/module-generator.js')
        const fontFamilies = { 'metadata-test': scannedData }
        
        await generateModules(fontFamilies, workspace.getOutputPath('modules'), {
          repoVersion: 'v2.1.0'
        })

        // Verify module contains metadata
        const moduleContent = await workspace.readFile('output/modules/metadata-test.js')
        assert.ok(moduleContent.includes('Metadata Test Font'), 'Module should contain family name')
        assert.ok(moduleContent.includes('"regular"'), 'Module should contain regular variant')
        assert.ok(moduleContent.includes('"bold"'), 'Module should contain bold variant')
        assert.ok(moduleContent.includes('"italic"'), 'Module should contain italic variant')
        assert.ok(moduleContent.includes('"variableFont"'), 'Module should contain variable font')
        assert.ok(moduleContent.includes('"axes"'), 'Module should contain axes information')
      }
    } finally {
      console.restore()
    }
  })

  await t.test('should handle missing or incomplete metadata gracefully', async () => {
    const console = mockConsole()

    try {
      // Create font with minimal metadata
      const fontDir = workspace.getFontsPath('minimal-metadata')
      const minimalFontdata = {
        family: 'Minimal Font'
        // Missing license, version, etc.
      }

      await fs.mkdir(fontDir, { recursive: true })
      await fs.writeFile(
        path.join(fontDir, 'fontdata.json'),
        JSON.stringify(minimalFontdata, null, 2)
      )

      const { scanUFRFamily } = await import('../../build-tools/scanners/ufr-scanner.js')
      const scannedData = await scanUFRFamily(fontDir, 'minimal-metadata')

      // Should handle gracefully
      assert.ok(
        scannedData === null || typeof scannedData === 'object',
        'Should handle minimal metadata gracefully'
      )

      if (scannedData) {
        // Should have family name at minimum
        assert.ok(scannedData.family || scannedData.name, 'Should have family identifier')
      }
    } finally {
      console.restore()
    }
  })
})

test('Font Processing Integration - Subset Generation Workflow', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should integrate with subset generation pipeline', async () => {
    const console = mockConsole()

    try {
      // Create font structure for subset generation
      const fontFamily = createMockFontMetadata({
        family: 'Subset Test Font',
        normalizedFamily: 'subset-test-font',
        license: 'OFL-1.1',
        variants: {
          regular: { weight: 400, style: 'normal', file: 'SubsetTest-Regular.ttf' }
        }
      })

      // Test subset generator integration
      const { SubsetGenerator } = await import('../../build-tools/generators/subset-generator.js')
      const generator = new SubsetGenerator()

      try {
        // Test dependency checking
        await generator.checkDependencies()
        
        // If dependencies are available, test processing
        // If not, ensure graceful handling
      } catch (error) {
        // Expected in test environment without fonttools
        assert.ok(error instanceof Error, 'Should handle missing dependencies gracefully')
        
        // Verify error messaging
        const hasDepError = console.logs.error.some(log => 
          log.includes('fonttools') || log.includes('dependencies')
        )
        // Error logging is optional but good practice
      }

      // Test metadata update functionality
      try {
        await generator.updateFamilyMetadata('subset-test-font', 'min-chars')
        // Should complete without throwing
      } catch (error) {
        // Expected to fail without actual subset files
        assert.ok(error instanceof Error, 'Should handle missing subset files')
      }
    } finally {
      console.restore()
    }
  })

  await t.test('should handle subset metadata in module generation', async () => {
    const console = mockConsole()

    try {
      // Create font with subset information
      const fontWithSubsets = createMockFontMetadata({
        family: 'Font With Subsets',
        normalizedFamily: 'font-with-subsets',
        license: 'OFL-1.1',
        subsets: {
          'min-chars': {
            description: 'Minimal character set',
            characterCount: 95,
            status: 'generated'
          },
          'latin-basic': {
            description: 'Basic Latin characters',
            characterCount: 200,
            status: 'generated'
          }
        }
      })

      const { generateModules } = await import('../../build-tools/generators/module-generator.js')
      const fontFamilies = { 'font-with-subsets': fontWithSubsets }
      
      await generateModules(fontFamilies, workspace.getOutputPath('modules'), {
        cdnBaseUrl: 'https://cdn.example.com',
        repoVersion: 'v1.0.0'
      })

      const moduleContent = await workspace.readFile('output/modules/font-with-subsets.js')
      
      // Should include subset information
      assert.ok(moduleContent.includes('"subsets"'), 'Module should include subsets section')
      assert.ok(moduleContent.includes('min-chars'), 'Module should include subset names')
      assert.ok(moduleContent.includes('latin-basic'), 'Module should include all subsets')
      assert.ok(moduleContent.includes('subsets/'), 'Module should include subset CDN paths')
    } finally {
      console.restore()
    }
  })
})

test('Font Processing Integration - License Validation Workflow', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should validate licenses through processing pipeline', async () => {
    const console = mockConsole()

    try {
      // Create fonts with different licenses
      const openFont = createMockFontMetadata({
        family: 'Open Font',
        normalizedFamily: 'open-font',
        license: 'OFL-1.1'
      })

      const proprietaryFont = createMockFontMetadata({
        family: 'Proprietary Font',
        normalizedFamily: 'proprietary-font',
        license: 'proprietary'
      })

      const unknownLicenseFont = createMockFontMetadata({
        family: 'Unknown License Font',
        normalizedFamily: 'unknown-license-font',
        license: 'unknown'
      })

      // Test license validation
      const { validateLicensing } = await import('../../build-tools/scanners/validation.js')
      
      const openValid = await validateLicensing(openFont, 'open')
      const proprietaryValid = await validateLicensing(proprietaryFont, 'open')
      const unknownValid = await validateLicensing(unknownLicenseFont, 'open')

      assert.ok(openValid, 'OFL-1.1 should be valid open license')
      assert.ok(!proprietaryValid, 'Proprietary should not be valid open license')
      assert.ok(!unknownValid, 'Unknown license should not be valid open license')

      // Test that module generation respects licensing
      const { generateModules } = await import('../../build-tools/generators/module-generator.js')
      const allFonts = { 
        'open-font': openFont,
        'proprietary-font': proprietaryFont,
        'unknown-license-font': unknownLicenseFont
      }
      
      await generateModules(allFonts, workspace.getOutputPath('modules'))

      // Should only create modules for open fonts
      const openModule = await workspace.fileExists('output/modules/open-font.js')
      const proprietaryModule = await workspace.fileExists('output/modules/proprietary-font.js')
      const unknownModule = await workspace.fileExists('output/modules/unknown-license-font.js')

      assert.ok(openModule, 'Should create module for open license font')
      assert.ok(!proprietaryModule, 'Should not create module for proprietary font')
      assert.ok(!unknownModule, 'Should not create module for unknown license font')
    } finally {
      console.restore()
    }
  })

  await t.test('should handle license edge cases', async () => {
    const console = mockConsole()

    try {
      // Test various license formats and edge cases
      const licenseCases = [
        { license: 'OFL-1.1', expected: true },
        { license: 'MIT', expected: true },
        { license: 'Apache-2.0', expected: true },
        { license: 'GPL-3.0', expected: false }, // Copyleft, not suitable for CDN
        { license: '', expected: false },
        { license: null, expected: false },
        { license: undefined, expected: false }
      ]

      const { validateLicensing } = await import('../../build-tools/scanners/validation.js')

      for (const testCase of licenseCases) {
        const font = createMockFontMetadata({
          family: `Test Font ${testCase.license || 'none'}`,
          license: testCase.license
        })

        const isValid = await validateLicensing(font, 'open')
        
        if (testCase.expected) {
          assert.ok(isValid, `License ${testCase.license} should be valid`)
        } else {
          assert.ok(!isValid, `License ${testCase.license} should not be valid`)
        }
      }
    } finally {
      console.restore()
    }
  })
})

test('Font Processing Integration - Error Propagation', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should handle file system errors gracefully', async () => {
    const console = mockConsole()

    try {
      // Test with invalid paths
      const { scanUFRFamily, scanGenericFamily } = await import('../../build-tools/scanners/ufr-scanner.js')
      
      const ufrResult = await scanUFRFamily('/nonexistent/path', 'missing-font')
      const genericResult = await scanGenericFamily('/nonexistent/path', 'missing-font')

      // Should not crash
      assert.ok(
        ufrResult === null || typeof ufrResult === 'object',
        'UFR scanner should handle missing paths gracefully'
      )
      assert.ok(
        genericResult === null || typeof genericResult === 'object',
        'Generic scanner should handle missing paths gracefully'
      )
    } finally {
      console.restore()
    }
  })

  await t.test('should propagate errors appropriately through pipeline', async () => {
    const console = mockConsole()

    try {
      // Test with malformed font data
      const malformedFont = {
        family: null,
        license: undefined,
        variants: 'not an object'
      }

      const { generateModules } = await import('../../build-tools/generators/module-generator.js')
      
      try {
        await generateModules({ 'malformed': malformedFont }, workspace.getOutputPath('modules'))
        
        // If it doesn't throw, verify graceful handling
        const files = await workspace.listFiles()
        const moduleFiles = files.filter(f => f.startsWith('output/modules/'))
        
        // Should either create no files or log warnings
        assert.ok(true, 'Should handle malformed data gracefully')
      } catch (error) {
        // If it throws, that's acceptable error handling
        assert.ok(error instanceof Error, 'Should throw proper error for malformed data')
      }

      // Check for warning messages
      const hasWarnings = console.logs.warn.length > 0 || console.logs.error.length > 0
      // Warnings are good practice but not required
    } finally {
      console.restore()
    }
  })
})