/**
 * Version Management Utilities
 *
 * Provides consistent version detection across build tools
 */

import { promises as fs } from 'fs'
import { execSync } from 'child_process'

/**
 * Get the current version from multiple sources with fallback priority:
 * 1. Explicit version parameter
 * 2. Latest git tag (if in git repo)
 * 3. package.json version
 * 4. Default fallback
 */
export async function getCurrentVersion(explicitVersion = null, options = {}) {
  const {
    preferGitTag = true,
    fallbackVersion = '1.0.0',
    includeVPrefix = true,
  } = options

  // 1. Use explicit version if provided
  if (explicitVersion) {
    console.log(`[version] Using explicit version: ${explicitVersion}`)
    return explicitVersion
  }

  // 2. Try git tag (if preferred and available)
  if (preferGitTag) {
    try {
      const gitTag = execSync('git describe --tags --exact-match HEAD', {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim()

      if (gitTag) {
        console.log(`[version] Using git tag: ${gitTag}`)
        return gitTag
      }
    } catch (error) {
      // Not on a tagged commit, continue to other methods
      console.log(
        '[version] No exact git tag found for HEAD, trying package.json'
      )
    }
  }

  // 3. Use package.json version
  try {
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'))
    const version =
      includeVPrefix && !packageJson.version.startsWith('v')
        ? `v${packageJson.version}`
        : packageJson.version

    console.log(`[version] Using package.json version: ${version}`)
    return version
  } catch (error) {
    console.warn('[version] Could not read package.json')
  }

  // 4. Fallback
  const version =
    includeVPrefix && !fallbackVersion.startsWith('v')
      ? `v${fallbackVersion}`
      : fallbackVersion

  console.log(`[version] Using fallback version: ${version}`)
  return version
}

/**
 * Get the next semantic version for tagging
 */
export function getNextVersion(currentVersion, bumpType = 'patch') {
  // Remove 'v' prefix if present
  const cleanVersion = currentVersion.replace(/^v/, '')
  const [major, minor, patch] = cleanVersion.split('.').map(Number)

  switch (bumpType) {
    case 'major':
      return `v${major + 1}.0.0`
    case 'minor':
      return `v${major}.${minor + 1}.0`
    case 'patch':
    default:
      return `v${major}.${minor}.${patch + 1}`
  }
}

/**
 * Check if current version matches latest git tag
 */
export async function isVersionSynced() {
  try {
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'))
    const packageVersion = `v${packageJson.version}`

    const gitTag = execSync('git describe --tags --abbrev=0', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()

    const synced = packageVersion === gitTag

    if (!synced) {
      console.warn(
        `[version] Version mismatch: package.json=${packageVersion}, git tag=${gitTag}`
      )
    }

    return synced
  } catch (error) {
    console.warn('[version] Could not check version sync:', error.message)
    return false
  }
}

/**
 * Update package.json version to match git tag
 */
export async function syncVersionToGitTag() {
  try {
    const gitTag = execSync('git describe --tags --abbrev=0', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()

    const packagePath = 'package.json'
    const packageJson = JSON.parse(await fs.readFile(packagePath, 'utf8'))

    // Remove 'v' prefix for package.json
    const newVersion = gitTag.replace(/^v/, '')

    if (packageJson.version !== newVersion) {
      packageJson.version = newVersion
      await fs.writeFile(
        packagePath,
        JSON.stringify(packageJson, null, 2) + '\n'
      )
      console.log(`[version] Updated package.json version to ${newVersion}`)
      return true
    }

    return false
  } catch (error) {
    console.error('[version] Could not sync version to git tag:', error.message)
    return false
  }
}
