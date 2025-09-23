/**
 * Tests for Contributor CLI - Testable Functions Only
 *
 * Note: The parseArgs function depends on process.argv and is not easily unit testable.
 * This test file focuses on testing functions that can be tested in isolation.
 */

import { test } from 'node:test'
import assert from 'node:assert'
import { showExample } from '../../../src/build-tools/cli/contributor-cli.js'
import { mockConsole } from '../../helpers/test-helpers.js'

test('Contributor CLI - showExample', async () => {
  const consoleMock = mockConsole()

  try {
    await showExample()

    // Should print example content
    const output = consoleMock.logs.log.join('\n')
    assert.ok(output.includes('EXAMPLE: Well-Structured Font Contribution'))
    assert.ok(output.includes('Aspekta'))
    assert.ok(output.includes('QUICK START'))
  } finally {
    consoleMock.restore()
  }
})

test('Contributor CLI - Function Availability', async () => {
  // Test that the CLI functions can be imported without errors
  const cli = await import('../../../src/build-tools/cli/contributor-cli.js')

  assert.ok(typeof cli.showExample === 'function', 'showExample should be a function')
  assert.ok(typeof cli.parseArgs === 'function', 'parseArgs should be a function')
  assert.ok(typeof cli.main === 'function', 'main should be a function')
})