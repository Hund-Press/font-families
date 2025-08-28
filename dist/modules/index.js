/**
 * Font Families - Module Index
 * 
 * Provides easy access to all font family modules
 */

export { default as aspekta } from './aspekta.js';

// Combined export
export { default as allFonts } from './all.js';

// Utility function to get font by slug
const fontMap = {
  'aspekta': () => import('./aspekta.js')
};

export async function getFontBySlug(slug) {
  if (fontMap[slug]) {
    const module = await fontMap[slug]();
    return module.default;
  }
  throw new Error(`Font family not found: ${slug}`);
}

export const availableFonts = Object.keys(fontMap);
