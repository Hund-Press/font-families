/**
 * Contributor Experience Validation
 *
 * Shows font quality and compliance through working examples rather than abstract rules.
 * Demonstrates what good font contributions look like via comparative analysis.
 */

import { promises as fs } from 'fs'
import path from 'path'
import { validateFontFamily } from '../scanners/validation.js'
import {
  normalizeFont,
  generateEnhancedFamilyMetadata,
  analyzeFontFile,
} from '../scanners/fonttools-analyzer.js'

/**
 * Generate contributor report with working examples
 * @param {string} contributorPath - Path to proposed font contribution
 * @param {string} referencePath - Path to reference font (aspekta) for comparison
 * @returns {Promise<Object>} Report showing contribution quality vs reference
 */
export async function generateContributorReport(
  contributorPath,
  referencePath = null
) {
  const reportStartTime = Date.now()
  console.log(`[contributor] Generating report for: ${contributorPath}`)

  // If no reference provided, use aspekta as baseline
  if (!referencePath) {
    referencePath = path.resolve(process.cwd(), 'fonts/open-fonts/aspekta')
  }

  const report = {
    contributorAnalysis: null,
    referenceAnalysis: null,
    comparative: null,
    recommendations: [],
    workingExamples: [],
    timestamp: new Date().toISOString(),
  }

  try {
    // Analyze contributor font
    console.log(`[contributor] Analyzing contribution...`)
    report.contributorAnalysis = await analyzeContributorFont(contributorPath)

    // Analyze reference font for comparison
    console.log(`[contributor] Analyzing reference font...`)
    report.referenceAnalysis = await analyzeContributorFont(referencePath)

    // Generate comparative analysis
    report.comparative = generateComparativeAnalysis(
      report.contributorAnalysis,
      report.referenceAnalysis
    )

    // Generate working examples
    report.workingExamples = await generateWorkingExamples(
      report.contributorAnalysis,
      report.referenceAnalysis
    )

    // Generate actionable recommendations
    report.recommendations = generateActionableRecommendations(report)

    const reportTime = Date.now() - reportStartTime
    console.log(`[contributor] Report generated in ${reportTime}ms`)

    return report
  } catch (error) {
    console.error(`[contributor] Error generating report: ${error.message}`)
    report.error = error.message
    return report
  }
}

/**
 * Analyze a single font contribution
 */
async function analyzeContributorFont(fontPath) {
  const analysis = {
    path: fontPath,
    exists: false,
    structure: {},
    fontData: null,
    validation: null,
    technicalMetrics: {},
    userExperience: {},
  }

  try {
    // Check if path exists
    await fs.access(fontPath)
    analysis.exists = true

    // Analyze directory structure
    analysis.structure = await analyzeFontStructure(fontPath)

    // Scan fonts with fonttools
    if (analysis.structure.hasFonts) {
      analysis.fontData = await analyzeFontsInPath(fontPath)

      // Run comprehensive validation
      analysis.validation = await validateFontFamily(
        fontPath,
        analysis.fontData
      )

      // Extract technical metrics for comparison
      analysis.technicalMetrics = extractTechnicalMetrics(analysis.fontData)

      // Evaluate user experience factors
      analysis.userExperience = evaluateUserExperience(
        analysis.fontData,
        analysis.structure
      )
    }
  } catch (error) {
    analysis.error = error.message
  }

  return analysis
}

/**
 * Analyze fonts in a directory path - simplified version for contributor validation
 */
async function analyzeFontsInPath(fontPath) {
  const fontData = {
    static: {},
    variable: {},
    name: path.basename(fontPath),
    slug: path.basename(fontPath).toLowerCase(),
  }

  try {
    // Look for fonts in organized structure
    const fontsDir = path.join(fontPath, 'fonts')
    const webfontsDir = path.join(fontsDir, 'webfonts')
    const ttfDir = path.join(fontsDir, 'ttf')
    const variableDir = path.join(fontsDir, 'variable')

    // Scan webfonts directory
    try {
      const webfontFiles = await fs.readdir(webfontsDir)
      for (const file of webfontFiles) {
        if (file.endsWith('.woff2') || file.endsWith('.woff')) {
          const filePath = path.join(webfontsDir, file)
          try {
            const analysis = await analyzeFontFile(filePath)
            const normalized = await normalizeFont(analysis, file, filePath)
            if (
              file.toLowerCase().includes('vf') ||
              file.toLowerCase().includes('variable')
            ) {
              fontData.variable[file] = normalized
            } else {
              fontData.static[file] = normalized
            }
          } catch (error) {
            console.warn(`Failed to analyze ${file}: ${error.message}`)
          }
        }
      }
    } catch (error) {
      // Webfonts directory doesn't exist or can't be read
    }

    // Scan ttf directory for additional fonts
    try {
      const ttfFiles = await fs.readdir(ttfDir)
      for (const file of ttfFiles) {
        if (file.endsWith('.ttf')) {
          const filePath = path.join(ttfDir, file)
          try {
            const analysis = await analyzeFontFile(filePath)
            const normalized = await normalizeFont(analysis, file, filePath)
            fontData.static[file] = normalized
          } catch (error) {
            console.warn(`Failed to analyze ${file}: ${error.message}`)
          }
        }
      }
    } catch (error) {
      // TTF directory doesn't exist
    }

    // Scan variable fonts directory
    try {
      const variableFiles = await fs.readdir(variableDir)
      for (const file of variableFiles) {
        if (file.endsWith('.ttf') || file.endsWith('.woff2')) {
          const filePath = path.join(variableDir, file)
          try {
            const analysis = await analyzeFontFile(filePath)
            const normalized = await normalizeFont(analysis, file, filePath)
            fontData.variable[file] = normalized
          } catch (error) {
            console.warn(`Failed to analyze ${file}: ${error.message}`)
          }
        }
      }
    } catch (error) {
      // Variable directory doesn't exist
    }
  } catch (error) {
    console.warn(`Error analyzing fonts in ${fontPath}: ${error.message}`)
  }

  return fontData
}

/**
 * Analyze font directory structure
 */
async function analyzeFontStructure(fontPath) {
  const structure = {
    hasFonts: false,
    hasLicense: false,
    hasReadme: false,
    hasPackageJson: false,
    formatCoverage: {},
    organization: 'unknown',
  }

  try {
    const items = await fs.readdir(fontPath, { withFileTypes: true })

    // Check for key files
    const fileNames = items.map((item) => item.name.toLowerCase())
    structure.hasLicense = fileNames.some(
      (name) => name.includes('license') || name.includes('ofl')
    )
    structure.hasReadme = fileNames.some((name) => name.includes('readme'))
    structure.hasPackageJson = fileNames.includes('package.json')

    // Check for fonts directory
    if (items.some((item) => item.isDirectory() && item.name === 'fonts')) {
      structure.hasFonts = true
      structure.organization = 'ufr-compliant'

      // Analyze font formats
      const fontsPath = path.join(fontPath, 'fonts')
      structure.formatCoverage = await analyzeFontFormats(fontsPath)
    } else {
      // Check for font files directly in directory
      const fontExtensions = ['.ttf', '.otf', '.woff', '.woff2']
      const hasFontFiles = items.some((item) =>
        fontExtensions.some((ext) => item.name.toLowerCase().endsWith(ext))
      )

      if (hasFontFiles) {
        structure.hasFonts = true
        structure.organization = 'flat'
      }
    }
  } catch (error) {
    structure.error = error.message
  }

  return structure
}

/**
 * Analyze available font formats
 */
async function analyzeFontFormats(fontsPath) {
  const formats = {
    webfonts: 0,
    variable: 0,
    ttf: 0,
    otf: 0,
    totalFiles: 0,
  }

  try {
    const formatDirs = await fs.readdir(fontsPath, { withFileTypes: true })

    for (const dir of formatDirs) {
      if (!dir.isDirectory()) continue

      const formatPath = path.join(fontsPath, dir.name)
      const files = await fs.readdir(formatPath)
      const fontFiles = files.filter((file) =>
        ['.ttf', '.otf', '.woff', '.woff2'].some((ext) =>
          file.toLowerCase().endsWith(ext)
        )
      )

      formats[dir.name] = fontFiles.length
      formats.totalFiles += fontFiles.length
    }
  } catch (error) {
    formats.error = error.message
  }

  return formats
}

/**
 * Extract technical metrics for comparison
 */
function extractTechnicalMetrics(fontData) {
  if (!fontData) return {}

  const metrics = {
    weightCoverage: {
      static: 0,
      variableRanges: [],
    },
    fileCount: {
      total: 0,
      static: 0,
      variable: 0,
    },
    averageFileSize: 0,
    characterSupport: {
      estimated: 0,
    },
  }

  // Count weights and files
  if (fontData.static) {
    metrics.fileCount.static = Object.keys(fontData.static).length
    metrics.weightCoverage.static = Object.keys(fontData.static).length
  }

  if (fontData.variable) {
    metrics.fileCount.variable = Object.keys(fontData.variable).length

    // Extract weight ranges from variable fonts
    Object.values(fontData.variable).forEach((varFont) => {
      if (varFont.axes && varFont.axes.wght) {
        metrics.weightCoverage.variableRanges.push({
          min: varFont.axes.wght.min,
          max: varFont.axes.wght.max,
        })
      }
    })
  }

  metrics.fileCount.total =
    metrics.fileCount.static + metrics.fileCount.variable

  return metrics
}

/**
 * Evaluate user experience factors
 */
function evaluateUserExperience(fontData, structure) {
  const ux = {
    discoverability: 0,
    usability: 0,
    reliability: 0,
    performance: 0,
    scores: {},
  }

  // Discoverability (0-100)
  let discoverabilityScore = 0
  if (structure.hasReadme) discoverabilityScore += 25
  if (structure.hasPackageJson) discoverabilityScore += 25
  if (fontData && fontData.name) discoverabilityScore += 25
  if (fontData && fontData.description) discoverabilityScore += 25
  ux.discoverability = discoverabilityScore

  // Usability (0-100)
  let usabilityScore = 0
  if (structure.formatCoverage.webfonts > 0) usabilityScore += 40 // Web-ready
  if (structure.formatCoverage.variable > 0) usabilityScore += 30 // Variable font
  if (structure.organization === 'ufr-compliant') usabilityScore += 30 // Organized
  ux.usability = Math.min(usabilityScore, 100)

  // Reliability (0-100)
  let reliabilityScore = 0
  if (structure.hasLicense) reliabilityScore += 50 // Legal clarity
  if (fontData && fontData.license) reliabilityScore += 25 // License metadata
  if (fontData && fontData.author) reliabilityScore += 25 // Attribution
  ux.reliability = reliabilityScore

  // Performance (basic estimation, 0-100)
  let performanceScore = 50 // Baseline
  if (structure.formatCoverage.webfonts > 0) performanceScore += 25 // WOFF2 likely
  if (
    structure.formatCoverage.variable > 0 &&
    structure.formatCoverage.variable < 5
  ) {
    performanceScore += 25 // Variable fonts efficient when not excessive
  }
  ux.performance = Math.min(performanceScore, 100)

  ux.scores = {
    discoverability: `${ux.discoverability}/100`,
    usability: `${ux.usability}/100`,
    reliability: `${ux.reliability}/100`,
    performance: `${ux.performance}/100`,
  }

  return ux
}

/**
 * Generate comparative analysis showing differences
 */
function generateComparativeAnalysis(contributor, reference) {
  if (!contributor || !reference) return null

  const comparison = {
    structure: {},
    technical: {},
    userExperience: {},
    overall: {},
  }

  // Structure comparison
  comparison.structure = {
    organization: {
      contributor: contributor.structure.organization,
      reference: reference.structure.organization,
      assessment:
        contributor.structure.organization === reference.structure.organization
          ? 'matches-reference'
          : 'differs-from-reference',
    },
    completeness: {
      contributor: {
        license: contributor.structure.hasLicense,
        readme: contributor.structure.hasReadme,
        package: contributor.structure.hasPackageJson,
      },
      reference: {
        license: reference.structure.hasLicense,
        readme: reference.structure.hasReadme,
        package: reference.structure.hasPackageJson,
      },
    },
  }

  // Technical metrics comparison
  if (contributor.technicalMetrics && reference.technicalMetrics) {
    comparison.technical = {
      weightCoverage: {
        contributor: contributor.technicalMetrics.weightCoverage.static,
        reference: reference.technicalMetrics.weightCoverage.static,
        assessment:
          contributor.technicalMetrics.weightCoverage.static >=
          reference.technicalMetrics.weightCoverage.static * 0.5
            ? 'adequate'
            : 'limited',
      },
      fileCount: {
        contributor: contributor.technicalMetrics.fileCount.total,
        reference: reference.technicalMetrics.fileCount.total,
      },
    }
  }

  // UX comparison
  if (contributor.userExperience && reference.userExperience) {
    comparison.userExperience = {
      discoverability: {
        contributor: contributor.userExperience.discoverability,
        reference: reference.userExperience.discoverability,
        gap:
          reference.userExperience.discoverability -
          contributor.userExperience.discoverability,
      },
      usability: {
        contributor: contributor.userExperience.usability,
        reference: reference.userExperience.usability,
        gap:
          reference.userExperience.usability -
          contributor.userExperience.usability,
      },
      reliability: {
        contributor: contributor.userExperience.reliability,
        reference: reference.userExperience.reliability,
        gap:
          reference.userExperience.reliability -
          contributor.userExperience.reliability,
      },
    }
  }

  return comparison
}

/**
 * Generate working examples that show improvement paths
 */
async function generateWorkingExamples(contributor, reference) {
  const examples = []

  if (!contributor.exists) {
    examples.push({
      type: 'directory-structure',
      title: 'Font Family Directory Structure',
      reference: {
        description: 'Reference font follows UFR structure',
        code: await generateDirectoryExample(reference.path),
      },
      contributor: {
        description: 'Contribution directory not found',
        code: `Directory does not exist: ${contributor.path}`,
      },
      recommendation:
        'Create font family directory with UFR-compliant structure',
    })
    return examples
  }

  // Directory structure example
  if (contributor.structure.organization !== 'ufr-compliant') {
    examples.push({
      type: 'directory-structure',
      title: 'UFR-Compliant Directory Organization',
      reference: {
        description: 'Reference font demonstrates organized structure',
        code: await generateDirectoryExample(reference.path),
      },
      contributor: {
        description: 'Current organization needs improvement',
        code: await generateDirectoryExample(contributor.path),
      },
      recommendation:
        'Organize fonts into fonts/ subdirectory with format-based organization',
    })
  }

  // Font loading example
  if (contributor.fontData && reference.fontData) {
    examples.push({
      type: 'font-loading',
      title: 'Web Font Loading Implementation',
      reference: {
        description: 'Reference font CSS implementation',
        code: generateFontFaceExample(reference.fontData, 'reference'),
      },
      contributor: {
        description: 'Your font CSS implementation',
        code: generateFontFaceExample(contributor.fontData, 'contributor'),
      },
      recommendation: 'Ensure web fonts are optimized for loading performance',
    })
  }

  // License clarity example
  if (!contributor.structure.hasLicense && reference.structure.hasLicense) {
    examples.push({
      type: 'licensing',
      title: 'Font License Documentation',
      reference: {
        description: 'Reference font includes clear license file',
        code: `${reference.path}/LICENSE.txt\n# Font license clearly documented`,
      },
      contributor: {
        description: 'License file missing',
        code: `${contributor.path}/\n# No LICENSE.txt or similar file found`,
      },
      recommendation:
        'Add LICENSE.txt file with font license (OFL-1.1 recommended for open source)',
    })
  }

  return examples
}

/**
 * Generate directory tree example
 */
async function generateDirectoryExample(dirPath) {
  try {
    const tree = await generateDirectoryTree(dirPath, 2) // 2 levels deep
    return tree
  } catch (error) {
    return `Error reading directory: ${error.message}`
  }
}

/**
 * Recursively generate directory tree
 */
async function generateDirectoryTree(
  dirPath,
  maxDepth,
  currentDepth = 0,
  prefix = ''
) {
  if (currentDepth >= maxDepth) return ''

  try {
    const items = await fs.readdir(dirPath, { withFileTypes: true })
    let tree = ''

    items.forEach((item, index) => {
      const isLast = index === items.length - 1
      const connector = isLast ? '└── ' : '├── '
      tree += `${prefix}${connector}${item.name}\n`

      if (item.isDirectory() && currentDepth < maxDepth - 1) {
        const nextPrefix = prefix + (isLast ? '    ' : '│   ')
        // Note: This is simplified - in real implementation you'd want to recurse
        // but for examples we'll keep it shallow
      }
    })

    return tree
  } catch (error) {
    return `Error: ${error.message}`
  }
}

/**
 * Generate @font-face CSS example
 */
function generateFontFaceExample(fontData, type) {
  if (!fontData) return '/* No font data available */'

  const familyName = fontData.name || 'FontFamily'
  let css = `/* ${type === 'reference' ? 'Reference' : 'Contributor'} font CSS */\n\n`

  // Generate static font examples
  if (fontData.static) {
    const staticFonts = Object.values(fontData.static)
    const regularFont =
      staticFonts.find((f) => f.weight === 400) || staticFonts[0]

    if (regularFont) {
      css += `@font-face {\n`
      css += `  font-family: '${familyName}';\n`
      css += `  src: url('path/to/${regularFont.fileName}') format('woff2');\n`
      css += `  font-weight: ${regularFont.weight};\n`
      css += `  font-style: normal;\n`
      css += `  font-display: swap;\n`
      css += `}\n\n`
    }
  }

  // Generate variable font example
  if (fontData.variable) {
    const variableFont = Object.values(fontData.variable)[0]
    if (variableFont) {
      css += `@font-face {\n`
      css += `  font-family: '${familyName} Variable';\n`
      css += `  src: url('path/to/${variableFont.fileName}') format('truetype');\n`
      if (variableFont.axes && variableFont.axes.wght) {
        css += `  font-weight: ${variableFont.axes.wght.min} ${variableFont.axes.wght.max};\n`
      }
      css += `  font-style: normal;\n`
      css += `  font-display: swap;\n`
      css += `}\n`
    }
  }

  return css
}

/**
 * Generate actionable recommendations
 */
function generateActionableRecommendations(report) {
  const recommendations = []

  if (!report.contributorAnalysis || !report.contributorAnalysis.exists) {
    recommendations.push({
      priority: 'critical',
      category: 'structure',
      action: 'Create font family directory',
      description: 'Start with UFR-compliant directory structure',
      workingExample:
        'mkdir my-font-family && cd my-font-family && mkdir fonts fonts/webfonts',
    })
    return recommendations
  }

  const contrib = report.contributorAnalysis
  const comparison = report.comparative

  // Structure recommendations
  if (contrib.structure.organization !== 'ufr-compliant') {
    recommendations.push({
      priority: 'high',
      category: 'structure',
      action: 'Adopt UFR-compliant organization',
      description: 'Move fonts into organized fonts/ subdirectory',
      workingExample:
        'mkdir fonts && mkdir fonts/webfonts fonts/ttf && mv *.woff2 fonts/webfonts/',
    })
  }

  if (!contrib.structure.hasLicense) {
    recommendations.push({
      priority: 'critical',
      category: 'licensing',
      action: 'Add license file',
      description: 'Include LICENSE.txt with font license',
      workingExample:
        'echo "Copyright (c) Year, Author Name\n\nThis Font Software is licensed under the SIL Open Font License..." > LICENSE.txt',
    })
  }

  // Technical recommendations
  if (comparison && comparison.userExperience) {
    Object.entries(comparison.userExperience).forEach(([aspect, data]) => {
      if (data.gap > 25) {
        // Significant gap
        recommendations.push({
          priority: 'medium',
          category: 'user-experience',
          action: `Improve ${aspect}`,
          description: `Current score: ${data.contributor}/100, Reference: ${data.reference}/100`,
          workingExample: generateImprovementExample(aspect, data.gap),
        })
      }
    })
  }

  return recommendations
}

/**
 * Generate specific improvement examples
 */
function generateImprovementExample(aspect, gap) {
  const examples = {
    discoverability: 'Add README.md with font description and usage examples',
    usability: 'Convert fonts to web-optimized WOFF2 format',
    reliability: 'Add package.json with author, version, and license metadata',
    performance: 'Optimize font files and provide variable font option',
  }

  return examples[aspect] || 'Review reference font implementation'
}

/**
 * CLI interface for contributor validation
 */
export async function runContributorValidation(
  contributorPath,
  outputPath = null
) {
  console.log(`[contributor] Starting validation for: ${contributorPath}`)

  const report = await generateContributorReport(contributorPath)

  // Output report
  if (outputPath) {
    await fs.writeFile(outputPath, JSON.stringify(report, null, 2))
    console.log(`[contributor] Report saved to: ${outputPath}`)
  }

  // Print summary
  printContributorSummary(report)

  return report
}

/**
 * Print human-readable summary
 */
function printContributorSummary(report) {
  console.log('\n=== CONTRIBUTOR VALIDATION SUMMARY ===\n')

  if (!report.contributorAnalysis || !report.contributorAnalysis.exists) {
    console.log('❌ Contribution directory not found')
    return
  }

  const contrib = report.contributorAnalysis

  // Structure status
  console.log('📁 STRUCTURE:')
  console.log(`   Organization: ${contrib.structure.organization}`)
  console.log(`   License: ${contrib.structure.hasLicense ? '✅' : '❌'}`)
  console.log(`   README: ${contrib.structure.hasReadme ? '✅' : '❌'}`)
  console.log(`   Package: ${contrib.structure.hasPackageJson ? '✅' : '❌'}`)

  // User Experience scores
  if (contrib.userExperience) {
    console.log('\n🎯 USER EXPERIENCE:')
    Object.entries(contrib.userExperience.scores).forEach(([aspect, score]) => {
      const numScore = parseInt(score)
      const status = numScore >= 75 ? '✅' : numScore >= 50 ? '⚠️ ' : '❌'
      console.log(`   ${aspect}: ${status} ${score}`)
    })
  }

  // Top recommendations
  if (report.recommendations && report.recommendations.length > 0) {
    console.log('\n🚀 TOP RECOMMENDATIONS:')
    report.recommendations.slice(0, 3).forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec.action}`)
      console.log(`      ${rec.description}`)
    })
  }

  console.log('\n=== END SUMMARY ===\n')
}
