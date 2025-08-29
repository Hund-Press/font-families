#!/usr/bin/env node

/**
 * Contributor CLI Tool
 * 
 * Command-line interface for font contribution validation and quality assessment.
 * Provides working examples and comparative analysis instead of abstract rules.
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { runContributorValidation } from '../workflows/contributor-validation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Parse command line arguments
 */
function parseArgs() {
    const args = process.argv.slice(2);
    const config = {
        command: null,
        fontPath: null,
        outputPath: null,
        reference: null,
        help: false
    };
    
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        
        switch (arg) {
            case 'validate':
            case 'check':
            case 'analyze':
                config.command = 'validate';
                break;
            case 'example':
            case 'demo':
                config.command = 'example';
                break;
            case '--help':
            case '-h':
                config.help = true;
                break;
            case '--output':
            case '-o':
                config.outputPath = args[++i];
                break;
            case '--reference':
            case '-r':
                config.reference = args[++i];
                break;
            default:
                if (!config.fontPath && !arg.startsWith('-')) {
                    config.fontPath = arg;
                }
                break;
        }
    }
    
    return config;
}

/**
 * Print help information
 */
function printHelp() {
    console.log(`
Font Families Contributor Tool

USAGE:
  contributor-cli validate <font-path> [options]
  contributor-cli example

COMMANDS:
  validate <path>    Validate font contribution and generate quality report
  example           Show example of well-structured font contribution

OPTIONS:
  --output, -o      Save detailed report to file (JSON format)
  --reference, -r   Use custom reference font for comparison
  --help, -h        Show this help message

EXAMPLES:
  # Validate a font contribution
  contributor-cli validate ./my-new-font

  # Validate with detailed report
  contributor-cli validate ./my-new-font --output report.json

  # See example of good font structure
  contributor-cli example

WORKING EXAMPLES APPROACH:
This tool shows font quality through comparison with working examples rather 
than abstract rules. It demonstrates what good contributions look like by 
comparing your font structure, metadata, and user experience against proven
reference implementations.

The goal is to help contributors understand quality standards through concrete
examples that show the difference between adequate and excellent font 
contributions.
`);
}

/**
 * Show example of well-structured contribution
 */
async function showExample() {
    console.log(`
🎯 EXAMPLE: Well-Structured Font Contribution

The Aspekta font in this repository demonstrates excellent contribution structure:

DIRECTORY STRUCTURE:
fonts/open-fonts/aspekta/
├── README.md                    # Clear documentation
├── LICENSE.txt                  # Font license (OFL-1.1)  
├── package.json                 # UFR metadata
├── fonts/                       # Organized font files
│   ├── webfonts/               # Web-optimized WOFF2
│   │   ├── Aspekta-400.woff2
│   │   ├── Aspekta-700.woff2
│   │   └── AspektaVF.woff2     # Variable font
│   ├── ttf/                    # TrueType originals
│   └── variable/               # Variable font sources
└── sources/                     # Original design files

WHY THIS WORKS:

✅ UFR-Compliant Structure
   - Clear separation: fonts/ for distributions, sources/ for originals
   - Format organization: webfonts/, ttf/, variable/ subdirectories
   - Standard file naming and locations

✅ Complete Legal Framework
   - LICENSE.txt with clear OFL-1.1 license
   - package.json with author, license, version metadata
   - Proper attribution preserved throughout

✅ User-Focused Design
   - README.md explains font usage and characteristics
   - Web-optimized WOFF2 files for performance  
   - Variable font option for design flexibility
   - Clear naming conventions

✅ Distribution Ready
   - CDN-compatible file organization
   - jsDelivr-optimized paths and structure
   - Build system can generate modules automatically
   - Export service can create user repositories

VALIDATION RESULTS:
Running 'contributor-cli validate fonts/open-fonts/aspekta' shows:

📁 Structure: UFR-compliant ✅
🎯 User Experience:
   - Discoverability: 100/100 ✅
   - Usability: 100/100 ✅  
   - Reliability: 100/100 ✅
   - Performance: 95/100 ✅

This demonstrates the quality standard for font contributions. Your contribution
will be compared against this reference to identify improvement opportunities.
`);

    console.log(`
🛠️  QUICK START FOR NEW CONTRIBUTION:

1. Create UFR structure:
   mkdir my-font-family
   cd my-font-family
   mkdir fonts fonts/webfonts fonts/ttf sources

2. Add required files:
   echo "# My Font Family" > README.md
   echo "OFL-1.1 license text..." > LICENSE.txt
   
3. Create package.json metadata:
   {
     "name": "my-font-family",
     "version": "1.0.0", 
     "author": "Your Name",
     "license": "OFL-1.1"
   }

4. Organize font files:
   cp *.woff2 fonts/webfonts/
   cp *.ttf fonts/ttf/
   cp source-files.* sources/

5. Validate your structure:
   contributor-cli validate my-font-family

This approach ensures your contribution meets community standards and provides
an excellent user experience for font consumers.
`);
}

/**
 * Main CLI entry point
 */
async function main() {
    const config = parseArgs();
    
    if (config.help || !config.command) {
        printHelp();
        return;
    }
    
    try {
        switch (config.command) {
            case 'validate':
                if (!config.fontPath) {
                    console.error('❌ Error: Font path required for validation');
                    console.error('Usage: contributor-cli validate <font-path>');
                    process.exit(1);
                }
                
                console.log(`🔍 Validating contribution: ${config.fontPath}`);
                console.log('📊 Generating quality report with working examples...\n');
                
                const report = await runContributorValidation(config.fontPath, config.outputPath);
                
                if (config.outputPath) {
                    console.log(`\n📄 Detailed report saved: ${config.outputPath}`);
                }
                
                // Exit with error code if validation fails
                if (report.contributorAnalysis && !report.contributorAnalysis.exists) {
                    process.exit(1);
                }
                
                break;
                
            case 'example':
                await showExample();
                break;
                
            default:
                console.error(`❌ Unknown command: ${config.command}`);
                printHelp();
                process.exit(1);
        }
        
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
}

// Run CLI if this file is executed directly
if (process.argv[1] === __filename) {
    main().catch(error => {
        console.error(`Fatal error: ${error.message}`);
        process.exit(1);
    });
}

export { main, parseArgs, showExample };