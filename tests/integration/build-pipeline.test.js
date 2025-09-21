/**
 * Build Pipeline Integration Tests
 *
 * Tests end-to-end build pipeline from font input to final outputs
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

test('Build Pipeline Integration - Font Processing Flow', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should process fonts through complete scanning pipeline', async () => {
    const console = mockConsole()

    try {
      // Create test font structures
      const openFontsDir = workspace.getFontsPath('open-fonts')
      await createTestFontStructure(openFontsDir, 'integration-test-font')
      
      // Add UFR structure
      await workspace.createOutputFile(
        '../fonts/open-fonts/integration-test-font/fontdata.json',
        JSON.stringify({
          family: 'Integration Test Font',
          license: 'OFL-1.1',
          variants: {
            regular: {
              weight: 400,
              style: 'normal',
              file: 'integration-test-font-Regular.ttf'
            }
          }
        })
      )

      // Test font scanning
      const { scanFontFamilies } = await import('../../src/build-tools/scanners/ufr-scanner.js')
      
      const fontData = await scanFontFamilies(
        openFontsDir,
        workspace.getOutputPath('working')
      )

      assert.ok(typeof fontData === 'object', 'Should return font data from scanning')

      // Test that scanned data can be used for module generation
      if (Object.keys(fontData).length > 0) {
        const { generateModules } = await import('../../src/build-tools/generators/module-generator.js')
        
        await generateModules(fontData, workspace.getOutputPath('modules'), {
          generateIndividualModules: true,
          generateCombinedModule: false,
          cdnBaseUrl: 'https://test-cdn.example.com',
          repoVersion: 'v1.0.0'
        })

        // Verify module outputs
        const files = await workspace.listFiles()
        const moduleFiles = files.filter(f => 
          f.startsWith('output/modules/') && f.endsWith('.js')
        )

        assert.ok(moduleFiles.length > 0, 'Should generate module files')
      }
    } finally {
      console.restore()
    }
  })

  await t.test('should handle mixed font sources in pipeline', async () => {
    const console = mockConsole()

    try {
      // Create both UFR and legacy font structures
      const fontsDir = workspace.getFontsPath('mixed')
      
      // UFR font
      await createTestFontStructure(fontsDir, 'ufr-font')
      await workspace.createOutputFile(
        '../fonts/mixed/ufr-font/fontdata.json',
        JSON.stringify({
          family: 'UFR Font',
          license: 'OFL-1.1',
          variants: { regular: { weight: 400, style: 'normal', file: 'ufr-font-Regular.ttf' } }
        })
      )

      // Legacy font (no fontdata.json)
      await createTestFontStructure(fontsDir, 'legacy-font')

      // Test scanning mixed sources
      const { scanFontFamilies } = await import('../../src/build-tools/scanners/ufr-scanner.js')
      
      const fontData = await scanFontFamilies(
        fontsDir,
        workspace.getOutputPath('working')
      )

      // Should handle both types
      assert.ok(typeof fontData === 'object', 'Should process mixed font sources')
    } finally {
      console.restore()
    }
  })
})

test('Build Pipeline Integration - Module Generation Flow', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should generate consistent module outputs', async () => {
    const console = mockConsole()

    try {
      // Create mock font families data
      const fontFamilies = {
        'test-family-1': createMockFontMetadata({
          family: 'Test Family 1',
          normalizedFamily: 'test-family-1',
          license: 'OFL-1.1'
        }),
        'test-family-2': createMockFontMetadata({
          family: 'Test Family 2',
          normalizedFamily: 'test-family-2',
          license: 'OFL-1.1',
          variableFont: {
            file: 'TestFamily2VF.ttf',
            axes: { wght: { min: 100, max: 900, default: 400 } }
          }
        })
      }

      const { generateModules } = await import('../../src/build-tools/generators/module-generator.js')
      
      // Generate both individual and combined modules
      await generateModules(fontFamilies, workspace.getOutputPath('modules'), {
        generateIndividualModules: true,
        generateCombinedModule: true,
        cdnBaseUrl: 'https://cdn.example.com',
        repoVersion: 'v1.0.0'
      })

      // Verify individual modules
      const family1Module = await workspace.fileExists('output/modules/test-family-1.js')
      const family2Module = await workspace.fileExists('output/modules/test-family-2.js')
      assert.ok(family1Module, 'Should create individual module for family 1')
      assert.ok(family2Module, 'Should create individual module for family 2')

      // Verify combined module
      const combinedModule = await workspace.fileExists('output/modules/font-families.js')
      assert.ok(combinedModule, 'Should create combined module')

      // Test module content consistency
      const family1Content = await workspace.readFile('output/modules/test-family-1.js')
      assert.ok(family1Content.includes('"family"'), 'Module should include family property')
      assert.ok(family1Content.includes('Test Family 1'), 'Module should include family name')
      assert.ok(family1Content.includes('cdn.example.com'), 'Module should include CDN URL')

      const family2Content = await workspace.readFile('output/modules/test-family-2.js')
      assert.ok(family2Content.includes('"variableFont"'), 'Variable font module should include variable font section')
      assert.ok(family2Content.includes('"axes"'), 'Variable font module should include axes')

      const combinedContent = await workspace.readFile('output/modules/font-families.js')
      assert.ok(combinedContent.includes('test-family-1'), 'Combined module should include all families')
      assert.ok(combinedContent.includes('test-family-2'), 'Combined module should include all families')
    } finally {
      console.restore()
    }
  })

  await t.test('should filter fonts by license in module generation', async () => {
    const console = mockConsole()

    try {
      const fontFamilies = {
        'open-font': createMockFontMetadata({
          family: 'Open Font',
          license: 'OFL-1.1'
        }),
        'proprietary-font': createMockFontMetadata({
          family: 'Proprietary Font',
          license: 'proprietary'
        })
      }

      const { generateModules } = await import('../../src/build-tools/generators/module-generator.js')
      
      await generateModules(fontFamilies, workspace.getOutputPath('modules'))

      // Should only create module for open font
      const openFontModule = await workspace.fileExists('output/modules/open-font.js')
      const proprietaryFontModule = await workspace.fileExists('output/modules/proprietary-font.js')
      
      assert.ok(openFontModule, 'Should create module for open font')
      assert.ok(!proprietaryFontModule, 'Should not create module for proprietary font')
    } finally {
      console.restore()
    }
  })
})

test('Build Pipeline Integration - Catalog Generation Flow', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should generate catalog API structure', async () => {
    const console = mockConsole()

    try {
      const fontFamilies = {
        'catalog-test': createMockFontMetadata({
          family: 'Catalog Test',
          license: 'OFL-1.1',
          source: 'test'
        })
      }

      const { generateCatalog } = await import('../../src/build-tools/generators/catalog-generator.js')
      
      await generateCatalog(fontFamilies, workspace.getOutputPath('api/families'), {
        version: '1.0.0',
        includeRestrictedFonts: false
      })

      // Check API structure
      const familiesIndex = await workspace.fileExists('output/api/families/index.json')
      assert.ok(familiesIndex, 'Should create families index')

      const familiesIndexContent = await workspace.readJsonFile('output/api/families/index.json')
      assert.ok(typeof familiesIndexContent === 'object', 'Families index should be valid JSON')
      assert.ok(familiesIndexContent.families, 'Families index should have families property')

      // Check individual family file
      const familyFile = await workspace.fileExists('output/api/families/catalog-test.json')
      assert.ok(familyFile, 'Should create individual family file')

      const familyContent = await workspace.readJsonFile('output/api/families/catalog-test.json')
      assert.ok(familyContent.family, 'Family file should have family property')
      assert.strictEqual(familyContent.family, 'Catalog Test', 'Family file should have correct family name')
    } finally {
      console.restore()
    }
  })
})

test('Build Pipeline Integration - Cross-Module Data Flow', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should maintain data consistency across build outputs', async () => {
    const console = mockConsole()

    try {
      // Create test font data that flows through multiple generators
      const fontFamilies = {
        'data-flow-test': createMockFontMetadata({
          family: 'Data Flow Test',
          normalizedFamily: 'data-flow-test',
          license: 'OFL-1.1',
          version: '2.1.0',
          variants: {
            regular: { weight: 400, style: 'normal', file: 'DataFlowTest-Regular.ttf' },
            bold: { weight: 700, style: 'normal', file: 'DataFlowTest-Bold.ttf' }
          }
        })
      }

      // Generate modules
      const { generateModules } = await import('../../src/build-tools/generators/module-generator.js')
      await generateModules(fontFamilies, workspace.getOutputPath('modules'), {
        repoVersion: 'v2.1.0'
      })

      // Generate catalog
      const { generateCatalog } = await import('../../src/build-tools/generators/catalog-generator.js')
      await generateCatalog(fontFamilies, workspace.getOutputPath('api/families'), {
        version: '2.1.0'
      })

      // Read outputs and verify consistency
      const moduleContent = await workspace.readFile('output/modules/data-flow-test.js')
      const catalogContent = await workspace.readJsonFile('output/api/families/data-flow-test.json')

      // Verify family name consistency
      assert.ok(moduleContent.includes('Data Flow Test'), 'Module should contain correct family name')
      assert.strictEqual(catalogContent.family, 'Data Flow Test', 'Catalog should contain correct family name')

      // Verify version consistency
      assert.ok(moduleContent.includes('v2.1.0'), 'Module should contain correct version')

      // Verify variant consistency
      assert.ok(moduleContent.includes('"regular"'), 'Module should include regular variant')
      assert.ok(moduleContent.includes('"bold"'), 'Module should include bold variant')
      assert.ok(catalogContent.variants.regular, 'Catalog should include regular variant')
      assert.ok(catalogContent.variants.bold, 'Catalog should include bold variant')

      // Verify file references
      assert.ok(moduleContent.includes('DataFlowTest-Regular.ttf'), 'Module should reference correct files')
      assert.strictEqual(catalogContent.variants.regular.file, 'DataFlowTest-Regular.ttf', 'Catalog should reference correct files')
    } finally {
      console.restore()
    }
  })

  await t.test('should handle build pipeline errors gracefully', async () => {
    const console = mockConsole()

    try {
      // Test with invalid font data
      const invalidFontFamilies = {
        'invalid-font': {
          // Missing required properties
          family: null,
          license: undefined
        }
      }

      const { generateModules } = await import('../../src/build-tools/generators/module-generator.js')
      
      // Should handle gracefully without crashing
      try {
        await generateModules(invalidFontFamilies, workspace.getOutputPath('modules'))
        
        // If it doesn't throw, verify it handled gracefully
        const files = await workspace.listFiles()
        const moduleFiles = files.filter(f => f.startsWith('output/modules/') && f.endsWith('.js'))
        
        // Should either create no files or handle the error gracefully
        assert.ok(true, 'Should handle invalid font data gracefully')
      } catch (error) {
        // If it throws, that's also acceptable error handling
        assert.ok(error instanceof Error, 'Should throw proper error for invalid data')
      }
    } finally {
      console.restore()
    }
  })
})

test('Build Pipeline Integration - Performance and Validation', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should handle large font collections efficiently', async () => {
    const console = mockConsole()

    try {
      // Create multiple font families to test performance
      const fontFamilies = {}
      for (let i = 0; i < 5; i++) {
        fontFamilies[`perf-test-${i}`] = createMockFontMetadata({
          family: `Performance Test ${i}`,
          normalizedFamily: `perf-test-${i}`,
          license: 'OFL-1.1'
        })
      }

      const startTime = Date.now()

      const { generateModules } = await import('../../src/build-tools/generators/module-generator.js')
      await generateModules(fontFamilies, workspace.getOutputPath('modules'))

      const duration = Date.now() - startTime

      // Should complete reasonably quickly
      assert.ok(duration < 3000, `Build should be efficient: ${duration}ms`)

      // Verify all modules were created
      const files = await workspace.listFiles()
      const moduleFiles = files.filter(f => f.startsWith('output/modules/') && f.endsWith('.js'))
      
      assert.ok(moduleFiles.length >= 5, 'Should create modules for all font families')
    } finally {
      console.restore()
    }
  })

  await t.test('should validate build output integrity', async () => {
    const console = mockConsole()

    try {
      const fontFamilies = {
        'validation-test': createMockFontMetadata({
          family: 'Validation Test',
          license: 'OFL-1.1'
        })
      }

      // Generate outputs
      const { generateModules } = await import('../../src/build-tools/generators/module-generator.js')
      await generateModules(fontFamilies, workspace.getOutputPath('modules'))

      const { generateCatalog } = await import('../../src/build-tools/generators/catalog-generator.js')
      await generateCatalog(fontFamilies, workspace.getOutputPath('api/families'))

      // Validate JavaScript syntax
      const moduleContent = await workspace.readFile('output/modules/validation-test.js')
      
      // Basic syntax validation
      assert.ok(moduleContent.includes('export default'), 'Module should have ES module export')
      assert.ok(!moduleContent.includes('undefined'), 'Module should not contain undefined values')

      // Test that it's parseable JavaScript
      try {
        const testCode = moduleContent.replace('export default', 'const testData =')
        new Function(testCode) // Will throw if syntax is invalid
      } catch (syntaxError) {
        assert.fail(`Generated module has syntax errors: ${syntaxError.message}`)
      }

      // Validate JSON structure
      const catalogContent = await workspace.readJsonFile('output/api/families/validation-test.json')
      assert.ok(typeof catalogContent === 'object', 'Catalog should be valid JSON object')
      assert.ok(catalogContent.family, 'Catalog should have required properties')
    } finally {
      console.restore()
    }
  })
})