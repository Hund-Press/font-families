/**
 * Font Families - Module Index
 * 
 * Provides easy access to all font family modules
 */



// Combined export
export { default as allFonts } from './all.js';

// Utility function to get font by slug
const fontMap = {

};

export async function getFontBySlug(slug) {
  if (fontMap[slug]) {
    const module = await fontMap[slug]();
    return module.default;
  }
  throw new Error(`Font family not found: ${slug}`);
}

export const availableFonts = Object.keys(fontMap);
