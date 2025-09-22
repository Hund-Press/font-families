#!/usr/bin/env node

/**
 * Streamlined Release Script
 *
 * Handles complete release workflow:
 * 1. Bump version in package.json
 * 2. Rebuild all resources with new version
 * 3. Commit changes
 * 4. Create git tag
 * 5. Push to GitHub
 */

import { promises as fs } from 'fs'
import { execSync } from 'child_process'
import { getCurrentVersion, getNextVersion } from '../utils/version-manager.js'

const args = process.argv.slice(2)
const bumpType = args[0] || 'patch'

async function release() {
  console.log(`🚀 Starting ${bumpType} release...\n`)

  try {
    // 1. Get current version and calculate next version
    const currentVersion = await getCurrentVersion()
    const nextVersion = getNextVersion(currentVersion, bumpType)

    console.log(`📦 Version: ${currentVersion} → ${nextVersion}`)

    // 2. Update package.json version
    console.log('\n📝 Updating package.json...')
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'))
    packageJson.version = nextVersion.replace(/^v/, '')
    await fs.writeFile(
      'package.json',
      JSON.stringify(packageJson, null, 2) + '\n'
    )

    // 3. Rebuild all resources with new version
    console.log('\n🔨 Rebuilding resources with new version...')
    execSync('npm run build', { stdio: 'inherit' })

    // 4. Check for changes to commit
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' })
    if (!gitStatus.trim()) {
      console.log('⚠️  No changes detected after build. Aborting release.')
      return
    }

    // 5. Stage all changes
    console.log('\n📋 Staging changes...')
    execSync('git add .', { stdio: 'inherit' })

    // 6. Commit with descriptive message
    const commitMessage = `Release ${nextVersion}

🔖 Generated with font-families release tooling

Co-Authored-By: Claude <noreply@anthropic.com>`

    console.log('\n💾 Committing changes...')
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' })

    // 7. Create git tag
    console.log('\n🏷️  Creating git tag...')
    execSync(`git tag ${nextVersion}`, { stdio: 'inherit' })

    // 8. Push changes and tags
    console.log('\n⬆️  Pushing to GitHub...')
    execSync('git push origin main', { stdio: 'inherit' })
    execSync(`git push origin ${nextVersion}`, { stdio: 'inherit' })

    console.log(`\n✅ Release ${nextVersion} complete!`)
    console.log(`📦 Resources will be available on jsDelivr shortly at:`)
    console.log(`   https://cdn.jsdelivr.net/gh/hund-press/font-families@${nextVersion}/`)
    console.log(`\n🌐 Site deployment will begin automatically`)

  } catch (error) {
    console.error('\n❌ Release failed:', error.message)
    console.log('\n🔍 You may need to:')
    console.log('   - Check for uncommitted changes')
    console.log('   - Resolve any merge conflicts')
    console.log('   - Ensure you have push access to the repository')
    process.exit(1)
  }
}

function showUsage() {
  console.log(`
🚀 Font Families Release Tool

Usage: node src/build-tools/scripts/release.js [bump-type]

Bump Types:
  patch    1.0.0 → 1.0.1 (default)
  minor    1.0.0 → 1.1.0
  major    1.0.0 → 2.0.0

This will:
  1. Bump the version in package.json
  2. Rebuild all resources with the new version
  3. Commit all changes
  4. Create a git tag
  5. Push changes and tag to GitHub

Examples:
  npm run release          # patch release
  npm run release minor    # minor release
  npm run release major    # major release
`)
}

if (args.includes('--help') || args.includes('-h')) {
  showUsage()
  process.exit(0)
}

if (!['patch', 'minor', 'major'].includes(bumpType)) {
  console.error(`❌ Invalid bump type: ${bumpType}`)
  showUsage()
  process.exit(1)
}

release().catch(console.error)