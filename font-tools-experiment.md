# FontTools Experiment: Multi-Language Font Analysis

## Overview

This experiment replaces FontKit with fontTools (Python) for comprehensive font analysis with support for all major written languages. FontTools is the industry standard used by Google Fonts, Adobe, and other major font platforms.

## How It Works

### Architecture
- **Python Core**: `build-tools/font-inspector.py` - Direct fontTools analysis
- **Node.js Wrapper**: `build-tools/scanners/fonttools-analyzer.js` - Compatible API layer
- **Virtual Environment**: `font-tools-env/` - Isolated Python dependencies

### Key Improvements
- **20+ Writing Systems**: Latin, Cyrillic, Arabic, CJK, Indic scripts, etc.
- **Complex Script Support**: Proper Arabic joining, Devanagari stacking analysis
- **Better OpenType Features**: More accurate stylistic set detection
- **Industry Standard**: Same tools used by major font platforms

## How to Try It Out

### Quick Test
```bash
# Test the Python script directly
source font-tools-env/bin/activate
python build-tools/font-inspector.py "path/to/font.ttf"

# Test the Node.js wrapper
node -e "
import { extractCanonicalFamilyName } from './build-tools/scanners/fonttools-analyzer.js';
console.log(await extractCanonicalFamilyName('path/to/font.ttf'));
"
```

### Integration Test
Replace FontKit imports in the build system:
```javascript
// OLD
import { normalizeFont } from './fontkit-analyzer.js';

// NEW  
import { normalizeFont } from './fonttools-analyzer.js';
```

The API is fully compatible - same function signatures and return structures.

## How to Evaluate

### 1. Language Coverage Accuracy
Compare Unicode block analysis between FontKit and fontTools:
- **FontKit**: Basic sampling of 10 Unicode blocks
- **fontTools**: Comprehensive analysis of 20+ writing systems
- **Test**: Analyze fonts with Arabic, CJK, or Indic scripts

### 2. Font Metadata Quality
Test family name extraction:
```bash
# Compare outputs
echo "FontKit result:"
node -e "import fontkit from 'fontkit'; console.log(fontkit.openSync('font.ttf').familyName)"

echo "fontTools result:"  
python build-tools/font-inspector.py font.ttf | jq '.basic.familyName'
```

### 3. OpenType Feature Detection
- **FontKit**: Limited GSUB/GPOS access
- **fontTools**: Full OpenType table analysis
- **Test**: Check stylistic sets (ss01-ss20) detection accuracy

### 4. Performance Comparison
```bash
# Time both approaches on a batch of fonts
time find fonts/ -name "*.ttf" -exec node fontkit-test.js {} \;
time find fonts/ -name "*.ttf" -exec python build-tools/font-inspector.py {} \;
```

### 5. Compatibility Check
Run existing build process with both analyzers and compare:
- Module generation consistency
- Stylistic sets structure
- CDN URL generation
- Subset metadata

## Future Opportunities

### Enhanced Language Intelligence
With better Unicode analysis, we could:
- **Auto-detect Script Variants**: Identify Arabic vs Persian vs Urdu optimizations
- **Language-Specific Subsets**: Generate targeted character sets per language
- **Script Complexity Scoring**: Rate fonts for complex script support quality

### Advanced Typography Features
- **Contextual Analysis**: Detect proper Arabic joining, Indic conjunct support
- **Feature Validation**: Test if OpenType features actually work (not just present)
- **Rendering Quality**: Analyze baseline alignment, spacing consistency across scripts

### Curation Tools
- **Language Coverage Reports**: "This font supports 47 languages across 12 writing systems"
- **Script Quality Metrics**: Rate Arabic support quality (basic/good/excellent)
- **Missing Character Analysis**: Identify gaps in language coverage

### API Enhancements
- **Language-First Browsing**: Browse fonts by supported languages/scripts
- **Smart Fallbacks**: Suggest fonts based on script requirements
- **Multilingual Font Stacks**: Generate optimal fallback chains per language

### Performance Optimizations
- **Smart Subsetting**: Generate language-specific subsets automatically
- **Progressive Loading**: Load scripts as needed rather than full fonts
- **Coverage-Based CDN**: Serve different versions based on content language

## Migration Strategy

### Phase 1: Parallel Testing
- Keep both analyzers running
- Compare outputs on existing font collection
- Identify any breaking changes

### Phase 2: Gradual Rollout
- Switch module generation to fontTools
- Update build system incrementally
- Monitor for regressions

### Phase 3: Enhanced Features
- Add new language-aware functionality
- Implement advanced subsetting
- Build multilingual browsing features

## Technical Notes

### Dependencies
- **Python 3.13+**: Required for fontTools
- **fonttools**: Core font analysis library
- **brotli**: WOFF2 support
- **unicodedata2**: Enhanced Unicode support

### Error Handling
The wrapper includes fallback behavior:
- Graceful degradation if Python fails
- Compatible error messages with existing system
- Same null/undefined behavior as FontKit

### Performance Considerations
- **Cold Start**: Python process startup adds ~100ms
- **Batch Processing**: Consider pooling Python processes
- **Caching**: Results are identical for same font files

## Success Metrics

1. **Coverage**: More languages detected per font
2. **Accuracy**: Fewer false positives in script support
3. **Compatibility**: Zero breaking changes to existing API
4. **Performance**: Acceptable speed for build process
5. **Future-Proof**: Enables new multilingual features

This experiment positions the font-families project to be truly global, with proper support for the world's writing systems beyond just Latin scripts.