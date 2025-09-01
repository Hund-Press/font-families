# Initial Subsetting Work Plan

## Overview
Implement automated font subsetting to generate "min-chars" minimal subsets (100 characters) for all font families, starting with Aspekta as a test case. These subsets will be used for font selection pages and other performance-critical contexts where file size is paramount.

## Min-Chars Character Set (100 characters)
```
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
!"#$%&'()*+,-./:;=?[]_ —–''""…
```

**Key Typography Improvements:**
- `—` Em dash (replaces --)
- `–` En dash (ranges, compounds)
- `'` `'` Curly single quotes
- `"` `"` Curly double quotes  
- `…` Ellipsis (replaces ...)
- ` ` Non-breaking space

## Implementation Plan

### Phase 1: Infrastructure Setup

#### 1.1 Update Subset Metadata Structure
**File:** `_subsets/aspekta/metadata.json`
- Add `min-chars` subset definition
- Define character set and unicode ranges
- Set status to "pending"

#### 1.2 Create Subset Generator Tool
**File:** `build-tools/generators/subset-generator.js`
- Use `fonttools pyftsubset` via child_process
- Support both static (.woff2) and variable (.ttf) fonts
- Generate metadata.json for each subset
- Handle error cases gracefully

#### 1.3 Install Dependencies
```bash
pip install fonttools brotli
# OR add to package.json if Python wrapper needed
```

### Phase 2: Core Implementation

#### 2.1 Subset Generation Logic
```javascript
// Pseudocode structure
class SubsetGenerator {
  async generateSubset(fontPath, outputPath, characterSet) {
    // Use fonttools pyftsubset CLI
    // Handle WOFF2 compression
    // Generate metadata
  }
  
  async processFamily(familyName) {
    // Process all font files in family
    // Generate both static and variable subsets
    // Update subset metadata
  }
}
```

#### 2.2 Integration Points
- **Build System**: Extend `build-tools/workflows/build.js`
- **Scanner Integration**: Hook into UFR scanner results
- **Module Generation**: Update `module-generator.js` to include subset URLs
- **Catalog Generation**: Add subset information to API endpoints

#### 2.3 Directory Structure
```
_subsets/aspekta/min-chars/
├── Aspekta-400-min.woff2           # Static normal weight
├── AspektaVF-min.ttf               # Variable font
├── AspektaVF-min.woff2             # Variable font (compressed)
└── metadata.json                   # Subset-specific metadata
```

### Phase 3: Aspekta Test Case

#### 3.1 Generate Test Subsets
- Process `fonts/open-fonts/aspekta/fonts/webfonts/Aspekta-400.woff2`
- Process `fonts/open-fonts/aspekta/fonts/variable/AspektaVF.ttf`
- Generate min-chars subsets
- Validate file sizes (target: ~5-6KB each)

#### 3.2 Update CDN Integration
- Add subset URLs to `dist/modules/aspekta.js`
- Update CDN base paths to include `_subsets/`
- Test jsDelivr CDN delivery

#### 3.3 Validation & Testing
- Verify character coverage
- Test rendering in browsers
- Validate metadata accuracy
- Check licensing compliance

### Phase 4: Automation Integration

#### 4.1 Build Process Integration
```javascript
// In build.js workflow
async function buildWithSubsets() {
  await scanFontFamilies();
  await generateSubsets(); // NEW STEP
  await generateModules();
  await generateCatalog();
}
```

#### 4.2 Incremental Processing
- Only regenerate subsets when font files change
- Use file modification timestamps
- Skip families that already have current subsets

#### 4.3 CLI Interface
```bash
npm run generate-subsets              # All families
npm run generate-subsets aspekta      # Single family
npm run generate-subsets --force      # Force regeneration
```

## Technical Specifications

### Character Set Definition
```javascript
const MIN_CHARS = {
  name: 'min-chars',
  description: 'Minimal character set for performance-critical contexts',
  characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"#$%&\'()*+,-./:;=?[]_ —–''""…',
  unicodeRanges: [
    'U+0020-007F',  // Basic Latin
    'U+00A0',       // Non-breaking space
    'U+2013-2014',  // En dash, Em dash
    'U+2018-2019',  // Curly single quotes
    'U+201C-201D',  // Curly double quotes
    'U+2026'        // Ellipsis
  ],
  characterCount: 100
};
```

### Fonttools Command Structure
```bash
pyftsubset input.woff2 \
  --text="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!\"#$%&'()*+,-./:;=?[]_ —–''\"\"…" \
  --output-file=output.woff2 \
  --flavor=woff2 \
  --with-zopfli \
  --desubroutinize
```

### Expected File Sizes
- **Original Aspekta-400.woff2**: ~15-20KB
- **Min-chars subset**: ~5-6KB (70% reduction)
- **Original AspektaVF.ttf**: ~45-60KB  
- **Min-chars VF subset**: ~12-15KB (75% reduction)

## Quality Assurance

### Validation Checklist
- [ ] Character coverage matches specification
- [ ] File sizes meet targets
- [ ] Fonts render correctly in browsers
- [ ] Variable font axes preserved
- [ ] Metadata accurate and complete
- [ ] CDN URLs functional
- [ ] Licensing compliance maintained

### Testing Strategy
1. **Unit Tests**: Subset generation functions
2. **Integration Tests**: Full build process
3. **Visual Tests**: Character rendering validation
4. **Performance Tests**: File size and load time validation

## Future Enhancements

### Additional Subset Types
- **min-alphabet**: 62 characters (A-Z, a-z, 0-9)
- **literature-complete**: 235 characters (full book coverage)
- **language-specific**: Latin-extended, Cyrillic, etc.

### Advanced Features
- **Content-based subsetting**: Analyze specific text content
- **Progressive loading**: Load minimal first, upgrade to full
- **Dynamic subsetting**: Generate on-demand via API
- **Multi-format output**: WOFF, WOFF2, TTF variants

## Dependencies

### Required Tools
- **fonttools**: Python library for font manipulation
- **brotli**: Compression for WOFF2 format
- **Node.js child_process**: Execute Python commands

### System Requirements
- Python 3.7+
- Node.js 18+
- Sufficient disk space for subset files

## Estimated Timeline

- **Phase 1 (Infrastructure)**: 1-2 days
- **Phase 2 (Core Implementation)**: 2-3 days  
- **Phase 3 (Aspekta Test Case)**: 1 day
- **Phase 4 (Automation)**: 1-2 days
- **Total Estimated Time**: 5-8 days

## Success Metrics

### Performance Goals
- 70%+ file size reduction for subsets
- Sub-100ms subset generation time
- Zero regression in font quality

### Coverage Goals
- All existing font families supported
- Automated integration with build process
- Complete documentation and examples

---

## Implementation Progress

### ✅ Completed Tasks

#### Phase 1.1: Update Subset Metadata Structure
- **Status**: Complete
- **File**: `_subsets/aspekta/metadata.json`
- **Changes**: 
  - Added `min-chars` subset definition with 100-character set
  - Defined target files: `Aspekta-400-min.woff2`, `AspektaVF-min.ttf`, `AspektaVF-min.woff2`
  - Set unicode ranges for typography improvements
  - Configured for `_subsets/aspekta/min-chars/` output directory

#### Phase 1.2: Create Subset Generator Tool
- **Status**: Complete
- **File**: `build-tools/generators/subset-generator.js`
- **Features**:
  - Uses fonttools pyftsubset for web-ready font generation
  - Supports static (.woff2) and variable fonts (.ttf/.woff2)
  - Preserves font creator attribution in separate `_subsets/` directory
  - Comprehensive error handling and dependency checking
  - Legal compliance with original font licensing
  - Added `npm run generate-subsets` script to package.json
- **Directory Structure**: Creates subsets in `_subsets/aspekta/min-chars/` as requested

#### Phase 1.3: Install Dependencies
- **Status**: Complete
- **Virtual Environment**: Created `.venv/` with Python 3.13.5
- **Dependencies Installed**: 
  - fonttools 4.59.2 (pyftsubset available)
  - brotli 1.1.0 (WOFF2 compression support)
- **Configuration**: Added `.venv/` to `.gitignore`
- **Testing**: Successfully validated pyftsubset functionality

#### Phase 3: Aspekta Test Case (BONUS - Already Complete!)
- **Status**: Complete
- **Generated Files**:
  - `Aspekta-400-min.woff2` (4.1KB) - 79% size reduction
  - `AspektaVF-min.ttf` (15.8KB) - 74% size reduction  
  - `AspektaVF-min.woff2` (9.6KB) - 62% size reduction
- **Location**: `_subsets/aspekta/min-chars/`
- **Metadata**: Complete subset metadata generated
- **Character Coverage**: All 100 min-chars characters included

#### Phase 2: Core Implementation
- **Status**: Complete
- **Build System Integration**: 
  - Added Phase 4 "Font subset generation" to build workflow
  - Integrated SubsetGenerator class into build process
  - Added graceful error handling for families without subset metadata
- **Module Generator Updates**:
  - Added `subsets` CDN base path to all generated modules
  - Implemented `generateSubsetInfo()` function to read subset metadata
  - Updated module generation to include subset information in output
- **Results**: 
  - Aspekta module now includes complete subset information
  - CDN URLs: `cdnBase.subsets` points to `_subsets/aspekta/`
  - Subset data: Character counts, unicode ranges, file names, generation timestamps

### 🔄 Next Steps

#### Phase 4: Automation Integration
- Implement incremental processing (only regenerate when fonts change)
- Create CLI commands for subset management
- Add subset validation to final build validation

**Current Status**: Phase 2 complete! Subset generation fully integrated into build system. Ready for Phase 4 automation improvements.