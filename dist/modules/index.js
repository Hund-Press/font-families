/**
 * Font Families - Module Index
 * 
 * Provides easy access to all font family modules
 */

export { default as publicSans } from './public-sans.js';\nexport { default as leagueMono } from './league-mono.js';\nexport { default as inconsolata } from './inconsolata.js';\nexport { default as crimsonPro } from './crimson-pro.js';\nexport { default as atkinsonHyperlegible } from './atkinson-hyperlegible.js';\nexport { default as aspekta } from './aspekta.js';

// Combined export
export { default as allFonts } from './all.js';

// Utility function to get font by slug
const fontMap = {
  'public-sans': () => import('./public-sans.js'),\n  'league-mono': () => import('./league-mono.js'),\n  'inconsolata': () => import('./inconsolata.js'),\n  'crimson-pro': () => import('./crimson-pro.js'),\n  'atkinson-hyperlegible': () => import('./atkinson-hyperlegible.js'),\n  'aspekta': () => import('./aspekta.js')
};

export async function getFontByKey(key) {
  if (fontMap[key]) {
    const module = await fontMap[key]();
    return module.default;
  }
  throw new Error(`Font family not found: ${key}`);
}

export const availableFonts = Object.keys(fontMap);
