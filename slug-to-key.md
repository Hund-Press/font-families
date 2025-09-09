# Migration Plan: Rename "slug" to "key"

## Overview
Rename the font family identifier from "slug" to "key" throughout the codebase to better reflect its role as a universal identifier rather than a web-specific URL slug.

## Scope: 55 files need updates across 4 main categories

### **Phase 1: Core Data Structure (Build Tools)**
**Files:** 6 core build tool files

1. **`build-tools/generators/module-generator.js`** - 17 changes
   - Property assignments: `slug: familyData.slug` → `key: familyData.key`
   - File naming: `${familyData.slug}.js` → `${familyData.key}.js`
   - CDN paths: `/fonts/open-fonts/${familyData.slug}/` → `key`
   - Function: `getFontBySlug(slug)` → `getFontByKey(key)`

2. **`build-tools/generators/catalog-generator.js`** - 3 changes
   - Object keys: `catalog.families[familyData.slug]` → `key`
   - Property: `slug: familyData.slug` → `key: familyData.key`

3. **`build-tools/scanners/fontkit-analyzer.js`** - 4 changes
   - Variables and property assignments using `slug`

4. **`build-tools/scanners/ufr-scanner.js`** - 8 changes  
   - Variable names: `fontSlug` → `fontKey`
   - **Keep:** `slugifyFontName()` function (utility function)

5. **`build-tools/workflows/build.js`** - 5 changes
   - File paths and function calls using `slug`

6. **`build-tools/generators/doc-generator.js`** - 12 changes
   - Parameter names and file paths

### **Phase 2: Generated Output (Auto-regenerated)**
**Files:** All files in `dist/` (will be auto-updated by build)

- `dist/modules/*.js` - Property in exported objects  
- `dist/api/catalog.json` - Object keys and properties
- `dist/api/metadata/*.json` - Properties

### **Phase 3: Site Content & Templates**
**Files:** 8 content/template files

1. **Front matter in `/src/content/fonts/published/*.md`**
   - `slug: font-name` → `key: font-name`

2. **Template files:**
   - `src/content/fonts/fonts.webc` - Template variables
   - `src/content/fonts/published/.11tydata.js` - Function parameters
   - **Keep:** `.eleventy.config/fonts.js` `fontSlug` filter (utility)

### **Phase 4: CI/GitHub Workflow** 
**Files:** 1 workflow file

- `.github/workflows/build-and-deploy.yml` - Iterator variable names

### **Functions to Keep Unchanged:**
- `slugifyFontName()` - Utility function that creates URL-safe strings
- `fontSlug` Eleventy filter - Template utility for URL-safe strings
- Any function that performs "slugification" operations

### **Migration Benefits:**
- **Clearer semantics**: "key" better describes the primary identifier role
- **Technology agnostic**: Not tied to web/URL usage  
- **Consistent naming**: Aligns with database/API key concepts

### **Risk Assessment: LOW**
- No backwards compatibility needed
- Mostly property name changes
- Build system will regenerate all output files
- Clear separation between identifier keys vs URL slugs

### **Detailed File Changes**

#### **Build Tools - JavaScript Files:**

**`/build-tools/generators/catalog-generator.js`**
- **Line 49:** `catalog.families[familyData.slug] = transformFamilyForCatalog(familyData, {`
- **Line 107:** `slug: familyData.slug,` (property assignment)

**`/build-tools/generators/module-generator.js`**
- **Line 57:** `const modulePath = path.join(outputDir, \`${familyData.slug}.js\`);`
- **Line 60:** `console.log(\`[modules] Generated module: ${familyData.slug}.js\`);`
- **Line 75:** `slug: familyData.slug,` (property assignment)
- **Line 286:** `const slug = generateSlug(displayName);` (function call)
- **Line 291:** `slug: slug,` (property assignment)
- **Line 456:** `variable: \`${baseCdnUrl}/fonts/open-fonts/${familyData.slug}/fonts/variable/\`,`
- **Line 457:** `static: \`${baseCdnUrl}/fonts/open-fonts/${familyData.slug}/fonts/webfonts/\`,`
- **Line 458:** `ttf: \`${baseCdnUrl}/fonts/open-fonts/${familyData.slug}/fonts/ttf/\`,`
- **Line 459:** `otf: \`${baseCdnUrl}/fonts/open-fonts/${familyData.slug}/fonts/otf/\`,`
- **Line 460:** `subsets: \`${baseCdnUrl}/_subsets/${familyData.slug}/\``
- **Line 634:** `allFonts[familyData.slug] = {` (object key)
- **Line 636:** `slug: familyData.slug,` (property assignment)
- **Line 657:** `${Object.entries(allFonts).map(([slug, data]) =>`
- **Line 658:** `export const ${camelCase(slug)} = ${JSON.stringify(data, null, 2)};`
- **Line 673:** `return \`export { default as ${camelCase(familyData.slug)} } from './${familyData.slug}.js';\`;`
- **Line 690:** `'${familyData.slug}': () => import('./${familyData.slug}.js')`
- **Line 695:** `export async function getFontBySlug(slug) {`
- **Line 696:** `if (fontMap[slug]) {`
- **Line 697:** `const module = await fontMap[slug]();`
- **Line 700:** `throw new Error(\`Font family not found: \${slug}\`);`
- **Line 716:** `const subsetMetadataPath = path.join('_subsets', familyData.slug, 'metadata.json');`
- **Line 735:** `console.log(\`[modules] No subset metadata found for ${familyData.slug}\`);`

**`/build-tools/scanners/fontkit-analyzer.js`**
- **Line 77:** `export function generateSlug(familyName) {` (function name)
- **Line 286:** `const slug = generateSlug(displayName);` (function call)
- **Line 291:** `slug: slug,` (property assignment)
- **Line 298:** `baseFamilySlug: variant.baseName ? generateSlug(variant.baseName) : null,`

**`/build-tools/scanners/ufr-scanner.js`**
- **Line 375:** `const fontSlug = slugifyFontName(fontName);` (function call)
- **Line 379:** `slug: fontSlug,` (property assignment)
- **Line 462:** `const fontSlug = slugifyFontName(fontName);` (function call)
- **Line 466:** `slug: fontSlug,` (property assignment)
- **Line 551:** `const fontSlug = slugifyFontName(fontName);` (function call)
- **Line 561:** `let manifestPath = path.join(manifestsDir, \`${fontSlug}.js\`);`
- **Line 616:** `const fontSlug = slugifyFontName(extractFontName(folderName));`
- **Line 617:** `const manifestPath = path.join(manifestsDir, \`${fontSlug}.js\`);`
- **Line 636:** `const fontSlug = slugifyFontName(fontName);`
- **Line 637:** `const manifestPath = path.join(manifestsDir, \`${fontSlug}.js\`);`
- **Line 672:** `function slugifyFontName(name) {` (function name - **KEEP AS IS**)

**`/build-tools/workflows/build.js`**
- **Line 214:** `const metadataPath = path.join(metadataDir, \`${familyData.slug}.json\`);`
- **Line 232:** `console.log(\`[build] Checking subsets for ${familyData.slug}...\`);`
- **Line 233:** `await generator.processFamily(familyData.slug, ['min-chars'], false);`
- **Line 234:** `await generator.updateFamilyMetadata(familyData.slug, 'min-chars');`
- **Line 236:** `console.warn(\`[build] ⚠️ Subset generation failed for ${familyData.slug}: ${error.message}\`);`

**`/build-tools/generators/doc-generator.js`**
- **Line 30:** `slug: ${slug}`
- **Line 119:** `[data-font="${slug}"] {`
- **Line 139:** `async function loadFontData(fontSlug) {` (parameter name)
- **Line 142:** `const apiMetadataPath = path.join('dist', 'api', 'metadata', \`${fontSlug}.json\`);`
- **Line 146:** `slug: fontSlug,`
- **Line 155:** `const ufrPath = path.join('fonts', 'open-fonts', fontSlug, 'package.json');`
- **Line 160:** `slug: fontSlug,`
- **Line 168:** `console.error(\`Warning: Could not load metadata for ${fontSlug}: ${error.message}\`);`
- **Line 170:** `name: fontSlug,`
- **Line 171:** `slug: fontSlug,`
- **Line 175:** `description: \`${fontSlug.charAt(0).toUpperCase() + fontSlug.slice(1)} font family\``

#### **Site Content & Templates:**

**All `/src/content/fonts/published/*.md` files** have:
- **Front matter:** `slug: font-family-name`
- **Template variables:** `{{ slug }}` used in:
  - CSS font paths
  - HTML data attributes
  - CDN URLs

**`/src/content/fonts/published/.11tydata.js`**
- **Line 4:** `function loadFontData(slug) {`
- **Line 8:** `return catalogData.families[slug] || null;`
- **Line 10:** `console.warn(\`Could not load font data for ${slug}:\`, error.message);`
- **Line 18:** `return loadFontData(data.slug);`

**`/src/content/fonts/fonts.webc`**
- **Line 15:** `:data-font="font.data.fontData?.slug || font.data.slug"`

#### **GitHub Workflow:**

**`/.github/workflows/build-and-deploy.yml`**
- **Line 179:** `Object.entries(catalog.families).forEach(([slug, family]) => {`
- **Line 338:** `import { aspekta } from 'https://cdn.jsdelivr.net/gh/hund-press/font-families@${{ github.event.release.tag_name }}/dist/modules/aspekta.js'`

## **Migration Status: PHASES 1-3 COMPLETE ✅**

### **✅ Phase 1: Core Data Structure (Build Tools) - COMPLETED**
**Status:** ✅ **COMPLETE** - All 6 files updated (54 changes total)

- ✅ `build-tools/generators/module-generator.js` - 17 changes completed
- ✅ `build-tools/generators/catalog-generator.js` - 3 changes completed  
- ✅ `build-tools/scanners/fontkit-analyzer.js` - 4 changes completed
- ✅ `build-tools/scanners/ufr-scanner.js` - 8 changes completed
- ✅ `build-tools/workflows/build.js` - 5 changes completed
- ✅ `build-tools/generators/doc-generator.js` - 12+ changes completed

**Result:** All build tools now use `key` instead of `slug`. Font processing system fully migrated.

### **✅ Phase 2: Generated Output - COMPLETED**
**Status:** ✅ **AUTO-UPDATED** - All generated files now use `key`

- ✅ `dist/modules/*.js` - All ES modules generated with `key` properties
- ✅ `dist/api/catalog.json` - Catalog generated with `key` as object keys and properties
- ✅ `dist/api/metadata/*.json` - Individual font metadata files use `key`

**Result:** Generated files automatically updated by migrated build tools.

### **✅ Phase 3: Site Content & Templates - COMPLETED**
**Status:** ✅ **COMPLETE** - All template files updated (8 changes total)

- ✅ Front matter: `slug:` → `key:` in `/src/content/fonts/published/*.md` files
- ✅ Template variables: `{{ slug }}` → `{{ key }}` in markdown files
- ✅ `src/content/fonts/published/.11tydata.js` - Function parameters and data access updated
- ✅ `src/content/fonts/fonts.webc` - Template data bindings updated  
- ✅ `src/content/fonts/fonts.11tydata.js` - Permalink and font data access updated
- ✅ **Kept unchanged:** `.eleventy.config/fonts.js` `fontSlug` filter (utility function)

**Result:** Eleventy site build successful. All font pages generated with unique URLs using `key`.

### **🟡 Phase 4: CI/GitHub Workflow - PENDING**
**Status:** 🟡 **PENDING** - Not yet completed

- 🟡 `.github/workflows/build-and-deploy.yml` - Iterator variable names need updating

### **🎯 Migration Results:**
- **✅ Build System**: Fully operational with `key` identifiers
- **✅ Font Processing**: All 6 font families processed successfully  
- **✅ Catalog Generation**: Public and complete catalogs generated correctly
- **✅ ES Modules**: All modules use `key` consistently
- **✅ Site Generation**: Eleventy build successful, all font pages working
- **✅ Documentation**: Font docs generated with `key` front matter

### **🚀 Benefits Achieved:**
- **✅ Clearer semantics**: "key" clearly represents the primary identifier role
- **✅ Technology agnostic**: No longer tied to web/URL-specific usage  
- **✅ Consistent naming**: Aligns with database/API key concepts
- **✅ System integrity**: Build and site generation fully functional

### **Remaining Work:**
**Phase 4 only** - Update GitHub workflow file for consistency (optional for core functionality)

**Migration: 75% Complete** - Core system fully migrated and operational!