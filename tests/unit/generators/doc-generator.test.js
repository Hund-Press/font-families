/**
 * Tests for Doc Generator
 */

import { jest } from '@jest/globals'
import { promises as fs } from 'fs'
import path from 'path'
import { generateDocumentation } from '../../../src/build-tools/generators/doc-generator.js'
import {
  createTempDir,
  cleanupTempDir,
  readJsonFile,
  writeJsonFile,
  mockConsole,
  fileExists
} from '../../helpers/test-helpers.js'

describe('Doc Generator', () => {
  let tempDir
  let originalCwd
  let consoleMock

  beforeEach(async () => {
    tempDir = await createTempDir()
    originalCwd = process.cwd()
    process.chdir(tempDir)
    consoleMock = mockConsole()

    // Create mock directory structure
    await fs.mkdir('fonts/open-fonts', { recursive: true })
    await fs.mkdir('dist/api/metadata', { recursive: true })
    await fs.mkdir('src/content/fonts/published', { recursive: true })
  })

  afterEach(async () => {
    consoleMock.restore()
    process.chdir(originalCwd)
    await cleanupTempDir(tempDir)
  })

  describe('generateDocumentation', () => {
    test('should generate documentation for all font families', async () => {
      // Create test font families
      await createTestFontFamily('test-font', {
        name: '@hund-press/test-font',
        author: 'Test Author',
        license: 'OFL-1.1',
        version: '1.0.0',
        description: 'A beautiful test font for modern typography'
      })

      await createTestFontFamily('another-font', {
        name: '@hund-press/another-font',
        author: 'Another Author',
        license: 'Apache-2.0',
        version: '2.0.0',
        description: 'Another great font family'
      })

      await generateDocumentation()

      // Check that documentation files were created
      const testFontDoc = path.join('src/content/fonts/published', 'test-font.md')
      const anotherFontDoc = path.join('src/content/fonts/published', 'another-font.md')

      expect(await fileExists(testFontDoc)).toBe(true)
      expect(await fileExists(anotherFontDoc)).toBe(true)

      // Verify content of generated documentation
      const testFontContent = await fs.readFile(testFontDoc, 'utf8')
      expect(testFontContent).toContain('title: Test Font')
      expect(testFontContent).toContain('key: test-font')
      expect(testFontContent).toContain('**Designer**: Test Author')
      expect(testFontContent).toContain('**License**: OFL-1.1')
      expect(testFontContent).toContain('A beautiful test font for modern typography')
    })

    test('should use API metadata when available', async () => {
      // Create API metadata
      const apiMetadata = {
        name: 'Enhanced Test Font',
        author: 'API Author',
        license: 'MIT',
        version: '1.5.0',
        description: 'Enhanced description from API'
      }
      await writeJsonFile('dist/api/metadata/test-font.json', apiMetadata)

      // Create UFR package.json (should be ignored in favor of API data)
      await createTestFontFamily('test-font', {
        name: '@hund-press/test-font',
        author: 'UFR Author',
        license: 'OFL-1.1',
        version: '1.0.0',
        description: 'UFR description'
      })

      await generateDocumentation()

      const docContent = await fs.readFile('src/content/fonts/published/test-font.md', 'utf8')
      expect(docContent).toContain('title: Enhanced Test Font')
      expect(docContent).toContain('**Designer**: API Author')
      expect(docContent).toContain('**License**: MIT')
      expect(docContent).toContain('Enhanced description from API')
    })

    test('should fallback to UFR package.json when API metadata unavailable', async () => {
      await createTestFontFamily('test-font', {
        name: '@hund-press/test-font',
        author: 'UFR Author',
        license: 'OFL-1.1',
        version: '1.0.0',
        description: 'UFR description'
      })

      await generateDocumentation()

      const docContent = await fs.readFile('src/content/fonts/published/test-font.md', 'utf8')
      expect(docContent).toContain('title: Test Font')
      expect(docContent).toContain('**Designer**: UFR Author')
      expect(docContent).toContain('**License**: OFL-1.1')
      expect(docContent).toContain('UFR description')
    })

    test('should handle missing metadata gracefully', async () => {
      // Create font directory without package.json
      await fs.mkdir('fonts/open-fonts/broken-font', { recursive: true })

      await generateDocumentation()

      const docContent = await fs.readFile('src/content/fonts/published/broken-font.md', 'utf8')
      expect(docContent).toContain('title: Broken Font')
      expect(docContent).toContain('**Designer**: Unknown')
      expect(docContent).toContain('**License**: Unknown')
      expect(docContent).toContain('Broken font font family')
    })

    test('should clean up scoped package names in titles', async () => {
      await createTestFontFamily('scoped-font', {
        name: '@some-scope/weird-font-name',
        author: 'Scoped Author',
        license: 'OFL-1.1',
        version: '1.0.0'
      })

      await generateDocumentation()

      const docContent = await fs.readFile('src/content/fonts/published/scoped-font.md', 'utf8')
      expect(docContent).toContain('title: Weird Font Name')
      expect(docContent).not.toContain('@some-scope/')
    })

    test('should escape special characters in descriptions', async () => {
      await createTestFontFamily('special-font', {
        name: 'Special Font',
        description: 'Font with "quotes" and special characters',
        author: 'Special Author',
        license: 'OFL-1.1',
        version: '1.0.0'
      })

      await generateDocumentation()

      const docContent = await fs.readFile('src/content/fonts/published/special-font.md', 'utf8')
      expect(docContent).toContain('description: "Font with \\"quotes\\" and special characters"')
    })

    test('should skip regeneration when documentation is up to date', async () => {
      await createTestFontFamily('test-font', {
        name: 'Test Font',
        author: 'Test Author',
        license: 'OFL-1.1',
        version: '1.0.0'
      })

      // First generation
      await generateDocumentation()
      expect(consoleMock.logs.log).toContain('[doc-generator] ✓ Generated')

      // Clear logs and run again
      consoleMock.logs.log = []

      // Second generation should skip
      await generateDocumentation()
      expect(consoleMock.logs.log).toContain('[doc-generator] Skipping test-font (up to date)')
    })

    test('should regenerate when source is newer than documentation', async () => {
      await createTestFontFamily('test-font', {
        name: 'Test Font',
        author: 'Test Author',
        license: 'OFL-1.1',
        version: '1.0.0'
      })

      // First generation
      await generateDocumentation()

      // Wait a bit and update the source file
      await new Promise(resolve => setTimeout(resolve, 10))

      const ufrPath = 'fonts/open-fonts/test-font/package.json'
      const ufrData = await readJsonFile(ufrPath)
      ufrData.version = '1.1.0'
      await writeJsonFile(ufrPath, ufrData)

      // Clear logs
      consoleMock.logs.log = []

      // Should regenerate
      await generateDocumentation()
      expect(consoleMock.logs.log).toContain('[doc-generator] Generating documentation for test-font...')
    })

    test('should include proper CSS and HTML examples', async () => {
      await createTestFontFamily('example-font', {
        name: 'Example Font',
        author: 'Example Author',
        license: 'OFL-1.1',
        version: '1.0.0'
      })

      await generateDocumentation()

      const docContent = await fs.readFile('src/content/fonts/published/example-font.md', 'utf8')

      // Check CSS example
      expect(docContent).toContain("@font-face {")
      expect(docContent).toContain("font-family: 'Example Font';")
      expect(docContent).toContain("url('https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.5.0/example-font/fonts/webfonts/Example Font-400.woff2')")

      // Check HTML preload example
      expect(docContent).toContain('<link rel="preload"')
      expect(docContent).toContain('as="font"')
      expect(docContent).toContain('type="font/woff2"')
    })

    test('should include font specimen showcase', async () => {
      await createTestFontFamily('specimen-font', {
        name: 'Specimen Font',
        author: 'Specimen Author',
        license: 'OFL-1.1',
        version: '1.0.0'
      })

      await generateDocumentation()

      const docContent = await fs.readFile('src/content/fonts/published/specimen-font.md', 'utf8')

      expect(docContent).toContain('<div class="specimen-showcase">')
      expect(docContent).toContain('data-font="specimen-font"')
      expect(docContent).toContain('The quick brown fox jumps over the lazy dog')
      expect(docContent).toContain('data-weight="400"')
      expect(docContent).toContain('data-weight="700"')
    })

    test('should include proper styling for specimens', async () => {
      await createTestFontFamily('styled-font', {
        name: 'Styled Font',
        author: 'Style Author',
        license: 'OFL-1.1',
        version: '1.0.0'
      })

      await generateDocumentation()

      const docContent = await fs.readFile('src/content/fonts/published/styled-font.md', 'utf8')

      expect(docContent).toContain('<style>')
      expect(docContent).toContain('.specimen-showcase {')
      expect(docContent).toContain('[data-font="styled-font"] {')
      expect(docContent).toContain("font-family: 'Styled Font', system-ui, sans-serif;")
    })

    test('should log appropriate progress messages', async () => {
      await createTestFontFamily('test-font-1', {
        name: 'Test Font 1',
        author: 'Author 1',
        license: 'OFL-1.1'
      })

      await createTestFontFamily('test-font-2', {
        name: 'Test Font 2',
        author: 'Author 2',
        license: 'MIT'
      })

      await generateDocumentation()

      expect(consoleMock.logs.log).toContain('[doc-generator] Starting font documentation generation...')
      expect(consoleMock.logs.log).toContain('[doc-generator] Found 2 font families')
      expect(consoleMock.logs.log).toContain('[doc-generator] Documentation generation complete: 2 generated, 0 skipped')
    })

    test('should handle errors gracefully for individual fonts', async () => {
      await createTestFontFamily('good-font', {
        name: 'Good Font',
        author: 'Good Author',
        license: 'OFL-1.1'
      })

      // Create a directory that will cause an error
      await fs.mkdir('fonts/open-fonts/error-font', { recursive: true })
      // Create invalid package.json
      await fs.writeFile('fonts/open-fonts/error-font/package.json', '{invalid json')

      await generateDocumentation()

      // Should still generate docs for the good font
      expect(await fileExists('src/content/fonts/published/good-font.md')).toBe(true)

      // Should log error for the problematic font
      expect(consoleMock.logs.error).toContain('[doc-generator] ✗ Failed to generate documentation for error-font:')
    })

    test('should handle empty fonts directory', async () => {
      // Don't create any font families
      await generateDocumentation()

      expect(consoleMock.logs.log).toContain('[doc-generator] Found 0 font families')
      expect(consoleMock.logs.log).toContain('[doc-generator] Documentation generation complete: 0 generated, 0 skipped')
    })
  })

  // Helper function to create test font family structure
  async function createTestFontFamily(fontKey, packageData) {
    const fontDir = path.join('fonts', 'open-fonts', fontKey)
    await fs.mkdir(fontDir, { recursive: true })

    const packageJson = {
      name: packageData.name || fontKey,
      author: packageData.author || 'Unknown',
      license: packageData.license || 'Unknown',
      version: packageData.version || '1.0.0',
      description: packageData.description || `${fontKey} font family`,
      ...packageData
    }

    await writeJsonFile(path.join(fontDir, 'package.json'), packageJson)
  }
})