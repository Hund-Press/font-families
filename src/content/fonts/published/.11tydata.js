import fs from 'fs';
import path from 'path';

function loadFontData(key) {
  try {
    const catalogPath = path.resolve('dist/api/catalog.json');
    const catalogData = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    return catalogData.families[key] || null;
  } catch (error) {
    console.warn(`Could not load font data for ${key}:`, error.message);
    return null;
  }
}

export default {
  eleventyComputed: {
    fontData(data) {
      return loadFontData(data.key);
    }
  }
};