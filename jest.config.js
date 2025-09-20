/**
 * Jest Configuration for Font Families
 */

export default {
  // Use ES modules
  preset: null,
  extensionsToTreatAsEsm: ['.js'],
  globals: {
    'ts-jest': {
      useESM: true
    }
  },

  // Test environment
  testEnvironment: 'node',

  // Test file patterns
  testMatch: [
    '**/tests/**/*.test.js',
    '**/__tests__/**/*.js'
  ],

  // Ignore patterns
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/_site/',
    '/fonts/',
    '/build-tools/.venv/'
  ],

  // Module name mapping for absolute imports
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@build-tools/(.*)$': '<rootDir>/build-tools/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1'
  },

  // Coverage configuration
  collectCoverageFrom: [
    'build-tools/**/*.js',
    '!build-tools/**/*.test.js',
    '!build-tools/.venv/**',
    '!build-tools/font-inspector.py',
    '!**/node_modules/**'
  ],

  coverageDirectory: 'coverage',

  coverageReporters: [
    'text',
    'lcov',
    'html'
  ],

  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },

  // Setup files
  setupFiles: [],
  setupFilesAfterEnv: [],

  // Transform configuration
  transform: {},

  // Clear mocks between tests
  clearMocks: true,
  restoreMocks: true,

  // Timeout for tests (5 seconds)
  testTimeout: 5000,

  // Verbose output for better debugging
  verbose: true,

  // Error handling
  errorOnDeprecated: true,

  // Watch options (for test:watch)
  watchPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/_site/',
    '/fonts/'
  ]
}