/**
 * Tests for FontTools Analyzer - Utility Functions Only
 *
 * Note: This test file only covers pure utility functions.
 * The main font analysis functions (extractCanonicalFamilyName, normalizeFont, etc.)
 * require actual font files and fontTools Python dependencies, so they are tested
 * in integration tests rather than unit tests.
 */

import { test } from 'node:test'
import assert from 'node:assert'
import {
  generateKey,
  formatFamilyName
} from '../../../src/build-tools/scanners/fonttools-analyzer.js'

test('FontTools Analyzer - generateKey', async () => {
  assert.strictEqual(generateKey('Open Sans'), 'open-sans')
  assert.strictEqual(generateKey('Source Code Pro'), 'source-code-pro')
  assert.strictEqual(generateKey('JetBrains Mono'), 'jetbrains-mono')
  assert.strictEqual(generateKey('Inter'), 'inter')
  assert.strictEqual(generateKey('IBM Plex Sans'), 'ibm-plex-sans')
  assert.strictEqual(generateKey(''), '')

  // Test with special characters
  assert.strictEqual(generateKey('Font-Name'), 'font-name')
  assert.strictEqual(generateKey('Font_Name'), 'font-name')
  assert.strictEqual(generateKey('Font.Name'), 'font-name')
})

test('FontTools Analyzer - formatFamilyName', async () => {
  assert.strictEqual(formatFamilyName('open-sans'), 'Open Sans')
  assert.strictEqual(formatFamilyName('source-code-pro'), 'Source Code Pro')
  assert.strictEqual(formatFamilyName('jetbrains-mono'), 'Jetbrains Mono')
  assert.strictEqual(formatFamilyName('ibm-plex-sans'), 'Ibm Plex Sans') // General formatting
  assert.strictEqual(formatFamilyName('inter'), 'Inter')
  assert.strictEqual(formatFamilyName(''), '')
})

test('FontTools Analyzer - Edge Cases', async (t) => {
  await t.test('should handle empty or null inputs', () => {
    assert.strictEqual(generateKey(null), null)
    assert.strictEqual(generateKey(undefined), undefined)
    assert.strictEqual(formatFamilyName(null), null)
    assert.strictEqual(formatFamilyName(undefined), undefined)
  })

  await t.test('should handle whitespace', () => {
    assert.strictEqual(generateKey('  Open Sans  '), 'open-sans')
    assert.strictEqual(formatFamilyName('  open-sans  '), ' Open Sans ') // Preserves leading/trailing spaces
  })

  await t.test('should handle special characters in generateKey', () => {
    assert.strictEqual(generateKey('Font-Name'), 'font-name')
    assert.strictEqual(generateKey('Font_Name'), 'font-name')
    assert.strictEqual(generateKey('Font.Name'), 'font-name')
    assert.strictEqual(generateKey('Noto Sans CJK JP'), 'noto-sans-cjk-jp')
  })

  await t.test('should handle special font names in formatFamilyName', () => {
    // Test special cases that are hard-coded
    assert.strictEqual(formatFamilyName('plex-sans'), 'IBM Plex Sans')
    assert.strictEqual(formatFamilyName('public-sans'), 'Public Sans')
    assert.strictEqual(formatFamilyName('crimson-pro'), 'Crimson Pro')
  })
})

test('FontTools Analyzer - Round-trip Processing', async () => {
  // Test round-trip processing for utility functions only
  const testCases = [
    'Open Sans',
    'Source Code Pro',
    'JetBrains Mono',
    'Inter'
  ]

  testCases.forEach(original => {
    const key = generateKey(original)
    const formatted = formatFamilyName(key)

    // Should generate valid keys and formatted names
    assert.ok(key.length > 0, `Should generate non-empty key for ${original}`)
    assert.ok(formatted.length > 0, `Should generate non-empty formatted name for ${original}`)
    assert.ok(!key.includes(' '), `Key should not contain spaces: ${key}`)
    assert.ok(formatted.includes(' ') || formatted.length <= 10, `Formatted name should contain spaces or be short: ${formatted}`)
  })
})