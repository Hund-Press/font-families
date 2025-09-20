/**
 * Tests for Font Validation Utilities
 */

import { jest } from '@jest/globals'
import { promises as fs } from 'fs'
import path from 'path'
import {
  validateLicensing,
  validateFileIntegrity,
  validateUFRCompliance,
  validateMetadata,
  validateFontFamily
} from '../../../build-tools/scanners/validation.js'
import {
  createTempDir,
  cleanupTempDir,
  mockConsole,
  writeJsonFile,
  createTestFontStructure
} from '../../helpers/test-helpers.js'

describe('Font Validation Utilities', () => {
  let tempDir
  let consoleMock

  beforeEach(async () => {
    tempDir = await createTempDir()
    consoleMock = mockConsole()
  })

  afterEach(async () => {
    consoleMock.restore()
    await cleanupTempDir(tempDir)
  })

  describe('validateLicensing', () => {
    test('should validate open fonts with approved licenses', async () => {
      const openLicenseFonts = [
        { name: 'OFL Font', license: 'OFL-1.1' },
        { name: 'Apache Font', license: 'Apache-2.0' },
        { name: 'MIT Font', license: 'MIT' },
        { name: 'SIL Font', license: 'SIL Open Font License' },
        { name: 'Apache Full', license: 'Apache License 2.0' }
      ]

      for (const fontData of openLicenseFonts) {
        // Create minimal directory structure with license file
        const fontDir = path.join(tempDir, fontData.name.toLowerCase().replace(/\s+/g, '-'))
        await fs.mkdir(path.join(fontDir, 'fonts'), { recursive: true })
        await fs.writeFile(path.join(fontDir, 'LICENSE.txt'), 'License content')

        const mockFamilyData = {
          ...fontData,
          static: {
            regular: { path: path.join(fontDir, 'fonts', 'font.woff2') }
          }
        }

        const result = await validateLicensing(mockFamilyData, 'open')
        expect(result).toBe(true)
      }
    })

    test('should reject fonts with restricted licenses for open distribution', async () => {
      const restrictedFonts = [
        { name: 'Commercial Font', license: 'Commercial' },
        { name: 'Proprietary Font', license: 'Proprietary License' },
        { name: 'Custom Font', license: 'Custom License' }
      ]

      for (const fontData of restrictedFonts) {
        const result = await validateLicensing(fontData, 'open')
        expect(result).toBe(false)
      }
    })

    test('should reject fonts with no license information', async () => {
      const fontData = { name: 'No License Font' }
      const result = await validateLicensing(fontData, 'open')
      expect(result).toBe(false)
    })

    test('should accept any license for restricted distribution', async () => {
      const fontData = { name: 'Commercial Font', license: 'Commercial' }
      const result = await validateLicensing(fontData, 'restricted')
      expect(result).toBe(true)
    })

    test('should check for license file existence', async () => {
      const fontDir = path.join(tempDir, 'test-font')
      await fs.mkdir(path.join(fontDir, 'fonts'), { recursive: true })

      const fontData = {
        name: 'Test Font',
        license: 'OFL-1.1',
        static: {
          regular: { path: path.join(fontDir, 'fonts', 'font.woff2') }
        }
      }

      // Without license file should fail
      let result = await validateLicensing(fontData, 'open')
      expect(result).toBe(false)

      // With license file should pass
      await fs.writeFile(path.join(fontDir, 'LICENSE.txt'), 'OFL License content')
      result = await validateLicensing(fontData, 'open')
      expect(result).toBe(true)
    })

    test('should find license files in various locations and names', async () => {
      const fontDir = path.join(tempDir, 'test-font')
      await fs.mkdir(path.join(fontDir, 'fonts'), { recursive: true })

      const fontData = {
        name: 'Test Font',
        license: 'OFL-1.1',
        static: {
          regular: { path: path.join(fontDir, 'fonts', 'font.woff2') }
        }
      }

      const licenseFiles = ['LICENSE.txt', 'LICENSE', 'OFL.txt', 'LICENCE.txt', 'LICENCE']

      for (const licenseFile of licenseFiles) {
        // Clean up previous license files
        for (const file of licenseFiles) {
          try {
            await fs.unlink(path.join(fontDir, file))
          } catch {}
        }

        await fs.writeFile(path.join(fontDir, licenseFile), 'License content')
        const result = await validateLicensing(fontData, 'open')
        expect(result).toBe(true)
      }
    })
  })

  describe('validateFileIntegrity', () => {
    test('should validate existing font files', async () => {
      const { fontDir } = await createTestFontStructure(tempDir, 'test-font')

      const fontData = {
        name: 'Test Font',
        static: {
          regular: { path: path.join(fontDir, 'test-font-Regular.ttf') },
          bold: { path: path.join(fontDir, 'test-font-Bold.ttf') }
        },
        variable: {
          wght: { path: path.join(fontDir, 'test-fontVF.ttf') }
        }
      }

      const result = await validateFileIntegrity(fontData)

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.checkedFiles).toBe(3)
    })

    test('should detect missing font files', async () => {
      const fontData = {
        name: 'Missing Files Font',
        static: {
          regular: { path: path.join(tempDir, 'nonexistent', 'font.woff2') }
        }
      }

      const result = await validateFileIntegrity(fontData)

      expect(result.valid).toBe(false)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0]).toContain('Cannot access font file')
    })

    test('should warn about large font files', async () => {
      const fontDir = path.join(tempDir, 'large-font')
      await fs.mkdir(fontDir, { recursive: true })

      // Create a 12MB file
      const largeFontPath = path.join(fontDir, 'large-font.woff2')
      await fs.writeFile(largeFontPath, Buffer.alloc(12 * 1024 * 1024))

      const fontData = {
        name: 'Large Font',
        static: {
          regular: { path: largeFontPath }
        }
      }

      const result = await validateFileIntegrity(fontData)

      expect(result.valid).toBe(true)
      expect(result.warnings).toHaveLength(1)
      expect(result.warnings[0]).toContain('Large font file')
    })

    test('should error on suspiciously small font files', async () => {
      const fontDir = path.join(tempDir, 'tiny-font')
      await fs.mkdir(fontDir, { recursive: true })

      // Create a 500 byte file
      const tinyFontPath = path.join(fontDir, 'tiny-font.woff2')
      await fs.writeFile(tinyFontPath, Buffer.alloc(500))

      const fontData = {
        name: 'Tiny Font',
        static: {
          regular: { path: tinyFontPath }
        }
      }

      const result = await validateFileIntegrity(fontData)

      expect(result.valid).toBe(false)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0]).toContain('Suspiciously small font file')
    })
  })

  describe('validateUFRCompliance', () => {
    test('should validate UFR-compliant font structure', async () => {
      const { fontDir } = await createTestFontStructure(tempDir, 'ufr-font')

      // Create UFR structure
      await fs.mkdir(path.join(fontDir, 'fonts', 'webfonts'), { recursive: true })
      await fs.mkdir(path.join(fontDir, 'fonts', 'ttf'), { recursive: true })
      await fs.mkdir(path.join(fontDir, 'sources'), { recursive: true })
      await fs.writeFile(path.join(fontDir, 'README.md'), '# UFR Font')
      await fs.writeFile(path.join(fontDir, 'LICENSE.txt'), 'OFL License')

      const packageJson = {
        name: 'ufr-font',
        version: '1.0.0',
        author: 'Test Author',
        license: 'OFL-1.1'
      }
      await writeJsonFile(path.join(fontDir, 'package.json'), packageJson)

      const fontData = {
        name: 'UFR Font',
        static: {
          regular: { path: path.join(fontDir, 'fonts', 'webfonts', 'font.woff2') }
        }
      }

      const result = await validateUFRCompliance(fontDir, fontData)

      expect(result.compliant).toBe(true)
      expect(result.score).toBe(result.maxScore)
      expect(result.compliancePercentage).toBe(100)
      expect(result.issues).toHaveLength(0)
    })

    test('should detect missing UFR components', async () => {
      const fontDir = path.join(tempDir, 'incomplete-font')
      await fs.mkdir(fontDir, { recursive: true })

      const fontData = {
        name: 'Incomplete Font',
        static: {
          regular: { path: path.join(fontDir, 'font.woff2') }
        }
      }

      const result = await validateUFRCompliance(fontDir, fontData)

      expect(result.compliant).toBe(false)
      expect(result.compliancePercentage).toBeLessThan(100)
      expect(result.issues.length).toBeGreaterThan(0)
      expect(result.issues).toContain('Missing fonts/ directory')
    })

    test('should provide recommendations for optional components', async () => {
      const fontDir = path.join(tempDir, 'basic-font')
      await fs.mkdir(path.join(fontDir, 'fonts'), { recursive: true })
      await fs.writeFile(path.join(fontDir, 'LICENSE.txt'), 'License')

      const fontData = {
        name: 'Basic Font',
        static: {
          regular: { path: path.join(fontDir, 'fonts', 'font.woff2') }
        }
      }

      const result = await validateUFRCompliance(fontDir, fontData)

      expect(result.recommendations.length).toBeGreaterThan(0)
      expect(result.recommendations).toContain('Add README.md with font description')
    })

    test('should score organized font directories', async () => {
      const fontDir = path.join(tempDir, 'organized-font')
      await fs.mkdir(path.join(fontDir, 'fonts'), { recursive: true })
      await fs.mkdir(path.join(fontDir, 'fonts', 'webfonts'), { recursive: true })
      await fs.mkdir(path.join(fontDir, 'fonts', 'ttf'), { recursive: true })
      await fs.mkdir(path.join(fontDir, 'fonts', 'variable'), { recursive: true })
      await fs.writeFile(path.join(fontDir, 'LICENSE.txt'), 'License')

      const fontData = {
        name: 'Organized Font',
        static: {
          regular: { path: path.join(fontDir, 'fonts', 'webfonts', 'font.woff2') }
        }
      }

      const result = await validateUFRCompliance(fontDir, fontData)

      expect(result.score).toBeGreaterThanOrEqual(60) // Should get points for organization
    })
  })

  describe('validateMetadata', () => {
    test('should validate complete font metadata', async () => {
      const completeFont = {
        name: 'Complete Font',
        slug: 'complete-font',
        license: 'OFL-1.1',
        author: 'Test Author',
        version: '1.0.0',
        description: 'A complete font with all metadata',
        copyrightYear: '2024',
        static: {
          regular: { path: 'fonts/regular.woff2' }
        }
      }

      const result = validateMetadata(completeFont)

      expect(result.complete).toBe(true)
      expect(result.completenessPercentage).toBe(100)
      expect(result.missing).toHaveLength(0)
    })

    test('should detect missing essential metadata', async () => {
      const incompleteFont = {
        // Missing name, license, author
        description: 'An incomplete font'
      }

      const result = validateMetadata(incompleteFont)

      expect(result.complete).toBe(false)
      expect(result.missing).toContain('name')
      expect(result.missing).toContain('license')
      expect(result.missing).toContain('author')
      expect(result.missing).toContain('font files')
    })

    test('should warn about missing recommended fields', async () => {
      const minimalFont = {
        name: 'Minimal Font',
        slug: 'minimal-font',
        license: 'OFL-1.1',
        author: 'Author',
        static: {
          regular: { path: 'fonts/regular.woff2' }
        }
        // Missing version, description, copyrightYear
      }

      const result = validateMetadata(minimalFont)

      expect(result.complete).toBe(true) // Has all essential fields
      expect(result.warnings.length).toBeGreaterThan(0)
      expect(result.warnings).toContain('Missing recommended field: version')
    })

    test('should accept alternative field names', async () => {
      const altFieldFont = {
        name: 'Alt Field Font',
        slug: 'alt-field-font',
        licenseType: 'OFL-1.1', // Alternative to 'license'
        author: 'Author',
        static: {
          regular: { path: 'fonts/regular.woff2' }
        }
      }

      const result = validateMetadata(altFieldFont)

      expect(result.complete).toBe(true)
      expect(result.missing).not.toContain('license')
    })

    test('should validate font file presence', async () => {
      const noFilesFont = {
        name: 'No Files Font',
        slug: 'no-files-font',
        license: 'OFL-1.1',
        author: 'Author'
        // No static or variable fonts
      }

      const result = validateMetadata(noFilesFont)

      expect(result.complete).toBe(false)
      expect(result.missing).toContain('font files')

      // Test with variable fonts
      const variableFont = {
        ...noFilesFont,
        variable: {
          wght: { path: 'fonts/variable.woff2' }
        }
      }

      const variableResult = validateMetadata(variableFont)
      expect(variableResult.complete).toBe(true)
      expect(variableResult.missing).not.toContain('font files')
    })
  })

  describe('validateFontFamily', () => {
    test('should run comprehensive validation', async () => {
      const { fontDir, metadata } = await createTestFontStructure(tempDir, 'comprehensive-font')

      // Create proper UFR structure
      await fs.mkdir(path.join(fontDir, 'fonts', 'webfonts'), { recursive: true })
      await fs.writeFile(path.join(fontDir, 'LICENSE.txt'), 'OFL-1.1 License')
      await fs.writeFile(path.join(fontDir, 'README.md'), '# Comprehensive Font')

      const fontData = {
        name: 'Comprehensive Font',
        slug: 'comprehensive-font',
        license: 'OFL-1.1',
        author: 'Test Author',
        version: '1.0.0',
        static: {
          regular: { path: path.join(fontDir, 'comprehensive-font-Regular.ttf') },
          bold: { path: path.join(fontDir, 'comprehensive-font-Bold.ttf') }
        },
        variable: {
          wght: { path: path.join(fontDir, 'comprehensive-fontVF.ttf') }
        }
      }

      const result = await validateFontFamily(fontDir, fontData, 'open')

      expect(result.overall).toBe(true)
      expect(result.licensing).toBe(true)
      expect(result.fileIntegrity.valid).toBe(true)
      expect(result.metadata.complete).toBe(true)
      expect(result.ufrCompliance.compliant).toBe(true)
    })

    test('should fail when licensing is invalid', async () => {
      const fontData = {
        name: 'Commercial Font',
        license: 'Commercial License',
        static: {
          regular: { path: path.join(tempDir, 'nonexistent.woff2') }
        }
      }

      const result = await validateFontFamily(null, fontData, 'open')

      expect(result.overall).toBe(false)
      expect(result.licensing).toBe(false)
    })

    test('should handle validation without UFR compliance check', async () => {
      const fontData = {
        name: 'No Path Font',
        license: 'OFL-1.1',
        author: 'Author',
        static: {
          regular: { path: path.join(tempDir, 'nonexistent.woff2') }
        }
      }

      const result = await validateFontFamily(null, fontData, 'open')

      expect(result.ufrCompliance).toBeUndefined()
      expect(result.overall).toBe(false) // Should fail due to missing files
    })

    test('should provide detailed error information', async () => {
      const { fontDir } = await createTestFontStructure(tempDir, 'error-font')

      const fontData = {
        // Missing essential metadata
        static: {
          regular: { path: path.join(fontDir, 'error-font-Regular.ttf') }
        }
      }

      const result = await validateFontFamily(fontDir, fontData, 'open')

      expect(result.overall).toBe(false)
      expect(result.licensing).toBe(false) // No license
      expect(result.metadata.complete).toBe(false) // Missing metadata
    })
  })

  describe('Error handling and edge cases', () => {
    test('should handle fonts with no file paths', async () => {
      const fontData = {
        name: 'No Paths Font',
        license: 'OFL-1.1',
        static: {
          regular: {} // No path property
        }
      }

      const result = await validateFileIntegrity(fontData)
      expect(result.valid).toBe(false)
    })

    test('should handle invalid font directory structures', async () => {
      const fontDir = path.join(tempDir, 'invalid-structure')
      // Don't create the directory

      const fontData = {
        name: 'Invalid Structure',
        license: 'OFL-1.1'
      }

      const result = await validateUFRCompliance(fontDir, fontData)
      expect(result.compliant).toBe(false)
      expect(result.issues.length).toBeGreaterThan(0)
    })

    test('should log appropriate validation messages', async () => {
      const fontData = {
        name: 'Test Log Font',
        license: 'OFL-1.1',
        author: 'Author',
        static: {
          regular: { path: path.join(tempDir, 'nonexistent.woff2') }
        }
      }

      await validateFontFamily(null, fontData, 'open')

      expect(consoleMock.logs.log).toContain('[validation] Running comprehensive validation for Test Log Font')
      expect(consoleMock.logs.error).toContain('[validation] ❌ Test Log Font: Validation issues found')
    })
  })
})