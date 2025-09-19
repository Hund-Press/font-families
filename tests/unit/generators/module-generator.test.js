/**
 * Tests for Module Generator
 *
 * Tests ES module generation for font families
 */

import { test } from 'node:test'
import assert from 'node:assert'
import { generateModules } from '../../../build-tools/generators/module-generator.js'
import { TempWorkspace } from '../../helpers/temp-workspace.js'
import {
  createMockFontMetadata,
  mockConsole,
} from '../../helpers/test-helpers.js'

test('Module Generator - Basic Functionality', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should generate individual family modules', async () => {
    const fontFamilies = {
      'test-font': createMockFontMetadata({
        family: 'test-font',
        normalizedFamily: 'test-font',
        license: 'OFL-1.1',
      }),
    }

    const console = mockConsole()

    try {
      await generateModules(fontFamilies, workspace.getOutputPath('modules'), {
        generateIndividualModules: true,
        generateCombinedModule: false,
      })

      // Check that module file was created
      const moduleExists = await workspace.fileExists(
        'output/modules/test-font.js'
      )
      assert.ok(moduleExists, 'Individual module should be created')

      // Check module content
      const moduleContent = await workspace.readFile(
        'output/modules/test-font.js'
      )
      assert.ok(
        moduleContent.includes('export default'),
        'Should have default export'
      )
      assert.ok(
        moduleContent.includes('"family"'),
        'Should include family property'
      )
      assert.ok(
        moduleContent.includes('"test-font"'),
        'Should include family name'
      )
      assert.ok(moduleContent.includes('"variants"'), 'Should include variants')
    } finally {
      console.restore()
    }
  })

  await t.test('should generate combined module', async () => {
    const fontFamilies = {
      'font-one': createMockFontMetadata({
        family: 'font-one',
        license: 'OFL-1.1',
      }),
      'font-two': createMockFontMetadata({
        family: 'font-two',
        license: 'OFL-1.1',
      }),
    }

    const console = mockConsole()

    try {
      await generateModules(fontFamilies, workspace.getOutputPath('modules'), {
        generateIndividualModules: false,
        generateCombinedModule: true,
      })

      // Check that combined module was created
      const combinedExists = await workspace.fileExists(
        'output/modules/font-families.js'
      )
      assert.ok(combinedExists, 'Combined module should be created')

      // Check combined module content
      const combinedContent = await workspace.readFile(
        'output/modules/font-families.js'
      )
      assert.ok(
        combinedContent.includes('export default'),
        'Should have default export'
      )
      assert.ok(
        combinedContent.includes('"font-one"'),
        'Should include first font'
      )
      assert.ok(
        combinedContent.includes('"font-two"'),
        'Should include second font'
      )
    } finally {
      console.restore()
    }
  })

  await t.test('should include CDN URLs in modules', async () => {
    const fontFamilies = {
      'test-cdn': createMockFontMetadata({
        family: 'test-cdn',
        license: 'OFL-1.1',
        variants: {
          regular: {
            weight: 400,
            style: 'normal',
            file: 'TestCDN-Regular.ttf',
          },
        },
      }),
    }

    const console = mockConsole()

    try {
      await generateModules(fontFamilies, workspace.getOutputPath('modules'), {
        cdnBaseUrl: 'https://test-cdn.example.com',
        repoVersion: 'v1.2.3',
      })

      const moduleContent = await workspace.readFile(
        'output/modules/test-cdn.js'
      )
      assert.ok(
        moduleContent.includes('https://test-cdn.example.com'),
        'Should include CDN base URL'
      )
      assert.ok(
        moduleContent.includes('v1.2.3'),
        'Should include version in URL'
      )
    } finally {
      console.restore()
    }
  })
})

test('Module Generator - Subset Integration', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should include subset information when available', async () => {
    const fontFamilies = {
      'subset-font': createMockFontMetadata({
        family: 'subset-font',
        license: 'OFL-1.1',
        subsets: {
          'min-chars': {
            description: 'Minimal character set',
            characterCount: 100,
            status: 'generated',
          },
        },
      }),
    }

    const console = mockConsole()

    try {
      await generateModules(fontFamilies, workspace.getOutputPath('modules'))

      const moduleContent = await workspace.readFile(
        'output/modules/subset-font.js'
      )
      assert.ok(
        moduleContent.includes('"subsets"'),
        'Should include subsets section'
      )
      assert.ok(
        moduleContent.includes('min-chars'),
        'Should include subset name'
      )
      assert.ok(
        moduleContent.includes('_subsets'),
        'Should include subset CDN path'
      )
    } finally {
      console.restore()
    }
  })

  await t.test('should handle fonts without subsets', async () => {
    const fontFamilies = {
      'no-subsets': createMockFontMetadata({
        family: 'no-subsets',
        license: 'OFL-1.1',
      }),
    }

    const console = mockConsole()

    try {
      await generateModules(fontFamilies, workspace.getOutputPath('modules'))

      const moduleContent = await workspace.readFile(
        'output/modules/no-subsets.js'
      )
      // Should not crash and should not include subset references
      assert.ok(
        !moduleContent.includes('_subsets'),
        'Should not include subset paths'
      )
    } finally {
      console.restore()
    }
  })
})

test('Module Generator - Variable Fonts', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should handle variable fonts correctly', async () => {
    const fontFamilies = {
      'variable-font': createMockFontMetadata({
        family: 'variable-font',
        license: 'OFL-1.1',
        variableFont: {
          file: 'VariableFont.ttf',
          axes: {
            wght: { min: 100, max: 900, default: 400 },
            ital: { min: 0, max: 1, default: 0 },
          },
        },
      }),
    }

    const console = mockConsole()

    try {
      await generateModules(fontFamilies, workspace.getOutputPath('modules'))

      const moduleContent = await workspace.readFile(
        'output/modules/variable-font.js'
      )
      assert.ok(
        moduleContent.includes('"variableFont"'),
        'Should include variable font section'
      )
      assert.ok(
        moduleContent.includes('"axes"'),
        'Should include axes information'
      )
      assert.ok(moduleContent.includes('wght'), 'Should include weight axis')
      assert.ok(moduleContent.includes('ital'), 'Should include italic axis')
    } finally {
      console.restore()
    }
  })
})

test('Module Generator - Code Quality', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should generate valid ES modules', async () => {
    const fontFamilies = {
      'syntax-test': createMockFontMetadata({
        family: 'syntax-test',
        license: 'OFL-1.1',
      }),
    }

    const console = mockConsole()

    try {
      await generateModules(fontFamilies, workspace.getOutputPath('modules'))

      const moduleContent = await workspace.readFile(
        'output/modules/syntax-test.js'
      )

      // Basic syntax validation
      assert.ok(
        moduleContent.includes('export default'),
        'Should have ES module export'
      )
      assert.ok(
        !moduleContent.includes('undefined'),
        'Should not contain undefined values'
      )

      // Should be parseable as JavaScript
      try {
        // Use dynamic import to validate syntax (in a test environment, this tests parsing)
        const moduleCode = moduleContent.replace(
          'export default',
          'const moduleData ='
        )
        new Function(moduleCode) // This will throw if syntax is invalid
      } catch (syntaxError) {
        assert.fail(
          `Generated module has syntax errors: ${syntaxError.message}`
        )
      }
    } finally {
      console.restore()
    }
  })

  await t.test('should format code with Prettier', async () => {
    const fontFamilies = {
      'format-test': createMockFontMetadata({
        family: 'format-test',
        license: 'OFL-1.1',
      }),
    }

    const console = mockConsole()

    try {
      await generateModules(fontFamilies, workspace.getOutputPath('modules'))

      const moduleContent = await workspace.readFile(
        'output/modules/format-test.js'
      )

      // Check for Prettier formatting characteristics
      assert.ok(
        !moduleContent.includes(';'),
        'Should not have semicolons (per .prettierrc)'
      )
      assert.ok(
        moduleContent.includes("'"),
        'Should use single quotes (per .prettierrc)'
      )

      // Should not have trailing commas in objects (basic check)
      assert.ok(
        !moduleContent.match(/,\s*\}/),
        'Should not have trailing commas'
      )
    } finally {
      console.restore()
    }
  })
})

test('Module Generator - Error Handling', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should handle invalid output directory', async () => {
    const fontFamilies = {
      'test-font': createMockFontMetadata({
        family: 'test-font',
        license: 'OFL-1.1',
      }),
    }

    const console = mockConsole()

    try {
      // Try to write to a non-existent parent directory
      await assert.rejects(
        generateModules(fontFamilies, '/nonexistent/deep/path/modules'),
        /ENOENT/,
        'Should reject with file system error'
      )
    } finally {
      console.restore()
    }
  })

  await t.test('should handle empty font families', async () => {
    const console = mockConsole()

    try {
      await generateModules({}, workspace.getOutputPath('modules'))

      // Should complete without error
      const files = await workspace.listFiles()
      const moduleFiles = files.filter(
        (f) => f.startsWith('output/modules/') && f.endsWith('.js')
      )

      // Might create combined module even if empty, but should not crash
      assert.ok(true, 'Should handle empty input gracefully')
    } finally {
      console.restore()
    }
  })

  await t.test('should skip fonts with non-open licenses', async () => {
    const fontFamilies = {
      'open-font': createMockFontMetadata({
        family: 'open-font',
        license: 'OFL-1.1',
      }),
      'proprietary-font': createMockFontMetadata({
        family: 'proprietary-font',
        license: 'proprietary',
      }),
    }

    const console = mockConsole()

    try {
      await generateModules(fontFamilies, workspace.getOutputPath('modules'))

      // Should create module for open font
      const openExists = await workspace.fileExists(
        'output/modules/open-font.js'
      )
      assert.ok(openExists, 'Should create module for open font')

      // Should not create module for proprietary font
      const propExists = await workspace.fileExists(
        'output/modules/proprietary-font.js'
      )
      assert.ok(!propExists, 'Should not create module for proprietary font')
    } finally {
      console.restore()
    }
  })
})

test('Module Generator - Performance', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test(
    'should complete generation within reasonable time',
    async () => {
      // Create multiple font families to test performance
      const fontFamilies = {}
      for (let i = 0; i < 10; i++) {
        fontFamilies[`perf-test-${i}`] = createMockFontMetadata({
          family: `perf-test-${i}`,
          license: 'OFL-1.1',
        })
      }

      const console = mockConsole()
      const startTime = Date.now()

      try {
        await generateModules(fontFamilies, workspace.getOutputPath('modules'))

        const duration = Date.now() - startTime

        // Should complete in under 5 seconds for 10 fonts
        assert.ok(duration < 5000, `Generation took too long: ${duration}ms`)

        // Verify all modules were created
        const files = await workspace.listFiles()
        const moduleFiles = files.filter(
          (f) => f.startsWith('output/modules/') && f.endsWith('.js')
        )

        assert.ok(
          moduleFiles.length >= 10,
          'Should create modules for all fonts'
        )
      } finally {
        console.restore()
      }
    }
  )
})
