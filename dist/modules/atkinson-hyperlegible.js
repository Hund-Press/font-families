/**
 * Atkinson Hyperlegible Font Family Module
 * 
 * Generated from font-families build system
 * License: OFL-1.1
 * Author: Braille Institute of America
 * Version: 1.0.0
 */

export default {
  "name": "Atkinson Hyperlegible",
  "key": "atkinson-hyperlegible",
  "attribution": {
    "version": "1.0.0",
    "author": "Braille Institute of America",
    "license": "OFL-1.1",
    "description": ""
  },
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
  "languages": {
    "scripts": [
      {
        "name": "Latin",
        "coverage": 0.475,
        "languages": [
          "eng",
          "fra",
          "deu",
          "spa",
          "ita",
          "por",
          "nld",
          "pol",
          "ces",
          "hun",
          "tur"
        ],
        "blocks": [
          "Basic Latin",
          "Latin-1 Supplement",
          "Latin Extended-A",
          "Latin Extended-B"
        ]
      }
    ],
    "total": 11
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
    "variable": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.10.0/fonts/open-fonts/atkinson-hyperlegible/fonts/variable/",
    "static": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.10.0/fonts/open-fonts/atkinson-hyperlegible/fonts/webfonts/",
    "ttf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.10.0/fonts/open-fonts/atkinson-hyperlegible/fonts/ttf/",
    "otf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.10.0/fonts/open-fonts/atkinson-hyperlegible/fonts/otf/",
    "subsets": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.10.0/subsets/atkinson-hyperlegible/"
  },
  "faces": {
    "variable": {},
    "static": {
      "atkinson-hyperlegible-regular": {
        "name": "Atkinson Hyperlegible Regular",
        "fileName": "AtkinsonHyperlegible-Regular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -290,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 668,
            "xHeight": 496,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 809,
            "spaceWidth": 250,
            "bbox": {
              "minX": -58,
              "minY": -250,
              "maxX": 1290,
              "maxY": 888
            }
          }
        }
      },
      "atkinson-hyperlegible-regular-italic": {
        "name": "Atkinson Hyperlegible Regular Italic",
        "fileName": "AtkinsonHyperlegible-Italic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 400,
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -290,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 668,
            "xHeight": 496,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 895,
            "spaceWidth": 250,
            "bbox": {
              "minX": -154,
              "minY": -241,
              "maxX": 1338,
              "maxY": 885
            }
          }
        }
      },
      "atkinson-hyperlegible-bold-italic": {
        "name": "Atkinson Hyperlegible Bold Italic",
        "fileName": "AtkinsonHyperlegible-BoldItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 700,
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -290,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 668,
            "xHeight": 496,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 955,
            "spaceWidth": 250,
            "bbox": {
              "minX": -174,
              "minY": -248,
              "maxX": 1417,
              "maxY": 941
            }
          }
        }
      },
      "atkinson-hyperlegible-bold": {
        "name": "Atkinson Hyperlegible Bold",
        "fileName": "AtkinsonHyperlegible-Bold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -290,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 668,
            "xHeight": 496,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 871,
            "spaceWidth": 250,
            "bbox": {
              "minX": -70,
              "minY": -251,
              "maxX": 1382,
              "maxY": 926
            }
          }
        }
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
      "generatedAt": "2025-09-21T17:06:32.312Z"
    }
  }
};
