#!/usr/bin/env node

/**
 * Font Subset Generator
 * 
 * Generates minimal font subsets using fonttools pyftsubset.
 * Creates performance-optimized subsets while preserving licensing and attribution.
 * 
 * Usage:
 *   node subset-generator.js [family-name]
 *   npm run generate-subsets [family-name]
 */

import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const CONFIG = {
    subsetsDir: './_subsets',
    fontsDir: './fonts/open-fonts',
    // Character sets for different subset types
    characterSets: {
        'min-chars': {
            name: 'min-chars',
            description: 'Minimal character set for performance-critical contexts',
            characters: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"#$%&'()*+,-./:;=?[]_ —–''""…`,
            unicodeRanges: [
                'U+0020-007F',  // Basic Latin
                'U+00A0',       // Non-breaking space
                'U+2013-2014',  // En dash, Em dash
                'U+2018-2019',  // Curly single quotes
                'U+201C-201D',  // Curly double quotes
                'U+2026'        // Ellipsis
            ],
            characterCount: 100
        }
    }
};

/**
 * Font Subset Generator Class
 */
class SubsetGenerator {
    constructor() {
        this.errors = [];
        this.successes = [];
    }

    /**
     * Check if fonttools is available in venv
     */
    async checkDependencies() {
        try {
            // Try venv first, then system
            await execAsync('source .venv/bin/activate && pyftsubset --help');
            console.log('✓ fonttools pyftsubset available in virtual environment');
            return true;
        } catch (error) {
            try {
                await execAsync('pyftsubset --help');
                console.log('✓ fonttools pyftsubset available system-wide');
                return true;
            } catch (systemError) {
                console.error('✗ fonttools not found. Run: python3 -m venv .venv && source .venv/bin/activate && pip install fonttools brotli');
                throw new Error('Required dependency fonttools not available');
            }
        }
    }

    /**
     * Load family subset metadata
     */
    async loadFamilyMetadata(familyName) {
        const metadataPath = path.join(CONFIG.subsetsDir, familyName, 'metadata.json');
        
        try {
            const content = await fs.readFile(metadataPath, 'utf8');
            return JSON.parse(content);
        } catch (error) {
            throw new Error(`Could not load metadata for ${familyName}: ${error.message}`);
        }
    }

    /**
     * Generate subset using fonttools pyftsubset
     */
    async generateSubset(inputPath, outputPath, characterSet, options = {}) {
        const {
            flavor = 'woff2',
            desubroutinize = true,
            withZopfli = true
        } = options;

        // Escape characters for shell command
        const escapedChars = characterSet.characters.replace(/"/g, '\\"');
        
        const baseCommand = [
            'pyftsubset',
            `"${inputPath}"`,
            `--text="${escapedChars}"`,
            `--output-file="${outputPath}"`,
            flavor ? `--flavor=${flavor}` : '',  // Only add flavor if specified
            desubroutinize ? '--desubroutinize' : '',
            withZopfli && flavor === 'woff2' ? '--with-zopfli' : '',
            '--layout-features-=kern',  // Remove kerning for size
            '--drop-tables+=GPOS,GSUB', // Remove advanced typography tables
            '--no-hinting'              // Remove hinting for smaller size
        ].filter(Boolean).join(' ');

        // Try venv first, then system
        const command = `source .venv/bin/activate && ${baseCommand}`;

        console.log(`Generating subset: ${path.basename(outputPath)}`);
        console.log(`Command: ${command}`);

        try {
            const { stdout, stderr } = await execAsync(command, { 
                timeout: 30000,  // 30 second timeout
                maxBuffer: 1024 * 1024 // 1MB buffer
            });

            if (stderr && !stderr.includes('WARNING')) {
                console.warn(`Warnings during subset generation: ${stderr}`);
            }

            // Verify output file exists and has reasonable size
            const stats = await fs.stat(outputPath);
            if (stats.size === 0) {
                throw new Error('Generated subset file is empty');
            }

            console.log(`✓ Generated ${path.basename(outputPath)} (${(stats.size / 1024).toFixed(1)}KB)`);
            return {
                success: true,
                outputPath,
                size: stats.size,
                command
            };

        } catch (error) {
            console.error(`✗ Failed to generate ${path.basename(outputPath)}: ${error.message}`);
            throw error;
        }
    }

    /**
     * Create subset metadata file
     */
    async createSubsetMetadata(subsetDir, subsetName, characterSet, generatedFiles, sourceMetadata) {
        const metadata = {
            subset: subsetName,
            description: characterSet.description,
            characters: characterSet.characters,
            unicodeRanges: characterSet.unicodeRanges,
            characterCount: characterSet.characterCount,
            generatedAt: new Date().toISOString(),
            generatedBy: 'font-families-subset-generator',
            method: 'fonttools pyftsubset',
            files: generatedFiles.map(file => ({
                filename: path.basename(file.outputPath),
                size: file.size,
                format: path.extname(file.outputPath).substring(1),
                command: file.command
            })),
            sourceFont: {
                family: sourceMetadata.family,
                name: sourceMetadata.originalFont.name,
                version: sourceMetadata.originalFont.version,
                author: sourceMetadata.originalFont.author,
                license: sourceMetadata.originalFont.license,
                source: sourceMetadata.originalFont.source
            },
            legalCompliance: {
                originalLicense: sourceMetadata.legalCompliance.originalLicense,
                derivativeStatus: "This is a derivative work optimized for web performance. Original font design and copyright belong to the original author.",
                attribution: sourceMetadata.legalCompliance.attribution,
                reservedFontName: sourceMetadata.legalCompliance.reservedFontName
            }
        };

        const metadataPath = path.join(subsetDir, 'metadata.json');
        await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
        console.log(`✓ Created subset metadata: ${metadataPath}`);

        return metadata;
    }

    /**
     * Find appropriate source font files for subsetting
     */
    async findSourceFontFiles(familyName) {
        const apiMetadataPath = path.join('dist', 'api', 'metadata', `${familyName}.json`);
        
        try {
            const apiMetadata = JSON.parse(await fs.readFile(apiMetadataPath, 'utf8'));
            const result = { static: null, variable: null };
            
            // Find regular weight static font (weight 400, style normal, format woff2)
            if (apiMetadata.static) {
                const staticFonts = Object.entries(apiMetadata.static)
                    .filter(([key, font]) => 
                        font.weight === 400 && 
                        font.style === 'normal' &&
                        font.path.endsWith('.woff2')
                    )
                    .map(([key, font]) => ({ key, ...font }));
                
                if (staticFonts.length > 0) {
                    result.static = staticFonts[0].path;
                }
            }
            
            // Find variable font files
            if (apiMetadata.variable) {
                const variableFonts = Object.entries(apiMetadata.variable)
                    .filter(([key, font]) => font.style === 'normal')
                    .map(([key, font]) => ({ key, ...font }));
                
                if (variableFonts.length > 0) {
                    const ttfPath = variableFonts[0].path;
                    
                    // Check if WOFF2 version exists
                    const potentialWoff2Path = ttfPath.replace('.ttf', '.woff2');
                    let woff2Path = null;
                    
                    try {
                        await fs.access(potentialWoff2Path);
                        woff2Path = potentialWoff2Path;
                    } catch {
                        // WOFF2 doesn't exist, will use TTF for both
                        woff2Path = ttfPath;
                    }
                    
                    result.variable = {
                        ttf: ttfPath,
                        woff2: woff2Path
                    };
                }
            }
            
            return result;
        } catch (error) {
            console.error(`✗ Could not load font metadata for ${familyName}: ${error.message}`);
            return { static: null, variable: null };
        }
    }

    /**
     * Check if subset needs regeneration based on file timestamps
     */
    async needsRegeneration(familyName, subsetType) {
        try {
            const familyMetadata = await this.loadFamilyMetadata(familyName);
            const subsetConfig = familyMetadata.subsets[subsetType];
            
            if (!subsetConfig || subsetConfig.status !== 'generated') {
                return true; // Not generated yet
            }

            const subsetDir = path.join(CONFIG.subsetsDir, familyName, subsetType);
            const subsetGeneratedAt = new Date(subsetConfig.generatedAt);
            
            // Check if any source font is newer than the subset
            const familyFontsDir = path.join(CONFIG.fontsDir, familyName, 'fonts');
            
            try {
                // Check static font timestamp
                const staticPath = path.join(familyFontsDir, 'webfonts', `${familyMetadata.originalFont.name.replace(/\s+/g, '')}-400.woff2`);
                const staticStats = await fs.stat(staticPath);
                if (staticStats.mtime > subsetGeneratedAt) {
                    console.log(`📅 Static font updated since last subset generation`);
                    return true;
                }
            } catch (e) {
                // Try with family name if original name fails
                try {
                    const staticPath = path.join(familyFontsDir, 'webfonts', `${familyName.charAt(0).toUpperCase() + familyName.slice(1)}-400.woff2`);
                    const staticStats = await fs.stat(staticPath);
                    if (staticStats.mtime > subsetGeneratedAt) {
                        console.log(`📅 Static font updated since last subset generation`);
                        return true;
                    }
                } catch (e2) {
                    // Can't find static font, continue
                }
            }

            try {
                // Check variable font timestamp
                const variablePath = path.join(familyFontsDir, 'variable', `${familyMetadata.originalFont.name.replace(/\s+/g, '')}VF.ttf`);
                const variableStats = await fs.stat(variablePath);
                if (variableStats.mtime > subsetGeneratedAt) {
                    console.log(`📅 Variable font updated since last subset generation`);
                    return true;
                }
            } catch (e) {
                // Try with family name if original name fails
                try {
                    const variablePath = path.join(familyFontsDir, 'variable', `${familyName.charAt(0).toUpperCase() + familyName.slice(1)}VF.ttf`);
                    const variableStats = await fs.stat(variablePath);
                    if (variableStats.mtime > subsetGeneratedAt) {
                        console.log(`📅 Variable font updated since last subset generation`);
                        return true;
                    }
                } catch (e2) {
                    // Can't find variable font, continue
                }
            }

            console.log(`⏭️  ${familyName}/${subsetType} up to date, skipping`);
            return false;

        } catch (error) {
            // If we can't determine, regenerate to be safe
            console.log(`⚠️  Could not check timestamps for ${familyName}, regenerating`);
            return true;
        }
    }

    /**
     * Process a single font family
     */
    async processFamily(familyName, subsetTypes = ['min-chars'], force = false) {
        console.log(`\n=== Processing ${familyName} ===`);

        // Load family metadata
        const familyMetadata = await this.loadFamilyMetadata(familyName);
        
        for (const subsetType of subsetTypes) {
            const characterSet = CONFIG.characterSets[subsetType];
            if (!characterSet) {
                throw new Error(`Unknown subset type: ${subsetType}`);
            }

            const subsetConfig = familyMetadata.subsets[subsetType];
            if (!subsetConfig) {
                console.log(`⚠ No ${subsetType} subset configured for ${familyName}, skipping`);
                continue;
            }

            // Check if regeneration is needed (unless forced)
            if (!force && !(await this.needsRegeneration(familyName, subsetType))) {
                continue;
            }

            console.log(`\n--- Generating ${subsetType} subset ---`);
            
            // Create subset directory
            const subsetDir = path.join(CONFIG.subsetsDir, familyName, subsetType);
            await fs.mkdir(subsetDir, { recursive: true });

            const generatedFiles = [];
            const familyFontsDir = path.join(CONFIG.fontsDir, familyName, 'fonts');

            // Find source font files dynamically
            const sourceFonts = await this.findSourceFontFiles(familyName);
            
            // Process static fonts
            if (subsetConfig.targetFiles.static && sourceFonts.static) {
                const staticFile = subsetConfig.targetFiles.static;
                const inputPath = sourceFonts.static;
                const outputPath = path.join(subsetDir, staticFile);

                try {
                    await fs.access(inputPath);
                    const result = await this.generateSubset(inputPath, outputPath, characterSet, {
                        flavor: 'woff2'
                    });
                    generatedFiles.push(result);
                } catch (error) {
                    console.error(`✗ Could not process static font: ${error.message}`);
                    this.errors.push({ family: familyName, file: staticFile, error: error.message });
                }
            }

            // Process variable fonts
            if (subsetConfig.targetFiles.variable && sourceFonts.variable) {
                const variableFiles = Array.isArray(subsetConfig.targetFiles.variable) 
                    ? subsetConfig.targetFiles.variable 
                    : [subsetConfig.targetFiles.variable];

                for (const variableFile of variableFiles) {
                    const extension = path.extname(variableFile).substring(1);
                    
                    // Choose input path: use TTF for WOFF2 generation if needed
                    const inputPath = extension === 'woff2' 
                        ? sourceFonts.variable.woff2 
                        : sourceFonts.variable.ttf;
                    const outputPath = path.join(subsetDir, variableFile);

                    try {
                        await fs.access(inputPath);
                        const result = await this.generateSubset(inputPath, outputPath, characterSet, {
                            flavor: extension === 'woff2' ? 'woff2' : null  // null = keep original format
                        });
                        generatedFiles.push(result);
                    } catch (error) {
                        console.error(`✗ Could not process variable font: ${error.message}`);
                        this.errors.push({ family: familyName, file: variableFile, error: error.message });
                    }
                }
            }

            // Create subset metadata
            if (generatedFiles.length > 0) {
                await this.createSubsetMetadata(subsetDir, subsetType, characterSet, generatedFiles, familyMetadata);
                this.successes.push({ family: familyName, subset: subsetType, files: generatedFiles.length });
            }
        }
    }

    /**
     * Update family metadata to mark subsets as generated
     */
    async updateFamilyMetadata(familyName, subsetType) {
        const metadataPath = path.join(CONFIG.subsetsDir, familyName, 'metadata.json');
        const metadata = await this.loadFamilyMetadata(familyName);
        
        if (metadata.subsets[subsetType]) {
            metadata.subsets[subsetType].status = 'generated';
            metadata.subsets[subsetType].generatedAt = new Date().toISOString();
            
            await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
            console.log(`✓ Updated family metadata status for ${subsetType}`);
        }
    }

    /**
     * Generate summary report
     */
    generateReport() {
        console.log('\n=== Subset Generation Report ===');
        
        if (this.successes.length > 0) {
            console.log(`\n✓ Successfully generated ${this.successes.length} subset(s):`);
            for (const success of this.successes) {
                console.log(`  - ${success.family}/${success.subset} (${success.files} files)`);
            }
        }

        if (this.errors.length > 0) {
            console.log(`\n✗ ${this.errors.length} error(s) encountered:`);
            for (const error of this.errors) {
                console.log(`  - ${error.family}/${error.file}: ${error.error}`);
            }
        }

        console.log(`\nTotal: ${this.successes.length} successes, ${this.errors.length} errors`);
    }
}

/**
 * Main execution function
 */
async function main() {
    const familyName = process.argv[2];
    const forceFlag = process.argv.includes('--force');
    
    if (!familyName) {
        console.error('Usage: node subset-generator.js <family-name> [--force]');
        console.error('Example: node subset-generator.js aspekta');
        console.error('         node subset-generator.js aspekta --force');
        process.exit(1);
    }

    const generator = new SubsetGenerator();
    
    try {
        // Check dependencies
        await generator.checkDependencies();
        
        // Generate subsets for specified family
        await generator.processFamily(familyName, ['min-chars'], forceFlag);
        
        // Update family metadata
        await generator.updateFamilyMetadata(familyName, 'min-chars');
        
        // Show report
        generator.generateReport();
        
        if (generator.errors.length > 0) {
            process.exit(1);
        }
        
    } catch (error) {
        console.error(`Fatal error: ${error.message}`);
        process.exit(1);
    }
}

// Export for use as module
export { SubsetGenerator, CONFIG };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}