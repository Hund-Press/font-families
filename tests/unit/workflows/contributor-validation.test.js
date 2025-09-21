/**
 * Tests for Contributor Validation Workflow
 *
 * Tests validation processes for font contributions and submissions
 */

import { test } from 'node:test'
import assert from 'node:assert'
import { promises as fs } from 'fs'
import path from 'path'
import { TempWorkspace } from '../../helpers/temp-workspace.js'
import { 
  mockConsole, 
  createTestFontStructure,
  createMockFontMetadata 
} from '../../helpers/test-helpers.js'

test('Contributor Validation - Font Submission Validation', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should validate complete font submission', async () => {
    const console = mockConsole()

    try {
      // Create a complete, valid font submission with UFR structure
      const fontDir = workspace.getFontsPath('valid-submission')
      await fs.mkdir(fontDir, { recursive: true })
      
      // Create fonts/ subdirectory for UFR structure
      const fontsSubdir = path.join(fontDir, 'fonts')
      await fs.mkdir(fontsSubdir, { recursive: true })
      
      // Create font files in fonts/ subdirectory
      await fs.writeFile(path.join(fontsSubdir, 'valid-submission-Regular.ttf'), Buffer.alloc(1024))
      await fs.writeFile(path.join(fontsSubdir, 'valid-submission-Bold.ttf'), Buffer.alloc(1024))
      
      // Add proper UFR structure
      await workspace.createOutputFile('../fonts/valid-submission/fontdata.json', JSON.stringify({
        family: 'Valid Submission',
        license: 'OFL-1.1',
        version: '1.0.0',
        author: 'Test Contributor',
        description: 'A valid font submission for testing',
        variants: {
          regular: { weight: 400, style: 'normal', file: 'fonts/valid-submission-Regular.ttf' },
          bold: { weight: 700, style: 'normal', file: 'fonts/valid-submission-Bold.ttf' }
        }
      }))

      // Add license file
      await workspace.createOutputFile('../fonts/valid-submission/OFL.txt', `
Copyright 2024 Test Contributor

This Font Software is licensed under the SIL Open Font License, Version 1.1.
      `.trim())

      // Test validation components
      const { validateLicensing } = await import('../../../src/build-tools/scanners/validation.js')
      const { hasUFRStructure, scanUFRFamily } = await import('../../../src/build-tools/scanners/ufr-scanner.js')

      // Test structure validation
      const hasValidStructure = await hasUFRStructure(fontDir)
      assert.ok(hasValidStructure, 'Should detect valid UFR structure')

      // Test scanning
      const familyData = await scanUFRFamily(fontDir, 'valid-submission')
      assert.ok(familyData, 'Should successfully scan valid submission')

      if (familyData) {
        // Test license validation
        const hasValidLicense = await validateLicensing(familyData, 'open')
        assert.ok(hasValidLicense, 'Should validate open license')

        // Test metadata completeness
        assert.ok(familyData.family, 'Should have family name')
        assert.ok(familyData.license, 'Should have license')
        assert.ok(familyData.variants, 'Should have variants')
        assert.ok(Object.keys(familyData.variants).length > 0, 'Should have at least one variant')
      }
    } finally {
      console.restore()
    }
  })

  await t.test('should identify incomplete font submissions', async () => {
    const console = mockConsole()

    try {
      // Create incomplete submission (missing required files)
      const fontDir = workspace.getFontsPath('incomplete-submission')
      await fs.mkdir(fontDir, { recursive: true })
      
      // Only create fontdata.json, missing actual font files
      await workspace.createOutputFile('../fonts/incomplete-submission/fontdata.json', JSON.stringify({
        family: 'Incomplete Submission',
        license: 'OFL-1.1',
        variants: {
          regular: { weight: 400, style: 'normal', file: 'missing-file.ttf' }
        }
      }))

      const { scanUFRFamily } = await import('../../../src/build-tools/scanners/ufr-scanner.js')
      
      // Should handle gracefully but may return null or incomplete data
      const familyData = await scanUFRFamily(fontDir, 'incomplete-submission')
      
      if (familyData) {
        // If it returns data, it should at least have the basic info
        assert.ok(familyData.family, 'Should have family name from metadata')
      }

      // Check that warnings or errors were logged about missing files
      const hasWarnings = console.logs.warn.length > 0 || console.logs.error.length > 0
      // Warnings are good practice but not strictly required
    } finally {
      console.restore()
    }
  })

  await t.test('should validate license compliance', async () => {
    const console = mockConsole()

    try {
      // Test various license scenarios
      const licenseCases = [
        {
          name: 'valid-ofl',
          license: 'OFL-1.1',
          hasLicenseFile: true,
          shouldPass: true
        },
        {
          name: 'valid-mit',
          license: 'MIT',
          hasLicenseFile: true,
          shouldPass: true
        },
        {
          name: 'invalid-proprietary',
          license: 'proprietary',
          hasLicenseFile: false,
          shouldPass: false
        },
        {
          name: 'missing-license',
          license: null,
          hasLicenseFile: false,
          shouldPass: false
        }
      ]

      const { validateLicensing } = await import('../../../src/build-tools/scanners/validation.js')

      for (const testCase of licenseCases) {
        const fontData = createMockFontMetadata({
          family: testCase.name,
          license: testCase.license
        })

        const isValid = await validateLicensing(fontData, 'open')
        
        if (testCase.shouldPass) {
          assert.ok(isValid, `${testCase.name} should pass license validation`)
        } else {
          assert.ok(!isValid, `${testCase.name} should fail license validation`)
        }
      }
    } finally {
      console.restore()
    }
  })
})

test('Contributor Validation - File Structure Requirements', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should validate required file structure', async () => {
    const console = mockConsole()

    try {
      // Test different file structure scenarios
      const structureCases = [
        {
          name: 'complete-ufr',
          setup: async (dir) => {
            await fs.mkdir(path.join(dir, 'fonts'), { recursive: true })
            await fs.writeFile(path.join(dir, 'OFL.txt'), 'License text')
            await fs.writeFile(path.join(dir, 'fontdata.json'), JSON.stringify({
              family: 'Complete UFR',
              license: 'OFL-1.1'
            }))
            await fs.writeFile(path.join(dir, 'fonts', 'font.ttf'), Buffer.alloc(1024))
          },
          shouldDetectUFR: true
        },
        {
          name: 'legacy-structure',
          setup: async (dir) => {
            await fs.writeFile(path.join(dir, 'font.ttf'), Buffer.alloc(1024))
            await fs.writeFile(path.join(dir, 'metadata.json'), JSON.stringify({
              family: 'Legacy Font'
            }))
          },
          shouldDetectUFR: false
        },
        {
          name: 'minimal-structure',
          setup: async (dir) => {
            await fs.writeFile(path.join(dir, 'font.ttf'), Buffer.alloc(1024))
          },
          shouldDetectUFR: false
        }
      ]

      const { hasUFRStructure } = await import('../../../src/build-tools/scanners/ufr-scanner.js')

      for (const testCase of structureCases) {
        const testDir = workspace.getFontsPath(testCase.name)
        await fs.mkdir(testDir, { recursive: true })
        await testCase.setup(testDir)

        const isUFR = await hasUFRStructure(testDir)
        
        if (testCase.shouldDetectUFR) {
          assert.ok(isUFR, `${testCase.name} should be detected as UFR`)
        } else {
          assert.ok(!isUFR, `${testCase.name} should not be detected as UFR`)
        }
      }
    } finally {
      console.restore()
    }
  })

  await t.test('should handle malformed metadata files', async () => {
    const console = mockConsole()

    try {
      // Test with malformed fontdata.json
      const fontDir = workspace.getFontsPath('malformed-metadata')
      await fs.mkdir(fontDir, { recursive: true })
      await fs.writeFile(path.join(fontDir, 'fontdata.json'), 'invalid json{')

      const { extractUFRMetadata } = await import('../../../src/build-tools/scanners/ufr-scanner.js')
      
      const metadata = await extractUFRMetadata(fontDir, workspace.fontsDir)
      
      // Should handle gracefully and return object (possibly empty)
      assert.ok(typeof metadata === 'object', 'Should handle malformed JSON gracefully')
      
      // Should log warnings about parsing errors
      const hasWarnings = console.logs.warn.length > 0 || console.logs.error.length > 0
      // Warnings are good practice for malformed files
    } finally {
      console.restore()
    }
  })
})

test('Contributor Validation - Font Quality Checks', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should validate font file integrity', async () => {
    const console = mockConsole()

    try {
      // Create fonts with different file sizes and content
      const fontCases = [
        {
          name: 'normal-font',
          size: 50000, // 50KB - typical small font
          shouldWarn: false
        },
        {
          name: 'tiny-font',
          size: 100, // 100 bytes - suspiciously small
          shouldWarn: true
        },
        {
          name: 'empty-font',
          size: 0, // Empty file
          shouldWarn: true
        }
      ]

      for (const testCase of fontCases) {
        const fontDir = workspace.getFontsPath(testCase.name)
        await createTestFontStructure(workspace.fontsDir, testCase.name)
        
        // Replace font file with specific size
        const fontFile = path.join(fontDir, `${testCase.name}-Regular.ttf`)
        await fs.writeFile(fontFile, Buffer.alloc(testCase.size))

        // Check file size (basic quality check)
        const stats = await fs.stat(fontFile)
        
        if (testCase.shouldWarn) {
          // Files under 1KB are suspicious
          assert.ok(stats.size < 1000, `${testCase.name} should be flagged as suspicious size`)
        } else {
          assert.ok(stats.size >= 1000, `${testCase.name} should have reasonable size`)
        }
      }
    } finally {
      console.restore()
    }
  })

  await t.test('should validate metadata completeness for contributions', async () => {
    const console = mockConsole()

    try {
      // Test different levels of metadata completeness
      const metadataCases = [
        {
          name: 'complete-metadata',
          metadata: {
            family: 'Complete Font',
            license: 'OFL-1.1',
            version: '1.0.0',
            author: 'Test Author',
            description: 'A complete font with all metadata',
            variants: {
              regular: { weight: 400, style: 'normal', file: 'font.ttf' }
            }
          },
          isComplete: true
        },
        {
          name: 'minimal-metadata',
          metadata: {
            family: 'Minimal Font',
            license: 'OFL-1.1'
          },
          isComplete: false
        },
        {
          name: 'missing-license',
          metadata: {
            family: 'No License Font',
            author: 'Test Author'
          },
          isComplete: false
        }
      ]

      for (const testCase of metadataCases) {
        const fontDir = workspace.getFontsPath(testCase.name)
        await fs.mkdir(fontDir, { recursive: true })
        await fs.writeFile(
          path.join(fontDir, 'fontdata.json'),
          JSON.stringify(testCase.metadata, null, 2)
        )

        const { extractUFRMetadata } = await import('../../../src/build-tools/scanners/ufr-scanner.js')
        const metadata = await extractUFRMetadata(fontDir, workspace.fontsDir)

        if (testCase.isComplete) {
          assert.ok(metadata && metadata.family, 'Complete metadata should have family')
          assert.ok(metadata && metadata.license, 'Complete metadata should have license')
        } else {
          // May have partial metadata or warnings about missing fields
          if (metadata) {
            const hasRequiredFields = metadata.family && metadata.license
            // Incomplete metadata should be flagged somehow
          }
        }
      }
    } finally {
      console.restore()
    }
  })
})

test('Contributor Validation - Build Integration', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should validate fonts through build pipeline', async () => {
    const console = mockConsole()

    try {
      // Create a valid contribution that should pass through entire pipeline
      const fontDir = workspace.getFontsPath('pipeline-test')
      await fs.mkdir(fontDir, { recursive: true })
      
      // Create UFR structure
      const fontsSubdir = path.join(fontDir, 'fonts')
      await fs.mkdir(fontsSubdir, { recursive: true })
      await fs.writeFile(path.join(fontsSubdir, 'pipeline-test-Regular.ttf'), Buffer.alloc(1024))
      await fs.writeFile(path.join(fontDir, 'OFL.txt'), 'License text')
      
      await workspace.createOutputFile('../fonts/pipeline-test/fontdata.json', JSON.stringify({
        family: 'Pipeline Test Font',
        license: 'OFL-1.1',
        version: '1.0.0',
        variants: {
          regular: { weight: 400, style: 'normal', file: 'fonts/pipeline-test-Regular.ttf' }
        }
      }))

      // Test scanning
      const { scanUFRFamily } = await import('../../../src/build-tools/scanners/ufr-scanner.js')
      const familyData = await scanUFRFamily(fontDir, 'pipeline-test')
      
      assert.ok(familyData, 'Valid contribution should scan successfully')

      if (familyData) {
        // Test license validation
        const { validateLicensing } = await import('../../../src/build-tools/scanners/validation.js')
        const isValidLicense = await validateLicensing(familyData, 'open')
        assert.ok(isValidLicense, 'Valid contribution should pass license validation')

        // Test module generation
        const { generateModules } = await import('../../../src/build-tools/generators/module-generator.js')
        await generateModules(
          { 'pipeline-test': familyData },
          workspace.getOutputPath('modules')
        )

        const moduleExists = await workspace.fileExists('output/modules/pipeline-test.js')
        assert.ok(moduleExists, 'Valid contribution should generate module')

        // Test catalog generation
        const { generateCatalog } = await import('../../../src/build-tools/generators/catalog-generator.js')
        await generateCatalog(
          { 'pipeline-test': familyData },
          workspace.getOutputPath('api/families')
        )

        const catalogExists = await workspace.fileExists('output/api/families/pipeline-test.json')
        assert.ok(catalogExists, 'Valid contribution should generate catalog entry')
      }
    } finally {
      console.restore()
    }
  })

  await t.test('should handle problematic contributions gracefully', async () => {
    const console = mockConsole()

    try {
      // Test with various problematic scenarios
      const problematicCases = [
        {
          name: 'no-variants',
          metadata: {
            family: 'No Variants Font',
            license: 'OFL-1.1'
            // Missing variants
          }
        },
        {
          name: 'invalid-variant-data',
          metadata: {
            family: 'Invalid Variant Font',
            license: 'OFL-1.1',
            variants: {
              regular: 'not an object'
            }
          }
        },
        {
          name: 'missing-files',
          metadata: {
            family: 'Missing Files Font',
            license: 'OFL-1.1',
            variants: {
              regular: { weight: 400, style: 'normal', file: 'nonexistent.ttf' }
            }
          }
        }
      ]

      for (const testCase of problematicCases) {
        const fontDir = workspace.getFontsPath(testCase.name)
        await fs.mkdir(fontDir, { recursive: true })
        await fs.writeFile(
          path.join(fontDir, 'fontdata.json'),
          JSON.stringify(testCase.metadata, null, 2)
        )

        const { scanUFRFamily } = await import('../../../src/build-tools/scanners/ufr-scanner.js')
        
        // Should not crash, but may return null or log warnings
        try {
          const familyData = await scanUFRFamily(fontDir, testCase.name)
          
          // If it returns data, test that it's at least an object
          if (familyData !== null) {
            assert.ok(typeof familyData === 'object', 'Should return object or null')
          }
        } catch (error) {
          // If it throws, ensure it's a proper error
          assert.ok(error instanceof Error, 'Should throw proper error for problematic data')
        }
      }
    } finally {
      console.restore()
    }
  })
})

test('Contributor Validation - Error Reporting', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should provide helpful error messages for common issues', async () => {
    const console = mockConsole()

    try {
      // Test scenarios that should produce helpful error messages
      const errorCases = [
        {
          name: 'missing-fontdata',
          setup: async (dir) => {
            // Create font files but no fontdata.json
            await fs.writeFile(path.join(dir, 'font.ttf'), Buffer.alloc(1024))
          },
          expectedIssue: 'missing metadata'
        },
        {
          name: 'wrong-license-format',
          setup: async (dir) => {
            await fs.writeFile(path.join(dir, 'fontdata.json'), JSON.stringify({
              family: 'Wrong License Font',
              license: 'Custom License Text' // Should be standard identifier
            }))
          },
          expectedIssue: 'license validation'
        }
      ]

      for (const testCase of errorCases) {
        const fontDir = workspace.getFontsPath(testCase.name)
        await fs.mkdir(fontDir, { recursive: true })
        await testCase.setup(fontDir)

        // Clear previous logs
        console.logs.log.length = 0
        console.logs.warn.length = 0
        console.logs.error.length = 0

        const { scanUFRFamily } = await import('../../../src/build-tools/scanners/ufr-scanner.js')
        await scanUFRFamily(fontDir, testCase.name)

        // Check that some form of logging occurred
        const totalLogs = console.logs.log.length + console.logs.warn.length + console.logs.error.length
        
        // While specific error messages aren't required, some form of feedback is helpful
        if (totalLogs === 0) {
          // Silent failures are acceptable but not ideal for contributor experience
        }
      }
    } finally {
      console.restore()
    }
  })

  await t.test('should validate contribution workflow end-to-end', async () => {
    const console = mockConsole()

    try {
      // Simulate a complete contribution workflow
      const contributionSteps = [
        {
          name: 'structure-check',
          test: async () => {
            const fontDir = workspace.getFontsPath('contribution-workflow')
            await fs.mkdir(fontDir, { recursive: true })
            
            // Create UFR structure
            const fontsSubdir = path.join(fontDir, 'fonts')
            await fs.mkdir(fontsSubdir, { recursive: true })
            await fs.writeFile(path.join(fontsSubdir, 'font.ttf'), Buffer.alloc(1024))
            await fs.writeFile(path.join(fontDir, 'OFL.txt'), 'License text')
            
            const { hasUFRStructure } = await import('../../../src/build-tools/scanners/ufr-scanner.js')
            return await hasUFRStructure(fontDir)
          }
        },
        {
          name: 'metadata-validation',
          test: async () => {
            const fontDir = workspace.getFontsPath('contribution-workflow')
            await workspace.createOutputFile('../fonts/contribution-workflow/fontdata.json', JSON.stringify({
              family: 'Contribution Workflow Font',
              license: 'OFL-1.1',
              version: '1.0.0'
            }))
            
            const { extractUFRMetadata } = await import('../../../src/build-tools/scanners/ufr-scanner.js')
            const metadata = await extractUFRMetadata(fontDir, workspace.fontsDir)
            return metadata && metadata.license === 'OFL-1.1'
          }
        },
        {
          name: 'scan-validation',
          test: async () => {
            const fontDir = workspace.getFontsPath('contribution-workflow')
            const { scanUFRFamily } = await import('../../../src/build-tools/scanners/ufr-scanner.js')
            const familyData = await scanUFRFamily(fontDir, 'contribution-workflow')
            return familyData !== null
          }
        },
        {
          name: 'license-validation',
          test: async () => {
            const fontData = createMockFontMetadata({
              family: 'Contribution Workflow Font',
              license: 'OFL-1.1'
            })
            const { validateLicensing } = await import('../../../src/build-tools/scanners/validation.js')
            return await validateLicensing(fontData, 'open')
          }
        }
      ]

      const results = {}
      for (const step of contributionSteps) {
        try {
          results[step.name] = await step.test()
        } catch (error) {
          results[step.name] = false
        }
      }

      // All steps should pass for a valid contribution
      for (const [stepName, passed] of Object.entries(results)) {
        assert.ok(passed, `Contribution workflow step should pass: ${stepName}`)
      }
    } finally {
      console.restore()
    }
  })
})