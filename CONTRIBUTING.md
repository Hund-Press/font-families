# Contributing to Font Families

This guide demonstrates font contribution standards through working examples rather than abstract rules. Learn quality standards by comparing your contribution against proven implementations.

## Quick Start: Working Example Validation

```bash
# Clone and navigate to repository
git clone https://github.com/your-org/font-families
cd font-families

# Validate your font contribution
node build-tools/cli/contributor-cli.js validate path/to/your-font

# See example of excellent contribution structure
node build-tools/cli/contributor-cli.js example
```

**Core Principle**: Show quality through comparison, not compliance with abstract requirements.

## Understanding Quality Standards

### ✅ Reference Implementation: Aspekta Font

The Aspekta font demonstrates excellent contribution quality. Your submission will be compared against this working example:

```
fonts/open-fonts/aspekta/
├── README.md                    # Font documentation and usage
├── LICENSE.txt                  # Clear OFL-1.1 license
├── package.json                 # UFR metadata (version, author, license)
├── fonts/                       # Organized font files
│   ├── webfonts/               # Web-optimized WOFF2 files
│   │   ├── Aspekta-400.woff2   # Regular weight
│   │   ├── Aspekta-700.woff2   # Bold weight  
│   │   └── AspektaVF.woff2     # Variable font
│   ├── ttf/                    # TrueType originals
│   ├── otf/                    # OpenType originals
│   └── variable/               # Variable font sources
└── sources/                     # Original design files
```

**Why This Works:**
- **UFR-compliant structure**: Clear organization that tools understand
- **Complete legal framework**: License, attribution, metadata all present
- **User-focused design**: Web-optimized files, clear documentation
- **Distribution-ready**: CDN-compatible, build system compatible

## Contribution Process: Working Examples Approach

### 1. Structure Your Contribution

**Good Example** (like Aspekta):
```bash
my-awesome-font/
├── README.md          # Font description, usage examples, character coverage
├── LICENSE.txt        # Font license (OFL-1.1 recommended)
├── package.json       # UFR metadata
├── fonts/
│   ├── webfonts/      # WOFF2 files optimized for web
│   ├── ttf/           # TrueType originals  
│   └── variable/      # Variable fonts if available
└── sources/           # Design files (.glyphs, .ufo, etc.)
```

**Common Issues** (shown by validation):
```bash
my-font-attempt/
├── MyFont.ttf         # ❌ No organization
├── license            # ❌ Unclear licensing  
└── readme.txt         # ❌ No metadata structure
```

### 2. Validate Your Contribution

```bash
# Run validation with detailed feedback
node build-tools/cli/contributor-cli.js validate my-awesome-font --output report.json

# View comparative analysis
cat report.json | jq '.comparative.userExperience'
```

**Example Validation Output:**
```
🔍 Validating contribution: my-awesome-font
📊 Generating quality report with working examples...

📁 STRUCTURE:
   Organization: ufr-compliant ✅
   License: ✅
   README: ✅
   Package: ✅

🎯 USER EXPERIENCE:
   discoverability: ✅ 100/100
   usability: ✅ 95/100
   reliability: ✅ 100/100
   performance: ⚠️  75/100

🚀 TOP RECOMMENDATIONS:
   1. Optimize font file sizes
      Current WOFF2 files average 45KB, reference average 32KB
```

### 3. Working Examples for Common Improvements

#### Package.json Metadata
**Reference Implementation:**
```json
{
  "name": "aspekta",
  "version": "1.2.0",
  "description": "A versatile sans-serif typeface",
  "author": "Ivo Dolenc",
  "license": "OFL-1.1",
  "homepage": "https://github.com/hund-press/font-families/tree/main/fonts/open-fonts/aspekta"
}
```

#### License Documentation
**Reference Implementation:**
```
Copyright (c) 2021, Ivo Dolenc (ivo@dolenc.eu)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL
```

#### README Documentation
**Reference Pattern:**
```markdown
# Aspekta

A versatile sans-serif typeface designed by Ivo Dolenc.

## Font Characteristics
- **Weights**: 50-1000 (21 static weights + variable)
- **Character Coverage**: Latin extended, some Cyrillic
- **OpenType Features**: Ligatures, alternate characters

## Usage Examples
[CSS examples, variable font syntax, fallback strategies]

## License
This font is licensed under the SIL Open Font License 1.1.
```

## Technical Requirements: Demonstrated Through Examples

### Font Format Coverage

**Minimum Requirements** (shown through aspekta):
- ✅ **Web fonts**: WOFF2 format for performance
- ✅ **Static weights**: At least Regular (400) and Bold (700)
- ✅ **Variable fonts**: If supported by design

**Optimal Coverage** (aspekta demonstrates):
- ✅ **21 static weights**: Complete weight range
- ✅ **Variable font**: Full weight axis 100-900
- ✅ **Multiple formats**: WOFF2, TTF, OTF as appropriate

### License Compliance

**Approved for Public CDN:**
- SIL Open Font License 1.1 (OFL-1.1) ✅
- Apache License 2.0 ✅
- MIT License ✅

**License File Requirements:**
```bash
# Must include one of these files
LICENSE.txt          # Preferred
OFL.txt             # For SIL OFL specifically  
LICENSE             # Acceptable alternative
```

### Performance Standards

**File Size Guidelines** (derived from reference fonts):
- **WOFF2 files**: Typically 20-50KB per weight
- **Variable fonts**: Often smaller than multiple static weights
- **TTF/OTF sources**: Size less critical, completeness more important

## Validation and Quality Assessment

### Automated Quality Checks

The contributor CLI tool evaluates your submission across four dimensions:

**Discoverability (0-100)**
- README documentation quality
- Package metadata completeness  
- Font naming and organization

**Usability (0-100)**
- Web-optimized format availability
- Font loading performance
- File organization clarity

**Reliability (0-100)**
- License documentation
- Attribution completeness
- Legal compliance

**Performance (0-100)**
- File size optimization
- Format efficiency
- Loading characteristics

### Working Example Comparison

Instead of abstract rules, the validation system:

1. **Compares your structure** against proven reference (aspekta)
2. **Shows specific improvements** with working code examples
3. **Demonstrates quality gaps** through concrete metrics
4. **Provides actionable fixes** with exact implementation examples

## Manual Review Process

### Review Criteria: Demonstrated Quality

Font contributions are evaluated against working examples:

**✅ Structural Quality** - Matches reference organization patterns
**✅ Technical Quality** - Font files technically sound and complete  
**✅ Legal Clarity** - License documentation clear and compliant
**✅ User Experience** - Easy to discover, understand, and use

### Review Process: Comparative Analysis

1. **Automated pre-check** compares against reference implementation
2. **Human reviewer** validates automated analysis and font quality
3. **Iterative improvement** based on concrete examples and recommendations
4. **Final validation** ensures contribution matches quality standards

## Community Standards

### Fork-First Development

This repository supports community-scale development through:

**Individual Ownership** - Contributors maintain agency over their fonts
**Quality Standards** - Demonstrated through working examples, not abstract rules  
**Technical Excellence** - Build systems handle optimization and distribution
**Legal Clarity** - Clear licensing and attribution throughout

### Building Community

**Show, Don't Tell** - Quality demonstrated through working examples
**Preserve Agency** - Contributors maintain ownership and creative control
**Enable Independence** - Export system creates fully independent user repositories
**Support Learning** - Comparative analysis helps contributors improve

## Getting Help

### CLI Tool Help
```bash
# Show usage examples
node build-tools/cli/contributor-cli.js --help

# Run example validation  
node build-tools/cli/contributor-cli.js example
```

### Common Questions

**Q: How do I know if my font structure is correct?**
A: Run `contributor-cli validate your-font` and compare against the reference implementation shown.

**Q: What license should I use?**
A: OFL-1.1 is recommended for open source fonts. See aspekta/LICENSE.txt for exact format.

**Q: How do I optimize my font files?**
A: The validation tool compares your file sizes against reference implementations and suggests specific improvements.

**Q: Can I see what excellent contribution looks like?**  
A: Run `contributor-cli example` to see detailed analysis of the aspekta reference implementation.

## Working Examples Repository

This entire repository serves as a working example of excellent font contribution practices. Every aspect of the contribution process - from file organization to build systems to distribution - demonstrates quality standards through actual implementation rather than theoretical documentation.

Your contribution becomes part of this working example, helping future contributors understand quality standards through concrete comparison rather than abstract requirements.