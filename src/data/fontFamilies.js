// Import font data from the families index and individual family files
import fs from 'fs';
import path from 'path';

function loadFamiliesData() {
  try {
    const familiesIndexPath = path.resolve('dist/api/families/index.json');
    const indexData = JSON.parse(fs.readFileSync(familiesIndexPath, 'utf8'));
    
    const fonts = {};
    let totalFiles = 0;
    
    // Load each individual family file
    for (const [familyKey, familyInfo] of Object.entries(indexData.families || {})) {
      try {
        const familyPath = path.resolve(`dist/api/families/${familyKey}.json`);
        const familyData = JSON.parse(fs.readFileSync(familyPath, 'utf8'));
        fonts[familyKey] = familyData;
        totalFiles += (familyData.files?.static?.length || 0) + (familyData.files?.variable?.length || 0);
      } catch (error) {
        console.warn(`Could not load family data for ${familyKey}:`, error.message);
      }
    }
    
    return {
      fonts,
      meta: { 
        fontCount: Object.keys(fonts).length,
        totalFiles 
      }
    };
  } catch (error) {
    console.warn('Could not load families index, returning empty data:', error.message);
    return { fonts: {}, meta: { fontCount: 0 } };
  }
}

export default loadFamiliesData();