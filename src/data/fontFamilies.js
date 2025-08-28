// Import font data from the repository root catalog
import fs from 'fs';
import path from 'path';

function loadCatalogData() {
  try {
    const catalogPath = path.resolve('dist/api/catalog.json');
    const catalogData = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    
    // Transform catalog structure to match template expectations
    // Template expects: fontFamilies.fonts[slug]
    // Catalog provides: families[slug]
    return {
      fonts: catalogData.families || {},
      meta: catalogData.meta || {}
    };
  } catch (error) {
    console.warn('Could not load catalog.json, returning empty data:', error.message);
    return { fonts: {}, meta: { fontCount: 0 } };
  }
}

export default loadCatalogData();