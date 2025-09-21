# Build Tools Migration Plan

## Overview
This document outlines the migration of the `build-tools/` directory to `src/build-tools/` to improve project organization and align with standard src-based project structures.

## Current State Analysis

### Directory Structure
The current `build-tools/` directory contains:
```
build-tools/
├── workflows/
│   ├── build.js
│   └── contributor-validation.js
├── utils/
│   └── version-manager.js
├── cli/
│   └── contributor-cli.js
├── scripts/
│   └── version-sync.js
├── scanners/
│   ├── ufr-scanner.js
│   ├── validation.js
│   └── fonttools-analyzer.js
└── generators/
    ├── subset-generator.js
    ├── catalog-generator.js
    ├── doc-generator.js
    └── module-generator.js
```

### Files Referencing build-tools (22 total)

#### Core Configuration Files
- `package.json` - 12 npm scripts reference build-tools
- `jest.config.js` - Test configuration
- `.eleventyignore` - Build ignore patterns
- `.github/workflows/test.yml` - CI/CD configuration

#### Test Files (16 files)
- All unit tests in `tests/unit/` reference build-tools modules
- Integration tests in `tests/integration/`
- One legacy test file: `tests/subset-generator.test.js`

#### Documentation
- `CONTRIBUTING.md` - References build-tools commands
- `tests/README.md` - Documentation with build-tools examples

## Migration Steps

### Phase 1: Pre-Migration Analysis ✅
- [x] Catalog all build-tools files and dependencies
- [x] Identify all references to build-tools paths
- [x] Document current npm scripts and configurations

### Phase 2: Update References
1. **Update package.json scripts** (12 scripts to update)
   ```bash
   # Current scripts to update:
   "build": "node build-tools/workflows/build.js"
   "scan": "node build-tools/scanners/ufr-scanner.js"
   "validate": "node build-tools/workflows/validate.js"
   "generate-modules": "node build-tools/generators/module-generator.js"
   "generate-catalog": "node build-tools/generators/catalog-generator.js"
   "generate-subsets": "node build-tools/generators/subset-generator.js"
   "generate-docs": "node build-tools/generators/doc-generator.js"
   "version:check": "node build-tools/scripts/version-sync.js check"
   "version:sync": "node build-tools/scripts/version-sync.js sync"
   "version:bump": "node build-tools/scripts/version-sync.js bump"
   "version:current": "node build-tools/scripts/version-sync.js current"
   "lint": "eslint build-tools/ src/ tests/"
   "lint:fix": "eslint --fix build-tools/ src/ tests/"
   ```

2. **Update configuration files**
   - Update `.eleventyignore` patterns
   - Update `jest.config.js` if it has build-tools specific configuration
   - Update `.github/workflows/test.yml` CI paths

3. **Update test imports** (16 test files)
   - All unit tests importing from `../../../build-tools/`
   - Integration tests importing build-tools modules
   - Update test paths to use `../../../src/build-tools/`

4. **Update documentation**
   - Update `CONTRIBUTING.md` command examples
   - Update `tests/README.md` references

### Phase 3: Internal Module Updates
1. **Analyze internal imports within build-tools**
   - Check for relative imports between build-tools modules
   - Identify any hardcoded paths that need updating

2. **Update relative imports**
   - Most build-tools files use relative imports (e.g., `../utils/version-manager.js`)
   - These should continue to work after the move
   - Verify no absolute paths reference the old location

### Phase 4: Directory Migration
1. **Create target directory structure**
   ```bash
   mkdir -p src/build-tools
   ```

2. **Move build-tools directory**
   ```bash
   mv build-tools/* src/build-tools/
   rmdir build-tools
   ```

3. **Verify directory structure**
   ```bash
   find src/build-tools -type f -name "*.js" | sort
   ```

### Phase 5: Post-Migration Validation
1. **Test npm scripts**
   ```bash
   npm run build --dry-run
   npm run scan --help
   npm run validate --help
   npm run version:check
   npm test
   npm run lint
   ```

2. **Run integration tests**
   ```bash
   npm run test -- tests/integration/
   ```

3. **Verify CI/CD pipeline**
   - Check that GitHub Actions workflow still works
   - Ensure all paths resolve correctly

### Phase 6: Cleanup and Documentation
1. **Update any remaining references**
   - Search for any missed references to old path
   - Update inline documentation or comments

2. **Commit changes**
   ```bash
   git add .
   git commit -m "migrate: Move build-tools to src/build-tools directory

   - Updated all package.json scripts to use new path
   - Updated test imports and CI configuration
   - Updated documentation references
   - Maintains existing functionality and structure"
   ```

## Risk Assessment

### Low Risk
- **Relative imports within build-tools**: Most internal imports use relative paths and will continue to work
- **Test files**: Clear pattern of imports that can be updated systematically

### Medium Risk
- **CI/CD configuration**: May need testing to ensure GitHub Actions work correctly
- **Eleventy configuration**: Verify .eleventyignore patterns work with new structure

### Mitigation Strategies
1. **Incremental testing**: Test each script after updating its path
2. **Backup approach**: Keep git history to easily revert if issues arise
3. **Documentation**: Update all references simultaneously to avoid confusion

## Success Criteria
- [x] All npm scripts execute successfully
- [x] All tests pass (unit and integration) - Core functionality verified
- [ ] CI/CD pipeline runs without errors - Need to test in GitHub Actions
- [x] No broken references to old build-tools path
- [x] Documentation accurately reflects new structure

## Timeline
- **Preparation**: 30 minutes (analysis and planning)
- **Implementation**: 45 minutes (updating references and moving files)
- **Testing & Validation**: 15 minutes (verifying everything works)
- **Total Estimated Time**: 90 minutes

## Notes
- This migration maintains all existing functionality
- No changes to build-tools internal structure or logic
- Only path references are being updated
- Can be done atomically in a single commit for clean history