/**
 * Tests for Contributor CLI
 */

import { jest } from '@jest/globals'
import { promises as fs } from 'fs'
import path from 'path'
import { main, parseArgs, showExample } from '../../../src/build-tools/cli/contributor-cli.js'
import {
  createTempDir,
  cleanupTempDir,
  mockConsole,
  createTestFontStructure
} from '../../helpers/test-helpers.js'

// Mock the contributor validation module
jest.unstable_mockModule('../../../src/build-tools/workflows/contributor-validation.js', () => ({
  runContributorValidation: jest.fn()
}))

const { runContributorValidation } = await import('../../../src/build-tools/workflows/contributor-validation.js')

describe('Contributor CLI', () => {
  let tempDir
  let originalArgv
  let originalExit
  let consoleMock
  let exitCode

  beforeEach(async () => {
    tempDir = await createTempDir()
    originalArgv = process.argv
    originalExit = process.exit
    consoleMock = mockConsole()
    exitCode = null

    // Mock process.exit to capture exit codes
    process.exit = jest.fn((code) => {
      exitCode = code
      throw new Error(`Process exit: ${code}`)
    })

    // Reset the validation mock
    runContributorValidation.mockReset()
  })

  afterEach(async () => {
    process.argv = originalArgv
    process.exit = originalExit
    consoleMock.restore()
    await cleanupTempDir(tempDir)
  })

  describe('parseArgs', () => {
    test('should parse validate command with font path', () => {
      process.argv = ['node', 'cli.js', 'validate', '/path/to/font']
      const config = parseArgs()

      expect(config.command).toBe('validate')
      expect(config.fontPath).toBe('/path/to/font')
      expect(config.help).toBe(false)
    })

    test('should parse example command', () => {
      process.argv = ['node', 'cli.js', 'example']
      const config = parseArgs()

      expect(config.command).toBe('example')
      expect(config.fontPath).toBeNull()
    })

    test('should handle alternative command names', () => {
      process.argv = ['node', 'cli.js', 'check', '/font/path']
      let config = parseArgs()
      expect(config.command).toBe('validate')

      process.argv = ['node', 'cli.js', 'analyze', '/font/path']
      config = parseArgs()
      expect(config.command).toBe('validate')

      process.argv = ['node', 'cli.js', 'demo']
      config = parseArgs()
      expect(config.command).toBe('example')
    })

    test('should parse output option', () => {
      process.argv = ['node', 'cli.js', 'validate', '/font/path', '--output', 'report.json']
      let config = parseArgs()
      expect(config.outputPath).toBe('report.json')

      process.argv = ['node', 'cli.js', 'validate', '/font/path', '-o', 'report.json']
      config = parseArgs()
      expect(config.outputPath).toBe('report.json')
    })

    test('should parse reference option', () => {
      process.argv = ['node', 'cli.js', 'validate', '/font/path', '--reference', '/ref/font']
      let config = parseArgs()
      expect(config.reference).toBe('/ref/font')

      process.argv = ['node', 'cli.js', 'validate', '/font/path', '-r', '/ref/font']
      config = parseArgs()
      expect(config.reference).toBe('/ref/font')
    })

    test('should handle help flags', () => {
      process.argv = ['node', 'cli.js', '--help']
      let config = parseArgs()
      expect(config.help).toBe(true)

      process.argv = ['node', 'cli.js', '-h']
      config = parseArgs()
      expect(config.help).toBe(true)
    })

    test('should ignore flags that start with dash when setting font path', () => {
      process.argv = ['node', 'cli.js', 'validate', '--unknown-flag', '/font/path']
      const config = parseArgs()
      expect(config.fontPath).toBe('/font/path')
    })
  })

  describe('main function', () => {
    test('should show help when no command provided', async () => {
      process.argv = ['node', 'cli.js']

      await main()

      expect(consoleMock.logs.log).toContain('Font Families Contributor Tool')
      expect(consoleMock.logs.log).toContain('USAGE:')
    })

    test('should show help when help flag provided', async () => {
      process.argv = ['node', 'cli.js', '--help']

      await main()

      expect(consoleMock.logs.log).toContain('Font Families Contributor Tool')
      expect(consoleMock.logs.log).toContain('WORKING EXAMPLES APPROACH:')
    })

    test('should run validation for validate command', async () => {
      const mockReport = {
        contributorAnalysis: { exists: true },
        validation: { success: true }
      }
      runContributorValidation.mockResolvedValue(mockReport)

      process.argv = ['node', 'cli.js', 'validate', '/test/font']

      await main()

      expect(runContributorValidation).toHaveBeenCalledWith('/test/font', null)
      expect(consoleMock.logs.log).toContain('🔍 Validating contribution: /test/font')
    })

    test('should save report when output option provided', async () => {
      const mockReport = {
        contributorAnalysis: { exists: true },
        validation: { success: true }
      }
      runContributorValidation.mockResolvedValue(mockReport)

      process.argv = ['node', 'cli.js', 'validate', '/test/font', '--output', 'report.json']

      await main()

      expect(runContributorValidation).toHaveBeenCalledWith('/test/font', 'report.json')
      expect(consoleMock.logs.log).toContain('📄 Detailed report saved: report.json')
    })

    test('should exit with error code when validation fails', async () => {
      const mockReport = {
        contributorAnalysis: { exists: false },
        validation: { success: false }
      }
      runContributorValidation.mockResolvedValue(mockReport)

      process.argv = ['node', 'cli.js', 'validate', '/test/font']

      try {
        await main()
      } catch (error) {
        expect(error.message).toBe('Process exit: 1')
      }

      expect(exitCode).toBe(1)
    })

    test('should show error when validate command missing font path', async () => {
      process.argv = ['node', 'cli.js', 'validate']

      try {
        await main()
      } catch (error) {
        expect(error.message).toBe('Process exit: 1')
      }

      expect(consoleMock.logs.error).toContain('❌ Error: Font path required for validation')
      expect(exitCode).toBe(1)
    })

    test('should run example command', async () => {
      process.argv = ['node', 'cli.js', 'example']

      await main()

      expect(consoleMock.logs.log).toContain('🎯 EXAMPLE: Well-Structured Font Contribution')
      expect(consoleMock.logs.log).toContain('fonts/open-fonts/aspekta/')
    })

    test('should handle unknown command', async () => {
      process.argv = ['node', 'cli.js', 'unknown']

      try {
        await main()
      } catch (error) {
        expect(error.message).toBe('Process exit: 1')
      }

      expect(consoleMock.logs.error).toContain('❌ Unknown command: unknown')
      expect(exitCode).toBe(1)
    })

    test('should handle validation errors gracefully', async () => {
      runContributorValidation.mockRejectedValue(new Error('Validation failed'))

      process.argv = ['node', 'cli.js', 'validate', '/test/font']

      try {
        await main()
      } catch (error) {
        expect(error.message).toBe('Process exit: 1')
      }

      expect(consoleMock.logs.error).toContain('❌ Error: Validation failed')
      expect(exitCode).toBe(1)
    })
  })

  describe('showExample function', () => {
    test('should display complete example structure', async () => {
      await showExample()

      const output = consoleMock.logs.log.join(' ')

      // Check for key sections
      expect(output).toContain('🎯 EXAMPLE: Well-Structured Font Contribution')
      expect(output).toContain('DIRECTORY STRUCTURE:')
      expect(output).toContain('fonts/open-fonts/aspekta/')
      expect(output).toContain('WHY THIS WORKS:')
      expect(output).toContain('✅ UFR-Compliant Structure')
      expect(output).toContain('✅ Complete Legal Framework')
      expect(output).toContain('✅ User-Focused Design')
      expect(output).toContain('✅ Distribution Ready')
    })

    test('should show validation results example', async () => {
      await showExample()

      const output = consoleMock.logs.log.join(' ')

      expect(output).toContain('VALIDATION RESULTS:')
      expect(output).toContain('📁 Structure: UFR-compliant ✅')
      expect(output).toContain('🎯 User Experience:')
      expect(output).toContain('Discoverability: 100/100 ✅')
      expect(output).toContain('Performance: 95/100 ✅')
    })

    test('should include quick start guide', async () => {
      await showExample()

      const output = consoleMock.logs.log.join(' ')

      expect(output).toContain('🛠️  QUICK START FOR NEW CONTRIBUTION:')
      expect(output).toContain('mkdir my-font-family')
      expect(output).toContain('Create package.json metadata:')
      expect(output).toContain('contributor-cli validate my-font-family')
    })

    test('should show proper file organization examples', async () => {
      await showExample()

      const output = consoleMock.logs.log.join(' ')

      expect(output).toContain('├── README.md')
      expect(output).toContain('├── LICENSE.txt')
      expect(output).toContain('├── package.json')
      expect(output).toContain('├── fonts/')
      expect(output).toContain('│   ├── webfonts/')
      expect(output).toContain('│   ├── ttf/')
      expect(output).toContain('└── sources/')
    })

    test('should emphasize working examples approach', async () => {
      await showExample()

      const output = consoleMock.logs.log.join(' ')

      expect(output).toContain('The Aspekta font in this repository demonstrates')
      expect(output).toContain('Your contribution will be compared against this reference')
      expect(output).toContain('ensures your contribution meets community standards')
    })
  })

  describe('Integration scenarios', () => {
    test('should handle complete validation workflow', async () => {
      const fontPath = await createTestFontStructure(tempDir, 'test-font')

      const mockReport = {
        contributorAnalysis: {
          exists: true,
          structure: { valid: true },
          metadata: { complete: true }
        },
        userExperience: {
          discoverability: 95,
          usability: 90,
          reliability: 85,
          performance: 92
        }
      }
      runContributorValidation.mockResolvedValue(mockReport)

      process.argv = ['node', 'cli.js', 'validate', fontPath.fontDir, '--output', path.join(tempDir, 'report.json')]

      await main()

      expect(runContributorValidation).toHaveBeenCalledWith(
        fontPath.fontDir,
        path.join(tempDir, 'report.json')
      )

      expect(consoleMock.logs.log).toContain('🔍 Validating contribution:')
      expect(consoleMock.logs.log).toContain('📊 Generating quality report with working examples...')
      expect(consoleMock.logs.log).toContain('📄 Detailed report saved:')
    })

    test('should handle validation with reference font', async () => {
      const fontPath = await createTestFontStructure(tempDir, 'test-font')
      const refPath = await createTestFontStructure(tempDir, 'ref-font')

      const mockReport = {
        contributorAnalysis: { exists: true },
        comparison: { reference: refPath.fontDir }
      }
      runContributorValidation.mockResolvedValue(mockReport)

      process.argv = ['node', 'cli.js', 'validate', fontPath.fontDir, '--reference', refPath.fontDir]

      await main()

      expect(runContributorValidation).toHaveBeenCalledWith(fontPath.fontDir, null)
    })

    test('should show appropriate error messages for missing fonts', async () => {
      runContributorValidation.mockRejectedValue(new Error('Font directory not found'))

      process.argv = ['node', 'cli.js', 'validate', '/nonexistent/font']

      try {
        await main()
      } catch (error) {
        expect(error.message).toBe('Process exit: 1')
      }

      expect(consoleMock.logs.error).toContain('❌ Error: Font directory not found')
    })
  })

  describe('Help content verification', () => {
    test('should include all required help sections', async () => {
      process.argv = ['node', 'cli.js', '--help']

      await main()

      const output = consoleMock.logs.log.join(' ')

      expect(output).toContain('USAGE:')
      expect(output).toContain('COMMANDS:')
      expect(output).toContain('OPTIONS:')
      expect(output).toContain('EXAMPLES:')
      expect(output).toContain('WORKING EXAMPLES APPROACH:')
    })

    test('should show correct command syntax in help', async () => {
      process.argv = ['node', 'cli.js', '--help']

      await main()

      const output = consoleMock.logs.log.join(' ')

      expect(output).toContain('contributor-cli validate <font-path>')
      expect(output).toContain('contributor-cli example')
      expect(output).toContain('--output, -o')
      expect(output).toContain('--reference, -r')
      expect(output).toContain('--help, -h')
    })
  })
})