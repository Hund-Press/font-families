#!/usr/bin/env node

/**
 * Font-Families Build System
 * 
 * Master build process that:
 * 1. Scans fonts in both open-fonts/ and restricted-fonts/
 * 2. Generates separate catalogs: catalog.json (open only) and complete-catalog.json (all)
 * 3. Creates ES modules for open fonts only (public CDN)
 * 4. Validates licensing and file integrity
 * 5. Builds catalog site with open fonts only
 */

import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { scanFontFamilies } from '../scanners/ufr-scanner.js';
import { generateModules } from '../generators/module-generator.js';
import { generateCatalog } from '../generators/catalog-generator.js';
import { validateLicensing } from '../scanners/validation.js';
import { SubsetGenerator } from '../generators/subset-generator.js';

const execAsync = promisify(exec);

const BUILD_CONFIG = {
    // Font source directories
    openFontsDir: './fonts/open-fonts',
    restrictedFontsDir: './fonts/restricted-fonts', 
    
    // Build output directories
    distDir: './dist',
    modulesDir: './dist/modules',
    apiDir: './dist/api',
    siteDir: './dist/site',
    
    // Working directories
    workingDir: './.font-families-build',
    manifestsDir: './.font-families-build/manifests'
};

/**
 * Main build orchestration function
 */
async function build() {
    console.log('[build] Starting font-families build process...');
    
    try {
        // Ensure all directories exist
        await ensureDirectories();
        
        // Phase 1: Scan and process all fonts
        console.log('[build] Phase 1: Font scanning and processing');
        const { openFonts, restrictedFonts, allFonts } = await scanAllFonts();
        
        // Phase 2: License validation
        console.log('[build] Phase 2: License validation');
        await validateAllLicensing(openFonts, restrictedFonts);
        
        // Phase 3: Generate catalogs
        console.log('[build] Phase 3: Catalog generation');
        await generateAllCatalogs(openFonts, allFonts);
        
        // Phase 4: Generate font subsets (open fonts only)
        console.log('[build] Phase 4: Font subset generation');
        await generateAllSubsets(openFonts);
        
        // Phase 5: Generate ES modules (open fonts only for public CDN)
        console.log('[build] Phase 5: ES module generation');
        await generateAllModules(openFonts);
        
        // Phase 6: Build catalog site (open fonts only)
        console.log('[build] Phase 6: Catalog site generation');
        await buildCatalogSite(openFonts);
        
        // Phase 7: Final validation and summary
        console.log('[build] Phase 7: Final validation');
        await finalValidation();
        
        console.log('[build] ✅ Build completed successfully!');
        console.log(`[build] Open fonts: ${Object.keys(openFonts).length}`);
        console.log(`[build] Restricted fonts: ${Object.keys(restrictedFonts).length}`);
        console.log(`[build] Total fonts: ${Object.keys(allFonts).length}`);
        
    } catch (error) {
        console.error('[build] ❌ Build failed:', error);
        process.exit(1);
    }
}

/**
 * Ensure all required directories exist
 */
async function ensureDirectories() {
    const dirs = [
        BUILD_CONFIG.distDir,
        BUILD_CONFIG.modulesDir,
        BUILD_CONFIG.apiDir,
        BUILD_CONFIG.siteDir,
        BUILD_CONFIG.workingDir,
        BUILD_CONFIG.manifestsDir
    ];
    
    for (const dir of dirs) {
        await fs.mkdir(dir, { recursive: true });
    }
}

/**
 * Scan fonts in both open-fonts and restricted-fonts directories
 */
async function scanAllFonts() {
    const openFonts = {};
    const restrictedFonts = {};
    
    // Scan open fonts directory
    try {
        await fs.access(BUILD_CONFIG.openFontsDir);
        console.log(`[build] Scanning open fonts at ${BUILD_CONFIG.openFontsDir}`);
        const openFontData = await scanFontFamilies(
            BUILD_CONFIG.openFontsDir, 
            path.join(BUILD_CONFIG.workingDir, 'open')
        );
        Object.assign(openFonts, openFontData);
    } catch (error) {
        console.log(`[build] No open fonts directory found at ${BUILD_CONFIG.openFontsDir}`);
    }
    
    // Scan restricted fonts directory  
    try {
        await fs.access(BUILD_CONFIG.restrictedFontsDir);
        console.log(`[build] Scanning restricted fonts at ${BUILD_CONFIG.restrictedFontsDir}`);
        const restrictedFontData = await scanFontFamilies(
            BUILD_CONFIG.restrictedFontsDir,
            path.join(BUILD_CONFIG.workingDir, 'restricted') 
        );
        Object.assign(restrictedFonts, restrictedFontData);
    } catch (error) {
        console.log(`[build] No restricted fonts directory found at ${BUILD_CONFIG.restrictedFontsDir}`);
    }
    
    // Legacy support: scan only the aspekta directory specifically
    try {
        await fs.access('./aspekta');
        console.log(`[build] Scanning legacy font directory: ./aspekta`);
        const familyData = await scanFontFamilies(
            './aspekta',
            path.join(BUILD_CONFIG.workingDir, 'legacy')
        );
        
        // Add to open fonts (Aspekta is OFL licensed)
        Object.assign(openFonts, familyData);
    } catch (error) {
        console.log(`[build] No legacy aspekta directory found`);
    }
    
    const allFonts = { ...openFonts, ...restrictedFonts };
    
    return { openFonts, restrictedFonts, allFonts };
}

/**
 * Validate licensing for all fonts
 */
async function validateAllLicensing(openFonts, restrictedFonts) {
    // Validate that open fonts have acceptable licenses
    for (const [familyKey, familyData] of Object.entries(openFonts)) {
        const isValidOpenLicense = await validateLicensing(familyData, 'open');
        if (!isValidOpenLicense) {
            console.warn(`[build] ⚠️  Font family ${familyData.name} may not have valid open license`);
        }
    }
    
    // Log restricted fonts (no validation needed for private use)
    for (const [familyKey, familyData] of Object.entries(restrictedFonts)) {
        console.log(`[build] Restricted font: ${familyData.name} (license: ${familyData.license || 'unknown'})`);
    }
}

/**
 * Generate all catalog files
 */
async function generateAllCatalogs(openFonts, allFonts) {
    // Generate public catalog (open fonts only)
    await generateCatalog(openFonts, path.join(BUILD_CONFIG.apiDir, 'catalog.json'), {
        includeRestrictedFonts: false,
        title: 'Font Families - Open Font Collection',
        description: 'Curated collection of open-licensed fonts'
    });
    
    // Generate complete catalog (all fonts) 
    await generateCatalog(allFonts, path.join(BUILD_CONFIG.apiDir, 'complete-catalog.json'), {
        includeRestrictedFonts: true,
        title: 'Font Families - Complete Collection', 
        description: 'Complete font collection including restricted-licensed fonts'
    });
    
    // Generate metadata files for individual fonts
    const metadataDir = path.join(BUILD_CONFIG.apiDir, 'metadata');
    await fs.mkdir(metadataDir, { recursive: true });
    
    for (const [familyKey, familyData] of Object.entries(allFonts)) {
        const metadataPath = path.join(metadataDir, `${familyData.slug}.json`);
        await fs.writeFile(metadataPath, JSON.stringify(familyData, null, 2));
    }
}

/**
 * Generate font subsets for all font families
 */
async function generateAllSubsets(openFonts) {
    const generator = new SubsetGenerator();
    
    try {
        // Check dependencies first
        await generator.checkDependencies();
        
        for (const [familyKey, familyData] of Object.entries(openFonts)) {
            try {
                console.log(`[build] Checking subsets for ${familyData.slug}...`);
                await generator.processFamily(familyData.slug, ['min-chars'], false); // incremental by default
                await generator.updateFamilyMetadata(familyData.slug, 'min-chars');
            } catch (error) {
                // Log error but continue with other families
                console.warn(`[build] ⚠️ Subset generation failed for ${familyData.slug}: ${error.message}`);
            }
        }
        
        // Show summary
        generator.generateReport();
        
    } catch (error) {
        console.error(`[build] ❌ Subset generation failed: ${error.message}`);
        // Don't fail entire build for subset generation issues
        console.log(`[build] Continuing build without subsets...`);
    }
}

/**
 * Generate ES modules (open fonts only for public CDN)
 */
async function generateAllModules(openFonts) {
    // Get repository version from package.json
    let repoVersion;
    try {
        const packageJson = JSON.parse(await fs.readFile('./package.json', 'utf8'));
        repoVersion = packageJson.version;
    } catch (error) {
        console.warn('[build] Could not read package.json version, using environment variable');
        repoVersion = process.env.npm_package_version || 'latest';
    }
    
    console.log(`[modules] Using repository version: ${repoVersion}`);
    
    await generateModules(openFonts, BUILD_CONFIG.modulesDir, {
        generateIndividualModules: true,
        generateCombinedModule: true,
        cdnBaseUrl: 'https://cdn.jsdelivr.net/gh/hund-press/font-families@{version}',
        repoVersion: repoVersion
    });
}

/**
 * Build catalog site (open fonts only)
 */
async function buildCatalogSite(openFonts) {
    // Get version from package.json
    let version;
    try {
        const packageJson = JSON.parse(await fs.readFile('./package.json', 'utf8'));
        version = packageJson.version;
    } catch (error) {
        console.warn('[build] Could not read package.json version for site build');
        version = process.env.npm_package_version || '1.0.0';
    }
    
    // Create Eleventy data file
    const dataDir = path.join('./site/_data');
    await fs.mkdir(dataDir, { recursive: true });
    
    const fontFamiliesData = {
        fonts: openFonts,
        buildInfo: {
            timestamp: new Date().toISOString(),
            version: version,
            fontCount: Object.keys(openFonts).length
        }
    };
    
    await fs.writeFile(
        path.join(dataDir, 'fontFamilies.js'),
        `export default ${JSON.stringify(fontFamiliesData, null, 2)}`
    );
    
    console.log(`[build] Created Eleventy data file with ${Object.keys(openFonts).length} font families`);
    
    try {
        // Run Eleventy build process to generate catalog site
        console.log(`[build] Running Eleventy build...`);
        const { stdout, stderr } = await execAsync('npx @11ty/eleventy --config=eleventy.config.js', {
            cwd: process.cwd()
        });
        
        if (stdout) console.log(`[eleventy] ${stdout}`);
        if (stderr) console.warn(`[eleventy] ${stderr}`);
        
        console.log(`[build] ✅ Catalog site generated successfully`);
        
    } catch (error) {
        console.error(`[build] ❌ Eleventy build failed:`, error.message);
        throw error;
    }
}

/**
 * Final validation of build outputs
 */
async function finalValidation() {
    const requiredFiles = [
        path.join(BUILD_CONFIG.apiDir, 'catalog.json'),
        path.join(BUILD_CONFIG.apiDir, 'complete-catalog.json'),
        path.join(BUILD_CONFIG.modulesDir, 'index.js'),
        path.join('./site/_data', 'fontFamilies.js')
    ];
    
    for (const file of requiredFiles) {
        try {
            await fs.access(file);
            console.log(`[build] ✅ ${file}`);
        } catch (error) {
            throw new Error(`Missing required build output: ${file}`);
        }
    }
    
    // Validate subset files
    await validateSubsets();
}

/**
 * Validate generated subset files
 */
async function validateSubsets() {
    const subsetsDir = '_subsets';
    
    try {
        const families = await fs.readdir(subsetsDir);
        let totalSubsets = 0;
        let validSubsets = 0;
        
        for (const family of families) {
            if (family.startsWith('.') || family === 'README.md') continue;
            
            try {
                const familyMetadataPath = path.join(subsetsDir, family, 'metadata.json');
                const metadata = JSON.parse(await fs.readFile(familyMetadataPath, 'utf8'));
                
                for (const [subsetName, subsetConfig] of Object.entries(metadata.subsets || {})) {
                    if (subsetConfig.status === 'generated') {
                        totalSubsets++;
                        
                        const subsetDir = path.join(subsetsDir, family, subsetName);
                        const subsetMetadataPath = path.join(subsetDir, 'metadata.json');
                        
                        try {
                            // Check subset metadata exists
                            await fs.access(subsetMetadataPath);
                            
                            // Check subset files exist
                            const subsetMetadata = JSON.parse(await fs.readFile(subsetMetadataPath, 'utf8'));
                            let filesValid = true;
                            
                            for (const file of subsetMetadata.files || []) {
                                const filePath = path.join(subsetDir, file.filename);
                                try {
                                    const stats = await fs.stat(filePath);
                                    if (stats.size === 0) {
                                        console.warn(`[build] ⚠️  Empty subset file: ${filePath}`);
                                        filesValid = false;
                                    }
                                } catch (e) {
                                    console.warn(`[build] ⚠️  Missing subset file: ${filePath}`);
                                    filesValid = false;
                                }
                            }
                            
                            if (filesValid) {
                                validSubsets++;
                                console.log(`[build] ✅ Subset ${family}/${subsetName} (${subsetMetadata.files?.length || 0} files)`);
                            }
                            
                        } catch (error) {
                            console.warn(`[build] ⚠️  Invalid subset: ${family}/${subsetName} - ${error.message}`);
                        }
                    }
                }
            } catch (error) {
                console.warn(`[build] ⚠️  Could not validate subsets for ${family}: ${error.message}`);
            }
        }
        
        if (totalSubsets > 0) {
            console.log(`[build] ✅ Subset validation: ${validSubsets}/${totalSubsets} subsets valid`);
        } else {
            console.log(`[build] ℹ️  No generated subsets found`);
        }
        
    } catch (error) {
        console.log(`[build] ℹ️  No subsets directory found - skipping validation`);
    }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
    build().catch(error => {
        console.error('Build failed:', error);
        process.exit(1);
    });
}

export { build, BUILD_CONFIG };