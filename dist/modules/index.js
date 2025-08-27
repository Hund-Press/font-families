/**
 * Font Families - Module Index
 * 
 * Provides easy access to all font family modules
 */

export { default as aspekta } from './aspekta.js';\nexport { default as sources } from './sources.js';\nexport { default as fonts } from './fonts.js';

// Combined export
export { default as allFonts } from './all.js';

// Utility function to get font by slug
const fontMap = {
  'aspekta': () => import('./aspekta.js'),\n  'sources': () => import('./sources.js'),\n  'fonts': () => import('./fonts.js')
};

export async function getFontBySlug(slug) {
  if (fontMap[slug]) {
    const module = await fontMap[slug]();
    return module.default;
  }
  throw new Error(`Font family not found: ${slug}`);
}

export const availableFonts = Object.keys(fontMap);
