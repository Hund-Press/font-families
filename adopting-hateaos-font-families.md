# Adopting HATEOAS Font-Families in Hund-Press

## Overview

The font-families project has undergone a major architectural shift to implement HATEOAS (Hypermedia as the Engine of Application State) principles. This document provides comprehensive guidance for Claude instances working on hund-press to embrace this new direction and update the codebase accordingly.

## Key Architectural Changes

### 1. New HATEOAS API Structure

The font-families project now provides a fully discoverable hypermedia API:

- **Root Discovery**: `/api/index.json` - Entry point with capabilities and navigation
- **Family Index**: `/api/families/index.json` - Lightweight index with HATEOAS links  
- **Individual Families**: `/api/families/{family}.json` - Dedicated endpoints per family
- **CDN Integration**: Direct download links embedded in all resources

### 2. Structural Changes from Legacy Format

**Before (Legacy):**
```javascript
// Simple catalog structure
{
  "families": {
    "aspekta": { /* font data */ }
  }
}
```

**After (HATEOAS v1.6.0):**
```javascript
// Discovery-driven structure with embedded navigation
{
  "_links": {
    "self": { "href": "/api/families/index.json" },
    "root": { "href": "/api/" },
    "families": { "href": "/api/families/" }
  },
  "families": {
    "aspekta": {
      "name": "Aspekta",
      "key": "aspekta",
      "files": {
        "static": [
          {
            "fileName": "Aspekta-400.woff2",
            "_links": {
              "download": {
                "href": "https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.6.0/aspekta/fonts/webfonts/Aspekta-400.woff2"
              }
            }
          }
        ]
      },
      "_links": {
        "self": { "href": "/api/families/aspekta.json" },
        "preview": { "href": "/fonts/aspekta/" }
      }
    }
  }
}
```

## Critical Implementation Guidelines

### 1. EMBRACE DISCOVERY OVER HARDCODING

**❌ Old Approach (Hardcoded):**
```javascript
const FAMILIES_INDEX_URL = 'https://cdn.jsdelivr.net/gh/hund-press/font-families@latest/dist/api/families/index.json';
```

**✅ New Approach (Discovery-Based):**
```javascript
// Start with root API and follow links
const rootAPI = await fetch('https://cdn.jsdelivr.net/gh/hund-press/font-families@latest/dist/api/index.json');
const { _links } = await rootAPI.json();
const catalogURL = _links.catalog.href; // Discovered, not hardcoded
```

### 2. LEVERAGE EMBEDDED DOWNLOAD LINKS

**❌ Old Approach (Manual URL Construction):**
```javascript
// Brittle URL construction
const fontUrl = `https://cdn.jsdelivr.net/gh/hund-press/font-families@v${version}/fonts/open-fonts/${key}/fonts/webfonts/${fileName}`;
```

**✅ New Approach (Use Embedded Links):**
```javascript
// Use provided download links
const fontFile = fontData.files.static.find(f => f.weight === 400);
const downloadUrl = fontFile._links.download.href; // Already correct and versioned
```

### 3. INDIVIDUAL FAMILY RESOURCES

**❌ Old Approach (Parse from Catalog):**
```javascript
// Extract family data from massive catalog
const aspektaData = catalog.families.aspekta;
```

**✅ New Approach (Direct Family Endpoints):**
```javascript
// Fetch dedicated family resource
const aspektaResponse = await fetch('/api/families/aspekta.json');
const aspektaData = await aspektaResponse.json();
// Now has full family data + navigation links
```

## Hund-Press Specific Migration Tasks

### 1. Update Font Sync Service

**File**: `src/service-worker/services/font-families-sync-service.js`

**Key Changes Needed:**
- Replace hardcoded catalog URL with discovery pattern
- Use embedded CDN links instead of manual URL construction
- Leverage individual family endpoints for detailed data
- Update data structure expectations for v1.6.0 format

**Example Fix:**
```javascript
// OLD
const FAMILIES_INDEX_URL = 'https://cdn.jsdelivr.net/gh/hund-press/font-families/dist/api/families/index.json';

// NEW - Start with discovery
const ROOT_API = 'https://cdn.jsdelivr.net/gh/hund-press/font-families/dist/api/index.json';

export async function discoverCatalogURL() {
    const rootResponse = await fetch(ROOT_API);
    const rootData = await rootResponse.json();
    return rootData._links.catalog.href;
}
```

### 2. Update Build Tools

**File**: `build-tools/sync-font-families.js`

**Critical Issues:**
- Currently applies manual CDN URL fixes (line 71-74)
- These fixes are now obsolete with embedded `_links.download` 
- Should use provided download URLs directly

**Example Fix:**
```javascript
// OLD - Manual URL fixing
const fixedContent = moduleContent.replace(/regex/, 'fixed-url');

// NEW - Use embedded download links from font files
// No URL manipulation needed - use _links.download.href directly
```

### 3. Update Font Face CSS Generation

**File**: `src/data/publishedFonts.js`

**Key Changes:**
- Replace manual CDN URL construction with embedded links
- Use HATEOAS navigation to find font resources
- Leverage individual family endpoints for complete data

### 4. Update Test Fixtures

**File**: `tests/fixtures/font-families/api/families/index.json`

**Needs Update To:**
- Include HATEOAS `_links` structure  
- Match v1.6.0 format with embedded download links
- Add individual family endpoint references

## Implementation Strategy

### Phase 1: Update Data Consumption (Immediate)

1. **Start with Discovery**: Always begin with root API endpoint
2. **Follow Links**: Use `_links` to navigate, never hardcode URLs
3. **Use Embedded Downloads**: Leverage `_links.download.href` for font files
4. **Individual Resources**: Fetch dedicated family endpoints when needed

### Phase 2: Enhance User Experience (Medium-term)

1. **Fork Affordances**: Surface `_capabilities.fork` from root API
2. **Preview Integration**: Use `_links.preview` for font demonstrations  
3. **Related Resources**: Leverage family-to-family navigation
4. **Versioning**: Use embedded version info for cache management

### Phase 3: Advanced HATEOAS Features (Future)

1. **Templated URLs**: Implement support when available
2. **Action Affordances**: Support `_actions` for dynamic operations
3. **Client SDKs**: Build hypermedia-aware font client libraries

## Code Examples

### Complete Font Sync with HATEOAS

```javascript
export async function syncFontFamiliesHATEOAS() {
    // 1. Discover API endpoints
    const rootResponse = await fetch(
        'https://cdn.jsdelivr.net/gh/hund-press/font-families@latest/dist/api/index.json'
    );
    const rootAPI = await rootResponse.json();
    
    // 2. Follow catalog link
    const catalogResponse = await fetch(rootAPI._links.catalog.href);
    const catalog = await catalogResponse.json();
    
    // 3. Process families using embedded links
    for (const [key, familyData] of Object.entries(catalog.families)) {
        // Use individual family endpoint for detailed data
        const familyResponse = await fetch(familyData._links.self.href);
        const fullFamilyData = await familyResponse.json();
        
        // Use embedded download links for font files
        for (const fontFile of fullFamilyData.files.static || []) {
            const downloadUrl = fontFile._links.download.href;
            // No URL manipulation needed - use directly
            await processFontFile(downloadUrl, fontFile);
        }
    }
}
```

### Font Face CSS with HATEOAS Links

```javascript
function generateFontFaceCSS(fontData) {
    // Find regular weight font file
    const regularFont = fontData.files.static.find(f => f.weight === 400);
    
    if (regularFont && regularFont._links.download) {
        // Use provided download URL directly
        const fontUrl = regularFont._links.download.href;
        
        return `@font-face {
            font-family: '${fontData.name}';
            src: url("${fontUrl}") format("${regularFont.format}");
            font-weight: ${regularFont.weight};
            font-display: swap;
        }`;
    }
}
```

## Testing Strategy

### 1. Update Test Data
- Use actual HATEOAS structure in test fixtures
- Include `_links` in mock responses
- Test link following behavior

### 2. Integration Tests  
- Verify discovery workflow from root → catalog → families
- Test embedded download link usage
- Validate individual family endpoint consumption

### 3. Error Handling
- Test graceful degradation when links are missing
- Handle network failures in discovery chain
- Validate HATEOAS structure before consumption

## Benefits of This Approach

### 1. **Future-Proof**: Links can change without breaking hund-press
### 2. **Self-Documenting**: API teaches clients what's possible
### 3. **User Agency**: Exposes capabilities for user empowerment  
### 4. **Reduced Maintenance**: No more manual URL construction or fixes
### 5. **Better UX**: Fork links and preview integration enhance user experience

## Migration Checklist

- [ ] Update sync service to use discovery pattern
- [ ] Replace manual CDN URL construction with embedded links
- [ ] Migrate to individual family endpoints for detailed data
- [ ] Update test fixtures to v1.6.0 HATEOAS format
- [ ] Remove hardcoded URL fixes in build tools
- [ ] Update font face CSS generation to use embedded links
- [ ] Add discovery-based navigation throughout codebase
- [ ] Test fork affordances integration
- [ ] Validate preview link integration
- [ ] Update documentation and examples

## Backward Compatibility

**Important**: The user explicitly stated "backwards compatibility is not a concern on either project." This means:

- **Remove legacy URL fixes immediately**
- **Update to v1.6.0 structure without fallbacks**  
- **Embrace full HATEOAS implementation**
- **Don't maintain compatibility shims**

## Next Steps for Claude Instances

1. **Audit Current Code**: Find all hardcoded font-families URLs and manual URL construction
2. **Implement Discovery**: Replace hardcoded patterns with HATEOAS navigation
3. **Use Embedded Links**: Leverage `_links.download.href` for all font resources
4. **Test Integration**: Verify end-to-end workflow with new structure
5. **Surface Capabilities**: Expose fork and preview affordances to users

This transition represents a fundamental shift toward a more discoverable, user-empowering, and maintainable font system. The HATEOAS approach aligns with the font-families philosophy of user agency and fork-first architecture.