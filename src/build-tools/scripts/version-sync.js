#!/usr/bin/env node

/**
 * Version Synchronization Script
 *
 * Ensures version consistency between package.json and git tags
 */

import {
  getCurrentVersion,
  isVersionSynced,
  syncVersionToGitTag,
  getNextVersion,
} from '../utils/version-manager.js'
import { execSync } from 'child_process'

const args = process.argv.slice(2)
const command = args[0]

async function main() {
  switch (command) {
    case 'check':
      await checkVersionSync()
      break
    case 'sync':
      await syncVersion()
      break
    case 'bump':
      const bumpType = args[1] || 'patch'
      await bumpVersion(bumpType)
      break
    case 'current':
      await showCurrentVersion()
      break
    default:
      showUsage()
  }
}

async function checkVersionSync() {
  console.log('🔍 Checking version synchronization...\n')

  const currentVersion = await getCurrentVersion()
  const synced = await isVersionSynced()

  console.log(`Current version: ${currentVersion}`)
  console.log(`Synchronized: ${synced ? '✅' : '❌'}`)

  if (!synced) {
    console.log('\n💡 Run `npm run version:sync` to synchronize versions')
    process.exit(1)
  }
}

async function syncVersion() {
  console.log('🔄 Synchronizing versions...\n')

  const updated = await syncVersionToGitTag()

  if (updated) {
    console.log('✅ package.json version updated to match git tag')
  } else {
    console.log('ℹ️  Versions already synchronized')
  }
}

async function bumpVersion(bumpType) {
  console.log(`📈 Bumping ${bumpType} version...\n`)

  try {
    // Get current version
    const currentVersion = await getCurrentVersion()
    const nextVersion = getNextVersion(currentVersion, bumpType)

    console.log(`${currentVersion} → ${nextVersion}`)

    // Update package.json
    const { promises: fs } = await import('fs')
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'))
    packageJson.version = nextVersion.replace(/^v/, '')
    await fs.writeFile(
      'package.json',
      JSON.stringify(packageJson, null, 2) + '\n'
    )

    // Commit and tag
    execSync(`git add package.json`)
    execSync(`git commit -m "Bump version to ${nextVersion}"`)
    execSync(`git tag ${nextVersion}`)

    console.log(`✅ Version bumped and tagged: ${nextVersion}`)
    console.log(`💡 Run 'git push origin ${nextVersion}' to publish`)
  } catch (error) {
    console.error('❌ Failed to bump version:', error.message)
    process.exit(1)
  }
}

async function showCurrentVersion() {
  const version = await getCurrentVersion()
  console.log(version)
}

function showUsage() {
  console.log(`
🏷️  Version Management Tool

Usage: node src/build-tools/scripts/version-sync.js <command>

Commands:
  check     Check if package.json and git tag are synchronized
  sync      Sync package.json version to match latest git tag
  bump      Bump version (patch|minor|major) and create tag
  current   Show current version

Examples:
  npm run version:check
  npm run version:sync
  npm run version:bump patch
  npm run version:bump minor
`)
}

main().catch(console.error)
