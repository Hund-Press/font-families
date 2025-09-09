/**
 * atkinson-hyperlegible Font Family Module
 * 
 * Generated from font-families build system
 * License: OFL-1.1
 * Author: Braille Institute of America
 * Version: 1.0.0
 */

export default {
  "name": "atkinson-hyperlegible",
  "key": "atkinson-hyperlegible",
  "version": "1.0.0",
  "author": "Braille Institute of America",
  "license": "OFL-1.1",
  "description": "Atkinson hyperlegible font family",
  "weight": {
    "range": "400-700",
    "byFormat": {
      "variable": null,
      "static": {
        "min": 400,
        "max": 700,
        "instances": [
          400,
          700
        ]
      }
    }
  },
  "features": {
    "openType": {
      "categories": {
        "positional": [
          "kern",
          "mark",
          "mkmk"
        ],
        "case": [
          "case"
        ],
        "numeric": [
          "frac",
          "ordn",
          "pnum",
          "tnum"
        ],
        "other": [
          "aalt",
          "ccmp",
          "locl",
          "sups"
        ]
      }
    },
    "stylisticSets": null,
    "capabilities": {
      "hasLigatures": false,
      "hasContextualAlternates": false,
      "hasNumericalFeatures": true,
      "hasStylisticSets": false
    }
  },
  "cdnBase": {
    "variable": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.6.0/fonts/open-fonts/atkinson-hyperlegible/fonts/variable/",
    "static": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.6.0/fonts/open-fonts/atkinson-hyperlegible/fonts/webfonts/",
    "ttf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.6.0/fonts/open-fonts/atkinson-hyperlegible/fonts/ttf/",
    "otf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.6.0/fonts/open-fonts/atkinson-hyperlegible/fonts/otf/",
    "subsets": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.6.0/_subsets/atkinson-hyperlegible/"
  },
  "faces": {
    "variable": {},
    "static": {
      "AtkinsonHyperlegible-Regular": {
        "name": "Atkinson Hyperlegible Regular",
        "fileName": "AtkinsonHyperlegible-Regular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400
      },
      "AtkinsonHyperlegible-Regular-Italic": {
        "name": "Atkinson Hyperlegible Regular Italic",
        "fileName": "AtkinsonHyperlegible-Italic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 400
      },
      "AtkinsonHyperlegible-Bold-Italic": {
        "name": "Atkinson Hyperlegible Bold Italic",
        "fileName": "AtkinsonHyperlegible-BoldItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 700
      },
      "AtkinsonHyperlegible-Bold": {
        "name": "Atkinson Hyperlegible Bold",
        "fileName": "AtkinsonHyperlegible-Bold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700
      }
    }
  },
  "subsets": {
    "min-chars": {
      "description": "Minimal character set for performance-critical contexts (100 characters)",
      "characterCount": 100,
      "unicodeRanges": [
        "U+0020-007F",
        "U+00A0",
        "U+2013-2014",
        "U+2018-2019",
        "U+201C-201D",
        "U+2026"
      ],
      "files": {
        "static": "AtkinsonHyperlegible-400-min.woff2",
        "variable": []
      },
      "generatedAt": "2025-09-09T20:15:11.393Z"
    }
  }
};
