/**
 * Catalog Generator for Font Families
 * 
 * Generates JSON catalog files for consumption by various applications.
 * Supports both public catalogs (open fonts only) and complete catalogs (all fonts).
 */

import { promises as fs } from 'fs';
import path from 'path';

/**
 * Generate catalog JSON file with HATEOAS links
 * @param {Object} fontFamilies - Font family data
 * @param {string} outputPath - Output file path
 * @param {Object} options - Generation options
 */
export async function generateCatalog(fontFamilies, outputPath, options = {}) {
    const {
        includeRestrictedFonts = false,
        title = 'Font Families Catalog',
        description = 'Curated font collection',
        version = '1.0.0'
    } = options;
    
    console.log(`[catalog] Generating catalog: ${path.basename(outputPath)}`);
    console.log(`[catalog] Font families: ${Object.keys(fontFamilies).length}`);
    console.log(`[catalog] Include restricted: ${includeRestrictedFonts}`);
    
    // Build catalog structure with HATEOAS links
    const catalog = {
        meta: {
            title,
            description,
            version,
            generated: new Date().toISOString(),
            fontCount: Object.keys(fontFamilies).length,
            includesRestrictedFonts: includeRestrictedFonts
        },
        _links: {
            self: { href: '/api/catalog.json' },
            root: { href: '/api/' },
            families: { href: '/api/families/' }
        },
        families: {}
    };
    
    // Process each font family
    for (const [familyKey, familyData] of Object.entries(fontFamilies)) {
        // Filter restricted fonts for public catalogs
        if (!includeRestrictedFonts && isRestrictedFont(familyData)) {
            continue;
        }
        
        const catalogEntry = transformFamilyForCatalog(familyData, {
            includeFullMetadata: includeRestrictedFonts,
            includePerformanceData: true,
            includeTypographyFeatures: true,
            version: version
        });
        
        // Add HATEOAS links to family entry
        catalogEntry._links = {
            self: { href: `/api/families/${familyData.key}.json` },
            module: { href: `/modules/${familyData.key}.js` },
            preview: { href: `/fonts/${familyData.key}/` }
        };
        
        catalog.families[familyData.key] = catalogEntry;
        
        // Generate individual family JSON file
        await generateIndividualFamilyFile(familyData, catalogEntry, outputPath, version);
    }
    
    // Update final count after filtering
    catalog.meta.fontCount = Object.keys(catalog.families).length;
    
    // Ensure output directory exists
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    
    // Write catalog file
    await fs.writeFile(outputPath, JSON.stringify(catalog, null, 2));
    
    console.log(`[catalog] Generated catalog with ${catalog.meta.fontCount} families`);
    console.log(`[catalog] Written to: ${outputPath}`);
}

/**
 * Check if a font is restricted (non-open license)
 * @param {Object} familyData - Font family data
 * @returns {boolean} True if font is restricted
 */
function isRestrictedFont(familyData) {
    const openLicenses = [
        'OFL-1.1',
        'Apache-2.0', 
        'MIT',
        'SIL Open Font License',
        'Apache License'
    ];
    
    const license = familyData.license || familyData.licenseType;
    if (!license) return true; // No license info = assume restricted
    
    return !openLicenses.some(openLicense => 
        license.toLowerCase().includes(openLicense.toLowerCase())
    );
}

/**
 * Transform font family data for catalog format
 * @param {Object} familyData - Raw font family data
 * @param {Object} options - Transform options
 * @returns {Object} Transformed catalog entry
 */
function transformFamilyForCatalog(familyData, options = {}) {
    const {
        includeFullMetadata = true,
        includePerformanceData = true,
        includeTypographyFeatures = true,
        version = '1.0.0'
    } = options;
    
    const catalogEntry = {
        // Basic information
        name: familyData.name,
        key: familyData.key,
        description: familyData.description,
        
        // Licensing and attribution
        license: familyData.license || familyData.licenseType,
        author: familyData.author,
        version: familyData.version,
        copyrightYear: familyData.copyrightYear,
        
        // Font capabilities summary
        capabilities: extractCapabilities(familyData),
        
        // File organization with CDN links
        files: extractFileInformation(familyData, version),
        
        // Quick access metrics
        metrics: extractQuickMetrics(familyData)
    };
    
    // Add detailed metadata for complete catalogs
    if (includeFullMetadata) {
        catalogEntry.detailed = {
            // Language and script support
            languages: extractLanguageSupport(familyData),
            
            // Font variations and axes
            variations: extractVariationInfo(familyData),
            
            // Font specimens and character coverage
            specimens: generateSpecimenData(familyData)
        };
    }
    
    // Add performance data
    if (includePerformanceData) {
        catalogEntry.performance = extractPerformanceData(familyData);
    }
    
    // Add typography features
    if (includeTypographyFeatures) {
        catalogEntry.typography = extractTypographyData(familyData);
    }
    
    return catalogEntry;
}

/**
 * Extract font capabilities summary
 * @param {Object} familyData - Font family data
 * @returns {Object} Capabilities summary
 */
function extractCapabilities(familyData) {
    const hasStatic = familyData.static && Object.keys(familyData.static).length > 0;
    const hasVariable = familyData.variable && Object.keys(familyData.variable).length > 0;
    
    // Weight range analysis
    let weightRange = null;
    if (hasVariable) {
        const variableFonts = Object.values(familyData.variable);
        const firstVariable = variableFonts[0];
        if (firstVariable.axes?.wght) {
            weightRange = {
                min: firstVariable.axes.wght.min,
                max: firstVariable.axes.wght.max,
                type: 'variable'
            };
        }
    } else if (hasStatic) {
        const staticWeights = Object.values(familyData.static)
            .map(font => font.weight)
            .filter(weight => typeof weight === 'number')
            .sort((a, b) => a - b);
        
        if (staticWeights.length > 0) {
            weightRange = {
                min: staticWeights[0],
                max: staticWeights[staticWeights.length - 1],
                available: staticWeights,
                type: 'static'
            };
        }
    }
    
    return {
        hasStatic,
        hasVariable,
        weightRange,
        styleCount: countUniqueStyles(familyData),
        formats: extractAvailableFormats(familyData)
    };
}

/**
 * Extract file information
 * @param {Object} familyData - Font family data
 * @returns {Object} File information
 */
function extractFileInformation(familyData, version = '1.0.0') {
    const files = {
        static: [],
        variable: []
    };
    
    // Static fonts with CDN links
    if (familyData.static) {
        for (const [fontKey, fontData] of Object.entries(familyData.static)) {
            const fileName = path.basename(fontData.path);
            files.static.push({
                key: fontKey,
                fileName: fileName,
                format: getFormatFromPath(fontData.path),
                weight: fontData.weight,
                style: fontData.style,
                stretch: fontData.stretch,
                fileSize: fontData.performance?.fileSize,
                fileSizeKB: fontData.performance?.fileSizeKB,
                _links: {
                    download: {
                        href: `https://cdn.jsdelivr.net/gh/hund-press/font-families@v${version}/${familyData.key}/fonts/webfonts/${fileName}`
                    }
                }
            });
        }
    }
    
    // Variable fonts with CDN links
    if (familyData.variable) {
        for (const [fontKey, fontData] of Object.entries(familyData.variable)) {
            const fileName = path.basename(fontData.path);
            files.variable.push({
                key: fontKey,
                fileName: fileName,
                format: getFormatFromPath(fontData.path),
                axes: fontData.axes,
                style: fontData.style,
                fileSize: fontData.performance?.fileSize,
                fileSizeKB: fontData.performance?.fileSizeKB,
                _links: {
                    download: {
                        href: `https://cdn.jsdelivr.net/gh/hund-press/font-families@v${version}/${familyData.key}/fonts/webfonts/${fileName}`
                    }
                }
            });
        }
    }
    
    return files;
}

/**
 * Extract quick access metrics
 * @param {Object} familyData - Font family data
 * @returns {Object} Quick metrics
 */
function extractQuickMetrics(familyData) {
    const allFonts = [
        ...Object.values(familyData.static || {}),
        ...Object.values(familyData.variable || {})
    ];
    
    if (allFonts.length === 0) return null;
    
    const firstFont = allFonts[0];
    
    return {
        // Typography metrics from first font
        unitsPerEm: firstFont.metrics?.unitsPerEm,
        ascent: firstFont.metrics?.ascent,
        descent: firstFont.metrics?.descent,
        capHeight: firstFont.metrics?.capHeight,
        xHeight: firstFont.metrics?.xHeight,
        
        // Character and glyph counts
        glyphCount: firstFont.features?.glyphCount,
        
        // File size summary
        totalFiles: allFonts.length,
        totalSizeKB: allFonts.reduce((sum, font) => sum + (font.performance?.fileSizeKB || 0), 0)
    };
}

/**
 * Extract language support information
 * @param {Object} familyData - Font family data
 * @returns {Object} Language support data
 */
function extractLanguageSupport(familyData) {
    const allFonts = [
        ...Object.values(familyData.static || {}),
        ...Object.values(familyData.variable || {})
    ];
    
    // Combine Unicode ranges from all fonts
    const allUnicodeRanges = allFonts.flatMap(font => font.features?.unicodeRanges || []);
    
    // Extract unique ranges
    const uniqueRanges = {};
    for (const range of allUnicodeRanges) {
        if (range.name && !uniqueRanges[range.name]) {
            uniqueRanges[range.name] = {
                coverage: range.coverage,
                start: range.start,
                end: range.end
            };
        }
    }
    
    return {
        unicodeRanges: uniqueRanges,
        scripts: Object.keys(uniqueRanges),
        primaryScript: determinePrimaryScript(uniqueRanges)
    };
}

/**
 * Extract variation information
 * @param {Object} familyData - Font family data
 * @returns {Object} Variation information
 */
function extractVariationInfo(familyData) {
    if (!familyData.variable) return null;
    
    const variations = {};
    
    for (const [fontKey, fontData] of Object.entries(familyData.variable)) {
        if (fontData.axes) {
            for (const [axisTag, axisData] of Object.entries(fontData.axes)) {
                if (!variations[axisTag]) {
                    variations[axisTag] = {
                        min: axisData.min,
                        max: axisData.max,
                        default: axisData.default,
                        description: getAxisDescription(axisTag)
                    };
                }
            }
        }
        
        // Include named instances if available
        if (fontData.namedInstances) {
            variations.namedInstances = fontData.namedInstances;
        }
    }
    
    return Object.keys(variations).length > 0 ? variations : null;
}

/**
 * Generate specimen data for font preview
 * @param {Object} familyData - Font family data
 * @returns {Object} Specimen data
 */
function generateSpecimenData(familyData) {
    return {
        sampleText: {
            latin: 'The quick brown fox jumps over the lazy dog',
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            punctuation: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        },
        // Font paths for specimen generation
        specimenFonts: extractSpecimenFontPaths(familyData)
    };
}

/**
 * Extract performance data
 * @param {Object} familyData - Font family data
 * @returns {Object} Performance data
 */
function extractPerformanceData(familyData) {
    const allFonts = [
        ...Object.values(familyData.static || {}),
        ...Object.values(familyData.variable || {})
    ];
    
    const fileSizes = allFonts.map(font => font.performance?.fileSizeKB || 0).filter(size => size > 0);
    const glyphCounts = allFonts.map(font => font.features?.glyphCount || 0).filter(count => count > 0);
    
    return {
        fileCount: allFonts.length,
        totalSizeKB: fileSizes.reduce((sum, size) => sum + size, 0),
        averageSizeKB: fileSizes.length > 0 ? Math.round(fileSizes.reduce((sum, size) => sum + size, 0) / fileSizes.length) : 0,
        smallestFileKB: fileSizes.length > 0 ? Math.min(...fileSizes) : 0,
        largestFileKB: fileSizes.length > 0 ? Math.max(...fileSizes) : 0,
        averageGlyphCount: glyphCounts.length > 0 ? Math.round(glyphCounts.reduce((sum, count) => sum + count, 0) / glyphCounts.length) : 0
    };
}

/**
 * Extract typography data
 * @param {Object} familyData - Font family data
 * @returns {Object} Typography data
 */
function extractTypographyData(familyData) {
    const allFonts = [
        ...Object.values(familyData.static || {}),
        ...Object.values(familyData.variable || {})
    ];
    
    // Combine OpenType features from all fonts
    const allFeatures = new Set();
    allFonts.forEach(font => {
        if (font.features?.openTypeFeatures) {
            font.features.openTypeFeatures.forEach(feature => allFeatures.add(feature));
        }
    });
    
    return {
        openTypeFeatures: Array.from(allFeatures),
        hasLigatures: allFeatures.has('liga') || allFeatures.has('dlig'),
        hasSmallCaps: allFeatures.has('smcp'),
        hasOldStyleFigures: allFeatures.has('onum'),
        hasTabularFigures: allFeatures.has('tnum')
    };
}

// Utility functions

function countUniqueStyles(familyData) {
    const styles = new Set();
    Object.values(familyData.static || {}).forEach(font => styles.add(font.style));
    Object.values(familyData.variable || {}).forEach(font => styles.add(font.style));
    return styles.size;
}

function extractAvailableFormats(familyData) {
    const formats = new Set();
    Object.values(familyData.static || {}).forEach(font => {
        if (font.path) formats.add(getFormatFromPath(font.path));
    });
    Object.values(familyData.variable || {}).forEach(font => {
        if (font.path) formats.add(getFormatFromPath(font.path));
    });
    return Array.from(formats);
}

function getFormatFromPath(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const formatMap = {
        '.ttf': 'truetype',
        '.otf': 'opentype',
        '.woff': 'woff',
        '.woff2': 'woff2'
    };
    return formatMap[ext] || ext.substring(1);
}

function determinePrimaryScript(unicodeRanges) {
    // Simple heuristic: the script with the highest coverage
    let primaryScript = 'Latin'; // Default
    let maxCoverage = 0;
    
    for (const [scriptName, range] of Object.entries(unicodeRanges)) {
        if (range.coverage > maxCoverage) {
            maxCoverage = range.coverage;
            primaryScript = scriptName;
        }
    }
    
    return primaryScript;
}

function getAxisDescription(axisTag) {
    const descriptions = {
        'wght': 'Weight',
        'wdth': 'Width',
        'slnt': 'Slant',
        'ital': 'Italic',
        'opsz': 'Optical Size'
    };
    return descriptions[axisTag] || axisTag;
}

function extractSpecimenFontPaths(familyData) {
    const specimens = {};
    
    // Get one representative font for each style
    if (familyData.variable && Object.keys(familyData.variable).length > 0) {
        const firstVariable = Object.values(familyData.variable)[0];
        specimens.variable = firstVariable.path;
    }
    
    if (familyData.static && Object.keys(familyData.static).length > 0) {
        // Try to find regular weight
        const regularFont = Object.values(familyData.static).find(font => font.weight === 400) ||
                           Object.values(familyData.static)[0];
        specimens.regular = regularFont.path;
        
        // Try to find bold
        const boldFont = Object.values(familyData.static).find(font => font.weight >= 700);
        if (boldFont) specimens.bold = boldFont.path;
    }
    
    return specimens;
}

/**
 * Generate individual family JSON file
 * @param {Object} familyData - Font family data
 * @param {Object} catalogEntry - Processed catalog entry
 * @param {string} catalogOutputPath - Main catalog output path
 * @param {string} version - API version
 */
async function generateIndividualFamilyFile(familyData, catalogEntry, catalogOutputPath, version) {
    const familyDir = path.join(path.dirname(catalogOutputPath), 'families');
    const familyPath = path.join(familyDir, `${familyData.key}.json`);
    
    // Create enhanced family object with full HATEOAS structure
    const familyFile = {
        ...catalogEntry,
        _links: {
            self: { href: `/api/families/${familyData.key}.json` },
            catalog: { href: '/api/catalog.json' },
            module: { href: `/modules/${familyData.key}.js` },
            preview: { href: `/fonts/${familyData.key}/` },
            cdn: {
                href: `https://cdn.jsdelivr.net/gh/hund-press/font-families@v${version}/${familyData.key}/`,
                templated: false
            }
        }
    };
    
    // Ensure family directory exists
    await fs.mkdir(familyDir, { recursive: true });
    
    // Write individual family file
    await fs.writeFile(familyPath, JSON.stringify(familyFile, null, 2));
    
    console.log(`[catalog] Generated individual family file: ${familyPath}`);
}

