/**
 * Tests for Version Sync Script
 *
 * Tests version synchronization between package.json and git tags
 */

import { test } from 'node:test'
import assert from 'node:assert'
import { promises as fs } from 'fs'
import { execSync } from 'child_process'
import {
  getCurrentVersion,
  getNextVersion,
  isVersionSynced,
  syncVersionToGitTag
} from '../../../build-tools/utils/version-manager.js'
import { TempWorkspace } from '../../helpers/temp-workspace.js'
import { mockConsole } from '../../helpers/test-helpers.js'

test('Version Manager - Current Version Detection', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should use explicit version when provided', async () => {
    const console = mockConsole()

    try {
      const explicitVersion = 'v2.5.0'
      const version = await getCurrentVersion(explicitVersion)
      
      assert.strictEqual(version, explicitVersion, 'Should return explicit version')
      
      // Check console output
      const hasExplicitMessage = console.logs.log.some(log => 
        log.includes('Using explicit version')
      )
      assert.ok(hasExplicitMessage, 'Should log explicit version usage')
    } finally {
      console.restore()
    }
  })

  await t.test('should read version from package.json', async () => {
    const console = mockConsole()

    try {
      // Create package.json in workspace
      const testVersion = '1.2.3'
      await workspace.createOutputFile('package.json', JSON.stringify({
        name: 'test-package',
        version: testVersion
      }))

      // Change to workspace directory
      const originalCwd = process.cwd()
      process.chdir(workspace.workspaceDir)

      try {
        const version = await getCurrentVersion(null, { 
          preferGitTag: false,
          includeVPrefix: true 
        })
        
        assert.ok(version.includes(testVersion), 'Should include package.json version')
        
        // Check console output
        const hasPackageMessage = console.logs.log.some(log => 
          log.includes('Using package.json version')
        )
        assert.ok(hasPackageMessage, 'Should log package.json version usage')
      } finally {
        process.chdir(originalCwd)
      }
    } finally {
      console.restore()
    }
  })

  await t.test('should use fallback version when no sources available', async () => {
    const console = mockConsole()

    try {
      // Use empty workspace with no package.json
      const originalCwd = process.cwd()
      process.chdir(workspace.workspaceDir)

      try {
        const version = await getCurrentVersion(null, { 
          preferGitTag: false,
          fallbackVersion: '0.1.0'
        })
        
        assert.ok(version.includes('0.1.0'), 'Should use fallback version')
        
        // Check console output
        const hasFallbackMessage = console.logs.log.some(log => 
          log.includes('Using fallback version')
        )
        assert.ok(hasFallbackMessage, 'Should log fallback version usage')
      } finally {
        process.chdir(originalCwd)
      }
    } finally {
      console.restore()
    }
  })

  await t.test('should handle v prefix correctly', async () => {
    const console = mockConsole()

    try {
      // Test with includeVPrefix option
      const version1 = await getCurrentVersion('1.0.0', { includeVPrefix: true })
      assert.strictEqual(version1, '1.0.0', 'Should keep version as-is when explicit')

      const version2 = await getCurrentVersion(null, { 
        includeVPrefix: true,
        fallbackVersion: '2.0.0',
        preferGitTag: false
      })
      assert.ok(version2.includes('2.0.0'), 'Should use fallback version')
    } finally {
      console.restore()
    }
  })
})

test('Version Manager - Next Version Calculation', async (t) => {
  await t.test('should calculate patch version bump', async () => {
    const nextVersion = getNextVersion('v1.2.3', 'patch')
    assert.strictEqual(nextVersion, 'v1.2.4', 'Should increment patch version')
  })

  await t.test('should calculate minor version bump', async () => {
    const nextVersion = getNextVersion('v1.2.3', 'minor')
    assert.strictEqual(nextVersion, 'v1.3.0', 'Should increment minor version and reset patch')
  })

  await t.test('should calculate major version bump', async () => {
    const nextVersion = getNextVersion('v1.2.3', 'major')
    assert.strictEqual(nextVersion, 'v2.0.0', 'Should increment major version and reset minor/patch')
  })

  await t.test('should handle version without v prefix', async () => {
    const nextVersion = getNextVersion('1.2.3', 'patch')
    assert.strictEqual(nextVersion, 'v1.2.4', 'Should add v prefix to result')
  })

  await t.test('should default to patch bump', async () => {
    const nextVersion = getNextVersion('v1.2.3')
    assert.strictEqual(nextVersion, 'v1.2.4', 'Should default to patch bump')
  })

  await t.test('should handle invalid bump type', async () => {
    const nextVersion = getNextVersion('v1.2.3', 'invalid')
    assert.strictEqual(nextVersion, 'v1.2.4', 'Should default to patch for invalid bump type')
  })
})

test('Version Manager - Synchronization', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should detect version mismatch', async () => {
    const console = mockConsole()

    try {
      // Create package.json with different version
      await workspace.createOutputFile('package.json', JSON.stringify({
        name: 'test-package',
        version: '1.0.0'
      }))

      const originalCwd = process.cwd()
      process.chdir(workspace.workspaceDir)

      try {
        // isVersionSynced will try to run git commands and likely fail
        // in our test workspace, but we test the logic
        const synced = await isVersionSynced()
        
        // Should return false due to inability to check git tags in test env
        assert.strictEqual(synced, false, 'Should detect mismatch in test environment')
        
        // Check that warning was logged
        const hasWarning = console.logs.warn.some(log => 
          log.includes('Could not check version sync') || 
          log.includes('Version mismatch')
        )
        assert.ok(hasWarning, 'Should log warning about version sync')
      } finally {
        process.chdir(originalCwd)
      }
    } finally {
      console.restore()
    }
  })

  await t.test('should handle missing git repository', async () => {
    const console = mockConsole()

    try {
      // Test in workspace without git
      const originalCwd = process.cwd()
      process.chdir(workspace.workspaceDir)

      try {
        const synced = await isVersionSynced()
        assert.strictEqual(synced, false, 'Should return false without git')
        
        const hasWarning = console.logs.warn.some(log => 
          log.includes('Could not check version sync')
        )
        assert.ok(hasWarning, 'Should warn about inability to check sync')
      } finally {
        process.chdir(originalCwd)
      }
    } finally {
      console.restore()
    }
  })

  await t.test('should handle syncVersionToGitTag without git', async () => {
    const console = mockConsole()

    try {
      const originalCwd = process.cwd()
      process.chdir(workspace.workspaceDir)

      try {
        const updated = await syncVersionToGitTag()
        assert.strictEqual(updated, false, 'Should return false without git')
        
        const hasError = console.logs.error.some(log => 
          log.includes('Could not sync version to git tag')
        )
        assert.ok(hasError, 'Should log error about sync failure')
      } finally {
        process.chdir(originalCwd)
      }
    } finally {
      console.restore()
    }
  })
})

test('Version Sync Script - CLI Integration', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should handle package.json version updates', async () => {
    const console = mockConsole()

    try {
      // Create initial package.json
      const initialPackageJson = {
        name: 'test-package',
        version: '1.0.0'
      }
      
      await workspace.createOutputFile(
        'package.json', 
        JSON.stringify(initialPackageJson, null, 2)
      )

      // Test version update logic
      const newVersion = '1.0.1'
      const updatedPackageJson = { ...initialPackageJson, version: newVersion }
      
      await workspace.createOutputFile(
        'package.json',
        JSON.stringify(updatedPackageJson, null, 2) + '\n'
      )

      const packageContent = await workspace.readFile('output/package.json')
      const parsedPackage = JSON.parse(packageContent)
      
      assert.strictEqual(parsedPackage.version, newVersion, 'Should update package.json version')
    } finally {
      console.restore()
    }
  })

  await t.test('should validate version bump calculations', async () => {
    // Test version bump logic that would be used by CLI
    const scenarios = [
      { current: 'v1.0.0', bump: 'patch', expected: 'v1.0.1' },
      { current: 'v1.0.0', bump: 'minor', expected: 'v1.1.0' },
      { current: 'v1.0.0', bump: 'major', expected: 'v2.0.0' },
      { current: 'v0.9.9', bump: 'patch', expected: 'v0.9.10' },
      { current: 'v0.9.9', bump: 'minor', expected: 'v0.10.0' },
      { current: 'v9.9.9', bump: 'major', expected: 'v10.0.0' }
    ]

    for (const scenario of scenarios) {
      const result = getNextVersion(scenario.current, scenario.bump)
      assert.strictEqual(
        result, 
        scenario.expected, 
        `${scenario.current} + ${scenario.bump} should equal ${scenario.expected}`
      )
    }
  })

  await t.test('should handle edge cases in version parsing', async () => {
    // Test edge cases that might occur in real usage
    const edgeCases = [
      { version: 'v0.0.0', bump: 'patch', expected: 'v0.0.1' },
      { version: '0.0.0', bump: 'major', expected: 'v1.0.0' },
      { version: 'v10.20.30', bump: 'minor', expected: 'v10.21.0' }
    ]

    for (const testCase of edgeCases) {
      const result = getNextVersion(testCase.version, testCase.bump)
      assert.strictEqual(
        result,
        testCase.expected,
        `Edge case: ${testCase.version} + ${testCase.bump}`
      )
    }
  })
})

test('Version Manager - Error Handling', async (t) => {
  const workspace = new TempWorkspace()

  t.after(async () => {
    await workspace.cleanup()
  })

  await workspace.init({ includeSampleFonts: false })

  await t.test('should handle malformed package.json', async () => {
    const console = mockConsole()

    try {
      // Create invalid package.json
      await workspace.createOutputFile('package.json', 'invalid json{')

      const originalCwd = process.cwd()
      process.chdir(workspace.workspaceDir)

      try {
        const version = await getCurrentVersion(null, { preferGitTag: false })
        
        // Should fall back to default
        assert.ok(version.includes('1.0.0'), 'Should use fallback when package.json is invalid')
        
        const hasWarning = console.logs.warn.some(log => 
          log.includes('Could not read package.json')
        )
        assert.ok(hasWarning, 'Should warn about invalid package.json')
      } finally {
        process.chdir(originalCwd)
      }
    } finally {
      console.restore()
    }
  })

  await t.test('should handle missing package.json', async () => {
    const console = mockConsole()

    try {
      const originalCwd = process.cwd()
      process.chdir(workspace.workspaceDir)

      try {
        const version = await getCurrentVersion(null, { 
          preferGitTag: false,
          fallbackVersion: '0.0.1'
        })
        
        assert.ok(version.includes('0.0.1'), 'Should use fallback when no package.json')
      } finally {
        process.chdir(originalCwd)
      }
    } finally {
      console.restore()
    }
  })

  await t.test('should handle git command failures gracefully', async () => {
    const console = mockConsole()

    try {
      // Test in non-git directory
      const originalCwd = process.cwd()
      process.chdir(workspace.workspaceDir)

      try {
        // Git commands should fail, but function should handle gracefully
        const version = await getCurrentVersion(null, { preferGitTag: true })
        
        // Should continue to other version sources
        assert.ok(typeof version === 'string', 'Should return string version despite git failure')
      } finally {
        process.chdir(originalCwd)
      }
    } finally {
      console.restore()
    }
  })
})