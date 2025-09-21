/**
 * Font Validation Utilities
 *
 * Validates font licensing, file integrity, and suitability for different distribution channels.
 * Critical for ensuring public CDN only serves properly licensed fonts.
 */

import { promises as fs } from 'fs'
import path from 'path'

/**
 * Validate font licensing for distribution
 * @param {Object} familyData - Font family data
 * @param {string} distributionType - 'open' for public CDN, 'restricted' for private use
 * @returns {Promise<boolean>} True if valid for distribution type
 */
export async function validateLicensing(familyData, distributionType = 'open') {
  console.log(
    `[validation] Checking ${familyData.name} for ${distributionType} distribution`
  )

  if (distributionType === 'open') {
    return await validateOpenLicense(familyData)
  } else {
    // For restricted/private use, any license is acceptable
    return true
  }
}

/**
 * Validate that a font has an acceptable open license
 * @param {Object} familyData - Font family data
 * @returns {Promise<boolean>} True if has valid open license
 */
async function validateOpenLicense(familyData) {
  const license = familyData.license || familyData.licenseType

  if (!license) {
    console.warn(
      `[validation] ⚠️  ${familyData.name}: No license information found`
    )
    return false
  }

  // List of approved open licenses for public distribution
  const approvedOpenLicenses = [
    'OFL-1.1',
    'SIL Open Font License',
    'Apache-2.0',
    'Apache License',
    'MIT',
    'MIT License',
  ]

  const isApprovedLicense = approvedOpenLicenses.some((approvedLicense) =>
    license.toLowerCase().includes(approvedLicense.toLowerCase())
  )

  if (!isApprovedLicense) {
    console.warn(
      `[validation] ⚠️  ${familyData.name}: License '${license}' not approved for open distribution`
    )
    return false
  }

  // Additional validation: check for license file existence
  const hasLicenseFile = await validateLicenseFileExists(familyData)
  if (!hasLicenseFile) {
    console.warn(`[validation] ⚠️  ${familyData.name}: No license file found`)
    return false
  }

  console.log(
    `[validation] ✅ ${familyData.name}: Valid open license (${license})`
  )
  return true
}

/**
 * Validate that license files exist for the font family
 * @param {Object} familyData - Font family data
 * @returns {Promise<boolean>} True if license files exist
 */
async function validateLicenseFileExists(familyData) {
  // Get font directory from first font path
  const firstFont =
    Object.values(familyData.static || {})[0] ||
    Object.values(familyData.variable || {})[0]

  if (!firstFont?.path) return false

  // Determine font family directory
  const fontPath = path.resolve(firstFont.path)
  const fontDir = path.dirname(fontPath)
  const familyDir = path.dirname(fontDir) // Go up from fonts/ directory

  // Common license file names
  const licenseFiles = [
    'LICENSE.txt',
    'LICENSE.md',
    'LICENSE',
    'OFL.txt',
    'OFL.md',
    'LICENCE.txt',
    'LICENCE.md',
    'LICENCE',
  ]

  // Check in font directory and parent directory
  const searchDirs = [fontDir, familyDir]

  for (const dir of searchDirs) {
    for (const licenseFile of licenseFiles) {
      try {
        await fs.access(path.join(dir, licenseFile))
        console.log(
          `[validation] Found license file: ${path.join(dir, licenseFile)}`
        )
        return true
      } catch (error) {
        // File doesn't exist, continue searching
      }
    }
  }

  return false
}

/**
 * Validate font file integrity
 * @param {Object} familyData - Font family data
 * @returns {Promise<Object>} Validation results
 */
export async function validateFileIntegrity(familyData) {
  const results = {
    valid: true,
    errors: [],
    warnings: [],
    checkedFiles: 0,
  }

  const allFonts = [
    ...Object.values(familyData.static || {}),
    ...Object.values(familyData.variable || {}),
  ]

  for (const fontData of allFonts) {
    try {
      await fs.access(fontData.path)
      const stats = await fs.stat(fontData.path)

      // Check file size (warn if too large or suspiciously small)
      if (stats.size > 10 * 1024 * 1024) {
        // > 10MB
        results.warnings.push(
          `Large font file: ${fontData.path} (${Math.round(stats.size / 1024 / 1024)}MB)`
        )
      }

      if (stats.size < 1024) {
        // < 1KB
        results.errors.push(
          `Suspiciously small font file: ${fontData.path} (${stats.size} bytes)`
        )
        results.valid = false
      }

      results.checkedFiles++
    } catch (error) {
      results.errors.push(
        `Cannot access font file: ${fontData.path} (${error.message})`
      )
      results.valid = false
    }
  }

  if (results.valid) {
    console.log(
      `[validation] ✅ ${familyData.name}: File integrity validated (${results.checkedFiles} files)`
    )
  } else {
    console.error(
      `[validation] ❌ ${familyData.name}: File integrity issues found`
    )
    results.errors.forEach((error) =>
      console.error(`[validation]   - ${error}`)
    )
  }

  if (results.warnings.length > 0) {
    results.warnings.forEach((warning) =>
      console.warn(`[validation]   ⚠️  ${warning}`)
    )
  }

  return results
}

/**
 * Validate UFR structure compliance
 * @param {string} familyPath - Path to font family directory
 * @param {Object} familyData - Font family data
 * @returns {Promise<Object>} UFR compliance results
 */
export async function validateUFRCompliance(familyPath, familyData) {
  const results = {
    compliant: true,
    score: 0,
    maxScore: 0,
    issues: [],
    recommendations: [],
  }

  // Check for fonts/ directory
  results.maxScore += 20
  try {
    await fs.access(path.join(familyPath, 'fonts'))
    results.score += 20
    console.log(`[validation] ✅ UFR: fonts/ directory exists`)
  } catch (error) {
    results.issues.push('Missing fonts/ directory')
    results.compliant = false
  }

  // Check for license file
  results.maxScore += 20
  const hasLicense = await validateLicenseFileExists(familyData)
  if (hasLicense) {
    results.score += 20
    console.log(`[validation] ✅ UFR: License file found`)
  } else {
    results.issues.push('Missing license file (LICENSE.txt, OFL.txt, etc.)')
    results.compliant = false
  }

  // Check for README
  results.maxScore += 15
  const readmePaths = [
    path.join(familyPath, 'README.md'),
    path.join(familyPath, 'fonts', 'README.md'),
  ]

  let hasReadme = false
  for (const readmePath of readmePaths) {
    try {
      await fs.access(readmePath)
      hasReadme = true
      break
    } catch (error) {
      // Continue checking
    }
  }

  if (hasReadme) {
    results.score += 15
    console.log(`[validation] ✅ UFR: README file found`)
  } else {
    results.recommendations.push('Add README.md with font description')
  }

  // Check for package.json with metadata
  results.maxScore += 15
  const packagePaths = [
    path.join(familyPath, 'package.json'),
    path.join(familyPath, 'fonts', 'package.json'),
  ]

  let hasPackage = false
  for (const packagePath of packagePaths) {
    try {
      await fs.access(packagePath)
      const pkg = JSON.parse(await fs.readFile(packagePath, 'utf8'))
      if (pkg.version && pkg.author && pkg.license) {
        hasPackage = true
        break
      }
    } catch (error) {
      // Continue checking
    }
  }

  if (hasPackage) {
    results.score += 15
    console.log(`[validation] ✅ UFR: package.json with metadata found`)
  } else {
    results.recommendations.push(
      'Add package.json with version, author, and license fields'
    )
  }

  // Check for organized font directories
  results.maxScore += 20
  const expectedDirs = ['webfonts', 'ttf', 'otf', 'variable']
  let organizedDirs = 0

  for (const expectedDir of expectedDirs) {
    try {
      const dirPath = path.join(familyPath, 'fonts', expectedDir)
      await fs.access(dirPath)
      organizedDirs++
    } catch (error) {
      // Directory doesn't exist
    }
  }

  if (organizedDirs >= 2) {
    results.score += 20
    console.log(
      `[validation] ✅ UFR: Organized font directories (${organizedDirs}/${expectedDirs.length})`
    )
  } else {
    results.recommendations.push(
      'Organize fonts into subdirectories (webfonts/, ttf/, otf/, variable/)'
    )
  }

  // Check for sources directory
  results.maxScore += 10
  try {
    await fs.access(path.join(familyPath, 'sources'))
    results.score += 10
    console.log(`[validation] ✅ UFR: sources/ directory found`)
  } catch (error) {
    results.recommendations.push(
      'Add sources/ directory with font source files if available'
    )
  }

  // Calculate compliance percentage
  const compliancePercentage = Math.round(
    (results.score / results.maxScore) * 100
  )

  console.log(
    `[validation] UFR compliance for ${familyData.name}: ${compliancePercentage}% (${results.score}/${results.maxScore})`
  )

  if (results.issues.length > 0) {
    console.log(`[validation] Issues:`)
    results.issues.forEach((issue) => console.log(`[validation]   - ${issue}`))
  }

  if (results.recommendations.length > 0) {
    console.log(`[validation] Recommendations:`)
    results.recommendations.forEach((rec) =>
      console.log(`[validation]   - ${rec}`)
    )
  }

  results.compliancePercentage = compliancePercentage
  return results
}

/**
 * Validate font metadata completeness
 * @param {Object} familyData - Font family data
 * @returns {Object} Metadata validation results
 */
export function validateMetadata(familyData) {
  const results = {
    complete: true,
    score: 0,
    maxScore: 0,
    missing: [],
    warnings: [],
  }

  // Essential fields
  const essentialFields = [
    { field: 'name', weight: 20 },
    { field: 'slug', weight: 15 },
    { field: 'license', weight: 20, alt: 'licenseType' },
    { field: 'author', weight: 15 },
  ]

  // Optional but recommended fields
  const recommendedFields = [
    { field: 'version', weight: 10 },
    { field: 'description', weight: 10 },
    { field: 'copyrightYear', weight: 5 },
  ]

  const allFields = [...essentialFields, ...recommendedFields]

  for (const { field, weight, alt } of allFields) {
    results.maxScore += weight

    const hasField = familyData[field] || (alt && familyData[alt])

    if (hasField) {
      results.score += weight
    } else {
      if (essentialFields.find((f) => f.field === field)) {
        results.missing.push(field)
        results.complete = false
      } else {
        results.warnings.push(`Missing recommended field: ${field}`)
      }
    }
  }

  // Font file validation
  results.maxScore += 15
  const hasStatic =
    familyData.static && Object.keys(familyData.static).length > 0
  const hasVariable =
    familyData.variable && Object.keys(familyData.variable).length > 0

  if (hasStatic || hasVariable) {
    results.score += 15
  } else {
    results.missing.push('font files')
    results.complete = false
  }

  const completenessPercentage = Math.round(
    (results.score / results.maxScore) * 100
  )
  results.completenessPercentage = completenessPercentage

  if (results.complete) {
    console.log(
      `[validation] ✅ ${familyData.name}: Metadata complete (${completenessPercentage}%)`
    )
  } else {
    console.warn(
      `[validation] ⚠️  ${familyData.name}: Incomplete metadata (${completenessPercentage}%)`
    )
    results.missing.forEach((field) =>
      console.warn(`[validation]   Missing: ${field}`)
    )
  }

  return results
}

/**
 * Run comprehensive validation on a font family
 * @param {string} familyPath - Path to font family directory
 * @param {Object} familyData - Font family data
 * @param {string} distributionType - 'open' or 'restricted'
 * @returns {Promise<Object>} Complete validation results
 */
export async function validateFontFamily(
  familyPath,
  familyData,
  distributionType = 'open'
) {
  console.log(
    `[validation] Running comprehensive validation for ${familyData.name}`
  )

  const results = {
    overall: true,
    licensing: await validateLicensing(familyData, distributionType),
    fileIntegrity: await validateFileIntegrity(familyData),
    metadata: validateMetadata(familyData),
  }

  // UFR compliance only if we have a directory path
  if (familyPath) {
    results.ufrCompliance = await validateUFRCompliance(familyPath, familyData)
  }

  results.overall =
    results.licensing &&
    results.fileIntegrity.valid &&
    results.metadata.complete

  if (results.overall) {
    console.log(`[validation] ✅ ${familyData.name}: All validations passed`)
  } else {
    console.error(`[validation] ❌ ${familyData.name}: Validation issues found`)
  }

  return results
}
