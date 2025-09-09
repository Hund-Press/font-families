/**
 * ES Module Generator for Font Families
 * 
 * Generates ES modules that can be consumed by hund-press and other applications.
 * Only generates modules for open-licensed fonts (public CDN safe).
 */

import { promises as fs } from 'fs';
import path from 'path';

/**
 * Generate ES modules for font families
 * @param {Object} fontFamilies - Font family data (open fonts only)
 * @param {string} outputDir - Output directory for modules
 * @param {Object} options - Generation options
 */
export async function generateModules(fontFamilies, outputDir, options = {}) {
    const {
        generateIndividualModules = true,
        generateCombinedModule: shouldGenerateCombinedModule = true,
        cdnBaseUrl = 'https://cdn.jsdelivr.net/gh/hund-press/font-families@latest',
        repoVersion = 'latest'
    } = options;
    
    console.log(`[modules] Generating ES modules for ${Object.keys(fontFamilies).length} font families`);
    
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });
    
    // Generate individual font family modules
    if (generateIndividualModules) {
        for (const [familyKey, familyData] of Object.entries(fontFamilies)) {
            await generateFamilyModule(familyData, outputDir, cdnBaseUrl, repoVersion);
        }
    }
    
    // Generate combined module with all fonts
    if (shouldGenerateCombinedModule) {
        await generateCombinedModule(fontFamilies, outputDir, cdnBaseUrl, repoVersion);
    }
    
    // Generate index module
    await generateIndexModule(fontFamilies, outputDir);
    
    console.log(`[modules] Generated modules in ${outputDir}`);
}

/**
 * Generate individual font family module
 * @param {Object} familyData - Single font family data
 * @param {string} outputDir - Output directory
 * @param {string} cdnBaseUrl - CDN base URL
 * @param {string} repoVersion - Repository version for CDN URLs
 */
export async function generateFamilyModule(familyData, outputDir, cdnBaseUrl, repoVersion = 'latest') {
    const moduleContent = await generateFamilyModuleContent(familyData, cdnBaseUrl, repoVersion);
    const modulePath = path.join(outputDir, `${familyData.key}.js`);
    
    await fs.writeFile(modulePath, moduleContent);
    console.log(`[modules] Generated module: ${familyData.key}.js`);
}

/**
 * Generate content for individual font family module
 * @param {Object} familyData - Font family data
 * @param {string} cdnBaseUrl - CDN base URL template
 * @param {string} repoVersion - Repository version for CDN URLs
 * @returns {string} Module content
 */
async function generateFamilyModuleContent(familyData, cdnBaseUrl, repoVersion = 'latest') {
    // Font family data representing designer's intent and font reality
    const transformedData = {
        // Font Family abstraction
        name: familyData.name,
        key: familyData.key,
        
        // Font Designer abstraction  
        version: familyData.version,
        author: familyData.author,
        license: familyData.license || familyData.licenseType,
        description: familyData.description,
        
        // ENHANCED: Ground truth weight information by format
        weight: generateWeightInfo(familyData),
        
        // PHASE 3: Language support exposure
        
        // PHASE 3: OpenType features and stylistic sets
        features: generateOpenTypeFeatures(familyData),
        
        // CDN configuration for file access
        cdnBase: generateCdnPaths(familyData, cdnBaseUrl, repoVersion),
        
        // Font Face abstraction - organized by type
        faces: transformFontFaces(familyData),
        
        // Subset abstraction - available subsets for performance optimization
        subsets: await generateSubsetInfo(familyData)
    };
    
    return `/**
 * ${familyData.name} Font Family Module
 * 
 * Generated from font-families build system
 * License: ${familyData.license || familyData.licenseType || 'Unknown'}
 * Author: ${familyData.author || 'Unknown'}
 * Version: ${familyData.version || 'Unknown'}
 */

export default ${JSON.stringify(transformedData, null, 2)};
`;
}

/**
 * Generate contextual weight information exposing format-specific capabilities
 * @param {Object} familyData - Font family data
 * @returns {Object} Contextual weight information
 */
function generateWeightInfo(familyData) {
    try {
        // Collect static weights with deduplication
        const allStaticWeights = Object.values(familyData.static || {})
            .map(font => font?.weight)
            .filter(w => typeof w === 'number' && w > 0 && w <= 1000); // Valid weight range
        
        // Deduplicate weights - same weight can exist in multiple styles (normal, italic)
        const staticWeights = [...new Set(allStaticWeights)].sort((a, b) => a - b);
        
        // Get variable font weight range with error handling
        let variableRange = null;
        const variableFonts = Object.values(familyData.variable || {});
        if (variableFonts.length > 0 && variableFonts[0]?.weight) {
            const range = variableFonts[0].weight;
            if (range && typeof range.min === 'number' && typeof range.max === 'number') {
                variableRange = range;
            }
        }
    
        // Calculate coverage analysis
        const coverage = calculateWeightCoverage(staticWeights, variableRange);
        
        // Add data validation warnings
        validateFontConfiguration(familyData.name || 'Unknown', staticWeights, variableRange);
        
        const weightInfo = {
            // Quick reference - overall family capability
            range: staticWeights.length > 0 ? `${Math.min(...staticWeights)}-${Math.max(...staticWeights)}` : 'Unknown',
            
            // Detailed breakdown by format
            byFormat: {
                variable: variableRange ? {
                    min: variableRange.min,
                    max: variableRange.max,
                    default: variableRange.default || 400
                } : null,
                static: staticWeights.length > 0 ? {
                    min: Math.min(...staticWeights),
                    max: Math.max(...staticWeights),
                    instances: staticWeights
                } : null
            }
        };
        
        return weightInfo;
    } catch (error) {
        console.error(`[modules] Error generating weight info for ${familyData?.name || 'Unknown'}:`, error.message);
        
        // Return safe fallback structure
        return {
            range: 'Unknown',
            byFormat: {
                variable: null,
                static: null
            }
        };
    }
}

/**
 * Calculate weight coverage analysis between formats
 * @param {number[]} staticWeights - Array of static font weights
 * @param {Object|null} variableRange - Variable font range or null
 * @returns {Object} Coverage analysis
 */
function calculateWeightCoverage(staticWeights, variableRange) {
    if (!variableRange || staticWeights.length === 0) {
        return {
            variableOnly: [],
            staticOnly: staticWeights,
            both: []
        };
    }
    
    const { min: varMin, max: varMax } = variableRange;
    
    const staticOnly = staticWeights.filter(weight => weight < varMin || weight > varMax);
    const both = staticWeights.filter(weight => weight >= varMin && weight <= varMax);
    
    return {
        variableOnly: [], // Variable fonts don't have exclusive weights in our system
        staticOnly,
        both
    };
}


/**
 * Validate font configuration and log warnings for unusual patterns
 * @param {string} fontName - Font family name
 * @param {number[]} staticWeights - Array of static font weights
 * @param {Object|null} variableRange - Variable font range or null
 */
function validateFontConfiguration(fontName, staticWeights, variableRange) {
    const warnings = [];
    
    // Check for empty font family
    if (!staticWeights.length && !variableRange) {
        warnings.push('No font files processed - font family appears empty');
    }
    
    // Check for unusual weight ranges
    if (staticWeights.length > 0) {
        const minWeight = Math.min(...staticWeights);
        const maxWeight = Math.max(...staticWeights);
        
        // Unusual weight ranges
        if (minWeight < 50) {
            warnings.push(`Extremely light weight detected (${minWeight}) - may not render well`);
        }
        if (maxWeight > 1000) {
            warnings.push(`Extremely heavy weight detected (${maxWeight}) - may not render well`);
        }
        
        // Single weight family (might be intentional)
        if (staticWeights.length === 1) {
            warnings.push(`Single weight family (${minWeight}) - consider adding more variants`);
        }
        
        // Large weight gaps
        const sortedWeights = [...staticWeights].sort((a, b) => a - b);
        for (let i = 1; i < sortedWeights.length; i++) {
            const gap = sortedWeights[i] - sortedWeights[i - 1];
            if (gap > 200 && gap < 400) {
                warnings.push(`Large weight gap detected: ${sortedWeights[i - 1]} to ${sortedWeights[i]}`);
                break; // Only report first large gap
            }
        }
    }
    
    // Check variable/static mismatches
    if (variableRange && staticWeights.length > 0) {
        const staticMin = Math.min(...staticWeights);
        const staticMax = Math.max(...staticWeights);
        
        // Static extends beyond variable range
        if (staticMin < variableRange.min || staticMax > variableRange.max) {
            const extremeWeights = staticWeights.filter(w => 
                w < variableRange.min || w > variableRange.max
            );
            warnings.push(`Variable font range (${variableRange.min}-${variableRange.max}) doesn't cover static extremes: ${extremeWeights.join(', ')}`);
        }
        
        // Variable range with no static coverage
        if (staticMin > variableRange.max || staticMax < variableRange.min) {
            warnings.push(`Variable range (${variableRange.min}-${variableRange.max}) and static range (${staticMin}-${staticMax}) don't overlap`);
        }
    }
    
    // Check for variable font without static fallbacks
    if (variableRange && staticWeights.length === 0) {
        warnings.push('Variable font with no static fallbacks - consider adding static versions for broader browser support');
    }
    
    // Log all warnings
    if (warnings.length > 0) {
        console.log(`[validation] ⚠️  ${fontName}:`);
        warnings.forEach(warning => {
            console.log(`[validation]    ${warning}`);
        });
    }
}


/**
 * Generate stylistic sets structure with placeholders for manual editing
 * @param {Array} detailedSets - Detailed stylistic sets from font metadata (if any)
 * @param {Array} basicTags - Basic stylistic set tags detected (ss01, ss02, etc.)
 * @returns {Object|null} Stylistic sets structure
 */
function generateStylisticSetsStructure(detailedSets, basicTags) {
    // If we have detailed metadata, use it
    if (detailedSets.length > 0) {
        return {
            available: detailedSets,
            count: detailedSets.length,
            tags: detailedSets.map(ss => ss.tag)
        };
    }
    
    // If we have basic tags but no detailed metadata, create placeholder structure
    if (basicTags && basicTags.length > 0) {
        const placeholders = {};
        basicTags.forEach(tag => {
            placeholders[tag] = {
                name: null,
                description: null
            };
        });
        
        return {
            detected: basicTags,
            count: basicTags.length,
            metadata: placeholders
        };
    }
    
    return null;
}

/**
 * Generate OpenType features information for consumers
 * @param {Object} familyData - Font family data
 * @returns {Object|null} OpenType features information
 */
function generateOpenTypeFeatures(familyData) {
    try {
        const allFonts = [...Object.values(familyData.static || {}), ...Object.values(familyData.variable || {})];
        
        // Collect all OpenType features and stylistic sets from all fonts
        const allFeatures = new Set();
        const stylisticSets = [];
        
        allFonts.forEach(font => {
            if (font.features?.openTypeFeatures) {
                font.features.openTypeFeatures.forEach(feature => allFeatures.add(feature));
            }
            
            if (font.features?.stylisticSets) {
                font.features.stylisticSets.forEach(ss => {
                    if (!stylisticSets.find(existing => existing.tag === ss.tag)) {
                        stylisticSets.push(ss);
                    }
                });
            }
        });
        
        const featuresArray = Array.from(allFeatures);
        
        if (featuresArray.length === 0 && stylisticSets.length === 0) {
            return null;
        }
        
        // Categorize features
        const categorizedFeatures = {
            stylistic: featuresArray.filter(f => f.startsWith('ss')),
            ligatures: featuresArray.filter(f => ['liga', 'dlig', 'clig', 'hlig'].includes(f)),
            contextual: featuresArray.filter(f => ['calt', 'clig', 'rclt'].includes(f)),
            positional: featuresArray.filter(f => ['kern', 'mark', 'mkmk', 'cpsp'].includes(f)),
            case: featuresArray.filter(f => ['case', 'cpsp', 'smcp', 'c2sc'].includes(f)),
            numeric: featuresArray.filter(f => ['lnum', 'onum', 'pnum', 'tnum', 'frac', 'ordn'].includes(f)),
            other: featuresArray.filter(f => 
                !f.startsWith('ss') && 
                !['liga', 'dlig', 'clig', 'hlig', 'calt', 'rclt', 'kern', 'mark', 'mkmk', 'cpsp', 'case', 'smcp', 'c2sc', 'lnum', 'onum', 'pnum', 'tnum', 'frac', 'ordn'].includes(f)
            )
        };
        
        return {
            openType: {
                categories: Object.fromEntries(
                    Object.entries(categorizedFeatures)
                        .filter(([key, features]) => features.length > 0)
                )
            },
            stylisticSets: generateStylisticSetsStructure(stylisticSets, categorizedFeatures.stylistic),
            capabilities: {
                hasLigatures: featuresArray.some(f => ['liga', 'dlig', 'clig'].includes(f)),
                hasContextualAlternates: featuresArray.includes('calt'),
                hasNumericalFeatures: featuresArray.some(f => ['lnum', 'onum', 'pnum', 'tnum'].includes(f)),
                hasStylisticSets: stylisticSets.length > 0 || categorizedFeatures.stylistic.length > 0
            }
        };
    } catch (error) {
        console.error(`[modules] Error generating OpenType features for ${familyData?.name || 'Unknown'}:`, error.message);
        return null;
    }
}

/**
 * Generate CDN paths for different font formats
 * @param {Object} familyData - Font family data
 * @param {string} cdnBaseUrl - CDN base URL template
 * @returns {Object} CDN path configuration
 */
function generateCdnPaths(familyData, cdnBaseUrl, repoVersion = 'latest') {
    const baseCdnUrl = cdnBaseUrl.replace('{version}', repoVersion);
    
    return {
        variable: `${baseCdnUrl}/fonts/open-fonts/${familyData.key}/fonts/variable/`,
        static: `${baseCdnUrl}/fonts/open-fonts/${familyData.key}/fonts/webfonts/`,
        ttf: `${baseCdnUrl}/fonts/open-fonts/${familyData.key}/fonts/ttf/`,
        otf: `${baseCdnUrl}/fonts/open-fonts/${familyData.key}/fonts/otf/`,
        subsets: `${baseCdnUrl}/_subsets/${familyData.key}/`
    };
}

/**
 * Check if a font family has multiple stretch variants
 * @param {Object} familyData - Font family data
 * @returns {boolean} True if family has multiple stretch variants
 */
function hasMultipleStretchVariants(familyData) {
    const allFonts = [
        ...Object.values(familyData.static || {}),
        ...Object.values(familyData.variable || {})
    ];
    
    const uniqueStretches = new Set(
        allFonts
            .map(font => font.stretch)
            .filter(stretch => stretch && stretch !== 'normal')
    );
    
    // If there are fonts with non-normal stretch values, consider it multi-stretch
    return uniqueStretches.size > 0;
}

/**
 * Transform font faces to consumption format with standardized naming
 * @param {Object} familyData - Font family data  
 * @returns {Object} Transformed font faces
 */
function transformFontFaces(familyData) {
    const faces = {
        variable: {},
        static: {}
    };
    
    // Process variable fonts
    if (familyData.variable) {
        for (const [fontKey, fontData] of Object.entries(familyData.variable)) {
            const standardizedKey = generateStandardFaceKey(familyData.name, fontData, true);
            const faceData = {
                name: generateVariableFaceName(familyData.name, fontData),
                fileName: path.basename(fontData.path),
                format: getFormatFromExtension(fontData.path),
                fontStyle: fontData.style,
                axes: fontData.axes || {},
                weight: fontData.weight
            };
            
            // Only include stretch if font has width axis
            if (fontData.axes?.wdth) {
                faceData.stretch = fontData.stretch;
            }
            
            faces.variable[standardizedKey] = faceData;
            
            // Add weight range for variable fonts
            if (fontData.axes?.wght) {
                faces.variable[standardizedKey].weightRange = `${fontData.axes.wght.min} ${fontData.axes.wght.max}`;
            }
        }
    }
    
    // Process static fonts
    if (familyData.static) {
        for (const [fontKey, fontData] of Object.entries(familyData.static)) {
            const standardizedKey = generateStandardFaceKey(familyData.name, fontData, false);
            const faceData = {
                name: generateStandardFaceName(familyData.name, fontData),
                fileName: path.basename(fontData.path),
                format: getFormatFromExtension(fontData.path),
                fontStyle: fontData.style,
                fontWeight: fontData.weight
            };
            
            // Only include fontStretch if family has multiple stretch variants
            if (hasMultipleStretchVariants(familyData)) {
                faceData.fontStretch = fontData.stretch;
            }
            
            faces.static[standardizedKey] = faceData;
        }
    }
    
    return faces;
}

/**
 * Generate standardized human-readable name for variable font face
 * @param {string} familyName - Font family name
 * @param {Object} fontData - Variable font data
 * @returns {string} Standardized human-readable variable face name
 */
function generateVariableFaceName(familyName, fontData) {
    // Proper title case family name (preserve hyphens, capitalize words)
    const titleFamilyName = familyName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    const axes = fontData.axes || {};
    const style = fontData.style === 'italic' ? ' Italic' : '';
    const axisNames = [];
    
    // Convert axis tags to human-readable names in standard order
    if (axes.wght) axisNames.push('weight');
    if (axes.wdth) axisNames.push('width');
    if (axes.slnt) axisNames.push('slant');
    if (axes.ital) axisNames.push('italic');
    
    // Add other axes as fallback
    for (const [axisTag, axisData] of Object.entries(axes)) {
        if (!['wght', 'wdth', 'slnt', 'ital'].includes(axisTag)) {
            axisNames.push(axisTag);
        }
    }
    
    const axisDescription = axisNames.length > 0 ? ` (${axisNames.join(', ')})` : '';
    return `${titleFamilyName}${style} Variable${axisDescription}`;
}

/**
 * Generate standardized face key for consistent identification
 * @param {string} familyName - Font family name
 * @param {Object} fontData - Font data
 * @param {boolean} isVariable - Whether this is a variable font
 * @returns {string} Standardized face key
 */
function generateStandardFaceKey(familyName, fontData, isVariable = false) {
    // Convert family name to PascalCase (remove hyphens, capitalize words)
    const pascalFamilyName = familyName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
    
    if (isVariable) {
        // Variable font keys: FamilyNameVariable[axes]
        const axes = Object.keys(fontData.axes || {}).sort().join(',');
        const style = fontData.style === 'italic' ? 'Italic' : 'Regular';
        return `${pascalFamilyName}Variable${style}[${axes}]`;
    }
    
    // Static font keys: FamilyName-VariantWeightStyle
    const parts = [pascalFamilyName];
    
    // Add stretch variant if not normal
    const stretch = fontData.stretch;
    if (stretch && stretch !== 'normal') {
        const stretchMap = {
            'ultra-condensed': 'UltraCondensed',
            'extra-condensed': 'ExtraCondensed', 
            'condensed': 'Condensed',
            'semi-condensed': 'SemiCondensed',
            'semi-expanded': 'SemiExpanded',
            'expanded': 'Expanded',
            'extra-expanded': 'ExtraExpanded',
            'ultra-expanded': 'UltraExpanded'
        };
        parts.push(stretchMap[stretch] || stretch);
    }
    
    // Add weight
    const weight = fontData.weight || 400;
    const weightName = getStandardWeightName(weight);
    parts.push(weightName);
    
    // Add style if italic
    if (fontData.style === 'italic') {
        parts.push('Italic');
    }
    
    return parts.join('-');
}

/**
 * Generate standardized human-readable face name
 * @param {string} familyName - Font family name
 * @param {Object} fontData - Static font data
 * @returns {string} Standardized human-readable face name
 */
function generateStandardFaceName(familyName, fontData) {
    // Proper title case family name (preserve hyphens, capitalize words)
    const titleFamilyName = familyName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    const weight = fontData.weight || 400;
    const style = fontData.style || 'normal';
    const stretch = fontData.stretch;
    
    const parts = [titleFamilyName];
    
    // Add stretch variant if not normal (before weight)
    if (stretch && stretch !== 'normal') {
        const stretchDisplayMap = {
            'ultra-condensed': 'Ultra Condensed',
            'extra-condensed': 'Extra Condensed',
            'condensed': 'Condensed', 
            'semi-condensed': 'Semi Condensed',
            'semi-expanded': 'Semi Expanded',
            'expanded': 'Expanded',
            'extra-expanded': 'Extra Expanded', 
            'ultra-expanded': 'Ultra Expanded'
        };
        parts.push(stretchDisplayMap[stretch] || stretch);
    }
    
    // Add weight name
    const weightName = getStandardWeightName(weight);
    parts.push(weightName);
    
    // Add style if italic
    if (style === 'italic') {
        parts.push('Italic');
    }
    
    return parts.join(' ');
}

/**
 * Get standardized weight name from numeric weight
 * @param {number} weight - Numeric font weight
 * @returns {string} Standard weight name
 */
function getStandardWeightName(weight) {
    // Standard weight mapping with fallback to numeric
    const standardWeights = {
        100: 'Thin',
        200: 'ExtraLight', 
        300: 'Light',
        400: 'Regular',
        500: 'Medium',
        600: 'SemiBold',
        700: 'Bold',
        800: 'ExtraBold',
        900: 'Black'
    };
    
    // Return standard name if available, otherwise use numeric
    return standardWeights[weight] || weight.toString();
}


/**
 * Get format string from file extension
 * @param {string} filePath - Font file path
 * @returns {string} Format string
 */
function getFormatFromExtension(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const formatMap = {
        '.ttf': 'truetype',
        '.otf': 'opentype', 
        '.woff': 'woff',
        '.woff2': 'woff2'
    };
    return formatMap[ext] || 'truetype';
}

/**
 * Generate combined module with all font families
 * @param {Object} fontFamilies - All font family data
 * @param {string} outputDir - Output directory
 * @param {string} cdnBaseUrl - CDN base URL
 * @param {string} repoVersion - Repository version for CDN URLs
 */
export async function generateCombinedModule(fontFamilies, outputDir, cdnBaseUrl, repoVersion = 'latest') {
    const allFonts = {};
    
    for (const [familyKey, familyData] of Object.entries(fontFamilies)) {
        allFonts[familyData.key] = {
            name: familyData.name,
            key: familyData.key,
            version: familyData.version,
            author: familyData.author,
            license: familyData.license || familyData.licenseType,
            description: familyData.description,
            weight: generateWeightInfo(familyData),
            cdnBase: generateCdnPaths(familyData, cdnBaseUrl, repoVersion),
            faces: transformFontFaces(familyData)
        };
    }
    
    const moduleContent = `/**
 * Font Families - Combined Module
 * 
 * Contains all open-licensed font families available via public CDN
 * Generated from font-families build system
 */

export default ${JSON.stringify(allFonts, null, 2)};

// Individual exports for convenience
${Object.entries(allFonts).map(([key, data]) => 
    `export const ${camelCase(key)} = ${JSON.stringify(data, null, 2)};`
).join('\\n\\n')}
`;
    
    await fs.writeFile(path.join(outputDir, 'all.js'), moduleContent);
    console.log('[modules] Generated combined module: all.js');
}

/**
 * Generate index module for easy importing
 * @param {Object} fontFamilies - All font family data
 * @param {string} outputDir - Output directory
 */
export async function generateIndexModule(fontFamilies, outputDir) {
    const exports = Object.entries(fontFamilies).map(([familyKey, familyData]) => {
        return `export { default as ${camelCase(familyData.key)} } from './${familyData.key}.js';`;
    });
    
    const indexContent = `/**
 * Font Families - Module Index
 * 
 * Provides easy access to all font family modules
 */

${exports.join('\\n')}

// Combined export
export { default as allFonts } from './all.js';

// Utility function to get font by slug
const fontMap = {
${Object.entries(fontFamilies).map(([familyKey, familyData]) => 
    `  '${familyData.key}': () => import('./${familyData.key}.js')`
).join(',\\n')}
};

export async function getFontByKey(key) {
  if (fontMap[key]) {
    const module = await fontMap[key]();
    return module.default;
  }
  throw new Error(\`Font family not found: \${key}\`);
}

export const availableFonts = Object.keys(fontMap);
`;
    
    await fs.writeFile(path.join(outputDir, 'index.js'), indexContent);
    console.log('[modules] Generated index module: index.js');
}

/**
 * Generate subset information for font family
 * @param {Object} familyData - Font family data
 * @returns {Object} Subset information
 */
async function generateSubsetInfo(familyData) {
    const subsets = {};
    const subsetMetadataPath = path.join('_subsets', familyData.key, 'metadata.json');
    
    try {
        const metadataContent = await fs.readFile(subsetMetadataPath, 'utf8');
        const metadata = JSON.parse(metadataContent);
        
        for (const [subsetName, subsetConfig] of Object.entries(metadata.subsets || {})) {
            if (subsetConfig.status === 'generated') {
                subsets[subsetName] = {
                    description: subsetConfig.description,
                    characterCount: subsetConfig.characterCount,
                    unicodeRanges: subsetConfig.unicodeRanges,
                    files: subsetConfig.targetFiles || {},
                    generatedAt: subsetConfig.generatedAt
                };
            }
        }
    } catch (error) {
        // No subset metadata found - return empty object
        console.log(`[modules] No subset metadata found for ${familyData.key}`);
    }
    
    return subsets;
}

/**
 * Convert kebab-case to camelCase
 * @param {string} str - Input string
 * @returns {string} CamelCase string
 */
function camelCase(str) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

