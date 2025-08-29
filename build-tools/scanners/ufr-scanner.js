import { promises as fs } from 'fs';
import path from 'path';
import * as fontkit from 'fontkit';
import { glob } from 'glob';
import { 
    generateEnhancedFamilyMetadata,
    normalizeFont
} from './fontkit-analyzer.js';

/**
 * Detects if a font family folder follows UFR (Unified Font Repository) structure
 * @param {string} familyPath - Path to the font family folder
 * @returns {Promise<boolean>} True if UFR structure is detected
 */
async function hasUFRStructure(familyPath) {
    try {
        const fontsDir = path.join(familyPath, 'fonts');
        
        // Must have a fonts/ directory
        try {
            await fs.access(fontsDir);
        } catch {
            return false;
        }
        
        // Must have licensing information (check both fonts/ and root directory)
        const licensePaths = [
            // Check in fonts/ directory first
            path.join(fontsDir, 'LICENSE.txt'),
            path.join(fontsDir, 'OFL.txt'),
            // Also check in root directory
            path.join(familyPath, 'LICENSE.txt'),
            path.join(familyPath, 'OFL.txt')
        ];
        
        let hasLicense = false;
        for (const licensePath of licensePaths) {
            try {
                await fs.access(licensePath);
                hasLicense = true;
                break;
            } catch {
                // File doesn't exist, continue checking
            }
        }
        
        // Or must have package.json with metadata (check both locations)
        let hasPackageJson = false;
        const packagePaths = [
            path.join(fontsDir, 'package.json'),
            path.join(familyPath, 'package.json')
        ];
        
        for (const packagePath of packagePaths) {
            try {
                await fs.access(packagePath);
                hasPackageJson = true;
                break;
            } catch {
                // File doesn't exist, continue checking
            }
        }
        
        return hasLicense || hasPackageJson;
    } catch (error) {
        return false;
    }
}

/**
 * Extracts metadata from UFR (Unified Font Repository) structure files
 * @param {string} familyPath - Path to the font family folder
 * @param {string} fontsDir - Path to the fonts subdirectory
 * @returns {Promise<Object>} Extracted metadata object
 */
async function extractUFRMetadata(familyPath, fontsDir) {
    const metadata = {};
    
    // 1. Extract from package.json (primary source for version/author/license)
    const packagePaths = [
        path.join(fontsDir, 'package.json'),
        path.join(familyPath, 'package.json')
    ];
    
    for (const packagePath of packagePaths) {
        try {
            await fs.access(packagePath);
            const pkg = JSON.parse(await fs.readFile(packagePath, 'utf8'));
            
            if (pkg.version) metadata.version = pkg.version;
            if (pkg.author) metadata.author = pkg.author;
            if (pkg.license) metadata.license = pkg.license;
            if (pkg.name) {
                // Extract name from npm package name
                // "@aspekta/fonts" -> "aspekta", "some-font" -> "some-font"
                if (pkg.name.includes('@') && pkg.name.includes('/')) {
                    const scope = pkg.name.match(/@([^/]+)\//)?.[1];
                    metadata.name = scope || pkg.name.replace(/^@[^/]+\//, '');
                } else {
                    metadata.name = pkg.name;
                }
            }
            
            console.log(`[fonts] UFR metadata from package.json: version=${metadata.version}, author=${metadata.author}, license=${metadata.license}`);
            break; // Use first found package.json
        } catch (error) {
            // File doesn't exist or can't be parsed, continue to next location
        }
    }
    
    // 2. Extract from README.md (family description)
    const readmePaths = [
        path.join(fontsDir, 'README.md'),
        path.join(familyPath, 'README.md')
    ];
    
    for (const readmePath of readmePaths) {
        try {
            await fs.access(readmePath);
            const readme = await fs.readFile(readmePath, 'utf8');
            metadata.description = extractDescription(readme);
            
            // Look for additional version info in README if not found in package.json
            if (!metadata.version) {
                const versionMatch = readme.match(/version[:\s]+([\\d.]+)/i);
                if (versionMatch) {
                    metadata.version = versionMatch[1];
                    console.log(`[fonts] UFR version from README: ${metadata.version}`);
                }
            }
            break; // Use first found README
        } catch (error) {
            // File doesn't exist, continue to next location
        }
    }
    
    // 3. Extract from LICENSE.txt/OFL.txt (license verification and copyright)
    const licensePaths = [
        path.join(fontsDir, 'LICENSE.txt'),
        path.join(fontsDir, 'OFL.txt'),
        path.join(familyPath, 'LICENSE.txt'), 
        path.join(familyPath, 'OFL.txt')
    ];
    
    for (const licensePath of licensePaths) {
        try {
            await fs.access(licensePath);
            const licenseText = await fs.readFile(licensePath, 'utf8');
            
            // Verify license type
            if (licenseText.includes('SIL Open Font License')) {
                metadata.licenseType = 'OFL-1.1';
            } else if (licenseText.includes('Apache License')) {
                metadata.licenseType = 'Apache-2.0';
            } else if (licenseText.includes('MIT License')) {
                metadata.licenseType = 'MIT';
            }
            
            // Extract copyright year/holder if not already found
            if (!metadata.author) {
                const copyrightMatch = licenseText.match(/Copyright[\\s©]+([\\d-]+)[\\s,]+(.+)/i);
                if (copyrightMatch) {
                    metadata.author = copyrightMatch[2].trim();
                    metadata.copyrightYear = copyrightMatch[1];
                    console.log(`[fonts] UFR author from license: ${metadata.author}`);
                }
            }
            break; // Use first found license file
        } catch (error) {
            // File doesn't exist, continue to next location
        }
    }
    
    return metadata;
}

/**
 * Extracts description from README.md content
 * @param {string} readme - README.md file content
 * @returns {string} Extracted description
 */
function extractDescription(readme) {
    // Extract first paragraph or content before first heading
    const lines = readme.split('\\n');
    const descriptionLines = [];
    
    for (const line of lines) {
        const trimmed = line.trim();
        
        // Stop at first heading if we already have content
        if (trimmed.startsWith('#') && descriptionLines.length > 0) {
            break;
        }
        
        // Skip headings and empty lines, collect content
        if (trimmed && !trimmed.startsWith('#')) {
            descriptionLines.push(trimmed);
        }
        
        // Limit description length
        if (descriptionLines.length >= 3) break;
    }
    
    return descriptionLines.join(' ').substring(0, 200); // Truncate if too long
}

/**
 * Scans a UFR-structured font family
 * @param {string} familyPath - Path to the font family folder
 * @param {string} folderName - Name of the family folder
 * @returns {Promise<Object>} Family data object
 */
async function scanUFRFamily(familyPath, folderName) {
    const fontsDir = path.join(familyPath, 'fonts');
    
    // Extract UFR metadata first
    const metadata = await extractUFRMetadata(familyPath, fontsDir);
    
    // Use metadata name if available, otherwise fall back to folder-based name
    const fontName = metadata.name || extractFontName(folderName);
    const fontSlug = slugifyFontName(fontName);
    
    const familyData = {
        name: fontName,
        slug: fontSlug,
        version: metadata.version,        // NEW: official release version
        author: metadata.author,          // NEW: from package.json or license
        license: metadata.license,        // NEW: from package.json
        licenseType: metadata.licenseType, // NEW: detected license type
        description: metadata.description, // NEW: from README.md
        copyrightYear: metadata.copyrightYear, // NEW: from license file
        static: {},
        variable: {}
    };

    // Scan font files in organized UFR directories
    const fontDirs = ['otf', 'ttf', 'variable', 'webfonts'];
    
    for (const dir of fontDirs) {
        const dirPath = path.join(fontsDir, dir);
        
        try {
            await fs.access(dirPath);
        } catch {
            // Directory doesn't exist, skip
            continue;
        }
        
        const fontFiles = await glob(path.join(dirPath, '*.{ttf,otf,woff,woff2}'));
        
        for (const fontFile of fontFiles) {
            try {
                const font = fontkit.openSync(fontFile);
                const type = dir === 'variable' ? 'variable' : 'static';

                if (font.fonts) { // TrueType Collection or similar
                    for (const subFont of font.fonts) {
                        const postScriptName = subFont.postscriptName;
                        if (postScriptName) {
                            familyData[type][postScriptName] = await normalizeFont(
                                subFont, 
                                fontName, 
                                fontFile
                            );
                        }
                    }
                } else { // Single font file
                    const postScriptName = font.postscriptName;
                    if (postScriptName) {
                        // For variable fonts, use a descriptive key instead of PostScript name
                        const variableFontKey = type === 'variable' ? generateVariableFontKey(font, postScriptName) : postScriptName;
                        familyData[type][variableFontKey] = await normalizeFont(
                            font, 
                            fontName, 
                            fontFile
                        );
                    }
                }
            } catch (err) {
                console.error(`Error processing UFR font file ${fontFile}:`, err);
            }
        }
    }
    
    return familyData;
}

/**
 * Scans a generic (non-UFR) font family using deep directory search
 * @param {string} familyPath - Path to the font family folder  
 * @param {string} folderName - Name of the family folder
 * @returns {Promise<Object>} Family data object
 */
async function scanGenericFamily(familyPath, folderName) {
    // Extract basic font info
    const fontName = extractFontName(folderName);
    const fontSlug = slugifyFontName(fontName);
    
    const familyData = {
        name: fontName,
        slug: fontSlug,
        static: {},
        variable: {}
    };

    // Deep scan all font files (existing behavior)
    const fontFiles = await glob(path.join(familyPath, '**', '*.{ttf,otf,woff,woff2}'));

    for (const fontFile of fontFiles) {
        try {
            const font = fontkit.openSync(fontFile);
            const type = fontFile.includes('/variable/') ? 'variable' : 'static';

            if (font.fonts) { // TrueType Collection or similar
                for (const subFont of font.fonts) {
                    const postScriptName = subFont.postscriptName;
                    if (postScriptName) {
                        familyData[type][postScriptName] = await normalizeFont(
                            subFont, 
                            fontName, 
                            fontFile
                        );
                    }
                }
            } else { // Single font file
                const postScriptName = font.postscriptName;
                if (postScriptName) {
                    // For variable fonts, use a descriptive key instead of PostScript name
                    const variableFontKey = type === 'variable' ? generateVariableFontKey(font, postScriptName) : postScriptName;
                    familyData[type][variableFontKey] = await normalizeFont(
                        font, 
                        fontName, 
                        fontFile
                    );
                }
            }
        } catch (err) {
            console.error(`Error processing generic font file ${fontFile}:`, err);
        }
    }
    
    return familyData;
}

/**
 * Scans the font families directory and generates per-family manifests with mtime-based caching
 * @param {string} familiesDir - Path to the font families directory
 * @param {string} manifestDir - Path where manifest files should be written
 * @returns {Promise<Object>} Combined font data object
 */
export async function scanFontFamilies(familiesDir, manifestDir) {
    console.log(`[fonts] Scanning families at ${familiesDir}`);
    
    try {
        // Ensure manifest directory exists
        const manifestsDir = path.join(manifestDir, 'manifests');
        await fs.mkdir(manifestsDir, { recursive: true });
        
        // Load existing scan timestamps
        const timestampFile = path.join(manifestDir, 'scan-timestamps.json');
        let timestamps = {};
        try {
            const data = await fs.readFile(timestampFile, 'utf8');
            timestamps = JSON.parse(data);
        } catch (error) {
            // File doesn't exist or is invalid - start fresh
        }
        
        const familyFolders = await glob(path.join(familiesDir, '*/'));
        const fontData = {};
        const updatedTimestamps = { ...timestamps };
        let processedCount = 0;
        let skippedCount = 0;

        for (const familyFolder of familyFolders) {
            const folderName = path.basename(familyFolder);
            const fontName = extractFontName(folderName);
            const fontSlug = slugifyFontName(fontName);
            
            // Detect UFR structure
            const isUFRFamily = await hasUFRStructure(familyFolder);
            
            // Check if folder has been modified since last scan
            const folderStats = await fs.stat(familyFolder);
            const folderMtime = folderStats.mtime.getTime();
            const lastScanTime = timestamps[folderName];
            
            let manifestPath = path.join(manifestsDir, `${fontSlug}.js`);
            const manifestExists = await fs.access(manifestPath).then(() => true).catch(() => false);
            
            // Skip scanning if folder hasn't changed and manifest exists
            if (lastScanTime && folderMtime <= lastScanTime && manifestExists) {
                console.log(`[fonts] Skipping ${fontName} (unchanged)${isUFRFamily ? ' [UFR]' : ''}`);
                skippedCount++;
                
                // Load existing manifest for combined output
                try {
                    const existingContent = await fs.readFile(manifestPath, 'utf8');
                    // Extract JSON from ES module export
                    const match = existingContent.match(/export default ([\s\S]+)$/);
                    if (match) {
                        fontData[folderName] = JSON.parse(match[1].trim());
                    }
                } catch (error) {
                    console.warn(`Failed to load existing manifest for ${folderName}:`, error.message);
                }
                continue;
            }
            
            if (isUFRFamily) {
                console.log(`[fonts] UFR family detected: ${fontName} from ./${path.relative(process.cwd(), familyFolder)}`);
            } else {
                console.log(`[fonts] Generic scanning: ${fontName} from ./${path.relative(process.cwd(), familyFolder)}`);
            }
            processedCount++;
            
            // Use appropriate scanning method based on UFR detection
            let familyData;
            if (isUFRFamily) {
                familyData = await scanUFRFamily(familyFolder, folderName);
            } else {
                familyData = await scanGenericFamily(familyFolder, folderName);
            }
            
            console.log(`[fonts] Scanned: "${folderName}" → "${fontName}" (${fontSlug})`);
            
            // Write individual family manifest
            const jsContent = `export default ${JSON.stringify(familyData, null, 2)}`;
            await fs.writeFile(manifestPath, jsContent);
            console.log(`[fonts] Writing manifest to ./${path.relative(process.cwd(), manifestPath)}`);
            
            // Update timestamp and add to combined data
            updatedTimestamps[folderName] = folderMtime;
            fontData[folderName] = familyData;
        }
        
        // Remove timestamps for deleted folders
        for (const folderName of Object.keys(timestamps)) {
            const folderExists = familyFolders.some(folder => path.basename(folder) === folderName);
            if (!folderExists) {
                delete updatedTimestamps[folderName];
                // Also remove the manifest file
                const fontSlug = slugifyFontName(extractFontName(folderName));
                const manifestPath = path.join(manifestsDir, `${fontSlug}.js`);
                await fs.unlink(manifestPath).catch(() => {}); // Ignore errors
            }
        }
        
        // Save updated timestamps
        await fs.writeFile(timestampFile, JSON.stringify(updatedTimestamps, null, 2));
        
        // Generate combined index file for backward compatibility
        const indexPath = path.join(manifestsDir, '_index.js');
        
        // If no fonts were processed (all skipped), build fontData from existing manifests
        if (processedCount === 0 && skippedCount > 0 && Object.keys(fontData).length === 0) {
            console.log('[fonts] Building index from existing manifests since all fonts were skipped');
            
            // Read all manifest files to rebuild fontData
            for (const familyFolder of familyFolders) {
                const folderName = path.basename(familyFolder);
                const fontName = extractFontName(folderName);
                const fontSlug = slugifyFontName(fontName);
                const manifestPath = path.join(manifestsDir, `${fontSlug}.js`);
                
                try {
                    const manifestContent = await fs.readFile(manifestPath, 'utf8');
                    const match = manifestContent.match(/export default ([\s\S]+)$/);
                    if (match) {
                        fontData[folderName] = JSON.parse(match[1].trim());
                    }
                } catch (error) {
                    console.warn(`Failed to load existing manifest for ${folderName}:`, error.message);
                }
            }
        }
        
        const indexContent = `export default ${JSON.stringify(fontData, null, 2)}`;
        await fs.writeFile(indexPath, indexContent);
        
        console.log(`[fonts] Scan complete: ${processedCount} analyzed, ${skippedCount} skipped, ${Object.keys(fontData).length} families total`);

        return fontData;
    } catch (error) {
        console.error('Error processing font import queue:', error);
        throw error;
    }
}

// Utility functions from the original scanner
function extractFontName(folderName) {
    return folderName
        .replace(/-v?[\\d.]+$/, '') // Remove version suffix (with optional 'v')
        .replace(/([A-Z])/g, ' $1') // Add spaces before capitals
        .replace(/^\\s+/, '') // Remove leading spaces
        .trim();
}

function slugifyFontName(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\\s-]/g, '') // Remove special characters except spaces and hyphens
        .replace(/\\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

function generateVariableFontKey(font, postScriptName) {
    // For variable fonts, create a key that describes the axes
    if (font.variationAxes && Object.keys(font.variationAxes).length > 0) {
        const axes = Object.keys(font.variationAxes).sort();
        const styleDesc = font.subfamilyName && font.subfamilyName.toLowerCase().includes('italic') ? 'Italic' : 'Regular';
        return `Variable${styleDesc}[${axes.join(',')}]`;
    }
    return postScriptName;
}


export { hasUFRStructure, extractUFRMetadata, scanUFRFamily, scanGenericFamily };