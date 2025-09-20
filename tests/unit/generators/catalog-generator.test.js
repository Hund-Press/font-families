/**
 * Tests for Catalog Generator
 */

import { jest } from '@jest/globals'
import { promises as fs } from 'fs'
import path from 'path'
import { generateCatalog, generateSubsetAPIs } from '../../../build-tools/generators/catalog-generator.js'
import {
  createTempDir,
  cleanupTempDir,
  readJsonFile,
  createTestFontStructure,
  mockConsole
} from '../../helpers/test-helpers.js'

describe('Catalog Generator', () => {
  let tempDir
  let mockFontFamilies
  let consoleMock

  beforeEach(async () => {
    tempDir = await createTempDir()
    consoleMock = mockConsole()

    // Create mock font families data
    mockFontFamilies = {
      'test-font': {
        key: 'test-font',
        name: 'Test Font',
        description: 'A test font for unit testing',
        license: 'OFL-1.1',
        author: 'Test Author',
        version: '1.0.0',
        copyrightYear: '2024',
        static: {
          regular: {
            path: 'test-font/fonts/webfonts/TestFont-Regular.woff2',
            weight: 400,
            style: 'normal',
            stretch: 'normal',
            performance: {
              fileSize: 22000,
              fileSizeKB: 21.5
            },
            metrics: {
              unitsPerEm: 1000,
              ascent: 800,
              descent: -200,
              capHeight: 700,
              xHeight: 500
            },
            features: {
              glyphCount: 450,
              openTypeFeatures: ['liga', 'kern'],
              unicodeRanges: [{
                name: 'Latin',
                coverage: 100,
                start: 'U+0020',
                end: 'U+007F'
              }]
            }
          },
          bold: {
            path: 'test-font/fonts/webfonts/TestFont-Bold.woff2',
            weight: 700,
            style: 'normal',
            stretch: 'normal',
            performance: {
              fileSize: 24000,
              fileSizeKB: 23.4
            }
          }
        },
        variable: {
          'wght-400-700': {
            path: 'test-font/fonts/webfonts/TestFontVF.woff2',
            style: 'normal',
            axes: {
              wght: { min: 400, max: 700, default: 400 }
            },
            performance: {
              fileSize: 68000,
              fileSizeKB: 66.4
            }
          }
        }
      },
      'restricted-font': {
        key: 'restricted-font',
        name: 'Restricted Font',
        description: 'A restricted license font',
        license: 'Commercial',
        author: 'Commercial Author',
        version: '1.0.0',
        static: {
          regular: {
            path: 'restricted-font/fonts/webfonts/RestrictedFont-Regular.woff2',
            weight: 400,
            style: 'normal'
          }
        }
      }
    }
  })

  afterEach(async () => {
    consoleMock.restore()
    await cleanupTempDir(tempDir)
  })

  describe('generateCatalog', () => {
    test('should generate families index and individual files for open fonts', async () => {
      const outputPath = path.join(tempDir, 'api', 'families', 'index.json')

      await generateCatalog(mockFontFamilies, outputPath, {
        includeRestrictedFonts: false,
        version: '1.9.4'
      })

      // Check families index
      const indexPath = path.join(tempDir, 'api', 'families', 'index.json')
      const familiesIndex = await readJsonFile(indexPath)

      expect(familiesIndex).toBeDefined()
      expect(familiesIndex.name).toBe('Font Families Index')
      expect(familiesIndex.families).toHaveProperty('test-font')
      expect(familiesIndex.families).not.toHaveProperty('restricted-font')

      // Check individual family file
      const familyPath = path.join(tempDir, 'api', 'families', 'test-font.json')
      const familyData = await readJsonFile(familyPath)

      expect(familyData).toBeDefined()
      expect(familyData.name).toBe('Test Font')
      expect(familyData.key).toBe('test-font')
      expect(familyData.license).toBe('OFL-1.1')
      expect(familyData.capabilities.hasStatic).toBe(true)
      expect(familyData.capabilities.hasVariable).toBe(true)
    })

    test('should include restricted fonts when option is enabled', async () => {
      const outputPath = path.join(tempDir, 'api', 'families', 'index.json')

      await generateCatalog(mockFontFamilies, outputPath, {
        includeRestrictedFonts: true,
        version: '1.9.4'
      })

      const indexPath = path.join(tempDir, 'api', 'families', 'index.json')
      const familiesIndex = await readJsonFile(indexPath)

      expect(familiesIndex.families).toHaveProperty('test-font')
      expect(familiesIndex.families).toHaveProperty('restricted-font')
    })

    test('should extract correct capabilities from font data', async () => {
      const outputPath = path.join(tempDir, 'api', 'families', 'index.json')

      await generateCatalog(mockFontFamilies, outputPath, { version: '1.9.4' })

      const familyPath = path.join(tempDir, 'api', 'families', 'test-font.json')
      const familyData = await readJsonFile(familyPath)

      expect(familyData.capabilities).toEqual({
        hasStatic: true,
        hasVariable: true,
        weightRange: {
          min: 400,
          max: 700,
          available: [400, 700],
          type: 'static'
        },
        styleCount: 1,
        formats: ['woff2']
      })
    })

    test('should extract correct file information with CDN links', async () => {
      const outputPath = path.join(tempDir, 'api', 'families', 'index.json')

      await generateCatalog(mockFontFamilies, outputPath, { version: '1.9.4' })

      const familyPath = path.join(tempDir, 'api', 'families', 'test-font.json')
      const familyData = await readJsonFile(familyPath)

      expect(familyData.files.static).toHaveLength(2)
      expect(familyData.files.variable).toHaveLength(1)

      const staticFile = familyData.files.static[0]
      expect(staticFile.fileName).toBe('TestFont-Regular.woff2')
      expect(staticFile.format).toBe('woff2')
      expect(staticFile.weight).toBe(400)
      expect(staticFile.links.download.href).toContain('cdn.jsdelivr.net/gh/hund-press/font-families@v1.9.4')

      const variableFile = familyData.files.variable[0]
      expect(variableFile.axes).toEqual({
        wght: { min: 400, max: 700, default: 400 }
      })
    })

    test('should extract quick metrics from font data', async () => {
      const outputPath = path.join(tempDir, 'api', 'families', 'index.json')

      await generateCatalog(mockFontFamilies, outputPath, { version: '1.9.4' })

      const familyPath = path.join(tempDir, 'api', 'families', 'test-font.json')
      const familyData = await readJsonFile(familyPath)

      expect(familyData.metrics).toEqual({
        unitsPerEm: 1000,
        ascent: 800,
        descent: -200,
        capHeight: 700,
        xHeight: 500,
        glyphCount: 450,
        totalFiles: 3,
        totalSizeKB: 111.3
      })
    })

    test('should include HATEOAS links in individual family files', async () => {
      const outputPath = path.join(tempDir, 'api', 'families', 'index.json')

      await generateCatalog(mockFontFamilies, outputPath, { version: '1.9.4' })

      const familyPath = path.join(tempDir, 'api', 'families', 'test-font.json')
      const familyData = await readJsonFile(familyPath)

      expect(familyData.links).toEqual({
        self: { href: '/api/families/test-font.json' },
        index: { href: '/api/families/' },
        root: { href: '/api/' },
        module: { href: '/modules/test-font.js' },
        preview: { href: '/fonts/test-font/' },
        subsets: {
          href: '/api/subsets/test-font.json',
          title: 'Performance subsets for this family'
        },
        cdn: {
          href: 'https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.9.4/test-font/',
          templated: false
        }
      })
    })

    test('should handle fonts with only static variants', async () => {
      const staticOnlyFont = {
        'static-only': {
          key: 'static-only',
          name: 'Static Only Font',
          license: 'OFL-1.1',
          static: {
            regular: { path: 'static-only/regular.woff2', weight: 400, style: 'normal' }
          }
        }
      }

      const outputPath = path.join(tempDir, 'api', 'families', 'index.json')
      await generateCatalog(staticOnlyFont, outputPath, { version: '1.9.4' })

      const familyPath = path.join(tempDir, 'api', 'families', 'static-only.json')
      const familyData = await readJsonFile(familyPath)

      expect(familyData.capabilities.hasStatic).toBe(true)
      expect(familyData.capabilities.hasVariable).toBe(false)
    })

    test('should handle fonts with only variable variants', async () => {
      const variableOnlyFont = {
        'variable-only': {
          key: 'variable-only',
          name: 'Variable Only Font',
          license: 'OFL-1.1',
          variable: {
            'wght-100-900': {
              path: 'variable-only/variable.woff2',
              style: 'normal',
              axes: { wght: { min: 100, max: 900, default: 400 } }
            }
          }
        }
      }

      const outputPath = path.join(tempDir, 'api', 'families', 'index.json')
      await generateCatalog(variableOnlyFont, outputPath, { version: '1.9.4' })

      const familyPath = path.join(tempDir, 'api', 'families', 'variable-only.json')
      const familyData = await readJsonFile(familyPath)

      expect(familyData.capabilities.hasStatic).toBe(false)
      expect(familyData.capabilities.hasVariable).toBe(true)
      expect(familyData.capabilities.weightRange.type).toBe('variable')
    })

    test('should log appropriate messages during generation', async () => {
      const outputPath = path.join(tempDir, 'api', 'families', 'index.json')

      await generateCatalog(mockFontFamilies, outputPath, {
        includeRestrictedFonts: false,
        version: '1.9.4'
      })

      expect(consoleMock.logs.log).toContain('[families] Generating families index and individual files')
      expect(consoleMock.logs.log).toContain('[families] Font families: 2')
      expect(consoleMock.logs.log).toContain('[families] Include restricted: false')
      expect(consoleMock.logs.log).toContain('[families] Generated families index with 1 families')
    })
  })

  describe('generateSubsetAPIs', () => {
    beforeEach(async () => {
      // Create mock subsets directory structure
      const subsetsDir = path.join(tempDir, 'subsets')
      await fs.mkdir(subsetsDir, { recursive: true })

      // Create test font subset structure
      const testFontSubsetDir = path.join(subsetsDir, 'test-font')
      await fs.mkdir(testFontSubsetDir, { recursive: true })

      // Create family metadata
      const familyMetadata = {
        originalFont: {
          name: 'Test Font',
          version: '1.0.0',
          author: 'Test Author',
          license: 'OFL-1.1'
        },
        legalCompliance: {
          originalLicense: 'OFL-1.1'
        },
        subsets: {
          'min-chars': {
            description: '100-character minimal set',
            status: 'generated',
            characterCount: 100,
            unicodeRanges: ['U+0020-U+007F'],
            generatedAt: '2024-01-01T00:00:00Z'
          },
          'latin-basic': {
            description: 'Basic Latin + Latin-1 Supplement',
            status: 'planned',
            characterCount: 500,
            unicodeRanges: ['U+0020-U+00FF']
          }
        }
      }

      await fs.writeFile(
        path.join(testFontSubsetDir, 'metadata.json'),
        JSON.stringify(familyMetadata, null, 2)
      )

      // Create subset directory with metadata
      const minCharsDir = path.join(testFontSubsetDir, 'min-chars')
      await fs.mkdir(minCharsDir, { recursive: true })

      const subsetMetadata = {
        description: '100-character minimal set',
        characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        unicodeRanges: ['U+0020-U+007F'],
        characterCount: 100,
        generatedAt: '2024-01-01T00:00:00Z',
        method: 'fonttools pyftsubset',
        sourceFont: {
          author: 'Test Author',
          license: 'OFL-1.1'
        },
        files: [
          {
            filename: 'TestFont-Regular-minchars.woff2',
            format: 'woff2',
            weight: 400,
            style: 'normal',
            isVariable: false,
            size: 4200
          }
        ]
      }

      await fs.writeFile(
        path.join(minCharsDir, 'metadata.json'),
        JSON.stringify(subsetMetadata, null, 2)
      )

      // Change working directory to temp dir for testing
      process.chdir(tempDir)
    })

    test('should generate subset root endpoint', async () => {
      const catalogOutputPath = path.join(tempDir, 'api')

      await generateSubsetAPIs(catalogOutputPath, 'v1.9.4')

      const rootPath = path.join(catalogOutputPath, 'subsets', 'index.json')
      const rootData = await readJsonFile(rootPath)

      expect(rootData).toBeDefined()
      expect(rootData.name).toBe('Font Subsets API')
      expect(rootData.families).toHaveProperty('test-font')
      expect(rootData.availableSubsets).toHaveProperty('min-chars')
      expect(rootData.derivativeWorkNotice.status).toContain('derivative works')
    })

    test('should generate family subset catalog', async () => {
      const catalogOutputPath = path.join(tempDir, 'api')

      await generateSubsetAPIs(catalogOutputPath, 'v1.9.4')

      const familyCatalogPath = path.join(catalogOutputPath, 'subsets', 'test-font.json')
      const familyData = await readJsonFile(familyCatalogPath)

      expect(familyData).toBeDefined()
      expect(familyData.family).toBe('test-font')
      expect(familyData.name).toBe('Test Font Subsets')
      expect(familyData.subsets).toHaveProperty('min-chars')
      expect(familyData.subsets).toHaveProperty('latin-basic')

      expect(familyData.subsets['min-chars'].status).toBe('generated')
      expect(familyData.subsets['latin-basic'].status).toBe('planned')
    })

    test('should generate individual subset endpoints', async () => {
      const catalogOutputPath = path.join(tempDir, 'api')

      await generateSubsetAPIs(catalogOutputPath, 'v1.9.4')

      const subsetPath = path.join(catalogOutputPath, 'subsets', 'test-font', 'min-chars.json')
      const subsetData = await readJsonFile(subsetPath)

      expect(subsetData).toBeDefined()
      expect(subsetData.family).toBe('test-font')
      expect(subsetData.subset).toBe('min-chars')
      expect(subsetData.characterCount).toBe(100)
      expect(subsetData.files).toHaveLength(1)

      const file = subsetData.files[0]
      expect(file.filename).toBe('TestFont-Regular-minchars.woff2')
      expect(file.fileSizeKB).toBe(4.1)
      expect(file.compressionRatio).toBeDefined()
      expect(file.links.download.href).toContain('cdn.jsdelivr.net')
    })

    test('should handle missing subsets directory gracefully', async () => {
      // Remove subsets directory
      await fs.rm(path.join(tempDir, 'subsets'), { recursive: true, force: true })

      const catalogOutputPath = path.join(tempDir, 'api')

      await generateSubsetAPIs(catalogOutputPath, 'v1.9.4')

      expect(consoleMock.logs.log).toContain('[subsets] No subsets directory found, skipping subset API generation')
    })

    test('should calculate performance metrics correctly', async () => {
      const catalogOutputPath = path.join(tempDir, 'api')

      await generateSubsetAPIs(catalogOutputPath, 'v1.9.4')

      const subsetPath = path.join(catalogOutputPath, 'subsets', 'test-font', 'min-chars.json')
      const subsetData = await readJsonFile(subsetPath)

      expect(subsetData.performanceMetrics).toBeDefined()
      expect(subsetData.performanceMetrics.originalSizeKB).toBe(22.0)
      expect(subsetData.performanceMetrics.subsetSizeKB).toBe(4.1)
      expect(subsetData.performanceMetrics.sizeReduction).toBe('81%')
      expect(subsetData.performanceMetrics.estimatedLoadTime3G).toBeDefined()
      expect(subsetData.performanceMetrics.recommendedUseCase).toContain('Critical path')
    })
  })

  describe('Error handling', () => {
    test('should handle invalid font family data gracefully', async () => {
      const invalidFontFamilies = {
        'invalid-font': {
          // Missing required properties
        }
      }

      const outputPath = path.join(tempDir, 'api', 'families', 'index.json')

      // Should not throw
      await expect(generateCatalog(invalidFontFamilies, outputPath)).resolves.toBeUndefined()
    })

    test('should handle filesystem errors gracefully', async () => {
      // Create read-only directory to trigger write errors
      const readOnlyPath = path.join(tempDir, 'readonly')
      await fs.mkdir(readOnlyPath, { recursive: true })
      await fs.chmod(readOnlyPath, 0o444)

      const outputPath = path.join(readOnlyPath, 'api', 'families', 'index.json')

      await expect(generateCatalog(mockFontFamilies, outputPath)).rejects.toThrow()
    })
  })
})