/**
 * API Generation Integration Tests
 *
 * Tests complete API generation including modules and catalogs
 */

import { test } from 'node:test'
import assert from 'node:assert'
import { promises as fs } from 'fs'
import { TempWorkspace } from '../helpers/temp-workspace.js'
import { 
  mockConsole, 
  createMockFontMetadata 
} from '../helpers/test-helpers.js'

test('API Generation Integration - Complete API Structure', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should generate complete API structure', async () => {
    const console = mockConsole()

    try {
      // Create comprehensive font collection
      const fontFamilies = {
        'primary-font': createMockFontMetadata({
          family: 'Primary Font',
          normalizedFamily: 'primary-font',
          license: 'OFL-1.1',
          version: '2.0.0',
          variants: {
            regular: { weight: 400, style: 'normal', file: 'PrimaryFont-Regular.ttf' },
            bold: { weight: 700, style: 'normal', file: 'PrimaryFont-Bold.ttf' },
            italic: { weight: 400, style: 'italic', file: 'PrimaryFont-Italic.ttf' }
          }
        }),
        'variable-font': createMockFontMetadata({
          family: 'Variable Font',
          normalizedFamily: 'variable-font',
          license: 'OFL-1.1',
          variableFont: {
            file: 'VariableFont.ttf',
            axes: {
              wght: { min: 100, max: 900, default: 400 },
              ital: { min: 0, max: 1, default: 0 }
            }
          }
        }),
        'subset-font': createMockFontMetadata({
          family: 'Subset Font',
          normalizedFamily: 'subset-font',
          license: 'MIT',
          subsets: {
            'min-chars': {
              description: 'Minimal character set',
              characterCount: 95,
              status: 'generated'
            }
          }
        })
      }

      // Generate ES modules
      const { generateModules } = await import('../../src/build-tools/generators/module-generator.js')
      await generateModules(fontFamilies, workspace.getOutputPath('modules'), {
        generateIndividualModules: true,
        generateCombinedModule: true,
        cdnBaseUrl: 'https://cdn.jsdelivr.net/gh/test/font-families@{version}',
        repoVersion: 'v2.0.0'
      })

      // Generate catalog API
      const { generateCatalog } = await import('../../src/build-tools/generators/catalog-generator.js')
      await generateCatalog(fontFamilies, workspace.getOutputPath('api/families'), {
        version: '2.0.0',
        includeRestrictedFonts: false
      })

      // Verify ES modules structure
      const individualModules = ['primary-font.js', 'variable-font.js', 'subset-font.js']
      for (const module of individualModules) {
        const exists = await workspace.fileExists(`output/modules/${module}`)
        assert.ok(exists, `Should create individual module: ${module}`)
      }

      const combinedModule = await workspace.fileExists('output/modules/font-families.js')
      assert.ok(combinedModule, 'Should create combined module')

      // Verify catalog API structure
      const familiesIndex = await workspace.fileExists('output/api/families/index.json')
      assert.ok(familiesIndex, 'Should create families index')

      const individualCatalogs = ['primary-font.json', 'variable-font.json', 'subset-font.json']
      for (const catalog of individualCatalogs) {
        const exists = await workspace.fileExists(`output/api/families/${catalog}`)
        assert.ok(exists, `Should create individual catalog: ${catalog}`)
      }

      // Verify API content consistency
      const familiesIndexData = await workspace.readJsonFile('output/api/families/index.json')
      assert.ok(familiesIndexData.families, 'Families index should have families object')
      assert.ok(familiesIndexData.families['primary-font'], 'Should include primary font in index')
      assert.ok(familiesIndexData.families['variable-font'], 'Should include variable font in index')
      assert.ok(familiesIndexData.families['subset-font'], 'Should include subset font in index')

      // Verify module content consistency
      const combinedModuleContent = await workspace.readFile('output/modules/font-families.js')
      assert.ok(combinedModuleContent.includes('primary-font'), 'Combined module should include all fonts')
      assert.ok(combinedModuleContent.includes('variable-font'), 'Combined module should include all fonts')
      assert.ok(combinedModuleContent.includes('subset-font'), 'Combined module should include all fonts')
    } finally {
      console.restore()
    }
  })

  await t.test('should handle API versioning consistently', async () => {
    const console = mockConsole()

    try {
      const fontFamilies = {
        'version-test': createMockFontMetadata({
          family: 'Version Test',
          normalizedFamily: 'version-test',
          license: 'OFL-1.1',
          version: '1.5.0'
        })
      }

      const testVersion = 'v1.5.0'

      // Generate with consistent versioning
      const { generateModules } = await import('../../src/build-tools/generators/module-generator.js')
      await generateModules(fontFamilies, workspace.getOutputPath('modules'), {
        repoVersion: testVersion,
        cdnBaseUrl: 'https://cdn.example.com/font-families@{version}'
      })

      const { generateCatalog } = await import('../../src/build-tools/generators/catalog-generator.js')
      await generateCatalog(fontFamilies, workspace.getOutputPath('api/families'), {
        version: testVersion.replace('v', '')
      })

      // Verify version consistency in modules
      const moduleContent = await workspace.readFile('output/modules/version-test.js')
      assert.ok(moduleContent.includes(testVersion), 'Module should include correct version')
      assert.ok(moduleContent.includes('cdn.example.com'), 'Module should include CDN base URL')

      // Verify version in catalog
      const catalogIndex = await workspace.readJsonFile('output/api/families/index.json')
      assert.strictEqual(catalogIndex.version, '1.5.0', 'Catalog should have correct version')
    } finally {
      console.restore()
    }
  })
})

test('API Generation Integration - CDN URL Generation', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should generate correct CDN URLs for all output types', async () => {
    const console = mockConsole()

    try {
      const fontFamilies = {
        'cdn-test': createMockFontMetadata({
          family: 'CDN Test',
          normalizedFamily: 'cdn-test',
          license: 'OFL-1.1',
          variants: {
            regular: { weight: 400, style: 'normal', file: 'CDNTest-Regular.ttf' }
          },
          subsets: {
            'min-chars': {
              description: 'Minimal characters',
              status: 'generated'
            }
          }
        })
      }

      const { generateModules } = await import('../../src/build-tools/generators/module-generator.js')
      await generateModules(fontFamilies, workspace.getOutputPath('modules'), {
        cdnBaseUrl: 'https://cdn.jsdelivr.net/gh/user/repo@{version}',
        repoVersion: 'v3.1.0'
      })

      const moduleContent = await workspace.readFile('output/modules/cdn-test.js')

      // Verify font file URLs
      assert.ok(
        moduleContent.includes('https://cdn.jsdelivr.net/gh/user/repo@v3.1.0'),
        'Should include complete CDN URL with version'
      )
      assert.ok(
        moduleContent.includes('CDNTest-Regular.ttf'),
        'Should include font file name in URL'
      )

      // Verify subset URLs if subsets are included
      if (moduleContent.includes('subsets')) {
        assert.ok(
          moduleContent.includes('subsets/cdn-test'),
          'Should include subset path in CDN URL'
        )
      }
    } finally {
      console.restore()
    }
  })

  await t.test('should handle CDN URL template replacement', async () => {
    const console = mockConsole()

    try {
      const fontFamilies = {
        'template-test': createMockFontMetadata({
          family: 'Template Test',
          normalizedFamily: 'template-test',
          license: 'OFL-1.1'
        })
      }

      const { generateModules } = await import('../../src/build-tools/generators/module-generator.js')
      
      // Test various CDN URL templates
      const templates = [
        {
          template: 'https://cdn.example.com/{version}/fonts',
          version: 'v2.0.0',
          expected: 'https://cdn.example.com/v2.0.0/fonts'
        },
        {
          template: 'https://unpkg.com/package@{version}',
          version: 'v1.0.0',
          expected: 'https://unpkg.com/package@v1.0.0'
        }
      ]

      for (const testCase of templates) {
        await generateModules(fontFamilies, workspace.getOutputPath(`modules-${testCase.version}`), {
          cdnBaseUrl: testCase.template,
          repoVersion: testCase.version
        })

        const moduleContent = await workspace.readFile(`output/modules-${testCase.version}/template-test.js`)
        assert.ok(
          moduleContent.includes(testCase.expected),
          `Should correctly replace template: ${testCase.template} → ${testCase.expected}`
        )
      }
    } finally {
      console.restore()
    }
  })
})

test('API Generation Integration - Cross-Format Consistency', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should maintain data consistency between modules and catalogs', async () => {
    const console = mockConsole()

    try {
      const fontFamilies = {
        'consistency-test': createMockFontMetadata({
          family: 'Consistency Test Font',
          normalizedFamily: 'consistency-test',
          license: 'Apache-2.0',
          version: '1.2.3',
          author: 'Test Author',
          description: 'A font for testing consistency',
          variants: {
            regular: { weight: 400, style: 'normal', file: 'ConsistencyTest-Regular.ttf' },
            bold: { weight: 700, style: 'normal', file: 'ConsistencyTest-Bold.ttf' }
          },
          variableFont: {
            file: 'ConsistencyTestVF.ttf',
            axes: { wght: { min: 400, max: 700, default: 400 } }
          }
        })
      }

      // Generate both outputs
      const { generateModules } = await import('../../src/build-tools/generators/module-generator.js')
      await generateModules(fontFamilies, workspace.getOutputPath('modules'), {
        repoVersion: 'v1.2.3'
      })

      const { generateCatalog } = await import('../../src/build-tools/generators/catalog-generator.js')
      await generateCatalog(fontFamilies, workspace.getOutputPath('api/families'), {
        version: '1.2.3'
      })

      // Read both outputs
      const moduleContent = await workspace.readFile('output/modules/consistency-test.js')
      const catalogData = await workspace.readJsonFile('output/api/families/consistency-test.json')

      // Verify family name consistency
      assert.ok(moduleContent.includes('Consistency Test Font'), 'Module should have correct family name')
      assert.strictEqual(catalogData.family, 'Consistency Test Font', 'Catalog should have correct family name')

      // Verify license consistency
      assert.ok(moduleContent.includes('Apache-2.0'), 'Module should have correct license')
      assert.strictEqual(catalogData.license, 'Apache-2.0', 'Catalog should have correct license')

      // Verify variants consistency
      assert.ok(moduleContent.includes('"regular"'), 'Module should include regular variant')
      assert.ok(moduleContent.includes('"bold"'), 'Module should include bold variant')
      assert.ok(catalogData.variants.regular, 'Catalog should include regular variant')
      assert.ok(catalogData.variants.bold, 'Catalog should include bold variant')

      // Verify weight consistency
      assert.strictEqual(catalogData.variants.regular.weight, 400, 'Catalog should have correct regular weight')
      assert.strictEqual(catalogData.variants.bold.weight, 700, 'Catalog should have correct bold weight')

      // Verify variable font consistency
      assert.ok(moduleContent.includes('"variableFont"'), 'Module should include variable font')
      assert.ok(catalogData.variableFont, 'Catalog should include variable font')
      assert.ok(catalogData.variableFont.axes.wght, 'Catalog should include weight axis')

      // Verify file references consistency
      assert.ok(moduleContent.includes('ConsistencyTest-Regular.ttf'), 'Module should reference correct files')
      assert.strictEqual(catalogData.variants.regular.file, 'ConsistencyTest-Regular.ttf', 'Catalog should reference correct files')
    } finally {
      console.restore()
    }
  })

  await t.test('should handle subset data consistently across formats', async () => {
    const console = mockConsole()

    try {
      const fontFamilies = {
        'subset-consistency': createMockFontMetadata({
          family: 'Subset Consistency Font',
          normalizedFamily: 'subset-consistency',
          license: 'OFL-1.1',
          subsets: {
            'min-chars': {
              description: 'Minimal character set',
              characterCount: 95,
              status: 'generated'
            },
            'latin-extended': {
              description: 'Extended Latin characters',
              characterCount: 384,
              status: 'generated'
            }
          }
        })
      }

      // Generate outputs
      const { generateModules } = await import('../../src/build-tools/generators/module-generator.js')
      await generateModules(fontFamilies, workspace.getOutputPath('modules'))

      const { generateCatalog } = await import('../../src/build-tools/generators/catalog-generator.js')
      await generateCatalog(fontFamilies, workspace.getOutputPath('api/families'))

      // Verify subset information consistency
      const moduleContent = await workspace.readFile('output/modules/subset-consistency.js')
      const catalogData = await workspace.readJsonFile('output/api/families/subset-consistency.json')

      // Both should include subset information
      if (moduleContent.includes('subsets')) {
        assert.ok(moduleContent.includes('min-chars'), 'Module should include min-chars subset')
        assert.ok(moduleContent.includes('latin-extended'), 'Module should include latin-extended subset')
      }

      if (catalogData.subsets) {
        assert.ok(catalogData.subsets['min-chars'], 'Catalog should include min-chars subset')
        assert.ok(catalogData.subsets['latin-extended'], 'Catalog should include latin-extended subset')
        assert.strictEqual(catalogData.subsets['min-chars'].characterCount, 95, 'Catalog should have correct character count')
        assert.strictEqual(catalogData.subsets['latin-extended'].characterCount, 384, 'Catalog should have correct character count')
      }
    } finally {
      console.restore()
    }
  })
})

test('API Generation Integration - Performance and Scalability', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should handle large font collections efficiently', async () => {
    const console = mockConsole()

    try {
      // Create large collection of fonts
      const fontFamilies = {}
      for (let i = 0; i < 20; i++) {
        fontFamilies[`perf-font-${i}`] = createMockFontMetadata({
          family: `Performance Font ${i}`,
          normalizedFamily: `perf-font-${i}`,
          license: 'OFL-1.1',
          variants: {
            regular: { weight: 400, style: 'normal', file: `PerfFont${i}-Regular.ttf` },
            bold: { weight: 700, style: 'normal', file: `PerfFont${i}-Bold.ttf` }
          }
        })
      }

      const startTime = Date.now()

      // Generate all outputs
      const { generateModules } = await import('../../src/build-tools/generators/module-generator.js')
      await generateModules(fontFamilies, workspace.getOutputPath('modules'), {
        generateIndividualModules: true,
        generateCombinedModule: true
      })

      const { generateCatalog } = await import('../../src/build-tools/generators/catalog-generator.js')
      await generateCatalog(fontFamilies, workspace.getOutputPath('api/families'))

      const duration = Date.now() - startTime

      // Should complete in reasonable time
      assert.ok(duration < 10000, `API generation should be efficient: ${duration}ms`)

      // Verify all outputs created
      const files = await workspace.listFiles()
      const moduleFiles = files.filter(f => f.startsWith('output/modules/') && f.endsWith('.js'))
      const catalogFiles = files.filter(f => f.startsWith('output/api/families/') && f.endsWith('.json'))

      assert.ok(moduleFiles.length >= 20, 'Should create individual modules for all fonts')
      assert.ok(catalogFiles.length >= 20, 'Should create catalog files for all fonts')

      // Verify combined module includes all fonts
      const combinedExists = await workspace.fileExists('output/modules/font-families.js')
      assert.ok(combinedExists, 'Should create combined module')

      const combinedContent = await workspace.readFile('output/modules/font-families.js')
      assert.ok(combinedContent.includes('perf-font-0'), 'Combined module should include all fonts')
      assert.ok(combinedContent.includes('perf-font-19'), 'Combined module should include all fonts')
    } finally {
      console.restore()
    }
  })

  await t.test('should validate API output integrity', async () => {
    const console = mockConsole()

    try {
      const fontFamilies = {
        'integrity-test': createMockFontMetadata({
          family: 'Integrity Test',
          normalizedFamily: 'integrity-test',
          license: 'OFL-1.1'
        })
      }

      // Generate outputs
      const { generateModules } = await import('../../src/build-tools/generators/module-generator.js')
      await generateModules(fontFamilies, workspace.getOutputPath('modules'))

      const { generateCatalog } = await import('../../src/build-tools/generators/catalog-generator.js')
      await generateCatalog(fontFamilies, workspace.getOutputPath('api/families'))

      // Validate JavaScript syntax
      const moduleContent = await workspace.readFile('output/modules/integrity-test.js')
      
      // Should be valid ES module
      assert.ok(moduleContent.includes('export default'), 'Should have ES module export')
      assert.ok(!moduleContent.includes('undefined'), 'Should not contain undefined values')

      // Test JavaScript syntax validity
      try {
        const testCode = moduleContent.replace('export default', 'const moduleData =')
        new Function(testCode) // Will throw if syntax is invalid
      } catch (syntaxError) {
        assert.fail(`Generated module has syntax errors: ${syntaxError.message}`)
      }

      // Validate JSON structure
      const catalogContent = await workspace.readJsonFile('output/api/families/integrity-test.json')
      assert.ok(typeof catalogContent === 'object', 'Catalog should be valid JSON')
      assert.ok(catalogContent.family, 'Catalog should have required properties')

      const familiesIndex = await workspace.readJsonFile('output/api/families/index.json')
      assert.ok(typeof familiesIndex === 'object', 'Families index should be valid JSON')
      assert.ok(familiesIndex.families, 'Families index should have families object')
    } finally {
      console.restore()
    }
  })
})