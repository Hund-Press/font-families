import fs from 'fs';
import path from 'path';

function loadFontData(key) {
  try {
    const familyPath = path.resolve(`dist/api/families/${key}.json`);
    const familyData = JSON.parse(fs.readFileSync(familyPath, 'utf8'));
    return familyData || null;
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