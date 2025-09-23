/**
 * Font Families - Module Index
 * 
 * Provides easy access to all font family modules
 */

export { default as workSans } from './work-sans.js';
export { default as publicSans } from './public-sans.js';
export { default as inconsolata } from './inconsolata.js';
export { default as gentium } from './gentium.js';
export { default as figtree } from './figtree.js';
export { default as crimsonPro } from './crimson-pro.js';
export { default as atkinsonHyperlegible } from './atkinson-hyperlegible.js';
export { default as aspekta } from './aspekta.js';
export { default as alanSans } from './alan-sans.js';

// Combined export
export { default as allFonts } from './all.js';

// Utility function to get font by slug
const fontMap = {
  'work-sans': () => import('./work-sans.js'),
  'public-sans': () => import('./public-sans.js'),
  'inconsolata': () => import('./inconsolata.js'),
  'gentium': () => import('./gentium.js'),
  'figtree': () => import('./figtree.js'),
  'crimson-pro': () => import('./crimson-pro.js'),
  'atkinson-hyperlegible': () => import('./atkinson-hyperlegible.js'),
  'aspekta': () => import('./aspekta.js'),
  'alan-sans': () => import('./alan-sans.js')
};

export async function getFontByKey(key) {
  if (fontMap[key]) {
    const module = await fontMap[key]();
    return module.default;
  }
  throw new Error(`Font family not found: ${key}`);
}

export const availableFonts = Object.keys(fontMap);
