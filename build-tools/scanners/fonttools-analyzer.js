/**
 * FontTools-based Font Analysis Utilities
 *
 * Node.js wrapper around Python fontTools for comprehensive font analysis
 * with support for all major written languages and complex scripts.
 */

import { promises as fs } from 'fs'
import path from 'path'
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Python font inspector script path
 */
const FONT_INSPECTOR_PATH = path.join(__dirname, '..', 'font-inspector.py')
const PYTHON_ENV_PATH = path.join(
  process.cwd(),
  'font-tools-env',
  'bin',
  'python'
)

/**
 * Analyze a font file using fontTools
 * @param {string} fontPath - Path to font file
 * @returns {Promise<Object>} Font analysis results
 */
export async function analyzeFontFile(fontPath) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn(
      PYTHON_ENV_PATH,
      [FONT_INSPECTOR_PATH, fontPath],
      {
        stdio: ['pipe', 'pipe', 'pipe'],
      }
    )

    let stdout = ''
    let stderr = ''

    pythonProcess.stdout.on('data', (data) => {
      stdout += data.toString()
    })

    pythonProcess.stderr.on('data', (data) => {
      stderr += data.toString()
    })

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Font analysis failed: ${stderr}`))
        return
      }

      try {
        const analysis = JSON.parse(stdout)
        resolve(analysis)
      } catch (error) {
        reject(new Error(`Failed to parse font analysis: ${error.message}`))
      }
    })

    pythonProcess.on('error', (error) => {
      reject(new Error(`Failed to spawn Python process: ${error.message}`))
    })
  })
}

/**
 * Normalize font data to match existing FontKit structure
 * @param {Object} fontToolsData - Raw fontTools analysis
 * @param {string} fontName - Font family name from folder
 * @param {string} fontFile - Font file path
 * @returns {Object} Normalized font data compatible with existing system
 */
export async function normalizeFont(fontToolsData, fontName, fontFile) {
  const basic = fontToolsData.basic
  const metrics = fontToolsData.metrics
  const features = fontToolsData.features
  const variable = fontToolsData.variable

  const result = {
    family: basic.familyName || fontName, // Use actual font family name
    style: basic.style,
    weight: basic.weight,
    stretch: basic.stretch,
    path: fontFile.replace(process.cwd(), '').replace(/^\//, ''),
    subfamilyName: basic.subfamilyName,
  }

  // Add metrics
  result.metrics = {
    unitsPerEm: metrics.unitsPerEm,
    ascent: metrics.ascent,
    descent: metrics.descent,
    lineGap: metrics.lineGap,
    capHeight: metrics.capHeight,
    xHeight: metrics.xHeight,
    bbox: metrics.bbox,
  }

  // Add features with enhanced Unicode coverage
  result.features = {
    openTypeFeatures: features.openTypeFeatures || [],
    stylisticSets: features.stylisticSets || [],
    unicodeRanges: features.unicodeRanges || [],
    glyphCount: basic.numGlyphs,
  }

  // Add language support from fontTools analysis
  if (fontToolsData.languages) {
    result.languages = fontToolsData.languages
  }

  // Add performance metrics
  result.performance = {
    fileSize: fontToolsData.file.size,
    fileSizeKB: Math.round(fontToolsData.file.size / 1024),
    glyphDensity: basic.numGlyphs
      ? Math.round(fontToolsData.file.size / basic.numGlyphs)
      : null,
    format: fontToolsData.file.format,
    isVariable: !!variable,
    axisCount: variable ? Object.keys(variable.axes || {}).length : 0,
  }

  // Handle variable fonts
  if (variable && variable.axes) {
    result.axes = {}

    for (const [axisTag, axis] of Object.entries(variable.axes)) {
      result.axes[axisTag] = {
        min: axis.min,
        max: axis.max,
        default: axis.default,
      }
    }

    // Convert weight to range for variable fonts
    if (result.axes.wght) {
      result.weight = {
        min: result.axes.wght.min,
        max: result.axes.wght.max,
      }
    }

    // Handle width axis
    if (result.axes.wdth) {
      result.stretch = {
        min: mapWidthToStretch(result.axes.wdth.min),
        max: mapWidthToStretch(result.axes.wdth.max),
        default: mapWidthToStretch(result.axes.wdth.default),
      }
    }

    // Add named instances
    if (variable.instances) {
      result.namedInstances = variable.instances.map((instance) => ({
        name: instance.name || 'Unnamed Instance',
        coordinates: instance.coordinates,
      }))
    }
  }

  return result
}

/**
 * Extract canonical font family name using fontTools analysis
 * @param {string} fontPath - Path to font file
 * @returns {Promise<string|null>} Canonical family name
 */
export async function extractCanonicalFamilyName(fontPath) {
  try {
    const analysis = await analyzeFontFile(fontPath)
    return analysis.basic.familyName
  } catch (error) {
    console.error(
      `Failed to extract family name from ${fontPath}:`,
      error.message
    )
    return null
  }
}

/**
 * Map width axis value to CSS font-stretch
 * @param {number} widthValue - Width axis value (typically 50-200)
 * @returns {string} CSS font-stretch value
 */
function mapWidthToStretch(widthValue) {
  if (widthValue <= 50) return 'ultra-condensed'
  if (widthValue <= 62.5) return 'extra-condensed'
  if (widthValue <= 75) return 'condensed'
  if (widthValue <= 87.5) return 'semi-condensed'
  if (widthValue <= 112.5) return 'normal'
  if (widthValue <= 125) return 'semi-expanded'
  if (widthValue <= 150) return 'expanded'
  if (widthValue <= 175) return 'extra-expanded'
  return 'ultra-expanded'
}

/**
 * Generate enhanced font family metadata using fontTools
 * @param {Object} scannedData - Raw scanned font data
 * @returns {Promise<Object>} Enhanced family metadata
 */
export async function generateEnhancedFamilyMetadata(scannedData) {
  if (!scannedData || (!scannedData.static && !scannedData.variable)) {
    throw new Error('Invalid scanned data: must have static or variable fonts')
  }

  // Get first available font face for family name extraction
  const firstFontPath =
    Object.values(scannedData.static)[0]?.path ||
    Object.values(scannedData.variable)[0]?.path

  if (!firstFontPath) {
    throw new Error('No font faces found in scanned data')
  }

  // Extract canonical family name using fontTools
  const canonicalName = await extractCanonicalFamilyName(
    path.resolve(firstFontPath)
  )
  if (!canonicalName) {
    throw new Error('Could not extract canonical family name')
  }

  // Extract enhanced language support from all fonts
  const allFonts = [
    ...Object.values(scannedData.static || {}),
    ...Object.values(scannedData.variable || {}),
  ]
  const languageSupport = await extractEnhancedLanguageSupport(allFonts)

  // Generate names and key
  const displayName = canonicalName
  const key = generateKey(displayName)

  return {
    name: displayName,
    key: key,
    canonicalName: canonicalName,

    // Enhanced language support with better Unicode coverage
    languages: {
      supported: languageSupport.languages,
      scripts: languageSupport.scripts,
      count: {
        scripts: languageSupport.scriptCount,
        languages: languageSupport.languageCount,
      },
      detailed: languageSupport.detailed,
    },

    enhanced: {
      languageSupport: languageSupport.languages,
      scriptSupport: languageSupport.scripts,
      unicodeCoverage: languageSupport.coverage,
      scriptToLanguages: languageSupport.detailed.scriptToLanguages,
    },
  }
}

/**
 * Extract enhanced language support using fontTools Unicode analysis
 * @param {Array} fontPaths - Array of font paths to analyze
 * @returns {Promise<Object>} Enhanced language support information
 */
async function extractEnhancedLanguageSupport(fontPaths) {
  const scriptLanguageMap = {
    'Basic Latin': [
      'en',
      'es',
      'fr',
      'de',
      'it',
      'pt',
      'nl',
      'da',
      'sv',
      'no',
      'fi',
    ],
    'Latin-1 Supplement': [
      'en',
      'es',
      'fr',
      'de',
      'it',
      'pt',
      'da',
      'sv',
      'no',
      'is',
    ],
    'Latin Extended-A': [
      'cs',
      'pl',
      'hu',
      'ro',
      'hr',
      'sl',
      'sk',
      'et',
      'lv',
      'lt',
    ],
    'Latin Extended-B': ['hr', 'sl', 'sk', 'ro', 'af', 'sq', 'eu'],
    'Latin Extended Additional': ['vi', 'ga', 'cy', 'mt'],
    Cyrillic: ['ru', 'uk', 'bg', 'sr', 'mk', 'be', 'kk', 'ky', 'mn', 'uz'],
    'Cyrillic Supplement': ['cu', 'ch'],
    'Greek and Coptic': ['el'],
    Arabic: ['ar', 'fa', 'ur', 'ps', 'sd'],
    'Arabic Supplement': ['ar', 'fa'],
    Hebrew: ['he', 'yi'],
    Devanagari: ['hi', 'mr', 'ne', 'sa'],
    Bengali: ['bn', 'as'],
    Thai: ['th'],
    Hiragana: ['ja'],
    Katakana: ['ja'],
    'CJK Unified Ideographs': ['zh', 'ja', 'ko'],
    'Hangul Syllables': ['ko'],
    Armenian: ['hy'],
    Georgian: ['ka'],
    Ethiopic: ['am', 'ti'],
    Cherokee: ['chr'],
    'Canadian Aboriginal': ['iu', 'cr'],
  }

  const supportedScripts = new Set()
  const supportedLanguages = new Set()
  const scriptCoverage = {}

  // Analyze first font for basic coverage (others should be similar for family)
  if (fontPaths.length > 0) {
    try {
      const fontPath = path.resolve(fontPaths[0].path || fontPaths[0])
      const analysis = await analyzeFontFile(fontPath)

      for (const range of analysis.features.unicodeRanges) {
        if (range.coverage > 0.3) {
          // 30% coverage threshold
          supportedScripts.add(range.name)
          scriptCoverage[range.name] = range.coverage

          if (scriptLanguageMap[range.name]) {
            scriptLanguageMap[range.name].forEach((lang) =>
              supportedLanguages.add(lang)
            )
          }
        }
      }
    } catch (error) {
      console.error('Error analyzing language support:', error.message)
    }
  }

  return {
    scripts: Array.from(supportedScripts),
    languages: Array.from(supportedLanguages),
    scriptCount: supportedScripts.size,
    languageCount: supportedLanguages.size,
    coverage: scriptCoverage,
    detailed: {
      scriptToLanguages: Object.fromEntries(
        Array.from(supportedScripts)
          .filter((script) => scriptLanguageMap[script])
          .map((script) => [script, scriptLanguageMap[script]])
      ),
    },
  }
}

/**
 * Generate a URL-safe slug from a family name
 * @param {string} familyName - Family name to slugify
 * @returns {string} URL-safe slug
 */
export function generateKey(familyName) {
  if (!familyName || typeof familyName !== 'string') {
    return familyName
  }

  return familyName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Format a family name from various formats to proper display format
 * @param {string} rawName - Raw family name from font metadata
 * @returns {string} Formatted family name
 */
export function formatFamilyName(rawName) {
  if (!rawName || typeof rawName !== 'string') {
    return rawName
  }

  // Handle known font families with special formatting
  const specialCases = {
    'plex-sans': 'IBM Plex Sans',
    'plex-serif': 'IBM Plex Serif',
    'plex-mono': 'IBM Plex Mono',
    'public-sans': 'Public Sans',
    clearsans: 'Clear Sans',
    aspekta: 'Aspekta',
    'crimson-pro': 'Crimson Pro',
  }

  if (specialCases[rawName.toLowerCase()]) {
    return specialCases[rawName.toLowerCase()]
  }

  // General formatting for unknown fonts
  return rawName
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
