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
    const moduleContent = generateFamilyModuleContent(familyData, cdnBaseUrl, repoVersion);
    const modulePath = path.join(outputDir, `${familyData.slug}.js`);
    
    await fs.writeFile(modulePath, moduleContent);
    console.log(`[modules] Generated module: ${familyData.slug}.js`);
}

/**
 * Generate content for individual font family module
 * @param {Object} familyData - Font family data
 * @param {string} cdnBaseUrl - CDN base URL template
 * @param {string} repoVersion - Repository version for CDN URLs
 * @returns {string} Module content
 */
function generateFamilyModuleContent(familyData, cdnBaseUrl, repoVersion = 'latest') {
    // Transform font data for consumption (similar to hund-press format)
    const transformedData = {
        name: familyData.name,
        slug: familyData.slug,
        canonicalName: familyData.name,
        published: true,
        
        // UFR metadata
        version: familyData.version,
        author: familyData.author,
        license: familyData.license || familyData.licenseType,
        description: familyData.description,
        
        // CDN configuration
        cdnBase: generateCdnPaths(familyData, cdnBaseUrl, repoVersion),
        
        // Font faces organized by type
        faces: transformFontFaces(familyData),
        
        // Fallback configuration
        fallbacks: generateFallbacks(familyData)
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
 * Generate CDN paths for different font formats
 * @param {Object} familyData - Font family data
 * @param {string} cdnBaseUrl - CDN base URL template
 * @returns {Object} CDN path configuration
 */
function generateCdnPaths(familyData, cdnBaseUrl, repoVersion = 'latest') {
    const baseCdnUrl = cdnBaseUrl.replace('{version}', repoVersion);
    
    return {
        variable: `${baseCdnUrl}/${familyData.slug}/fonts/variable/`,
        static: `${baseCdnUrl}/${familyData.slug}/fonts/webfonts/`,
        ttf: `${baseCdnUrl}/${familyData.slug}/fonts/ttf/`,
        otf: `${baseCdnUrl}/${familyData.slug}/fonts/otf/`
    };
}

/**
 * Transform font faces to consumption format
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
            faces.variable[fontKey] = {
                fileName: path.basename(fontData.path),
                format: getFormatFromExtension(fontData.path),
                fontStyle: fontData.style,
                axes: fontData.axes || {},
                weight: fontData.weight,
                stretch: fontData.stretch
            };
            
            // Add weight range for variable fonts
            if (fontData.axes?.wght) {
                faces.variable[fontKey].weightRange = `${fontData.axes.wght.min} ${fontData.axes.wght.max}`;
            }
        }
    }
    
    // Process static fonts
    if (familyData.static) {
        for (const [fontKey, fontData] of Object.entries(familyData.static)) {
            faces.static[fontKey] = {
                fileName: path.basename(fontData.path),
                format: getFormatFromExtension(fontData.path),
                fontStyle: fontData.style,
                fontWeight: fontData.weight,
                fontStretch: fontData.stretch
            };
        }
    }
    
    return faces;
}

/**
 * Generate fallback font configuration
 * @param {Object} familyData - Font family data
 * @returns {Object} Fallback configuration
 */
function generateFallbacks(familyData) {
    // Extract metrics from first available font for fallback calculation
    const firstFont = Object.values(familyData.variable || {})[0] || 
                     Object.values(familyData.static || {})[0];
    
    if (!firstFont?.metrics) {
        return {
            fontFace: {
                src: "local(system-ui)",
                ascentOverride: "90%",
                descentOverride: "22%"
            },
            styles: {}
        };
    }
    
    // Calculate override values based on font metrics
    const { ascent, descent, unitsPerEm } = firstFont.metrics;
    const ascentOverride = ascent && unitsPerEm ? `${Math.round((ascent / unitsPerEm) * 100)}%` : "90%";
    const descentOverride = descent && unitsPerEm ? `${Math.round(Math.abs(descent) / unitsPerEm * 100)}%` : "22%";
    
    return {
        fontFace: {
            src: "local(system-ui)",
            ascentOverride,
            descentOverride
        },
        styles: {}
    };
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
        allFonts[familyData.slug] = {
            name: familyData.name,
            slug: familyData.slug,
            version: familyData.version,
            author: familyData.author,
            license: familyData.license || familyData.licenseType,
            description: familyData.description,
            cdnBase: generateCdnPaths(familyData, cdnBaseUrl, repoVersion),
            faces: transformFontFaces(familyData),
            fallbacks: generateFallbacks(familyData)
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
${Object.entries(allFonts).map(([slug, data]) => 
    `export const ${camelCase(slug)} = ${JSON.stringify(data, null, 2)};`
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
        return `export { default as ${camelCase(familyData.slug)} } from './${familyData.slug}.js';`;
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
    `  '${familyData.slug}': () => import('./${familyData.slug}.js')`
).join(',\\n')}
};

export async function getFontBySlug(slug) {
  if (fontMap[slug]) {
    const module = await fontMap[slug]();
    return module.default;
  }
  throw new Error(\`Font family not found: \${slug}\`);
}

export const availableFonts = Object.keys(fontMap);
`;
    
    await fs.writeFile(path.join(outputDir, 'index.js'), indexContent);
    console.log('[modules] Generated index module: index.js');
}

/**
 * Convert kebab-case to camelCase
 * @param {string} str - Input string
 * @returns {string} CamelCase string
 */
function camelCase(str) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

