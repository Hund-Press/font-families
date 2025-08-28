import fs from 'fs';
import path from 'path';

function loadFontData(slug) {
  try {
    const catalogPath = path.resolve('dist/api/catalog.json');
    const catalogData = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    return catalogData.families[slug] || null;
  } catch (error) {
    console.warn(`Could not load font data for ${slug}:`, error.message);
    return null;
  }
}

export default {
  eleventyComputed: {
    fontData(data) {
      return loadFontData(data.slug);
    }
  }
};