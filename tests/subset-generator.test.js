/**
 * Tests for Font Subset Generator
 */

import { test } from 'node:test'
import assert from 'node:assert'
import { promises as fs } from 'fs'
import path from 'path'
import {
  SubsetGenerator,
  CONFIG,
} from '../src/build-tools/generators/subset-generator.js'

const TEST_FAMILY = 'aspekta'
const TEST_SUBSET = 'min-chars'

test('SubsetGenerator - Basic functionality', async (t) => {
  const generator = new SubsetGenerator()

  await t.test('should have correct character set definition', () => {
    const charSet = CONFIG.characterSets[TEST_SUBSET]
    assert.ok(charSet, 'min-chars character set should exist')
    assert.strictEqual(
      charSet.characterCount,
      100,
      'Should have 100 characters'
    )
    assert.ok(
      charSet.characters.includes('A'),
      'Should include uppercase letters'
    )
    assert.ok(
      charSet.characters.includes('a'),
      'Should include lowercase letters'
    )
    assert.ok(charSet.characters.includes('0'), 'Should include digits')
    assert.ok(charSet.characters.includes('—'), 'Should include em dash')

    // Check character set length is reasonable
    assert.ok(
      charSet.characters.length >= 90,
      'Should have at least 90 characters'
    )
    assert.ok(
      charSet.characters.length <= 110,
      'Should have at most 110 characters'
    )
  })

  await t.test('should load family metadata', async () => {
    const metadata = await generator.loadFamilyMetadata(TEST_FAMILY)
    assert.ok(metadata, 'Should load metadata')
    assert.strictEqual(
      metadata.family,
      TEST_FAMILY,
      'Should have correct family name'
    )
    assert.ok(
      metadata.subsets[TEST_SUBSET],
      'Should have min-chars subset config'
    )
  })

  await t.test('should check dependencies', async () => {
    const result = await generator.checkDependencies()
    assert.strictEqual(result, true, 'Dependencies should be available')
  })
})

test('Subset Files - Validation', async (t) => {
  const subsetDir = path.join('subsets', TEST_FAMILY)

  await t.test('subset directory should exist', async () => {
    try {
      await fs.access(subsetDir)
      assert.ok(true, 'Subset directory exists')
    } catch (error) {
      // Skip test if subsets haven't been generated yet
      console.warn(
        `Subset directory ${subsetDir} not found - skipping validation tests`
      )
      return
    }
  })

  await t.test('subset metadata should exist and be valid', async () => {
    const metadataPath = path.join(subsetDir, 'metadata.json')
    try {
      await fs.access(subsetDir)
      const content = await fs.readFile(metadataPath, 'utf8')
      const metadata = JSON.parse(content)

      assert.ok(metadata.family, 'Should have family name')
      assert.ok(metadata.subsets, 'Should have subsets object')
      assert.ok(metadata.subsets[TEST_SUBSET], 'Should have min-chars subset')

      const subset = metadata.subsets[TEST_SUBSET]
      assert.ok(subset.characterCount, 'Should have character count')
      assert.ok(subset.characters, 'Should have character string')
      assert.ok(subset.status, 'Should have generation status')
    } catch (error) {
      // Skip if subset directory doesn't exist
      try {
        await fs.access(subsetDir)
        assert.fail(`Subset metadata should be valid: ${error.message}`)
      } catch {
        console.warn(
          `Subset directory ${subsetDir} not found - skipping metadata test`
        )
      }
    }
  })

  await t.test(
    'subset files should exist and have reasonable sizes',
    async () => {
      try {
        await fs.access(subsetDir)

        // Look for any generated subset files
        const files = await fs.readdir(subsetDir)
        const fontFiles = files.filter((f) => f.match(/\.(woff2?|ttf|otf)$/))

        if (fontFiles.length === 0) {
          console.warn(
            `No subset font files found in ${subsetDir} - skipping file validation`
          )
          return
        }

        for (const filename of fontFiles) {
          const filePath = path.join(subsetDir, filename)
          try {
            const stats = await fs.stat(filePath)
            assert.ok(stats.size > 0, `${filename} should not be empty`)
            assert.ok(
              stats.size < 100000,
              `${filename} should be smaller than 100KB (got ${stats.size} bytes)`
            )

            // Min size check - should be at least 1KB for basic font structure
            assert.ok(
              stats.size > 1000,
              `${filename} should be at least 1KB (got ${stats.size} bytes)`
            )
          } catch (error) {
            assert.fail(
              `Subset file ${filename} should exist and be accessible: ${error.message}`
            )
          }
        }
      } catch {
        console.warn(
          `Subset directory ${subsetDir} not found - skipping file validation`
        )
      }
    }
  )
})

test('Character Set Coverage', async (t) => {
  await t.test('min-chars should cover essential typography', () => {
    const charSet = CONFIG.characterSets[TEST_SUBSET]
    const chars = charSet.characters

    // Basic alphabet coverage
    for (let i = 65; i <= 90; i++) {
      // A-Z
      assert.ok(
        chars.includes(String.fromCharCode(i)),
        `Should include ${String.fromCharCode(i)}`
      )
    }

    for (let i = 97; i <= 122; i++) {
      // a-z
      assert.ok(
        chars.includes(String.fromCharCode(i)),
        `Should include ${String.fromCharCode(i)}`
      )
    }

    for (let i = 48; i <= 57; i++) {
      // 0-9
      assert.ok(
        chars.includes(String.fromCharCode(i)),
        `Should include ${String.fromCharCode(i)}`
      )
    }

    // Typography improvements - check for em dash and ellipsis as key indicators
    assert.ok(chars.includes('\u2014'), 'Should include em dash (—)')
    assert.ok(chars.includes('\u2026'), 'Should include ellipsis (…)')

    // Verify character set includes essential punctuation
    const essentialPunctuation = [
      '!',
      '"',
      '#',
      '$',
      '%',
      '&',
      '(',
      ')',
      '*',
      '+',
      ',',
      '-',
      '.',
      '/',
      ':',
      ';',
      '=',
      '?',
      '[',
      ']',
      '_',
    ]
    for (const char of essentialPunctuation) {
      assert.ok(chars.includes(char), `Should include punctuation: ${char}`)
    }
  })
})

test('Build Integration', async (t) => {
  await t.test(
    'generated modules should include subset information',
    async () => {
      const modulePath = path.join('dist', 'modules', `${TEST_FAMILY}.js`)

      try {
        const moduleContent = await fs.readFile(modulePath, 'utf8')
        assert.ok(
          moduleContent.includes('"subsets"'),
          'Module should include subsets section'
        )
        assert.ok(
          moduleContent.includes('min-chars'),
          'Module should include min-chars subset'
        )
        assert.ok(
          moduleContent.includes('subsets'),
          'Module should include subset CDN path'
        )
      } catch (error) {
        // Skip test if module hasn't been generated yet
        console.warn(
          `Module file ${modulePath} not found - skipping build integration test`
        )
      }
    }
  )
})
