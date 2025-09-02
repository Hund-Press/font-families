#!/usr/bin/env node

/**
 * Font Documentation Generator
 * 
 * Programmatically generates markdown documentation files for font families
 * based on their UFR metadata and API data.
 */

import { promises as fs } from 'fs';
import path from 'path';

const DOCS_DIR = './src/content/fonts/published';

/**
 * Generate markdown documentation for a font family
 */
function generateFontDocumentation(fontData) {
    const { name, slug, author, license, version, description } = fontData;
    
    // Clean up font name for title (remove npm scoping, capitalize)
    const cleanTitle = name.replace(/^@[^\/]+\//, '').split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    // Escape description for YAML
    const safeDescription = (description || `${cleanTitle} font family`).replace(/"/g, '\\"');
    
    return `---
slug: ${slug}
title: ${cleanTitle}
description: "${safeDescription}"
---

# {{ title }}

**{{ description }}**

- **Designer**: ${author || 'Unknown'}
- **License**: ${license || 'Unknown'}
- **Version**: ${version || 'Unknown'}
- **Character Sets**: Latin Extended support

{{ fontData.description }}

## Font Specimen

<div class="specimen-showcase">
  <div class="specimen-large" data-font="{{ slug }}">
    <h2>The quick brown fox jumps over the lazy dog</h2>
  </div>
  
  <div class="specimen-weights" data-font="{{ slug }}">
    <div class="weight-demo" data-weight="400">Regular: Typography matters for readability</div>
    <div class="weight-demo" data-weight="700">Bold: Typography matters for readability</div>
  </div>
</div>

## Quick Integration

### CSS

\`\`\`css
@font-face {
  font-family: '{{ title }}';
  src: url('https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.5.0/{{ slug }}/fonts/webfonts/{{ title }}-400.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: '{{ title }}', system-ui, sans-serif;
}
\`\`\`

### HTML with preload

\`\`\`html
<link rel="preload" 
      href="https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.5.0/{{ slug }}/fonts/webfonts/{{ title }}-400.woff2" 
      as="font" 
      type="font/woff2" 
      crossorigin>
\`\`\`

## License

{{ title }} is licensed under **${license || 'Unknown'}** by **${author || 'Unknown'}**.

Free to use in any project, commercial or personal.

<style>
.specimen-showcase {
  margin: 2rem 0;
  padding: 2rem;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  background: #fafafa;
}

.specimen-large h2 {
  font-size: 2.5rem;
  margin: 0 0 2rem 0;
  line-height: 1.2;
}

.specimen-weights {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.weight-demo {
  font-size: 1.2rem;
  line-height: 1.4;
}

[data-font="${slug}"] {
  font-family: '${cleanTitle}', system-ui, sans-serif;
}

[data-weight="400"] { font-weight: 400; }
[data-weight="700"] { font-weight: 700; }

pre {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}
</style>
`;
}

/**
 * Load font data from various sources
 */
async function loadFontData(fontSlug) {
    try {
        // Try to load from API metadata first
        const apiMetadataPath = path.join('dist', 'api', 'metadata', `${fontSlug}.json`);
        try {
            const apiData = JSON.parse(await fs.readFile(apiMetadataPath, 'utf8'));
            return {
                name: apiData.name,
                slug: fontSlug,
                author: apiData.author,
                license: apiData.license,
                version: apiData.version,
                description: apiData.description
            };
        } catch (error) {
            // Fallback to UFR package.json
            const ufrPath = path.join('fonts', 'open-fonts', fontSlug, 'package.json');
            const ufrData = JSON.parse(await fs.readFile(ufrPath, 'utf8'));
            
            return {
                name: ufrData.name,
                slug: fontSlug,
                author: ufrData.author,
                license: ufrData.license,
                version: ufrData.version,
                description: ufrData.description
            };
        }
    } catch (error) {
        console.error(`Warning: Could not load metadata for ${fontSlug}: ${error.message}`);
        return {
            name: fontSlug,
            slug: fontSlug,
            author: 'Unknown',
            license: 'Unknown',
            version: 'Unknown',
            description: `${fontSlug.charAt(0).toUpperCase() + fontSlug.slice(1)} font family`
        };
    }
}

/**
 * Get list of all font families in open-fonts directory
 */
async function getFontFamilies() {
    try {
        const openFontsDir = './fonts/open-fonts';
        const entries = await fs.readdir(openFontsDir, { withFileTypes: true });
        
        return entries
            .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
            .map(entry => entry.name);
    } catch (error) {
        console.error('Error reading font families:', error.message);
        return [];
    }
}

/**
 * Check if documentation file already exists and is newer than source data
 */
async function shouldRegenerateDoc(fontSlug) {
    const docPath = path.join(DOCS_DIR, `${fontSlug}.md`);
    
    try {
        const docStats = await fs.stat(docPath);
        
        // Check if source UFR package.json is newer
        try {
            const ufrPath = path.join('fonts', 'open-fonts', fontSlug, 'package.json');
            const ufrStats = await fs.stat(ufrPath);
            
            // Regenerate if UFR is newer than doc
            return ufrStats.mtime > docStats.mtime;
        } catch {
            // If we can't read UFR file, regenerate
            return true;
        }
    } catch {
        // If doc doesn't exist, generate it
        return true;
    }
}

/**
 * Generate documentation for all font families
 */
export async function generateDocumentation() {
    console.log('[doc-generator] Starting font documentation generation...');
    
    // Ensure docs directory exists
    await fs.mkdir(DOCS_DIR, { recursive: true });
    
    const fontFamilies = await getFontFamilies();
    console.log(`[doc-generator] Found ${fontFamilies.length} font families`);
    
    let generated = 0;
    let skipped = 0;
    
    for (const fontSlug of fontFamilies) {
        try {
            const shouldRegenerate = await shouldRegenerateDoc(fontSlug);
            
            if (!shouldRegenerate) {
                console.log(`[doc-generator] Skipping ${fontSlug} (up to date)`);
                skipped++;
                continue;
            }
            
            console.log(`[doc-generator] Generating documentation for ${fontSlug}...`);
            
            const fontData = await loadFontData(fontSlug);
            const documentation = generateFontDocumentation(fontData);
            
            const outputPath = path.join(DOCS_DIR, `${fontSlug}.md`);
            await fs.writeFile(outputPath, documentation);
            
            generated++;
            console.log(`[doc-generator] ✓ Generated ${outputPath}`);
            
        } catch (error) {
            console.error(`[doc-generator] ✗ Failed to generate documentation for ${fontSlug}: ${error.message}`);
        }
    }
    
    console.log(`[doc-generator] Documentation generation complete: ${generated} generated, ${skipped} skipped`);
}

/**
 * CLI execution
 */
if (import.meta.url === `file://${process.argv[1]}`) {
    generateDocumentation()
        .then(() => process.exit(0))
        .catch(error => {
            console.error('[doc-generator] Fatal error:', error);
            process.exit(1);
        });
}