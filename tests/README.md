# Test Suite

This directory contains comprehensive tests for the Font Families build tools and utilities.

## Test Structure

```
tests/
├── helpers/               # Test utilities and mocks
├── unit/                  # Unit tests for individual modules
│   ├── cli/              # Command-line interface tests
│   ├── generators/       # Generator module tests
│   ├── scanners/         # Scanner module tests
│   ├── utils/            # Utility module tests
│   └── workflows/        # Workflow module tests
├── integration/          # Cross-module integration tests
└── fixtures/             # Test data and mock files
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test files
npm test -- --testPathPattern="catalog-generator"

# Run tests with verbose output
npm test -- --verbose
```

## Test Coverage

The test suite aims for:
- **70%** minimum coverage across all metrics
- **Unit tests** for all build tool modules
- **Integration tests** for workflow components
- **Performance tests** for critical paths

Current coverage targets:
- Generators: 90%+ (catalog, doc, module, subset)
- Scanners: 85%+ (UFR, validation, fonttools)
- Workflows: 80%+ (build, contributor validation)
- Utilities: 85%+ (version manager)
- CLI tools: 80%+ (contributor CLI)

## Test Categories

### Unit Tests
- Individual module functionality
- Mocked external dependencies
- Fast execution (< 100ms per test)

### Integration Tests
- Cross-module interactions
- Real file system operations
- Build pipeline validation

### Performance Tests
- Build time benchmarks
- Memory usage validation
- Large dataset handling

## Writing Tests

### Test Structure
```javascript
import { jest } from '@jest/globals'
import { moduleToTest } from '../../../src/build-tools/module.js'
import { mockConsole, createTempDir } from '../../helpers/test-helpers.js'

describe('Module Name', () => {
  let tempDir
  let consoleMock

  beforeEach(async () => {
    tempDir = await createTempDir()
    consoleMock = mockConsole()
  })

  afterEach(async () => {
    consoleMock.restore()
    await cleanupTempDir(tempDir)
  })

  describe('function name', () => {
    test('should do something', async () => {
      // Test implementation
    })
  })
})
```

### Best Practices
1. **Isolation**: Each test should be independent
2. **Cleanup**: Always clean up temporary files and mocks
3. **Descriptive**: Use clear test and describe names
4. **Edge Cases**: Test error conditions and edge cases
5. **Performance**: Keep unit tests fast, use timeouts for long operations

### Mocking External Dependencies
- File system operations: Use temp directories
- Console output: Use `mockConsole()` helper
- External commands: Mock `child_process` calls
- Network requests: Mock HTTP calls

## CI/CD Integration

Tests run automatically on:
- **Pull Requests**: Full test suite
- **Main branch pushes**: Full suite + deployment
- **Dependency updates**: Regression testing

### GitHub Actions Workflows
- `test.yml`: Comprehensive test execution
- `ci.yml`: Full CI/CD pipeline including tests

### Coverage Reporting
- **Codecov**: Coverage tracking and PR comments
- **Artifacts**: HTML coverage reports
- **Thresholds**: Build fails if coverage drops below 70%

## Debugging Tests

```bash
# Run single test file with debug output
npm test -- --testPathPattern="test-file" --verbose

# Run with Node.js debugging
node --inspect-brk node_modules/.bin/jest --runInBand

# Run specific test case
npm test -- --testNamePattern="specific test name"
```

## Test Data and Fixtures

Use the `tests/helpers/` utilities for:
- **Temporary directories**: `createTempDir()`, `cleanupTempDir()`
- **Mock data**: `createTestFontStructure()`, `createMockFontMetadata()`
- **File operations**: `readJsonFile()`, `writeJsonFile()`, `fileExists()`
- **Console mocking**: `mockConsole()` for capturing logs

## Performance Benchmarks

Key performance metrics tracked:
- Font scanning: < 100ms per font family
- Module generation: < 500ms for complete catalog
- Build pipeline: < 30 seconds for full rebuild
- Memory usage: < 512MB peak during processing

## Contributing

When adding new build tools:
1. Create corresponding test files
2. Maintain coverage thresholds
3. Add integration tests for workflows
4. Update this README if needed

For test-specific issues, check the CI logs and coverage reports to identify areas needing attention.