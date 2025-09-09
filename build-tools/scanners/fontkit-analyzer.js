/**
 * Font Name Extraction and FontKit Analysis Utilities
 * 
 * Combines font metadata extraction with detailed fontkit-based analysis.
 * Migrated from hund-press font-name-extractor.js and scan-families.js
 */

import { promises as fs } from 'fs';
import path from 'path';

/**
 * Extract canonical font family name from font face metadata
 * @param {Object} fontFaceData - Font face metadata containing metrics, features, etc.
 * @returns {string} Canonical family name
 */
export function extractCanonicalFamilyName(fontFaceData) {
    // For now, we'll use the family field from the font metadata
    // In a full implementation, this would read from font name tables
    if (!fontFaceData || !fontFaceData.family) {
        return null;
    }
    
    // Convert from kebab-case or lowercase to proper title case
    return formatFamilyName(fontFaceData.family);
}

/**
 * Format a family name from various formats to proper display format
 * @param {string} rawName - Raw family name from font metadata
 * @returns {string} Formatted family name
 */
export function formatFamilyName(rawName) {
    if (!rawName || typeof rawName !== 'string') {
        return rawName;
    }
    
    // Handle known font families with special formatting
    const specialCases = {
        'plex-sans': 'IBM Plex Sans',
        'plex-sans-jp': 'IBM Plex Sans JP',
        'plex-sans-arabic': 'IBM Plex Sans Arabic',
        'plex-sans-hebrew': 'IBM Plex Sans Hebrew',
        'plex-sans-devanagari': 'IBM Plex Sans Devanagari',
        'plex-sans-thai': 'IBM Plex Sans Thai',
        'plex-sans-thai-looped': 'IBM Plex Sans Thai Looped',
        'plex-sans-kr': 'IBM Plex Sans KR',
        'plex-sans-sc': 'IBM Plex Sans SC',
        'plex-sans-tc': 'IBM Plex Sans TC',
        'plex-sans-condensed': 'IBM Plex Sans Condensed',
        'plex-sans-variable': 'IBM Plex Sans Variable',
        'plex-serif': 'IBM Plex Serif',
        'plex-mono': 'IBM Plex Mono',
        'plex-math': 'IBM Plex Math',
        'public-sans': 'Public Sans',
        'clearsans': 'Clear Sans',
        'libertinus': 'Libertinus',
        'league-mono': 'League Mono',
        'aspekta': 'Aspekta'
    };
    
    if (specialCases[rawName.toLowerCase()]) {
        return specialCases[rawName.toLowerCase()];
    }
    
    // General formatting for unknown fonts
    return rawName
        .split(/[-_\s]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

/**
 * Generate a URL-safe slug from a family name
 * @param {string} familyName - Family name to slugify
 * @returns {string} URL-safe slug
 */
export function generateKey(familyName) {
    if (!familyName || typeof familyName !== 'string') {
        return familyName;
    }
    
    return familyName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Detect if a font family is a language/script variant
 * @param {string} familyName - Font family name
 * @param {string} folderName - Original folder name
 * @returns {Object} Variant detection result
 */
export function detectFamilyVariant(familyName, folderName = '') {
    const scriptVariants = {
        'arabic': 'Arabic',
        'hebrew': 'Hebrew', 
        'devanagari': 'Devanagari',
        'thai': 'Thai',
        'jp': 'Japanese',
        'kr': 'Korean',
        'sc': 'Simplified Chinese',
        'tc': 'Traditional Chinese',
        'condensed': 'Condensed',
        'variable': 'Variable'
    };
    
    const lowerName = familyName.toLowerCase();
    const lowerFolder = folderName.toLowerCase();
    
    for (const [key, scriptName] of Object.entries(scriptVariants)) {
        if (lowerName.includes(key) || lowerFolder.includes(key)) {
            // Create base name by removing the script variant
            let baseName = familyName;
            
            // Remove the script name from the family name (case insensitive)
            baseName = baseName.replace(new RegExp(`\\s*${scriptName}\\s*$`, 'i'), '').trim();
            
            // Also try removing the key from the name
            baseName = baseName.replace(new RegExp(`\\s*${key.toUpperCase()}\\s*$`, 'i'), '').trim();
            baseName = baseName.replace(new RegExp(`\\s*${key}\\s*$`, 'i'), '').trim();
            
            return {
                isVariant: true,
                scriptName,
                variantKey: key,
                baseName: baseName
            };
        }
    }
    
    return {
        isVariant: false,
        scriptName: null,
        variantKey: null,
        baseName: familyName
    };
}

/**
 * Extract language support from Unicode ranges
 * @param {Array} unicodeRanges - Array of Unicode range objects
 * @returns {Object} Language support information
 */
export function extractLanguageSupport(unicodeRanges = []) {
    const scriptLanguageMap = {
        'Basic Latin': ['en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'da', 'sv', 'no', 'fi'],
        'Latin-1 Supplement': ['en', 'es', 'fr', 'de', 'it', 'pt', 'da', 'sv', 'no', 'is'],
        'Latin Extended-A': ['cs', 'pl', 'hu', 'ro', 'hr', 'sl', 'sk', 'et', 'lv', 'lt'],
        'Latin Extended-B': ['hr', 'sl', 'sk', 'ro', 'af', 'sq', 'eu'],
        'Cyrillic': ['ru', 'uk', 'bg', 'sr', 'mk', 'be', 'kk', 'ky', 'mn', 'uz'],
        'Greek': ['el'],
        'Arabic': ['ar', 'fa', 'ur', 'ps', 'sd'],
        'Hebrew': ['he', 'yi'],
        'Devanagari': ['hi', 'mr', 'ne', 'sa'],
        'Thai': ['th'],
        'Hiragana': ['ja'],
        'Katakana': ['ja'],
        'CJK Symbols': ['zh', 'ja', 'ko'],
        'Hangul': ['ko'],
        'Armenian': ['hy'],
        'Georgian': ['ka'],
        'Ethiopic': ['am', 'ti'],
        'Cherokee': ['chr'],
        'Canadian Aboriginal': ['iu', 'cr']
    };
    
    const supportedScripts = new Set();
    const supportedLanguages = new Set();
    const scriptCoverage = {};
    
    for (const range of unicodeRanges) {
        if (range.name && range.coverage > 0.3) { // Lower threshold for better detection
            supportedScripts.add(range.name);
            scriptCoverage[range.name] = range.coverage;
            
            if (scriptLanguageMap[range.name]) {
                scriptLanguageMap[range.name].forEach(lang => supportedLanguages.add(lang));
            }
        }
    }
    
    return {
        scripts: Array.from(supportedScripts),
        languages: Array.from(supportedLanguages),
        scriptCount: supportedScripts.size,
        languageCount: supportedLanguages.size,
        coverage: scriptCoverage,
        detailed: {
            scriptToLanguages: Object.fromEntries(
                Array.from(supportedScripts)
                    .filter(script => scriptLanguageMap[script])
                    .map(script => [script, scriptLanguageMap[script]])
            )
        }
    };
}

/**
 * Extract stylistic sets from OpenType features
 * @param {Array} openTypeFeatures - Array of OpenType feature tags
 * @returns {Array} Array of stylistic set information
 */
export function extractStylisticSets(openTypeFeatures = []) {
    const stylisticSets = [];
    
    // Look for stylistic set features (ss01-ss20)
    for (let i = 1; i <= 20; i++) {
        const ssTag = `ss${i.toString().padStart(2, '0')}`;
        if (openTypeFeatures.includes(ssTag)) {
            stylisticSets.push({
                tag: ssTag,
                name: `Stylistic Set ${i}`,
                description: getStylisticSetDescription(ssTag)
            });
        }
    }
    
    return stylisticSets;
}

/**
 * Get description for stylistic sets based on common usage patterns
 * @param {string} ssTag - Stylistic set tag (e.g., 'ss01')
 * @returns {string} Description of the stylistic set
 */
export function getStylisticSetDescription(ssTag) {
    const descriptions = {
        'ss01': 'Alternate character forms',
        'ss02': 'Alternate punctuation',
        'ss03': 'Alternate numerals',
        'ss04': 'Contextual alternates',
        'ss05': 'Historical forms',
        'ss06': 'Decorative alternates',
        'ss07': 'Swash characters',
        'ss08': 'Simplified forms',
        'ss09': 'Rounded forms',
        'ss10': 'Angular forms',
        'ss11': 'Condensed alternates',
        'ss12': 'Extended alternates',
        'ss13': 'Monospaced alternates',
        'ss14': 'Display alternates',
        'ss15': 'Script alternates',
        'ss16': 'Ornamental forms',
        'ss17': 'Titling alternates',
        'ss18': 'Small caps alternates',
        'ss19': 'Ligature alternates',
        'ss20': 'Expert set'
    };
    
    return descriptions[ssTag] || 'Stylistic alternates';
}

/**
 * Generate enhanced font family metadata
 * @param {Object} scannedData - Raw scanned font data
 * @returns {Object} Enhanced family metadata
 */
export function generateEnhancedFamilyMetadata(scannedData) {
    if (!scannedData || !scannedData.static && !scannedData.variable) {
        throw new Error('Invalid scanned data: must have static or variable fonts');
    }
    
    // Get first available font face for family name extraction
    const firstFont = Object.values(scannedData.static)[0] || Object.values(scannedData.variable)[0];
    if (!firstFont) {
        throw new Error('No font faces found in scanned data');
    }
    
    // Extract canonical family name
    const canonicalName = extractCanonicalFamilyName(firstFont);
    if (!canonicalName) {
        throw new Error('Could not extract canonical family name');
    }
    
    // Detect variant information
    const variant = detectFamilyVariant(canonicalName, scannedData.folderName);
    
    // Extract language support from all fonts
    const allFonts = [...Object.values(scannedData.static || {}), ...Object.values(scannedData.variable || {})];
    const allUnicodeRanges = allFonts.flatMap(font => font.features?.unicodeRanges || []);
    const languageSupport = extractLanguageSupport(allUnicodeRanges);
    
    // Generate names and key
    const displayName = canonicalName;
    const key = generateKey(displayName);
    
    return {
        // Display information
        name: displayName,
        key: key,
        canonicalName: canonicalName,
        
        // Family relationships
        isLanguageVariant: variant.isVariant,
        baseFamilyName: variant.baseName,
        baseFamilyKey: variant.baseName ? generateKey(variant.baseName) : null,
        scriptVariant: variant.scriptName,
        variantKey: variant.variantKey,
        
        // Language support
        languages: {
            supported: languageSupport.languages,
            scripts: languageSupport.scripts,
            count: {
                scripts: languageSupport.scriptCount,
                languages: languageSupport.languageCount
            },
            detailed: languageSupport.detailed
        },
        
        // Enhanced metadata
        enhanced: {
            languageSupport: languageSupport.languages,
            scriptSupport: languageSupport.scripts,
            unicodeCoverage: languageSupport.coverage,
            scriptToLanguages: languageSupport.detailed.scriptToLanguages
        }
    };
}

/**
 * Normalizes font metadata to consistent structure
 * @param {Object} font - Fontkit font object
 * @param {string} fontName - Font family name
 * @param {string} fontFile - Path to font file
 * @returns {Promise<Object>} Normalized font data
 */
export async function normalizeFont(font, fontName, fontFile) {
    const result = {
        family: fontName, // Use font name from folder
        style: normalizeStyle(font.subfamilyName),
        weight: font.usWeightClass || inferWeight(font.subfamilyName, font.postscriptName),
        stretch: extractStretch(font.familyName, fontFile),
        path: fontFile.replace(process.cwd(), '').replace(/^\//, ''),
        absolutePath: fontFile, // Keep absolute path for file operations
        subfamilyName: font.subfamilyName || null // Designer's actual subfamily name
    };
    
    // Visual Size Metrics - Critical for curation tools
    result.metrics = {
        // Font coordinate system scale
        unitsPerEm: font.unitsPerEm,
        
        // Vertical metrics for baseline and size calculations
        ascent: font.ascent,
        descent: font.descent,
        lineGap: font.lineGap,
        
        // Typography-specific metrics
        capHeight: font.capHeight,
        xHeight: font.xHeight,
        
        // Baseline information (if specified in BASE table)
        baseline: extractBaselineMetrics(font),
        
        // Bounding box for overall font dimensions
        bbox: font.bbox ? {
            minX: font.bbox.minX,
            minY: font.bbox.minY,
            maxX: font.bbox.maxX,
            maxY: font.bbox.maxY
        } : null
    };
    
    // Character Spacing Analysis
    result.spacing = extractSpacingMetrics(font);
    
    // Typography Capabilities
    result.features = extractTypographyFeatures(font);
    
    // Performance Metrics
    result.performance = await extractPerformanceMetrics(font, fontFile);
    
    // Remove absolutePath from result (only used internally)
    delete result.absolutePath;
    
    // Handle variable fonts
    if (font.variationAxes && Object.keys(font.variationAxes).length > 0) {
        result.axes = {};
        
        // Extract axis information
        for (const [axisTag, axis] of Object.entries(font.variationAxes)) {
            result.axes[axisTag] = {
                min: axis.min,
                max: axis.max,
                default: axis.default
            };
        }
        
        // Convert weight to range for variable fonts
        if (result.axes.wght) {
            result.weight = { min: result.axes.wght.min, max: result.axes.wght.max };
        }
        
        // Extract stretch range for variable fonts with width axis
        if (result.axes.wdth) {
            // Instead of assuming a universal mapping, extract stretch from named instances
            const stretchMapping = extractStretchFromInstances(font.fvar);
            result.stretch = {
                min: stretchMapping[result.axes.wdth.min] || 'normal',
                max: stretchMapping[result.axes.wdth.max] || 'normal', 
                default: stretchMapping[result.axes.wdth.default] || 'normal',
                mapping: stretchMapping // Include full mapping for reference
            };
        }
        
        // Include named instances if available
        if (font.fvar && font.fvar.instance) {
            result.namedInstances = font.fvar.instance.map(instance => {
                const coordinates = {};
                
                // Map coordinates to axis tags dynamically
                if (font.fvar.axis) {
                    font.fvar.axis.forEach((axis, index) => {
                        if (instance.coord[index] !== undefined) {
                            coordinates[axis.axisTag] = instance.coord[index];
                        }
                    });
                }
                
                return {
                    name: instance.name?.en || `Instance ${instance.nameID}`,
                    coordinates
                };
            });
        }
    }
    
    return result;
}

/**
 * Converts font subfamily names to CSS font-style values
 */
export function normalizeStyle(subfamily) {
    if (!subfamily) return 'normal';
    
    const lower = subfamily.toLowerCase();
    if (lower.includes('italic') || lower.includes('oblique')) {
        return 'italic';
    }
    return 'normal';
}

/**
 * Extracts font-stretch value from family name or file path
 */
export function extractStretch(fontFamilyName, filePath) {
    const text = (fontFamilyName + ' ' + filePath).toLowerCase();
    
    if (text.includes('ultra-condensed') || text.includes('ultracondensed')) return 'ultra-condensed';
    if (text.includes('extra-condensed') || text.includes('extracondensed')) return 'extra-condensed';
    if (text.includes('condensed')) return 'condensed';
    if (text.includes('semi-condensed') || text.includes('semicondensed') || text.includes('narrow')) return 'semi-condensed';
    if (text.includes('semi-expanded') || text.includes('semiexpanded')) return 'semi-expanded';
    if (text.includes('expanded') || text.includes('extended')) return 'expanded';
    if (text.includes('extra-expanded') || text.includes('extraexpanded')) return 'extra-expanded';
    if (text.includes('ultra-expanded') || text.includes('ultraexpanded') || text.includes('wide')) return 'ultra-expanded';
    
    return 'normal';
}

/**
 * Infers font weight from subfamily name or postscript name when usWeightClass is missing
 */
export function inferWeight(subfamilyName, postscriptName) {
    const text = (subfamilyName + ' ' + postscriptName).toLowerCase();
    
    // First, try to extract numeric weight from PostScript name or subfamily
    // Look for patterns like "Aspekta-800", "Font-w600", "FontName-500", "Aspekta-50", etc.
    const numericMatch = (postscriptName + ' ' + subfamilyName).match(/-?(\d{2,4})\b/);
    if (numericMatch) {
        const weight = parseInt(numericMatch[1]);
        // Validate it's a reasonable font weight (50 or 100-1000, allowing for extended range)
        if (weight === 50 || (weight >= 100 && weight <= 1000)) {
            return weight;
        }
    }
    
    // Fallback to keyword-based detection
    // Check more specific patterns first to avoid conflicts
    if (text.includes('extrabold') || text.includes('ultrabold')) return 800;
    if (text.includes('black') || text.includes('heavy')) return 900;
    if (text.includes('thin')) return 100;
    if (text.includes('extralight') || text.includes('ultralight')) return 200;
    if (text.includes('semibold') || text.includes('demi')) return 600;
    if (text.includes('bold')) return 700; // Now safe to check 'bold' after 'extrabold'
    if (text.includes('light')) return 300;
    if (text.includes('medium')) return 500;
    if (text.includes('regular') || text.includes('normal')) return 400;
    
    return 400; // Default to regular
}

/**
 * Extracts font-specific stretch mapping from named instances
 */
export function extractStretchFromInstances(fvar) {
    const mapping = {};
    
    if (!fvar?.instance || !fvar?.axis) return mapping;
    
    // Find the width axis index
    const widthAxisIndex = fvar.axis.findIndex(axis => axis.axisTag === 'wdth');
    if (widthAxisIndex === -1) return mapping;
    
    // Extract width-to-name mapping from instances
    const widthToName = {};
    fvar.instance.forEach(instance => {
        const widthValue = instance.coord[widthAxisIndex];
        const name = instance.name?.en || '';
        
        // Extract width descriptor from instance name
        const widthDescriptor = extractWidthDescriptor(name);
        if (widthValue && widthDescriptor) {
            widthToName[widthValue] = widthDescriptor;
        }
    });
    
    // Convert font-specific descriptors to CSS stretch values
    Object.entries(widthToName).forEach(([width, descriptor]) => {
        mapping[width] = mapDescriptorToStretch(descriptor);
    });
    
    return mapping;
}

/**
 * Extracts width descriptor from instance name (e.g., "Condensed" from "Condensed Bold")
 */
export function extractWidthDescriptor(instanceName) {
    const name = instanceName.toLowerCase();
    
    if (name.includes('condensed')) return 'condensed';
    if (name.includes('narrow')) return 'narrow';
    if (name.includes('extended')) return 'extended';
    if (name.includes('wide')) return 'wide';
    
    // If no width descriptor, it's probably the normal width
    return 'normal';
}

/**
 * Maps font-specific width descriptors to CSS font-stretch values
 */
export function mapDescriptorToStretch(descriptor) {
    switch (descriptor) {
        case 'condensed': return 'condensed';
        case 'narrow': return 'semi-condensed';
        case 'extended': return 'expanded'; 
        case 'wide': return 'extra-expanded';
        case 'normal': return 'normal';
        default: return 'normal';
    }
}

/**
 * Extracts baseline metrics from font if available
 */
export function extractBaselineMetrics(font) {
    try {
        // Check for BASE table (baseline data)
        if (font._table && font._table.BASE) {
            const baseTable = font._table.BASE;
            return {
                hasBaseTable: true,
                // Extract baseline tags and values if available
                data: baseTable.data || null
            };
        }
        
        // Fallback to calculated baseline metrics
        return {
            hasBaseTable: false,
            // Standard baseline calculations
            alphabetic: 0, // Typically at 0
            hanging: font.ascent ? Math.round(font.ascent * 0.8) : null,
            ideographic: font.descent || null,
            mathematical: font.ascent ? Math.round(font.ascent * 0.5) : null
        };
    } catch (error) {
        return null;
    }
}

/**
 * Extracts character spacing metrics for layout analysis
 */
export function extractSpacingMetrics(font) {
    try {
        const spacing = {};
        
        // Get key character advance widths
        const keyChars = {
            space: 0x0020,      // Space character
            n: 0x006E,          // Lowercase 'n' (typical character width)
            M: 0x004D,          // Uppercase 'M' (widest typical character)
            period: 0x002E,     // Period (punctuation reference)
            em: 0x2014,         // Em dash (if available)
            en: 0x2013          // En dash (if available)
        };
        
        for (const [name, codePoint] of Object.entries(keyChars)) {
            try {
                const glyph = font.glyphForCodePoint(codePoint);
                if (glyph) {
                    spacing[name] = {
                        advanceWidth: glyph.advanceWidth,
                        leftSideBearing: glyph.bbox?.minX || 0,
                        rightSideBearing: glyph.advanceWidth - (glyph.bbox?.maxX || glyph.advanceWidth),
                        width: glyph.bbox ? (glyph.bbox.maxX - glyph.bbox.minX) : null
                    };
                }
            } catch (glyphError) {
                // Character not available in font
                spacing[name] = null;
            }
        }
        
        // Calculate relative spacing metrics
        if (spacing.space && spacing.n) {
            spacing.spaceToN = spacing.space.advanceWidth / spacing.n.advanceWidth;
        }
        
        if (spacing.M && spacing.n) {
            spacing.MToN = spacing.M.advanceWidth / spacing.n.advanceWidth;
        }
        
        return spacing;
    } catch (error) {
        return null;
    }
}

/**
 * Extracts typography features and capabilities
 */
export function extractTypographyFeatures(font) {
    try {
        const features = {
            openTypeFeatures: [],
            stylisticSets: [],
            languageSupport: {},
            glyphCount: font.numGlyphs,
            unicodeRanges: []
        };
        
        // Extract OpenType features from GSUB and GPOS tables
        try {
            if (font.GSUB && font.GSUB.featureList) {
                features.openTypeFeatures = font.GSUB.featureList.map(feature => feature.tag).filter(Boolean);
            }
            
            if (font.GPOS && font.GPOS.featureList) {
                const posFeatures = font.GPOS.featureList.map(feature => feature.tag).filter(Boolean);
                features.openTypeFeatures = [...new Set([...features.openTypeFeatures, ...posFeatures])];
            }
            
            // Extract stylistic sets (ss01-ss20)
            features.stylisticSets = extractStylisticSets(features.openTypeFeatures);
        } catch (featureError) {
            // Features not accessible or not present
        }
        
        // Detect Unicode ranges by sampling character coverage
        try {
            const unicodeBlocks = [
                { name: 'Basic Latin', start: 0x0000, end: 0x007F },
                { name: 'Latin-1 Supplement', start: 0x0080, end: 0x00FF },
                { name: 'Latin Extended-A', start: 0x0100, end: 0x017F },
                { name: 'Latin Extended-B', start: 0x0180, end: 0x024F },
                { name: 'Cyrillic', start: 0x0400, end: 0x04FF },
                { name: 'Greek', start: 0x0370, end: 0x03FF },
                { name: 'Arabic', start: 0x0600, end: 0x06FF },
                { name: 'CJK Symbols', start: 0x3000, end: 0x303F },
                { name: 'Hiragana', start: 0x3040, end: 0x309F },
                { name: 'Katakana', start: 0x30A0, end: 0x30FF }
            ];
            
            for (const block of unicodeBlocks) {
                // Sample a few characters from each block
                const sampleSize = Math.min(10, block.end - block.start + 1);
                let supportedCount = 0;
                
                for (let i = 0; i < sampleSize; i++) {
                    const codePoint = block.start + Math.floor((block.end - block.start) * i / sampleSize);
                    try {
                        const glyph = font.glyphForCodePoint(codePoint);
                        if (glyph && glyph.id !== 0) { // Not the .notdef glyph
                            supportedCount++;
                        }
                    } catch (glyphError) {
                        // Character not supported
                    }
                }
                
                if (supportedCount > 0) {
                    features.unicodeRanges.push({
                        name: block.name,
                        coverage: supportedCount / sampleSize,
                        start: block.start,
                        end: block.end
                    });
                }
            }
        } catch (unicodeError) {
            // Unicode analysis failed
        }
        
        return features;
    } catch (error) {
        return null;
    }
}

/**
 * Extracts performance-related metrics
 */
export async function extractPerformanceMetrics(font, fontFile) {
    try {
        const stats = await fs.stat(fontFile);
        
        return {
            fileSize: stats.size,
            fileSizeKB: Math.round(stats.size / 1024),
            glyphDensity: font.numGlyphs ? Math.round(stats.size / font.numGlyphs) : null,
            format: path.extname(fontFile).toLowerCase().substring(1),
            isVariable: font.variationAxes && Object.keys(font.variationAxes).length > 0,
            axisCount: font.variationAxes ? Object.keys(font.variationAxes).length : 0,
            tableCount: font._tables ? Object.keys(font._tables).length : null
        };
    } catch (error) {
        // Performance metrics extraction failed - file size and table count unavailable
        return {
            fileSize: null,
            fileSizeKB: null,
            glyphDensity: null,
            format: path.extname(fontFile).toLowerCase().substring(1),
            isVariable: font.variationAxes && Object.keys(font.variationAxes).length > 0,
            axisCount: font.variationAxes ? Object.keys(font.variationAxes).length : 0,
            tableCount: null
        };
    }
}