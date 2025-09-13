# HATEOAS Implementation Plan for Font Subsets

## Overview

This plan integrates the existing `_subsets/` directory structure with our HATEOAS architecture, making performance-optimized font subsets discoverable while maintaining clear separation between original fonts and derivative works.

## Core Principles

### 1. **Derivative Work Protection**
- Maintain strict separation: original fonts in `/fonts/open-fonts/`, subsets in `/_subsets/`
- Preserve all legal compliance and attribution metadata
- Never mix original and derivative resources in same directory
- Clear identification of derivative status in all subset APIs

### 2. **HATEOAS Integration**
- Make subsets discoverable through hypermedia navigation
- Embed direct download links eliminating manual URL construction
- Provide templated URLs for dynamic subset generation
- Surface subset capabilities through API discovery

### 3. **Performance Optimization**
- Enable consumers to discover optimal subset choices
- Provide file size and character coverage information
- Support progressive font loading strategies
- Offer CSS generation for subset implementation

## Implementation Plan

### Phase 1: Basic Subset Discovery (Immediate) ✅ COMPLETED

#### 1.1 Update Root API Discovery ✅ COMPLETED
**File**: `dist/api/index.json`

Add subset capabilities to root discovery:
```javascript
{
  "links": {
    "families": { "href": "/api/families/" },
    "subsets": { 
      "href": "/api/subsets/",
      "title": "Performance-optimized font subsets"
    }
  },
  "capabilities": {
    "subsets": {
      "description": "Language and performance-optimized derivative works",
      "types": ["min-chars", "latin-basic", "cyrillic", "arabic", "cjk-basic"],
      "formats": ["woff2", "ttf"],
      "status": "derivative-works"
    }
  }
}
```

#### 1.2 Create Subset Root Endpoint ✅ COMPLETED
**New File**: `dist/api/subsets/index.json`

```javascript
{
  "name": "Font Subsets API",
  "description": "Performance-optimized derivative works from original font families",
  "links": {
    "self": { "href": "/api/subsets/" },
    "root": { "href": "/api/" }
  },
  "derivativeWorkNotice": {
    "status": "These are derivative works generated for web performance optimization",
    "originalSources": "All original fonts remain in /fonts/open-fonts/ directories",
    "legalCompliance": "Full attribution and licensing preserved in subset metadata"
  },
  "availableSubsets": {
    "min-chars": {
      "description": "100-character minimal set for critical performance",
      "characterCount": 100,
      "useCase": "First paint optimization, font picker previews"
    },
    "latin-basic": {
      "description": "Basic Latin + Latin-1 Supplement",
      "characterCount": 500,
      "useCase": "Western European languages"
    },
    "cyrillic": {
      "description": "Cyrillic script support",
      "characterCount": 200,
      "useCase": "Russian, Bulgarian, Serbian languages"
    }
  },
  "families": {
    "aspekta": { "href": "/api/subsets/aspekta.json" },
    "crimson-pro": { "href": "/api/subsets/crimson-pro.json" },
    "atkinson-hyperlegible": { "href": "/api/subsets/atkinson-hyperlegible.json" },
    "inconsolata": { "href": "/api/subsets/inconsolata.json" },
    "public-sans": { "href": "/api/subsets/public-sans.json" }
  }
}
```

#### 1.3 Add Subset Links to Family Endpoints ✅ COMPLETED
**Modify**: All `dist/api/families/{family}.json` files

Add subset discovery to each family:
```javascript
{
  "name": "Aspekta",
  "key": "aspekta",
  "files": { /* existing files */ },
  "links": {
    "self": { "href": "/api/families/aspekta.json" },
    "subsets": { 
      "href": "/api/subsets/aspekta.json",
      "title": "Performance subsets for this family"
    }
  },
  "capabilities": {
    "subsets": {
      "available": ["min-chars"],
      "planned": ["latin-basic", "cyrillic"],
      "derivativeStatus": "Optimized derivatives available"
    }
  }
}
```

### Phase 2: Individual Subset Resources (Week 2) ✅ COMPLETED

#### 2.1 Generate Family Subset Catalogs ✅ COMPLETED
**New Files**: `dist/api/subsets/{family}.json`

Create comprehensive subset catalog for each family:
```javascript
{
  "family": "aspekta",
  "name": "Aspekta Subsets",
  "derivativeWorkNotice": {
    "status": "Performance-optimized derivative works",
    "originalSource": "/api/families/aspekta.json",
    "legalCompliance": "OFL-1.1 compliant derivatives with full attribution"
  },
  "links": {
    "self": { "href": "/api/subsets/aspekta.json" },
    "original-family": { "href": "/api/families/aspekta.json" },
    "subsets": { "href": "/api/subsets/aspekta/" }
  },
  "subsets": {
    "min-chars": {
      "description": "100-character minimal set",
      "status": "available",
      "characterCount": 100,
      "unicodeRanges": ["U+0020-007F", "U+00A0", "U+2013-2014"],
      "generatedAt": "2025-09-11T19:38:35.708Z",
      "fileSizes": {
        "static": 4.2,
        "variable": 9.6
      },
      "links": {
        "self": { "href": "/api/subsets/aspekta/min-chars.json" }
      }
    },
    "latin-basic": {
      "description": "Basic Latin character set",
      "status": "planned",
      "characterCount": 500,
      "links": {
        "self": { "href": "/api/subsets/aspekta/latin-basic.json" }
      }
    }
  },
  "sourceFont": {
    "name": "Aspekta",
    "version": "2.100", 
    "author": "Ivo Dolenc",
    "license": "OFL-1.1",
    "originalLocation": "/fonts/aspekta/"
  }
}
```

#### 2.2 Create Individual Subset Endpoints ✅ COMPLETED
**New Files**: `dist/api/subsets/{family}/{subset}.json`

Detailed subset resources with embedded download links:
```javascript
{
  "family": "aspekta",
  "subset": "min-chars",
  "description": "Minimal 100-character subset for critical performance",
  "derivativeWorkNotice": {
    "status": "This is a derivative work optimized for web performance",
    "originalAuthor": "Ivo Dolenc",
    "originalLicense": "OFL-1.1",
    "derivativeCompliance": "Subset generation complies with OFL-1.1 requirements"
  },
  "characters": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!\"#$%&'()*+,-./:;=?[]_ —–''\"\"…",
  "unicodeRanges": ["U+0020-007F", "U+00A0", "U+2013-2014", "U+2018-2019", "U+201C-201D", "U+2026"],
  "characterCount": 100,
  "generatedAt": "2025-09-11T19:38:35.708Z",
  "generationMethod": "fonttools pyftsubset with performance optimization",
  "links": {
    "self": { "href": "/api/subsets/aspekta/min-chars.json" },
    "parent": { "href": "/api/subsets/aspekta.json" },
    "original-family": { "href": "/api/families/aspekta.json" }
  },
  "files": [
    {
      "filename": "Aspekta-400-min.woff2",
      "format": "woff2",
      "weight": 400,
      "style": "normal",
      "isVariable": false,
      "fileSize": 4244,
      "fileSizeKB": 4.2,
      "compressionRatio": 0.19,
      "links": {
        "download": {
          "href": "https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.7.0/subsets/aspekta/min-chars/Aspekta-400-min.woff2"
        }
      }
    },
    {
      "filename": "AspektaVF-min.woff2",
      "format": "woff2", 
      "isVariable": true,
      "axes": { "wght": { "min": 100, "max": 900, "default": 400 } },
      "fileSize": 9848,
      "fileSizeKB": 9.6,
      "compressionRatio": 0.14,
      "links": {
        "download": {
          "href": "https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.7.0/subsets/aspekta/min-chars/AspektaVF-min.woff2"
        }
      }
    }
  ],
  "performanceMetrics": {
    "originalSizeKB": 22.0,
    "subsetSizeKB": 4.2,
    "sizeReduction": "81%",
    "estimatedLoadTime3G": "0.3s",
    "recommendedUseCase": "Critical path font loading, font picker previews"
  }
}
```

### Phase 3: Build Integration (Week 3) ✅ COMPLETED

#### 3.1 Update Catalog Generator ✅ COMPLETED
**Modify**: `build-tools/generators/catalog-generator.js`

Add subset generation to main build process:
```javascript
// New function: generateSubsetAPIs
async function generateSubsetAPIs(catalogOutputPath, version) {
  const subsetsDir = path.join(process.cwd(), '_subsets');
  const apiSubsetsDir = path.join(catalogOutputPath, 'subsets');
  
  // Create subset API root
  await generateSubsetRoot(apiSubsetsDir);
  
  // Generate family subset catalogs
  for (const family of await fs.readdir(subsetsDir)) {
    await generateFamilySubsetCatalog(family, apiSubsetsDir, version);
    
    // Generate individual subset endpoints
    await generateIndividualSubsetEndpoints(family, apiSubsetsDir, version);
  }
}
```

#### 3.2 Subset Metadata Integration ✅ COMPLETED
**Modify**: `build-tools/generators/subset-generator.js`

Enhance subset generator to create HATEOAS-compatible metadata:
```javascript
// Generate HATEOAS-compatible metadata during subset creation
function generateSubsetHATEOASMetadata(subsetInfo, familyData, version) {
  return {
    ...subsetInfo,
    links: {
      self: { href: `/api/subsets/${familyData.key}/${subsetInfo.name}.json` },
      download: subsetInfo.files.map(file => ({
        filename: file.filename,
        href: `https://cdn.jsdelivr.net/gh/hund-press/font-families@v${version}/subsets/${familyData.key}/${subsetInfo.name}/${file.filename}`
      }))
    },
    derivativeWorkNotice: generateDerivativeNotice(familyData)
  };
}
```

### Phase 4: Advanced Features (Week 4) ⏸️ NEXT PHASE

#### 4.1 CSS Generation Endpoints ⏸️ PENDING
**New Files**: `dist/api/subsets/{family}/{subset}/css.json`

```javascript
{
  "subset": "min-chars",
  "family": "aspekta", 
  "links": {
    "css-template": {
      "href": "/api/subsets/aspekta/min-chars/css{?weights,formats}",
      "templated": true
    }
  },
  "actions": {
    "generate-css": {
      "method": "GET",
      "href": "/api/subsets/aspekta/min-chars/css",
      "description": "Generate @font-face CSS for this subset",
      "schema": {
        "weights": { 
          "type": "array", 
          "items": { "enum": [400] },
          "description": "Font weights to include"
        },
        "formats": {
          "type": "array",
          "items": { "enum": ["woff2", "ttf"] },
          "description": "Font formats to include"
        }
      }
    }
  },
  "sampleCSS": {
    "basic": "@font-face {\n  font-family: 'Aspekta';\n  src: url('https://cdn.jsdelivr.net/...') format('woff2');\n  font-weight: 400;\n  font-display: swap;\n  unicode-range: U+0020-007F, U+00A0;\n}",
    "withUnicodeRange": true,
    "fontDisplay": "swap"
  }
}
```

#### 4.2 Progressive Loading Recommendations ⏸️ PENDING
Add progressive loading guidance to subset APIs:
```javascript
{
  "recommendations": {
    "progressive-loading": {
      "critical-path": {
        "subset": "min-chars", 
        "priority": "high",
        "loadStrategy": "inline or preload"
      },
      "enhanced-experience": {
        "subset": "latin-basic",
        "priority": "medium", 
        "loadStrategy": "defer until interaction"
      },
      "complete-coverage": {
        "source": "original-family",
        "priority": "low",
        "loadStrategy": "lazy load or on-demand"
      }
    }
  }
}
```

## 🎯 IMPLEMENTATION STATUS (Updated: September 13, 2025)

### ✅ COMPLETED PHASES

**Phase 1: Basic Subset Discovery** - FULLY IMPLEMENTED
- Root API discovery with subset capabilities (`dist/api/index.json`)
- Subset root endpoint with family discovery (`dist/api/subsets/index.json`)  
- All family endpoints enhanced with subset links and capabilities
- Complete HATEOAS navigation from root API to subsets

**Phase 2: Individual Subset Resources** - FULLY IMPLEMENTED  
- Family subset catalogs for all 6 families (`dist/api/subsets/{family}.json`)
- Individual subset endpoints for all available subsets (`dist/api/subsets/{family}/{subset}.json`)
- Embedded CDN download links with versioning (v1.7.0)
- Real performance metrics calculated from actual file sizes
- Complete legal compliance and derivative work notices

**Phase 3: Build Integration** - FULLY IMPLEMENTED
- Enhanced `catalog-generator.js` with `generateSubsetAPIs()` function
- Integrated subset API generation into main build process  
- Real-time file size calculation and compression ratio analysis
- Automatic subset capability detection for family endpoints

### 📊 CURRENT SYSTEM STATUS

**Available Font Families with Subsets:**
- ✅ aspekta (min-chars available)
- ✅ atkinson-hyperlegible (min-chars available)  
- ✅ crimson-pro (min-chars available)
- ✅ inconsolata (min-chars available)
- ✅ league-mono (min-chars available)
- ✅ public-sans (min-chars available)

**API Endpoints Currently Active:**
- `/api/` → Root discovery with subset capabilities
- `/api/subsets/` → Subset root with family navigation
- `/api/subsets/{family}.json` → Family subset catalogs (6 families)
- `/api/subsets/{family}/{subset}.json` → Individual subset endpoints (6 min-chars subsets)
- All family endpoints (`/api/families/{family}.json`) include subset capabilities

**Performance Metrics Available:**
- File size analysis (bytes → KB conversion)
- Compression ratios (subset vs original)  
- 3G load time estimates
- Use case recommendations based on file size

### ⏸️ NEXT PHASE: Phase 4 - Advanced Features

**Remaining Work:**
1. **CSS Generation Endpoints** (`dist/api/subsets/{family}/{subset}/css.json`)
   - Templated @font-face rule generation
   - Dynamic weight and format selection
   - Unicode-range optimization
   - Font-display strategy recommendations

2. **Progressive Loading Recommendations**
   - Critical path optimization guidance
   - Multi-tier loading strategies  
   - Performance-based subset selection
   - Integration with web performance best practices

**Estimated Effort:** 1-2 days for complete Phase 4 implementation

## Implementation Tasks

### Build System Changes

1. **Update catalog-generator.js** ✅ COMPLETED
   - ✅ Added `generateSubsetAPIs()` function
   - ✅ Integrated subset API generation into main build
   - ✅ Generate embedded download links with proper versioning
   - ✅ Enhanced with real file size calculation and performance metrics

2. **Enhance subset-generator.js** ✅ COMPLETED 
   - ✅ HATEOAS metadata already exists in subset metadata files
   - ✅ API endpoint files generated during catalog build process
   - ✅ Performance metrics and recommendations implemented

3. **Update package.json scripts** ⏸️ OPTIONAL
   - ⚡ Subset API generation integrated into existing build workflow
   - ⚡ Available via `generateSubsetAPIs()` function call
   - 📝 Could add dedicated command if desired: `npm run build-subset-apis`

### Directory Structure (Post-Implementation)

```
dist/
├── api/
│   ├── index.json                 # Root API with subset discovery
│   ├── families/                # Family endpoints directory
│   ├── families/
│   │   ├── aspekta.json         # Family APIs with subset capabilities  
│   │   └── ...
│   └── subsets/
│       ├── index.json           # Subset root discovery
│       ├── aspekta.json         # Family subset catalog
│       └── aspekta/
│           ├── min-chars.json   # Individual subset endpoint
│           └── min-chars/
│               └── css.json     # CSS generation endpoint
└── ...

subsets/                         # Derivative works (unchanged structure)
├── README.md
├── aspekta/
│   ├── metadata.json
│   └── min-chars/
│       ├── metadata.json
│       ├── Aspekta-400-min.woff2
│       └── AspektaVF-min.woff2
└── ...
```

## Consumer Benefits

1. **Discovery**: Subsets discoverable through HATEOAS navigation
2. **Performance**: Direct links to optimized files with size metrics
3. **Legal Clarity**: Clear derivative work status and attribution
4. **Progressive Enhancement**: Guidance for optimal loading strategies
5. **CSS Generation**: Automated @font-face rule creation
6. **Future-Proof**: Templated URLs for dynamic subset generation

## Backward Compatibility

Since backward compatibility is not a concern:
- Remove any legacy subset URL construction patterns
- Use embedded download links exclusively  
- Update hund-press to consume new subset APIs
- Eliminate manual CDN URL building for subsets

## Success Metrics

### ✅ ACHIEVED (Phases 1-3)
- ✅ All subsets discoverable through API navigation starting from `/api/`
- ✅ Zero manual URL construction for subset resources
- ✅ Complete legal compliance and attribution metadata
- ✅ Performance metrics available for all subsets
- ✅ Clear separation maintained between original and derivative works

### ⏸️ REMAINING (Phase 4)
- ⏸️ CSS generation working for common use cases
- ⏸️ Progressive loading recommendations implemented
- ⏸️ Templated URLs for dynamic subset generation

This implementation maintains the integrity of original fonts while making performance subsets fully discoverable and accessible through our HATEOAS architecture.