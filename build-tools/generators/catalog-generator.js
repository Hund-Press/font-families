/**
 * Catalog Generator for Font Families
 *
 * Generates JSON catalog files for consumption by various applications.
 * Supports both public catalogs (open fonts only) and complete catalogs (all fonts).
 */

import { promises as fs } from 'fs'
import path from 'path'
import { getCurrentVersion } from '../utils/version-manager.js'

/**
 * Generate families index and individual family files
 * @param {Object} fontFamilies - Font family data
 * @param {string} outputPath - Output directory path (not used, for compatibility)
 * @param {Object} options - Generation options
 */
export async function generateCatalog(fontFamilies, outputPath, options = {}) {
  let { includeRestrictedFonts = false, version = null } = options

  // Use robust version detection
  version = await getCurrentVersion(version, { includeVPrefix: false })

  console.log(`[families] Generating families index and individual files`)
  console.log(`[families] Font families: ${Object.keys(fontFamilies).length}`)
  console.log(`[families] Include restricted: ${includeRestrictedFonts}`)

  const familiesDir = path.dirname(outputPath)

  // Build families index
  const familiesIndex = {
    name: 'Font Families Index',
    description: 'Index of all available font families',
    links: {
      self: { href: '/api/families/' },
      root: { href: '/api/' },
    },
    families: {},
  }

  // Process each font family
  for (const [familyKey, familyData] of Object.entries(fontFamilies)) {
    // Filter restricted fonts for public catalogs
    if (!includeRestrictedFonts && isRestrictedFont(familyData)) {
      continue
    }

    // Add to families index (just name and link)
    familiesIndex.families[familyData.key] = {
      name: familyData.name,
      links: {
        self: { href: `/api/families/${familyData.key}.json` },
      },
    }

    // Generate individual family JSON file
    const catalogEntry = transformFamilyForCatalog(familyData, {
      includeFullMetadata: includeRestrictedFonts,
      includePerformanceData: true,
      includeTypographyFeatures: true,
      version: version,
    })

    await generateIndividualFamilyFile(
      familyData,
      catalogEntry,
      familiesDir,
      version
    )
  }

  // Ensure families directory exists
  await fs.mkdir(familiesDir, { recursive: true })

  // Write families index file
  const indexPath = path.join(familiesDir, 'index.json')
  await fs.writeFile(indexPath, JSON.stringify(familiesIndex, null, 2))

  console.log(
    `[families] Generated families index with ${Object.keys(familiesIndex.families).length} families`
  )
  console.log(`[families] Written to: ${indexPath}`)
}

/**
 * Check if a font is restricted (non-open license)
 * @param {Object} familyData - Font family data
 * @returns {boolean} True if font is restricted
 */
function isRestrictedFont(familyData) {
  const openLicenses = [
    'OFL-1.1',
    'Apache-2.0',
    'MIT',
    'SIL Open Font License',
    'Apache License',
  ]

  const license = familyData.license || familyData.licenseType
  if (!license) return true // No license info = assume restricted

  return !openLicenses.some((openLicense) =>
    license.toLowerCase().includes(openLicense.toLowerCase())
  )
}

/**
 * Transform font family data for catalog format
 * @param {Object} familyData - Raw font family data
 * @param {Object} options - Transform options
 * @returns {Object} Transformed catalog entry
 */
function transformFamilyForCatalog(familyData, options = {}) {
  const {
    includeFullMetadata = true,
    includePerformanceData = true,
    includeTypographyFeatures = true,
    version = '1.0.0',
  } = options

  const catalogEntry = {
    // Basic information
    name: familyData.name,
    key: familyData.key,
    description: familyData.description,

    // Licensing and attribution
    license: familyData.license || familyData.licenseType,
    author: familyData.author,
    version: familyData.version,
    copyrightYear: familyData.copyrightYear,

    // Font capabilities summary
    capabilities: extractCapabilities(familyData),

    // File organization with CDN links
    files: extractFileInformation(familyData, version),

    // Quick access metrics
    metrics: extractQuickMetrics(familyData),
  }

  // Add detailed metadata for complete catalogs
  if (includeFullMetadata) {
    catalogEntry.detailed = {
      // Language and script support
      languages: extractLanguageSupport(familyData),

      // Font variations and axes
      variations: extractVariationInfo(familyData),

      // Font specimens and character coverage
      specimens: generateSpecimenData(familyData),
    }
  }

  // Add performance data
  if (includePerformanceData) {
    catalogEntry.performance = extractPerformanceData(familyData)
  }

  // Add typography features
  if (includeTypographyFeatures) {
    catalogEntry.typography = extractTypographyData(familyData)
  }

  return catalogEntry
}

/**
 * Extract font capabilities summary
 * @param {Object} familyData - Font family data
 * @returns {Object} Capabilities summary
 */
function extractCapabilities(familyData) {
  const hasStatic =
    familyData.static && Object.keys(familyData.static).length > 0
  const hasVariable =
    familyData.variable && Object.keys(familyData.variable).length > 0

  // Weight range analysis
  let weightRange = null
  if (hasVariable) {
    const variableFonts = Object.values(familyData.variable)
    const firstVariable = variableFonts[0]
    if (firstVariable.axes?.wght) {
      weightRange = {
        min: firstVariable.axes.wght.min,
        max: firstVariable.axes.wght.max,
        type: 'variable',
      }
    }
  } else if (hasStatic) {
    const staticWeights = Object.values(familyData.static)
      .map((font) => font.weight)
      .filter((weight) => typeof weight === 'number')
      .sort((a, b) => a - b)

    if (staticWeights.length > 0) {
      weightRange = {
        min: staticWeights[0],
        max: staticWeights[staticWeights.length - 1],
        available: staticWeights,
        type: 'static',
      }
    }
  }

  return {
    hasStatic,
    hasVariable,
    weightRange,
    styleCount: countUniqueStyles(familyData),
    formats: extractAvailableFormats(familyData),
  }
}

/**
 * Extract file information
 * @param {Object} familyData - Font family data
 * @returns {Object} File information
 */
function extractFileInformation(familyData, version = '1.0.0') {
  const files = {
    static: [],
    variable: [],
  }

  // Static fonts with CDN links
  if (familyData.static) {
    for (const [fontKey, fontData] of Object.entries(familyData.static)) {
      const fileName = path.basename(fontData.path)
      files.static.push({
        key: fontKey,
        fileName: fileName,
        format: getFormatFromPath(fontData.path),
        weight: fontData.weight,
        style: fontData.style,
        stretch: fontData.stretch,
        fileSize: fontData.performance?.fileSize,
        fileSizeKB: fontData.performance?.fileSizeKB,
        links: {
          download: {
            href: `https://cdn.jsdelivr.net/gh/hund-press/font-families@v${version}/${familyData.key}/fonts/webfonts/${fileName}`,
          },
        },
      })
    }
  }

  // Variable fonts with CDN links
  if (familyData.variable) {
    for (const [fontKey, fontData] of Object.entries(familyData.variable)) {
      const fileName = path.basename(fontData.path)
      files.variable.push({
        key: fontKey,
        fileName: fileName,
        format: getFormatFromPath(fontData.path),
        axes: fontData.axes,
        style: fontData.style,
        fileSize: fontData.performance?.fileSize,
        fileSizeKB: fontData.performance?.fileSizeKB,
        links: {
          download: {
            href: `https://cdn.jsdelivr.net/gh/hund-press/font-families@v${version}/${familyData.key}/fonts/webfonts/${fileName}`,
          },
        },
      })
    }
  }

  return files
}

/**
 * Extract quick access metrics
 * @param {Object} familyData - Font family data
 * @returns {Object} Quick metrics
 */
function extractQuickMetrics(familyData) {
  const allFonts = [
    ...Object.values(familyData.static || {}),
    ...Object.values(familyData.variable || {}),
  ]

  if (allFonts.length === 0) return null

  const firstFont = allFonts[0]

  return {
    // Typography metrics from first font
    unitsPerEm: firstFont.metrics?.unitsPerEm,
    ascent: firstFont.metrics?.ascent,
    descent: firstFont.metrics?.descent,
    capHeight: firstFont.metrics?.capHeight,
    xHeight: firstFont.metrics?.xHeight,

    // Character and glyph counts
    glyphCount: firstFont.features?.glyphCount,

    // File size summary
    totalFiles: allFonts.length,
    totalSizeKB: allFonts.reduce(
      (sum, font) => sum + (font.performance?.fileSizeKB || 0),
      0
    ),
  }
}

/**
 * Extract language support information
 * @param {Object} familyData - Font family data
 * @returns {Object} Language support data
 */
function extractLanguageSupport(familyData) {
  const allFonts = [
    ...Object.values(familyData.static || {}),
    ...Object.values(familyData.variable || {}),
  ]

  // Combine Unicode ranges from all fonts
  const allUnicodeRanges = allFonts.flatMap(
    (font) => font.features?.unicodeRanges || []
  )

  // Extract unique ranges
  const uniqueRanges = {}
  for (const range of allUnicodeRanges) {
    if (range.name && !uniqueRanges[range.name]) {
      uniqueRanges[range.name] = {
        coverage: range.coverage,
        start: range.start,
        end: range.end,
      }
    }
  }

  return {
    unicodeRanges: uniqueRanges,
    scripts: Object.keys(uniqueRanges),
    primaryScript: determinePrimaryScript(uniqueRanges),
  }
}

/**
 * Extract variation information
 * @param {Object} familyData - Font family data
 * @returns {Object} Variation information
 */
function extractVariationInfo(familyData) {
  if (!familyData.variable) return null

  const variations = {}

  for (const [fontKey, fontData] of Object.entries(familyData.variable)) {
    if (fontData.axes) {
      for (const [axisTag, axisData] of Object.entries(fontData.axes)) {
        if (!variations[axisTag]) {
          variations[axisTag] = {
            min: axisData.min,
            max: axisData.max,
            default: axisData.default,
            description: getAxisDescription(axisTag),
          }
        }
      }
    }

    // Include named instances if available
    if (fontData.namedInstances) {
      variations.namedInstances = fontData.namedInstances
    }
  }

  return Object.keys(variations).length > 0 ? variations : null
}

/**
 * Generate specimen data for font preview
 * @param {Object} familyData - Font family data
 * @returns {Object} Specimen data
 */
function generateSpecimenData(familyData) {
  return {
    sampleText: {
      latin: 'The quick brown fox jumps over the lazy dog',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      punctuation: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    },
    // Font paths for specimen generation
    specimenFonts: extractSpecimenFontPaths(familyData),
  }
}

/**
 * Extract performance data
 * @param {Object} familyData - Font family data
 * @returns {Object} Performance data
 */
function extractPerformanceData(familyData) {
  const allFonts = [
    ...Object.values(familyData.static || {}),
    ...Object.values(familyData.variable || {}),
  ]

  const fileSizes = allFonts
    .map((font) => font.performance?.fileSizeKB || 0)
    .filter((size) => size > 0)
  const glyphCounts = allFonts
    .map((font) => font.features?.glyphCount || 0)
    .filter((count) => count > 0)

  return {
    fileCount: allFonts.length,
    totalSizeKB: fileSizes.reduce((sum, size) => sum + size, 0),
    averageSizeKB:
      fileSizes.length > 0
        ? Math.round(
            fileSizes.reduce((sum, size) => sum + size, 0) / fileSizes.length
          )
        : 0,
    smallestFileKB: fileSizes.length > 0 ? Math.min(...fileSizes) : 0,
    largestFileKB: fileSizes.length > 0 ? Math.max(...fileSizes) : 0,
    averageGlyphCount:
      glyphCounts.length > 0
        ? Math.round(
            glyphCounts.reduce((sum, count) => sum + count, 0) /
              glyphCounts.length
          )
        : 0,
  }
}

/**
 * Extract typography data
 * @param {Object} familyData - Font family data
 * @returns {Object} Typography data
 */
function extractTypographyData(familyData) {
  const allFonts = [
    ...Object.values(familyData.static || {}),
    ...Object.values(familyData.variable || {}),
  ]

  // Combine OpenType features from all fonts
  const allFeatures = new Set()
  allFonts.forEach((font) => {
    if (font.features?.openTypeFeatures) {
      font.features.openTypeFeatures.forEach((feature) =>
        allFeatures.add(feature)
      )
    }
  })

  return {
    openTypeFeatures: Array.from(allFeatures),
    hasLigatures: allFeatures.has('liga') || allFeatures.has('dlig'),
    hasSmallCaps: allFeatures.has('smcp'),
    hasOldStyleFigures: allFeatures.has('onum'),
    hasTabularFigures: allFeatures.has('tnum'),
  }
}

// Utility functions

function countUniqueStyles(familyData) {
  const styles = new Set()
  Object.values(familyData.static || {}).forEach((font) =>
    styles.add(font.style)
  )
  Object.values(familyData.variable || {}).forEach((font) =>
    styles.add(font.style)
  )
  return styles.size
}

function extractAvailableFormats(familyData) {
  const formats = new Set()
  Object.values(familyData.static || {}).forEach((font) => {
    if (font.path) formats.add(getFormatFromPath(font.path))
  })
  Object.values(familyData.variable || {}).forEach((font) => {
    if (font.path) formats.add(getFormatFromPath(font.path))
  })
  return Array.from(formats)
}

function getFormatFromPath(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const formatMap = {
    '.ttf': 'truetype',
    '.otf': 'opentype',
    '.woff': 'woff',
    '.woff2': 'woff2',
  }
  return formatMap[ext] || ext.substring(1)
}

function determinePrimaryScript(unicodeRanges) {
  // Simple heuristic: the script with the highest coverage
  let primaryScript = 'Latin' // Default
  let maxCoverage = 0

  for (const [scriptName, range] of Object.entries(unicodeRanges)) {
    if (range.coverage > maxCoverage) {
      maxCoverage = range.coverage
      primaryScript = scriptName
    }
  }

  return primaryScript
}

function getAxisDescription(axisTag) {
  const descriptions = {
    wght: 'Weight',
    wdth: 'Width',
    slnt: 'Slant',
    ital: 'Italic',
    opsz: 'Optical Size',
  }
  return descriptions[axisTag] || axisTag
}

function extractSpecimenFontPaths(familyData) {
  const specimens = {}

  // Get one representative font for each style
  if (familyData.variable && Object.keys(familyData.variable).length > 0) {
    const firstVariable = Object.values(familyData.variable)[0]
    specimens.variable = firstVariable.path
  }

  if (familyData.static && Object.keys(familyData.static).length > 0) {
    // Try to find regular weight
    const regularFont =
      Object.values(familyData.static).find((font) => font.weight === 400) ||
      Object.values(familyData.static)[0]
    specimens.regular = regularFont.path

    // Try to find bold
    const boldFont = Object.values(familyData.static).find(
      (font) => font.weight >= 700
    )
    if (boldFont) specimens.bold = boldFont.path
  }

  return specimens
}

/**
 * Generate individual family JSON file
 * @param {Object} familyData - Font family data
 * @param {Object} catalogEntry - Processed catalog entry
 * @param {string} familiesDir - Families directory path
 * @param {string} version - API version
 */
async function generateIndividualFamilyFile(
  familyData,
  catalogEntry,
  familiesDir,
  version
) {
  const familyPath = path.join(familiesDir, `${familyData.key}.json`)

  // Create enhanced family object with full HATEOAS structure
  const familyFile = {
    ...catalogEntry,
    links: {
      self: { href: `/api/families/${familyData.key}.json` },
      index: { href: '/api/families/' },
      root: { href: '/api/' },
      module: { href: `/modules/${familyData.key}.js` },
      preview: { href: `/fonts/${familyData.key}/` },
      subsets: {
        href: `/api/subsets/${familyData.key}.json`,
        title: 'Performance subsets for this family',
      },
      cdn: {
        href: `https://cdn.jsdelivr.net/gh/hund-press/font-families@v${version}/${familyData.key}/`,
        templated: false,
      },
    },
    subset_capabilities: await getSubsetCapabilities(familyData.key),
  }

  // Ensure family directory exists
  await fs.mkdir(familiesDir, { recursive: true })

  // Write individual family file
  await fs.writeFile(familyPath, JSON.stringify(familyFile, null, 2))

  console.log(`[families] Generated individual family file: ${familyPath}`)
}

/**
 * Generate subset API endpoints
 * @param {string} catalogOutputPath - Base output path for API files
 * @param {string} version - API version
 */
export async function generateSubsetAPIs(catalogOutputPath, version = null) {
  // Use robust version detection with v prefix for CDN URLs
  version = await getCurrentVersion(version, { includeVPrefix: true })
  console.log('[subsets] Generating subset API endpoints')

  const subsetsDir = path.join(process.cwd(), 'subsets')
  const apiSubsetsDir = path.join(catalogOutputPath, 'subsets')

  try {
    await fs.access(subsetsDir)
  } catch (error) {
    console.log(
      '[subsets] No subsets directory found, skipping subset API generation'
    )
    return
  }

  // Create API subsets directory
  await fs.mkdir(apiSubsetsDir, { recursive: true })

  // Generate subset root endpoint
  await generateSubsetRoot(apiSubsetsDir, subsetsDir)

  // Generate family subset catalogs
  const familyDirs = await fs.readdir(subsetsDir)

  for (const familyDir of familyDirs) {
    if (familyDir === 'README.md') continue

    try {
      await generateFamilySubsetCatalog(
        familyDir,
        apiSubsetsDir,
        subsetsDir,
        version
      )
      await generateIndividualSubsetEndpoints(
        familyDir,
        apiSubsetsDir,
        subsetsDir,
        version
      )
    } catch (error) {
      console.warn(
        `[subsets] Failed to generate APIs for ${familyDir}: ${error.message}`
      )
    }
  }

  console.log('[subsets] Subset API generation complete')
}

/**
 * Generate subset root discovery endpoint
 */
async function generateSubsetRoot(apiSubsetsDir, subsetsDir) {
  const families = (await fs.readdir(subsetsDir))
    .filter((item) => item !== 'README.md')
    .reduce((acc, familyDir) => {
      acc[familyDir] = { href: `/api/subsets/${familyDir}.json` }
      return acc
    }, {})

  const rootEndpoint = {
    name: 'Font Subsets API',
    description:
      'Performance-optimized derivative works from original font families',
    links: {
      self: { href: '/api/subsets/' },
      root: { href: '/api/' },
    },
    derivativeWorkNotice: {
      status:
        'These are derivative works generated for web performance optimization',
      originalSources: 'All original fonts remain in font family directories',
      legalCompliance:
        'Full attribution and licensing preserved in subset metadata',
    },
    availableSubsets: {
      'min-chars': {
        description: '100-character minimal set for critical performance',
        characterCount: 100,
        useCase: 'First paint optimization, font picker previews',
      },
      'latin-basic': {
        description: 'Basic Latin + Latin-1 Supplement',
        characterCount: 500,
        useCase: 'Western European languages',
      },
      cyrillic: {
        description: 'Cyrillic script support',
        characterCount: 200,
        useCase: 'Russian, Bulgarian, Serbian languages',
      },
    },
    families,
  }

  const rootPath = path.join(apiSubsetsDir, 'index.json')
  await fs.writeFile(rootPath, JSON.stringify(rootEndpoint, null, 2))
  console.log('[subsets] Generated subset root endpoint')
}

/**
 * Generate family subset catalog according to Phase 2.1 specifications
 */
async function generateFamilySubsetCatalog(
  familyName,
  apiSubsetsDir,
  subsetsDir,
  version
) {
  const familyMetadataPath = path.join(subsetsDir, familyName, 'metadata.json')

  try {
    const familyMetadata = JSON.parse(
      await fs.readFile(familyMetadataPath, 'utf8')
    )

    const subsetsCatalog = {
      family: familyName,
      name: `${familyMetadata.originalFont.name} Subsets`,
      derivativeWorkNotice: {
        status: 'Performance-optimized derivative works',
        originalSource: `/api/families/${familyName}.json`,
        legalCompliance: `${familyMetadata.legalCompliance.originalLicense} compliant derivatives with full attribution`,
      },
      links: {
        self: { href: `/api/subsets/${familyName}.json` },
        'original-family': { href: `/api/families/${familyName}.json` },
        subsets: { href: `/api/subsets/${familyName}/` },
      },
      subsets: {},
      sourceFont: {
        name: familyMetadata.originalFont.name,
        version: familyMetadata.originalFont.version,
        author: familyMetadata.originalFont.author,
        license: familyMetadata.originalFont.license,
        originalLocation: `/${familyName}/`,
      },
    }

    // Process each subset with enhanced Phase 2.1 structure
    for (const [subsetName, subsetData] of Object.entries(
      familyMetadata.subsets
    )) {
      subsetsCatalog.subsets[subsetName] = {
        description: subsetData.description,
        status: subsetData.status,
        characterCount: subsetData.characterCount,
        unicodeRanges: subsetData.unicodeRanges,
        generatedAt: subsetData.generatedAt,
        links: {
          self: { href: `/api/subsets/${familyName}/${subsetName}.json` },
        },
      }

      // Add file size information for generated subsets
      if (subsetData.status === 'generated') {
        try {
          // Try to get actual file sizes from subset metadata
          const subsetMetadataPath = path.join(
            subsetsDir,
            familyName,
            subsetName,
            'metadata.json'
          )
          const subsetMetadata = JSON.parse(
            await fs.readFile(subsetMetadataPath, 'utf8')
          )

          let staticSize = 0
          let variableSize = 0

          for (const file of subsetMetadata.files || []) {
            const sizeKB = Math.round((file.size / 1024) * 10) / 10
            if (file.isVariable) {
              variableSize = Math.max(variableSize, sizeKB)
            } else {
              staticSize = Math.max(staticSize, sizeKB)
            }
          }

          subsetsCatalog.subsets[subsetName].fileSizes = {
            static: staticSize,
            variable: variableSize,
          }
        } catch (subsetError) {
          // Fallback to default values if subset metadata is unavailable
          subsetsCatalog.subsets[subsetName].fileSizes = {
            static: 4.2,
            variable: 9.6,
          }
        }
      }
    }

    const catalogPath = path.join(apiSubsetsDir, `${familyName}.json`)
    await fs.writeFile(catalogPath, JSON.stringify(subsetsCatalog, null, 2))
    console.log(`[subsets] Generated family subset catalog: ${familyName}`)
  } catch (error) {
    console.warn(
      `[subsets] Could not generate catalog for ${familyName}: ${error.message}`
    )
  }
}

/**
 * Generate individual subset endpoints
 */
async function generateIndividualSubsetEndpoints(
  familyName,
  apiSubsetsDir,
  subsetsDir,
  version
) {
  const familySubsetDir = path.join(subsetsDir, familyName)
  const apiSubsetDir = path.join(apiSubsetsDir, familyName)

  await fs.mkdir(apiSubsetDir, { recursive: true })

  try {
    const items = await fs.readdir(familySubsetDir)

    for (const item of items) {
      if (item === 'metadata.json') continue

      const subsetPath = path.join(familySubsetDir, item)
      const stat = await fs.stat(subsetPath)

      if (stat.isDirectory()) {
        await generateIndividualSubsetEndpoint(
          familyName,
          item,
          apiSubsetDir,
          subsetPath,
          version
        )
      }
    }
  } catch (error) {
    console.warn(
      `[subsets] Could not process subsets for ${familyName}: ${error.message}`
    )
  }
}

/**
 * Generate individual subset endpoint according to Phase 2.1 specifications
 */
async function generateIndividualSubsetEndpoint(
  familyName,
  subsetName,
  apiSubsetDir,
  subsetPath,
  version
) {
  try {
    const metadataPath = path.join(subsetPath, 'metadata.json')
    const metadata = JSON.parse(await fs.readFile(metadataPath, 'utf8'))

    const subsetEndpoint = {
      family: familyName,
      subset: subsetName,
      description: metadata.description,
      derivativeWorkNotice: {
        status: 'This is a derivative work optimized for web performance',
        originalAuthor: metadata.sourceFont.author,
        originalLicense: metadata.sourceFont.license,
        derivativeCompliance: `Subset generation complies with ${metadata.sourceFont.license} requirements`,
      },
      characters: metadata.characters,
      unicodeRanges: metadata.unicodeRanges,
      characterCount: metadata.characterCount,
      generatedAt: metadata.generatedAt,
      generationMethod: metadata.method,
      links: {
        self: { href: `/api/subsets/${familyName}/${subsetName}.json` },
        parent: { href: `/api/subsets/${familyName}.json` },
        'original-family': { href: `/api/families/${familyName}.json` },
      },
      files: metadata.files.map((file) => {
        const fileSizeKB = Math.round((file.size / 1024) * 10) / 10

        // Calculate compression ratio based on original file sizes
        // Estimate original sizes: static ~22KB, variable ~68KB
        const estimatedOriginalSize = file.isVariable ? 68000 : 22000
        const compressionRatio = file.size / estimatedOriginalSize

        return {
          filename: file.filename,
          format: file.format,
          weight: file.weight,
          style: file.style,
          isVariable: file.isVariable,
          fileSize: file.size,
          fileSizeKB: fileSizeKB,
          compressionRatio: Math.round(compressionRatio * 1000) / 1000, // Round to 3 decimal places
          axes: file.axes,
          links: {
            download: {
              href: `https://cdn.jsdelivr.net/gh/hund-press/font-families@${version}/subsets/${familyName}/${subsetName}/${file.filename}`,
            },
          },
        }
      }),
      performanceMetrics: calculatePerformanceMetrics(metadata),
    }

    const endpointPath = path.join(apiSubsetDir, `${subsetName}.json`)
    await fs.writeFile(endpointPath, JSON.stringify(subsetEndpoint, null, 2))
    console.log(
      `[subsets] Generated individual subset endpoint: ${familyName}/${subsetName}`
    )
  } catch (error) {
    console.warn(
      `[subsets] Could not generate endpoint for ${familyName}/${subsetName}: ${error.message}`
    )
  }
}

/**
 * Calculate performance metrics for a subset based on its files
 */
function calculatePerformanceMetrics(metadata) {
  if (!metadata.files || metadata.files.length === 0) {
    return {
      originalSizeKB: 22.0,
      subsetSizeKB: 4.2,
      sizeReduction: '81%',
      estimatedLoadTime3G: '0.3s',
      recommendedUseCase: 'Critical path font loading, font picker previews',
    }
  }

  // Find the smallest non-variable file for performance comparison
  const staticFiles = metadata.files.filter((f) => !f.isVariable)
  const variableFiles = metadata.files.filter((f) => f.isVariable)

  const smallestStatic =
    staticFiles.length > 0 ? Math.min(...staticFiles.map((f) => f.size)) : null
  const smallestVariable =
    variableFiles.length > 0
      ? Math.min(...variableFiles.map((f) => f.size))
      : null

  // Use the smallest file for metrics calculation
  const smallestFileSize =
    smallestStatic !== null ? smallestStatic : smallestVariable
  const subsetSizeKB = Math.round((smallestFileSize / 1024) * 10) / 10

  // Estimate original size based on file type
  const originalSizeKB = staticFiles.length > 0 ? 22.0 : 68.0
  const sizeReduction = Math.round((1 - subsetSizeKB / originalSizeKB) * 100)

  // Estimate load time on 3G (assuming ~400kbps effective speed)
  const loadTimeSeconds = Math.round(((subsetSizeKB * 8) / 400) * 10) / 10

  return {
    originalSizeKB: originalSizeKB,
    subsetSizeKB: subsetSizeKB,
    sizeReduction: `${sizeReduction}%`,
    estimatedLoadTime3G: `${loadTimeSeconds}s`,
    recommendedUseCase:
      subsetSizeKB < 5
        ? 'Critical path font loading, font picker previews'
        : 'Enhanced typography, extended character support',
  }
}

/**
 * Get subset capabilities for a family according to Phase 2.1 specifications
 */
async function getSubsetCapabilities(familyKey) {
  try {
    const subsetsDir = path.join(process.cwd(), 'subsets')
    const familyMetadataPath = path.join(subsetsDir, familyKey, 'metadata.json')

    const familyMetadata = JSON.parse(
      await fs.readFile(familyMetadataPath, 'utf8')
    )

    const available = []
    const planned = []

    for (const [subsetName, subsetData] of Object.entries(
      familyMetadata.subsets
    )) {
      if (subsetData.status === 'generated') {
        available.push(subsetName)
      } else if (subsetData.status === 'planned') {
        planned.push(subsetName)
      }
    }

    return {
      available: available,
      planned: planned,
      derivativeStatus:
        available.length > 0
          ? 'Optimized derivatives available'
          : 'Derivatives planned',
    }
  } catch (error) {
    // Return default capabilities if subset metadata is not available
    return {
      available: [],
      planned: ['min-chars', 'latin-basic', 'cyrillic'],
      derivativeStatus: 'Derivatives planned',
    }
  }
}
