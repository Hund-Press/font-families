/**
 * Temporary Workspace Manager
 *
 * Provides isolated temporary workspaces for font processing tests
 */

import { promises as fs } from 'fs'
import path from 'path'
import {
  createTempDir,
  cleanupTempDir,
  copyRecursive,
  createTestFontStructure,
} from './test-helpers.js'

/**
 * Manages a temporary workspace for testing
 */
export class TempWorkspace {
  constructor() {
    this.workspaceDir = null
    this.fontsDir = null
    this.outputDir = null
    this.metadataDir = null
  }

  /**
   * Initialize the workspace
   * @param {Object} options - Workspace options
   * @returns {Promise<void>}
   */
  async init(options = {}) {
    const { includeSampleFonts = true, createOutputDirs = true } = options

    this.workspaceDir = await createTempDir()
    this.fontsDir = path.join(this.workspaceDir, 'fonts')
    this.outputDir = path.join(this.workspaceDir, 'output')
    this.metadataDir = path.join(this.workspaceDir, 'metadata')

    // Create directory structure
    await fs.mkdir(this.fontsDir, { recursive: true })

    if (createOutputDirs) {
      await fs.mkdir(this.outputDir, { recursive: true })
      await fs.mkdir(this.metadataDir, { recursive: true })
      await fs.mkdir(path.join(this.outputDir, 'modules'), { recursive: true })
      await fs.mkdir(path.join(this.outputDir, 'subsets'), { recursive: true })
    }

    if (includeSampleFonts) {
      await this.createSampleFonts()
    }

    return this.workspaceDir
  }

  /**
   * Create sample font structures for testing
   * @returns {Promise<void>}
   */
  async createSampleFonts() {
    // Create multiple test font families
    const families = ['test-sans', 'test-serif', 'test-mono']

    for (const family of families) {
      await createTestFontStructure(this.fontsDir, family)
    }

    // Create a special variable font family
    const variableFamily = 'test-variable'
    const varStruct = await createTestFontStructure(
      this.fontsDir,
      variableFamily
    )

    // Update metadata to include more axes for variable font
    varStruct.metadata.variableFont.axes = {
      wght: { min: 100, max: 900, default: 400 },
      ital: { min: 0, max: 1, default: 0 },
    }

    await fs.writeFile(
      varStruct.metadataFile,
      JSON.stringify(varStruct.metadata, null, 2)
    )
  }

  /**
   * Copy real font files from project to workspace (for integration tests)
   * @param {string} familyName - Family name to copy
   * @returns {Promise<string>} Path to copied family
   */
  async copyRealFont(familyName) {
    const sourcePath = path.join(process.cwd(), familyName)
    const destPath = path.join(this.fontsDir, familyName)

    try {
      await copyRecursive(sourcePath, destPath)
      return destPath
    } catch (error) {
      throw new Error(
        `Failed to copy real font ${familyName}: ${error.message}`
      )
    }
  }

  /**
   * Create a font metadata file
   * @param {string} familyName - Font family name
   * @param {Object} metadata - Metadata object
   * @returns {Promise<string>} Path to metadata file
   */
  async createMetadata(familyName, metadata) {
    const metadataPath = path.join(this.metadataDir, `${familyName}.json`)
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2))
    return metadataPath
  }

  /**
   * Create a mock output file
   * @param {string} filename - Output filename
   * @param {string} content - File content
   * @returns {Promise<string>} Path to created file
   */
  async createOutputFile(filename, content) {
    const outputPath = path.join(this.outputDir, filename)
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, content)
    return outputPath
  }

  /**
   * Get a path within the workspace
   * @param {...string} pathSegments - Path segments
   * @returns {string} Full path within workspace
   */
  getPath(...pathSegments) {
    return path.join(this.workspaceDir, ...pathSegments)
  }

  /**
   * Get path to fonts directory
   * @param {...string} pathSegments - Additional path segments
   * @returns {string} Path within fonts directory
   */
  getFontsPath(...pathSegments) {
    return path.join(this.fontsDir, ...pathSegments)
  }

  /**
   * Get path to output directory
   * @param {...string} pathSegments - Additional path segments
   * @returns {string} Path within output directory
   */
  getOutputPath(...pathSegments) {
    return path.join(this.outputDir, ...pathSegments)
  }

  /**
   * List all files in workspace recursively
   * @returns {Promise<string[]>} Array of file paths
   */
  async listFiles() {
    const files = []

    async function scan(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true })

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)

        if (entry.isDirectory()) {
          await scan(fullPath)
        } else {
          files.push(path.relative(this.workspaceDir, fullPath))
        }
      }
    }

    await scan.call(this, this.workspaceDir)
    return files.sort()
  }

  /**
   * Check if a file exists in workspace
   * @param {...string} pathSegments - Path segments
   * @returns {Promise<boolean>} True if file exists
   */
  async fileExists(...pathSegments) {
    try {
      await fs.access(this.getPath(...pathSegments))
      return true
    } catch {
      return false
    }
  }

  /**
   * Read a file from workspace
   * @param {...string} pathSegments - Path segments
   * @returns {Promise<string>} File content
   */
  async readFile(...pathSegments) {
    return fs.readFile(this.getPath(...pathSegments), 'utf8')
  }

  /**
   * Read and parse JSON file from workspace
   * @param {...string} pathSegments - Path segments
   * @returns {Promise<Object>} Parsed JSON
   */
  async readJsonFile(...pathSegments) {
    const content = await this.readFile(...pathSegments)
    return JSON.parse(content)
  }

  /**
   * Get workspace statistics
   * @returns {Promise<Object>} Workspace stats
   */
  async getStats() {
    const files = await this.listFiles()
    const fontFiles = files.filter((f) => f.match(/\.(ttf|otf|woff2?)$/))
    const jsonFiles = files.filter((f) => f.endsWith('.json'))

    return {
      totalFiles: files.length,
      fontFiles: fontFiles.length,
      jsonFiles: jsonFiles.length,
      workspaceSize: await this.getDirectorySize(this.workspaceDir),
    }
  }

  /**
   * Get size of directory in bytes
   * @param {string} dirPath - Directory path
   * @returns {Promise<number>} Size in bytes
   */
  async getDirectorySize(dirPath) {
    let size = 0

    async function scan(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true })

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)

        if (entry.isDirectory()) {
          await scan(fullPath)
        } else {
          const stats = await fs.stat(fullPath)
          size += stats.size
        }
      }
    }

    await scan(dirPath)
    return size
  }

  /**
   * Clean up the workspace
   * @returns {Promise<void>}
   */
  async cleanup() {
    if (this.workspaceDir) {
      await cleanupTempDir(this.workspaceDir)
      this.workspaceDir = null
      this.fontsDir = null
      this.outputDir = null
      this.metadataDir = null
    }
  }
}
