/**
 * Tests for Version Manager Utilities
 */

import { jest } from '@jest/globals'
import { promises as fs } from 'fs'
import { execSync } from 'child_process'
import path from 'path'
import {
  getCurrentVersion,
  getNextVersion,
  isVersionSynced,
  syncVersionToGitTag
} from '../../../build-tools/utils/version-manager.js'
import {
  createTempDir,
  cleanupTempDir,
  mockConsole,
  writeJsonFile,
  readJsonFile
} from '../../helpers/test-helpers.js'

// Mock child_process
jest.mock('child_process', () => ({
  execSync: jest.fn()
}))

describe('Version Manager Utilities', () => {
  let tempDir
  let originalCwd
  let consoleMock

  beforeEach(async () => {
    tempDir = await createTempDir()
    originalCwd = process.cwd()
    process.chdir(tempDir)
    consoleMock = mockConsole()

    // Reset execSync mock
    execSync.mockReset()
  })

  afterEach(async () => {
    consoleMock.restore()
    process.chdir(originalCwd)
    await cleanupTempDir(tempDir)
  })

  describe('getCurrentVersion', () => {
    test('should use explicit version when provided', async () => {
      const version = await getCurrentVersion('v2.1.0')

      expect(version).toBe('v2.1.0')
      expect(consoleMock.logs.log).toContain('[version] Using explicit version: v2.1.0')
    })

    test('should use git tag when available and preferred', async () => {
      execSync.mockReturnValue('v1.5.3\n')

      const version = await getCurrentVersion(null, { preferGitTag: true })

      expect(version).toBe('v1.5.3')
      expect(consoleMock.logs.log).toContain('[version] Using git tag: v1.5.3')
      expect(execSync).toHaveBeenCalledWith('git describe --tags --exact-match HEAD', {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore']
      })
    })

    test('should fallback to package.json when git tag not available', async () => {
      execSync.mockImplementation(() => {
        throw new Error('No tag found')
      })

      const packageJson = { version: '1.2.3' }
      await writeJsonFile('package.json', packageJson)

      const version = await getCurrentVersion(null, { preferGitTag: true })

      expect(version).toBe('v1.2.3')
      expect(consoleMock.logs.log).toContain('[version] No exact git tag found for HEAD, trying package.json')
      expect(consoleMock.logs.log).toContain('[version] Using package.json version: v1.2.3')
    })

    test('should use package.json version directly when git tag not preferred', async () => {
      const packageJson = { version: '2.0.1' }
      await writeJsonFile('package.json', packageJson)

      const version = await getCurrentVersion(null, { preferGitTag: false })

      expect(version).toBe('v2.0.1')
      expect(consoleMock.logs.log).toContain('[version] Using package.json version: v2.0.1')
      expect(execSync).not.toHaveBeenCalled()
    })

    test('should not add v prefix when includeVPrefix is false', async () => {
      const packageJson = { version: '1.2.3' }
      await writeJsonFile('package.json', packageJson)

      const version = await getCurrentVersion(null, {
        preferGitTag: false,
        includeVPrefix: false
      })

      expect(version).toBe('1.2.3')
    })

    test('should preserve existing v prefix', async () => {
      const packageJson = { version: 'v1.2.3' }
      await writeJsonFile('package.json', packageJson)

      const version = await getCurrentVersion(null, {
        preferGitTag: false,
        includeVPrefix: true
      })

      expect(version).toBe('v1.2.3')
    })

    test('should use fallback version when package.json not available', async () => {
      execSync.mockImplementation(() => {
        throw new Error('No git repo')
      })

      const version = await getCurrentVersion(null, {
        preferGitTag: true,
        fallbackVersion: '0.1.0'
      })

      expect(version).toBe('v0.1.0')
      expect(consoleMock.logs.warn).toContain('[version] Could not read package.json')
      expect(consoleMock.logs.log).toContain('[version] Using fallback version: v0.1.0')
    })

    test('should use custom fallback version without v prefix when specified', async () => {
      execSync.mockImplementation(() => {
        throw new Error('No git repo')
      })

      const version = await getCurrentVersion(null, {
        preferGitTag: true,
        fallbackVersion: '0.5.0',
        includeVPrefix: false
      })

      expect(version).toBe('0.5.0')
    })

    test('should handle malformed package.json gracefully', async () => {
      execSync.mockImplementation(() => {
        throw new Error('No git repo')
      })

      await fs.writeFile('package.json', '{ invalid json }')

      const version = await getCurrentVersion()

      expect(version).toBe('v1.0.0')
      expect(consoleMock.logs.warn).toContain('[version] Could not read package.json')
    })

    test('should handle empty git tag response', async () => {
      execSync.mockReturnValue('')

      const packageJson = { version: '1.2.3' }
      await writeJsonFile('package.json', packageJson)

      const version = await getCurrentVersion(null, { preferGitTag: true })

      expect(version).toBe('v1.2.3')
    })
  })

  describe('getNextVersion', () => {
    test('should increment patch version by default', () => {
      expect(getNextVersion('v1.2.3')).toBe('v1.2.4')
      expect(getNextVersion('1.2.3')).toBe('v1.2.4')
    })

    test('should increment patch version explicitly', () => {
      expect(getNextVersion('v1.2.3', 'patch')).toBe('v1.2.4')
      expect(getNextVersion('v1.2.9', 'patch')).toBe('v1.2.10')
    })

    test('should increment minor version', () => {
      expect(getNextVersion('v1.2.3', 'minor')).toBe('v1.3.0')
      expect(getNextVersion('v1.9.3', 'minor')).toBe('v1.10.0')
    })

    test('should increment major version', () => {
      expect(getNextVersion('v1.2.3', 'major')).toBe('v2.0.0')
      expect(getNextVersion('v9.5.1', 'major')).toBe('v10.0.0')
    })

    test('should handle version without v prefix', () => {
      expect(getNextVersion('1.2.3', 'minor')).toBe('v1.3.0')
      expect(getNextVersion('0.1.0', 'major')).toBe('v1.0.0')
    })

    test('should handle invalid bump types gracefully', () => {
      expect(getNextVersion('v1.2.3', 'invalid')).toBe('v1.2.4')
      expect(getNextVersion('v1.2.3', '')).toBe('v1.2.4')
      expect(getNextVersion('v1.2.3', null)).toBe('v1.2.4')
    })
  })

  describe('isVersionSynced', () => {
    test('should return true when versions are synced', async () => {
      const packageJson = { version: '1.2.3' }
      await writeJsonFile('package.json', packageJson)

      execSync.mockReturnValue('v1.2.3\n')

      const synced = await isVersionSynced()

      expect(synced).toBe(true)
      expect(execSync).toHaveBeenCalledWith('git describe --tags --abbrev=0', {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore']
      })
    })

    test('should return false when versions are not synced', async () => {
      const packageJson = { version: '1.2.3' }
      await writeJsonFile('package.json', packageJson)

      execSync.mockReturnValue('v1.2.2\n')

      const synced = await isVersionSynced()

      expect(synced).toBe(false)
      expect(consoleMock.logs.warn).toContain('[version] Version mismatch: package.json=v1.2.3, git tag=v1.2.2')
    })

    test('should handle missing package.json', async () => {
      execSync.mockReturnValue('v1.2.3\n')

      const synced = await isVersionSynced()

      expect(synced).toBe(false)
      expect(consoleMock.logs.warn).toContain('[version] Could not check version sync:')
    })

    test('should handle git command errors', async () => {
      const packageJson = { version: '1.2.3' }
      await writeJsonFile('package.json', packageJson)

      execSync.mockImplementation(() => {
        throw new Error('Not a git repository')
      })

      const synced = await isVersionSynced()

      expect(synced).toBe(false)
      expect(consoleMock.logs.warn).toContain('[version] Could not check version sync: Not a git repository')
    })

    test('should handle malformed package.json', async () => {
      await fs.writeFile('package.json', '{ invalid json }')
      execSync.mockReturnValue('v1.2.3\n')

      const synced = await isVersionSynced()

      expect(synced).toBe(false)
    })
  })

  describe('syncVersionToGitTag', () => {
    test('should update package.json version to match git tag', async () => {
      const packageJson = {
        name: 'test-package',
        version: '1.2.2',
        description: 'Test package'
      }
      await writeJsonFile('package.json', packageJson)

      execSync.mockReturnValue('v1.2.3\n')

      const updated = await syncVersionToGitTag()

      expect(updated).toBe(true)
      expect(consoleMock.logs.log).toContain('[version] Updated package.json version to 1.2.3')

      const updatedPackage = await readJsonFile('package.json')
      expect(updatedPackage.version).toBe('1.2.3')
      expect(updatedPackage.name).toBe('test-package') // Verify other fields preserved
    })

    test('should not update when versions already match', async () => {
      const packageJson = { version: '1.2.3' }
      await writeJsonFile('package.json', packageJson)

      execSync.mockReturnValue('v1.2.3\n')

      const updated = await syncVersionToGitTag()

      expect(updated).toBe(false)
      expect(consoleMock.logs.log).not.toContain('[version] Updated package.json version')
    })

    test('should handle git tag without v prefix', async () => {
      const packageJson = { version: '1.2.2' }
      await writeJsonFile('package.json', packageJson)

      execSync.mockReturnValue('1.2.3\n')

      const updated = await syncVersionToGitTag()

      expect(updated).toBe(true)

      const updatedPackage = await readJsonFile('package.json')
      expect(updatedPackage.version).toBe('1.2.3')
    })

    test('should handle git command errors', async () => {
      const packageJson = { version: '1.2.3' }
      await writeJsonFile('package.json', packageJson)

      execSync.mockImplementation(() => {
        throw new Error('Not a git repository')
      })

      const updated = await syncVersionToGitTag()

      expect(updated).toBe(false)
      expect(consoleMock.logs.error).toContain('[version] Could not sync version to git tag: Not a git repository')
    })

    test('should handle missing package.json', async () => {
      execSync.mockReturnValue('v1.2.3\n')

      const updated = await syncVersionToGitTag()

      expect(updated).toBe(false)
      expect(consoleMock.logs.error).toContain('[version] Could not sync version to git tag:')
    })

    test('should handle malformed package.json', async () => {
      await fs.writeFile('package.json', '{ invalid json }')
      execSync.mockReturnValue('v1.2.3\n')

      const updated = await syncVersionToGitTag()

      expect(updated).toBe(false)
      expect(consoleMock.logs.error).toContain('[version] Could not sync version to git tag:')
    })

    test('should preserve package.json formatting', async () => {
      const packageJson = {
        name: 'test-package',
        version: '1.2.2',
        dependencies: {
          'some-package': '^1.0.0'
        },
        scripts: {
          test: 'jest'
        }
      }
      await writeJsonFile('package.json', packageJson)

      execSync.mockReturnValue('v1.2.3\n')

      await syncVersionToGitTag()

      const fileContent = await fs.readFile('package.json', 'utf8')
      const updatedPackage = JSON.parse(fileContent)

      expect(updatedPackage.version).toBe('1.2.3')
      expect(updatedPackage.name).toBe('test-package')
      expect(updatedPackage.dependencies).toEqual({ 'some-package': '^1.0.0' })
      expect(updatedPackage.scripts).toEqual({ test: 'jest' })
      expect(fileContent.endsWith('\n')).toBe(true) // Ensures newline at end
    })
  })

  describe('Integration scenarios', () => {
    test('should handle complete version workflow', async () => {
      // Start with package.json version
      const packageJson = { version: '1.2.3' }
      await writeJsonFile('package.json', packageJson)

      // Check initial version
      execSync.mockImplementation(() => {
        throw new Error('No git tag')
      })

      let version = await getCurrentVersion()
      expect(version).toBe('v1.2.3')

      // Simulate creating a git tag
      execSync.mockReturnValue('v1.2.4\n')

      // Check if versions are synced
      let synced = await isVersionSynced()
      expect(synced).toBe(false)

      // Sync package.json to git tag
      const updated = await syncVersionToGitTag()
      expect(updated).toBe(true)

      // Verify sync
      synced = await isVersionSynced()
      expect(synced).toBe(true)

      // Get next version
      const nextVersion = getNextVersion('v1.2.4', 'minor')
      expect(nextVersion).toBe('v1.3.0')
    })

    test('should handle version options consistently', async () => {
      const packageJson = { version: '2.1.0' }
      await writeJsonFile('package.json', packageJson)

      // Test with includeVPrefix: false
      let version = await getCurrentVersion(null, {
        preferGitTag: false,
        includeVPrefix: false
      })
      expect(version).toBe('2.1.0')

      // Test with custom fallback
      execSync.mockImplementation(() => {
        throw new Error('No git')
      })

      await fs.unlink('package.json')

      version = await getCurrentVersion(null, {
        fallbackVersion: 'dev-build',
        includeVPrefix: false
      })
      expect(version).toBe('dev-build')
    })

    test('should handle edge case version formats', async () => {
      // Test pre-release versions
      expect(getNextVersion('v1.2.3-beta.1', 'patch')).toBe('v1.2.4')

      // Test build metadata (should be ignored in parsing)
      expect(getNextVersion('v1.2.3+build.1', 'minor')).toBe('v1.3.0')
    })
  })

  describe('Error resilience', () => {
    test('should handle filesystem permission errors', async () => {
      // Create read-only package.json
      const packageJson = { version: '1.0.0' }
      await writeJsonFile('package.json', packageJson)

      try {
        await fs.chmod('package.json', 0o444) // Read-only

        execSync.mockReturnValue('v1.0.1\n')

        const updated = await syncVersionToGitTag()
        expect(updated).toBe(false)
      } finally {
        // Restore permissions for cleanup
        try {
          await fs.chmod('package.json', 0o644)
        } catch {}
      }
    })

    test('should handle concurrent access gracefully', async () => {
      const packageJson = { version: '1.0.0' }
      await writeJsonFile('package.json', packageJson)

      // Simulate multiple version operations
      const promises = [
        getCurrentVersion(),
        getCurrentVersion(null, { preferGitTag: false }),
        isVersionSynced()
      ]

      const results = await Promise.all(promises)
      expect(results).toHaveLength(3)
      results.forEach(result => expect(result).toBeDefined())
    })
  })
})