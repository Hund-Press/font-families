/**
 * Tests for FontTools Analyzer
 */

import { jest } from '@jest/globals'
import { spawn } from 'child_process'
import { promises as fs } from 'fs'
import path from 'path'
import {
  analyzeFontFile,
  normalizeFont,
  extractCanonicalFamilyName,
  generateEnhancedFamilyMetadata,
  generateKey,
  formatFamilyName
} from '../../../src/build-tools/scanners/fonttools-analyzer.js'
import {
  createTempDir,
  cleanupTempDir,
  mockConsole,
  createTestFontStructure
} from '../../helpers/test-helpers.js'

// Mock the spawn function
jest.mock('child_process', () => ({
  spawn: jest.fn()
}))

describe('FontTools Analyzer', () => {
  let tempDir
  let consoleMock

  beforeEach(async () => {
    tempDir = await createTempDir()
    consoleMock = mockConsole()

    // Reset the spawn mock
    spawn.mockReset()
  })

  afterEach(async () => {
    consoleMock.restore()
    await cleanupTempDir(tempDir)
  })

  describe('analyzeFontFile', () => {
    test('should analyze font file successfully', async () => {
      const mockAnalysis = {
        basic: {
          familyName: 'Test Font',
          style: 'normal',
          weight: 400,
          stretch: 'normal',
          subfamilyName: 'Regular',
          numGlyphs: 450
        },
        metrics: {
          unitsPerEm: 1000,
          ascent: 800,
          descent: -200,
          lineGap: 0,
          capHeight: 700,
          xHeight: 500,
          bbox: [0, -200, 1000, 800]
        },
        features: {
          openTypeFeatures: ['liga', 'kern'],
          stylisticSets: ['ss01', 'ss02'],
          unicodeRanges: [
            { name: 'Basic Latin', coverage: 100, start: 'U+0020', end: 'U+007F' }
          ]
        },
        file: {
          size: 22000,
          format: 'woff2'
        },
        languages: ['en', 'es', 'fr']
      }

      // Mock successful spawn
      const mockProcess = {
        stdout: { on: jest.fn() },
        stderr: { on: jest.fn() },
        on: jest.fn()
      }

      spawn.mockReturnValue(mockProcess)

      // Simulate process events
      const analysisPromise = analyzeFontFile('/test/font.woff2')

      // Trigger stdout data
      const stdoutCallback = mockProcess.stdout.on.mock.calls.find(call => call[0] === 'data')[1]
      stdoutCallback(JSON.stringify(mockAnalysis))

      // Trigger process close
      const closeCallback = mockProcess.on.mock.calls.find(call => call[0] === 'close')[1]
      closeCallback(0)

      const result = await analysisPromise
      expect(result).toEqual(mockAnalysis)
    })

    test('should handle Python process errors', async () => {
      const mockProcess = {
        stdout: { on: jest.fn() },
        stderr: { on: jest.fn() },
        on: jest.fn()
      }

      spawn.mockReturnValue(mockProcess)

      const analysisPromise = analyzeFontFile('/test/font.woff2')

      // Trigger stderr data
      const stderrCallback = mockProcess.stderr.on.mock.calls.find(call => call[0] === 'data')[1]
      stderrCallback('Python error occurred')

      // Trigger process close with error code
      const closeCallback = mockProcess.on.mock.calls.find(call => call[0] === 'close')[1]
      closeCallback(1)

      await expect(analysisPromise).rejects.toThrow('Font analysis failed: Python error occurred')
    })

    test('should handle JSON parsing errors', async () => {
      const mockProcess = {
        stdout: { on: jest.fn() },
        stderr: { on: jest.fn() },
        on: jest.fn()
      }

      spawn.mockReturnValue(mockProcess)

      const analysisPromise = analyzeFontFile('/test/font.woff2')

      // Trigger stdout with invalid JSON
      const stdoutCallback = mockProcess.stdout.on.mock.calls.find(call => call[0] === 'data')[1]
      stdoutCallback('invalid json data')

      // Trigger process close
      const closeCallback = mockProcess.on.mock.calls.find(call => call[0] === 'close')[1]
      closeCallback(0)

      await expect(analysisPromise).rejects.toThrow('Failed to parse font analysis')
    })

    test('should handle spawn errors', async () => {
      const mockProcess = {
        stdout: { on: jest.fn() },
        stderr: { on: jest.fn() },
        on: jest.fn()
      }

      spawn.mockReturnValue(mockProcess)

      const analysisPromise = analyzeFontFile('/test/font.woff2')

      // Trigger spawn error
      const errorCallback = mockProcess.on.mock.calls.find(call => call[0] === 'error')[1]
      errorCallback(new Error('Failed to start Python'))

      await expect(analysisPromise).rejects.toThrow('Failed to spawn Python process')
    })
  })

  describe('normalizeFont', () => {
    test('should normalize static font data', async () => {
      const mockFontToolsData = {
        basic: {
          familyName: 'Test Font',
          style: 'normal',
          weight: 400,
          stretch: 'normal',
          subfamilyName: 'Regular',
          numGlyphs: 450
        },
        metrics: {
          unitsPerEm: 1000,
          ascent: 800,
          descent: -200,
          lineGap: 0,
          capHeight: 700,
          xHeight: 500,
          bbox: [0, -200, 1000, 800]
        },
        features: {
          openTypeFeatures: ['liga', 'kern'],
          stylisticSets: ['ss01'],
          unicodeRanges: [
            { name: 'Basic Latin', coverage: 100 }
          ]
        },
        file: {
          size: 22000,
          format: 'woff2'
        },
        languages: ['en', 'es']
      }

      const normalized = await normalizeFont(mockFontToolsData, 'test-font', '/test/font.woff2')

      expect(normalized.family).toBe('Test Font')
      expect(normalized.style).toBe('normal')
      expect(normalized.weight).toBe(400)
      expect(normalized.path).toBe('test/font.woff2')
      expect(normalized.metrics.unitsPerEm).toBe(1000)
      expect(normalized.features.glyphCount).toBe(450)
      expect(normalized.performance.fileSizeKB).toBe(21)
      expect(normalized.performance.isVariable).toBe(false)
      expect(normalized.languages).toEqual(['en', 'es'])
    })

    test('should normalize variable font data', async () => {
      const mockVariableFontData = {
        basic: {
          familyName: 'Variable Font',
          style: 'normal',
          weight: 400,
          numGlyphs: 600
        },
        metrics: {
          unitsPerEm: 1000,
          ascent: 800,
          descent: -200
        },
        features: {
          openTypeFeatures: ['liga'],
          unicodeRanges: []
        },
        file: {
          size: 68000,
          format: 'woff2'
        },
        variable: {
          axes: {
            wght: { min: 100, max: 900, default: 400 },
            wdth: { min: 75, max: 125, default: 100 }
          },
          instances: [
            { name: 'Light', coordinates: { wght: 300 } },
            { name: 'Bold', coordinates: { wght: 700 } }
          ]
        }
      }

      const normalized = await normalizeFont(mockVariableFontData, 'variable-font', '/test/variable.woff2')

      expect(normalized.performance.isVariable).toBe(true)
      expect(normalized.performance.axisCount).toBe(2)
      expect(normalized.axes.wght).toEqual({ min: 100, max: 900, default: 400 })
      expect(normalized.weight).toEqual({ min: 100, max: 900 })
      expect(normalized.stretch.min).toBe('condensed')
      expect(normalized.stretch.max).toBe('semi-expanded')
      expect(normalized.namedInstances).toHaveLength(2)
    })

    test('should handle missing optional data gracefully', async () => {
      const minimalData = {
        basic: {
          familyName: 'Minimal Font',
          numGlyphs: 200
        },
        metrics: {
          unitsPerEm: 1000
        },
        features: {},
        file: {
          size: 15000,
          format: 'ttf'
        }
      }

      const normalized = await normalizeFont(minimalData, 'minimal-font', '/test/minimal.ttf')

      expect(normalized.family).toBe('Minimal Font')
      expect(normalized.features.openTypeFeatures).toEqual([])
      expect(normalized.features.stylisticSets).toEqual([])
      expect(normalized.features.unicodeRanges).toEqual([])
      expect(normalized.performance.glyphDensity).toBe(75) // 15000/200
    })
  })

  describe('extractCanonicalFamilyName', () => {
    test('should extract family name from font file', async () => {
      const mockAnalysis = {
        basic: { familyName: 'Canonical Font Family' }
      }

      const mockProcess = {
        stdout: { on: jest.fn() },
        stderr: { on: jest.fn() },
        on: jest.fn()
      }

      spawn.mockReturnValue(mockProcess)

      const namePromise = extractCanonicalFamilyName('/test/font.woff2')

      // Simulate successful analysis
      const stdoutCallback = mockProcess.stdout.on.mock.calls.find(call => call[0] === 'data')[1]
      stdoutCallback(JSON.stringify(mockAnalysis))

      const closeCallback = mockProcess.on.mock.calls.find(call => call[0] === 'close')[1]
      closeCallback(0)

      const result = await namePromise
      expect(result).toBe('Canonical Font Family')
    })

    test('should return null on analysis failure', async () => {
      const mockProcess = {
        stdout: { on: jest.fn() },
        stderr: { on: jest.fn() },
        on: jest.fn()
      }

      spawn.mockReturnValue(mockProcess)

      const namePromise = extractCanonicalFamilyName('/test/font.woff2')

      // Simulate error
      const closeCallback = mockProcess.on.mock.calls.find(call => call[0] === 'close')[1]
      closeCallback(1)

      const result = await namePromise
      expect(result).toBeNull()
    })
  })

  describe('generateEnhancedFamilyMetadata', () => {
    test('should generate metadata for font family', async () => {
      const scannedData = {
        static: {
          regular: { path: '/test/font-regular.woff2' }
        }
      }

      // Mock the canonical name extraction
      const mockAnalysis = {
        basic: { familyName: 'Enhanced Font' },
        features: {
          unicodeRanges: [
            { name: 'Basic Latin', coverage: 0.95 },
            { name: 'Latin-1 Supplement', coverage: 0.8 },
            { name: 'Cyrillic', coverage: 0.6 }
          ]
        }
      }

      const mockProcess = {
        stdout: { on: jest.fn() },
        stderr: { on: jest.fn() },
        on: jest.fn()
      }

      spawn.mockReturnValue(mockProcess)

      const metadataPromise = generateEnhancedFamilyMetadata(scannedData)

      // Simulate analysis
      const stdoutCallback = mockProcess.stdout.on.mock.calls.find(call => call[0] === 'data')[1]
      stdoutCallback(JSON.stringify(mockAnalysis))

      const closeCallback = mockProcess.on.mock.calls.find(call => call[0] === 'close')[1]
      closeCallback(0)

      const result = await metadataPromise

      expect(result.name).toBe('Enhanced Font')
      expect(result.key).toBe('enhanced-font')
      expect(result.canonicalName).toBe('Enhanced Font')
      expect(result.languages.scripts).toContain('Basic Latin')
      expect(result.languages.scripts).toContain('Cyrillic')
      expect(result.languages.supported).toContain('en')
      expect(result.languages.supported).toContain('ru')
    })

    test('should handle invalid scanned data', async () => {
      await expect(generateEnhancedFamilyMetadata({})).rejects.toThrow('Invalid scanned data')
      await expect(generateEnhancedFamilyMetadata(null)).rejects.toThrow('Invalid scanned data')
    })

    test('should handle missing font paths', async () => {
      const scannedData = {
        static: {
          regular: {} // No path
        }
      }

      await expect(generateEnhancedFamilyMetadata(scannedData)).rejects.toThrow('No font faces found')
    })
  })

  describe('generateKey', () => {
    test('should generate URL-safe keys', () => {
      expect(generateKey('Font Family')).toBe('font-family')
      expect(generateKey('Special!@#$%Characters')).toBe('special-characters')
      expect(generateKey('Multiple   Spaces')).toBe('multiple-spaces')
      expect(generateKey('CamelCase')).toBe('camelcase')
      expect(generateKey('123 Numbers')).toBe('123-numbers')
      expect(generateKey('-Leading-Trailing-')).toBe('leading-trailing')
    })

    test('should handle edge cases', () => {
      expect(generateKey('')).toBe('')
      expect(generateKey(null)).toBeNull()
      expect(generateKey(undefined)).toBeUndefined()
      expect(generateKey(123)).toBe(123)
      expect(generateKey('---')).toBe('')
    })
  })

  describe('formatFamilyName', () => {
    test('should format known font families', () => {
      expect(formatFamilyName('plex-sans')).toBe('IBM Plex Sans')
      expect(formatFamilyName('plex-serif')).toBe('IBM Plex Serif')
      expect(formatFamilyName('public-sans')).toBe('Public Sans')
      expect(formatFamilyName('aspekta')).toBe('Aspekta')
      expect(formatFamilyName('crimson-pro')).toBe('Crimson Pro')
    })

    test('should format unknown font families', () => {
      expect(formatFamilyName('my-custom-font')).toBe('My Custom Font')
      expect(formatFamilyName('font_with_underscores')).toBe('Font With Underscores')
      expect(formatFamilyName('font with spaces')).toBe('Font With Spaces')
      expect(formatFamilyName('UPPERCASE-FONT')).toBe('Uppercase Font')
    })

    test('should handle edge cases', () => {
      expect(formatFamilyName('')).toBe('')
      expect(formatFamilyName(null)).toBeNull()
      expect(formatFamilyName(undefined)).toBeUndefined()
      expect(formatFamilyName(123)).toBe(123)
    })
  })

  describe('Integration scenarios', () => {
    test('should handle complete font analysis workflow', async () => {
      const mockCompleteAnalysis = {
        basic: {
          familyName: 'Complete Font Family',
          style: 'normal',
          weight: 400,
          stretch: 'normal',
          subfamilyName: 'Regular',
          numGlyphs: 500
        },
        metrics: {
          unitsPerEm: 1000,
          ascent: 800,
          descent: -200,
          lineGap: 50,
          capHeight: 700,
          xHeight: 500,
          bbox: [0, -200, 1000, 800]
        },
        features: {
          openTypeFeatures: ['liga', 'kern', 'smcp'],
          stylisticSets: ['ss01', 'ss02', 'ss03'],
          unicodeRanges: [
            { name: 'Basic Latin', coverage: 100, start: 'U+0020', end: 'U+007F' },
            { name: 'Latin-1 Supplement', coverage: 90, start: 'U+00A0', end: 'U+00FF' },
            { name: 'Latin Extended-A', coverage: 75, start: 'U+0100', end: 'U+017F' }
          ]
        },
        file: {
          size: 45000,
          format: 'woff2'
        },
        variable: {
          axes: {
            wght: { min: 300, max: 800, default: 400 },
            ital: { min: 0, max: 1, default: 0 }
          },
          instances: [
            { name: 'Light', coordinates: { wght: 300, ital: 0 } },
            { name: 'Regular', coordinates: { wght: 400, ital: 0 } },
            { name: 'Bold', coordinates: { wght: 700, ital: 0 } },
            { name: 'Bold Italic', coordinates: { wght: 700, ital: 1 } }
          ]
        },
        languages: ['en', 'es', 'fr', 'de', 'it', 'pt', 'cs', 'pl']
      }

      const mockProcess = {
        stdout: { on: jest.fn() },
        stderr: { on: jest.fn() },
        on: jest.fn()
      }

      spawn.mockReturnValue(mockProcess)

      const analysisPromise = analyzeFontFile('/test/complete-font.woff2')

      // Simulate successful analysis
      const stdoutCallback = mockProcess.stdout.on.mock.calls.find(call => call[0] === 'data')[1]
      stdoutCallback(JSON.stringify(mockCompleteAnalysis))

      const closeCallback = mockProcess.on.mock.calls.find(call => call[0] === 'close')[1]
      closeCallback(0)

      const analysis = await analysisPromise
      const normalized = await normalizeFont(analysis, 'complete-font', '/test/complete-font.woff2')

      expect(normalized.family).toBe('Complete Font Family')
      expect(normalized.performance.isVariable).toBe(true)
      expect(normalized.performance.axisCount).toBe(2)
      expect(normalized.features.openTypeFeatures).toContain('liga')
      expect(normalized.features.openTypeFeatures).toContain('smcp')
      expect(normalized.namedInstances).toHaveLength(4)
      expect(normalized.axes.wght.min).toBe(300)
      expect(normalized.axes.wght.max).toBe(800)
    })

    test('should handle minimal font data', async () => {
      const mockMinimalAnalysis = {
        basic: {
          familyName: 'Minimal Font',
          numGlyphs: 150
        },
        metrics: {
          unitsPerEm: 1000
        },
        features: {},
        file: {
          size: 12000,
          format: 'ttf'
        }
      }

      const mockProcess = {
        stdout: { on: jest.fn() },
        stderr: { on: jest.fn() },
        on: jest.fn()
      }

      spawn.mockReturnValue(mockProcess)

      const analysisPromise = analyzeFontFile('/test/minimal-font.ttf')

      const stdoutCallback = mockProcess.stdout.on.mock.calls.find(call => call[0] === 'data')[1]
      stdoutCallback(JSON.stringify(mockMinimalAnalysis))

      const closeCallback = mockProcess.on.mock.calls.find(call => call[0] === 'close')[1]
      closeCallback(0)

      const analysis = await analysisPromise
      const normalized = await normalizeFont(analysis, 'minimal-font', '/test/minimal-font.ttf')

      expect(normalized.family).toBe('Minimal Font')
      expect(normalized.performance.isVariable).toBe(false)
      expect(normalized.performance.axisCount).toBe(0)
      expect(normalized.features.openTypeFeatures).toEqual([])
      expect(normalized.performance.glyphDensity).toBe(80) // 12000/150
    })
  })

  describe('Error handling', () => {
    test('should handle analysis errors gracefully', async () => {
      const mockProcess = {
        stdout: { on: jest.fn() },
        stderr: { on: jest.fn() },
        on: jest.fn()
      }

      spawn.mockReturnValue(mockProcess)

      const analysisPromise = analyzeFontFile('/nonexistent/font.woff2')

      // Simulate error
      const stderrCallback = mockProcess.stderr.on.mock.calls.find(call => call[0] === 'data')[1]
      stderrCallback('File not found error')

      const closeCallback = mockProcess.on.mock.calls.find(call => call[0] === 'close')[1]
      closeCallback(1)

      await expect(analysisPromise).rejects.toThrow('Font analysis failed')
      expect(consoleMock.logs.error).toContain('Failed to extract family name from /nonexistent/font.woff2:')
    })

    test('should handle malformed analysis data', async () => {
      const malformedData = {
        basic: {}, // Missing required fields
        metrics: {},
        features: {},
        file: {}
      }

      const normalized = await normalizeFont(malformedData, 'malformed-font', '/test/font.woff2')

      expect(normalized.family).toBe('malformed-font') // Falls back to provided name
      expect(normalized.metrics.unitsPerEm).toBeUndefined()
      expect(normalized.performance.fileSizeKB).toBe(0)
    })
  })
})