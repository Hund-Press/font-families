/**
 * Test Helpers and Utilities
 *
 * Common utilities for font family testing
 */

import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import os from 'os'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Create a temporary directory for test isolation
 * @returns {Promise<string>} Path to temporary directory
 */
export async function createTempDir() {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'font-test-'))
  return tempDir
}

/**
 * Clean up a temporary directory
 * @param {string} dirPath - Path to directory to remove
 */
export async function cleanupTempDir(dirPath) {
  try {
    await fs.rm(dirPath, { recursive: true, force: true })
  } catch (error) {
    console.warn(`Failed to cleanup temp dir ${dirPath}:`, error.message)
  }
}

/**
 * Copy a file or directory recursively
 * @param {string} src - Source path
 * @param {string} dest - Destination path
 */
export async function copyRecursive(src, dest) {
  const stat = await fs.stat(src)

  if (stat.isDirectory()) {
    await fs.mkdir(dest, { recursive: true })
    const entries = await fs.readdir(src)

    for (const entry of entries) {
      await copyRecursive(path.join(src, entry), path.join(dest, entry))
    }
  } else {
    await fs.mkdir(path.dirname(dest), { recursive: true })
    await fs.copyFile(src, dest)
  }
}

/**
 * Check if a file exists
 * @param {string} filePath - Path to check
 * @returns {Promise<boolean>} True if file exists
 */
export async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

/**
 * Read and parse JSON file safely
 * @param {string} filePath - Path to JSON file
 * @returns {Promise<Object|null>} Parsed JSON or null if error
 */
export async function readJsonFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8')
    return JSON.parse(content)
  } catch (error) {
    console.warn(`Failed to read JSON file ${filePath}:`, error.message)
    return null
  }
}

/**
 * Write JSON file with proper formatting
 * @param {string} filePath - Path to write to
 * @param {Object} data - Data to write
 */
export async function writeJsonFile(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

/**
 * Mock console output for testing
 * @returns {Object} Mock console with captured logs
 */
export function mockConsole() {
  const logs = {
    log: [],
    warn: [],
    error: [],
  }

  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
  }

  console.log = (...args) => logs.log.push(args.join(' '))
  console.warn = (...args) => logs.warn.push(args.join(' '))
  console.error = (...args) => logs.error.push(args.join(' '))

  return {
    logs,
    restore: () => {
      console.log = originalConsole.log
      console.warn = originalConsole.warn
      console.error = originalConsole.error
    },
  }
}

/**
 * Generate minimal font metadata for testing
 * @param {Object} overrides - Properties to override
 * @returns {Object} Font metadata
 */
export function createMockFontMetadata(overrides = {}) {
  return {
    family: 'Test Font',
    normalizedFamily: 'test-font',
    source: 'test',
    license: 'OFL-1.1',
    version: '1.0.0',
    variants: {
      regular: {
        weight: 400,
        style: 'normal',
        file: 'TestFont-Regular.ttf',
      },
    },
    status: 'ready',
    ...overrides,
  }
}

/**
 * Create a minimal test font file structure
 * @param {string} baseDir - Base directory to create structure in
 * @param {string} familyName - Font family name
 * @returns {Promise<Object>} Paths to created files
 */
export async function createTestFontStructure(
  baseDir,
  familyName = 'test-font'
) {
  const fontDir = path.join(baseDir, familyName)
  await fs.mkdir(fontDir, { recursive: true })

  // Create minimal font files (empty for testing)
  const regularFile = path.join(fontDir, `${familyName}-Regular.ttf`)
  const boldFile = path.join(fontDir, `${familyName}-Bold.ttf`)
  const variableFile = path.join(fontDir, `${familyName}VF.ttf`)

  await fs.writeFile(regularFile, Buffer.alloc(1024)) // 1KB dummy font
  await fs.writeFile(boldFile, Buffer.alloc(1024))
  await fs.writeFile(variableFile, Buffer.alloc(2048)) // 2KB dummy variable font

  // Create metadata file
  const metadataFile = path.join(fontDir, 'metadata.json')
  const metadata = {
    family: familyName,
    license: 'OFL-1.1',
    version: '1.0.0',
    source: 'test',
    variants: {
      regular: {
        weight: 400,
        style: 'normal',
        file: path.basename(regularFile),
      },
      bold: { weight: 700, style: 'normal', file: path.basename(boldFile) },
    },
    variableFont: {
      file: path.basename(variableFile),
      axes: {
        wght: { min: 100, max: 900, default: 400 },
      },
    },
  }

  await writeJsonFile(metadataFile, metadata)

  return {
    fontDir,
    regularFile,
    boldFile,
    variableFile,
    metadataFile,
    metadata,
  }
}

/**
 * Wait for a specified amount of time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise((resolve) => {
    const timeoutId = global.setTimeout(resolve, ms)
    return timeoutId
  })
}

/**
 * Assert that two objects are deeply equal (for testing)
 * @param {any} actual - Actual value
 * @param {any} expected - Expected value
 * @param {string} message - Error message
 */
export function deepEqual(
  actual,
  expected,
  message = 'Values should be equal'
) {
  const actualStr = JSON.stringify(actual, null, 2)
  const expectedStr = JSON.stringify(expected, null, 2)

  if (actualStr !== expectedStr) {
    throw new Error(
      `${message}\nActual: ${actualStr}\nExpected: ${expectedStr}`
    )
  }
}

/**
 * Get path to test fixtures directory
 * @param {...string} pathSegments - Path segments to join
 * @returns {string} Full path to fixture
 */
export function getFixturePath(...pathSegments) {
  return path.join(__dirname, '..', 'fixtures', ...pathSegments)
}

/**
 * Get path to project root directory
 * @param {...string} pathSegments - Path segments to join
 * @returns {string} Full path from project root
 */
export function getProjectPath(...pathSegments) {
  return path.join(__dirname, '..', '..', ...pathSegments)
}
