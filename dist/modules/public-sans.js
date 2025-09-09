/**
 * public-sans Font Family Module
 * 
 * Generated from font-families build system
 * License: OFL-1.1
 * Author: Unknown
 * Version: Unknown
 */

export default {
  "name": "public-sans",
  "key": "public-sans",
  "license": "OFL-1.1",
  "description": "Unknown font family",
  "weight": {
    "range": "100-900",
    "byFormat": {
      "variable": {
        "min": 100,
        "max": 900,
        "default": 400
      },
      "static": {
        "min": 100,
        "max": 900,
        "instances": [
          100,
          200,
          300,
          400,
          500,
          600,
          700,
          800,
          900
        ]
      }
    }
  },
  "features": {
    "openType": {
      "categories": {
        "stylistic": [
          "ss01"
        ],
        "ligatures": [
          "liga"
        ],
        "contextual": [
          "calt"
        ],
        "positional": [
          "kern",
          "mark",
          "mkmk"
        ],
        "numeric": [
          "frac",
          "lnum",
          "onum",
          "ordn",
          "pnum",
          "tnum"
        ],
        "other": [
          "aalt",
          "ccmp",
          "dnom",
          "locl",
          "numr",
          "salt",
          "sinf",
          "subs",
          "sups"
        ]
      }
    },
    "stylisticSets": {
      "available": [
        {
          "tag": "ss01",
          "name": "Stylistic Set 1",
          "description": "Alternate character forms"
        }
      ],
      "count": 1,
      "tags": [
        "ss01"
      ]
    },
    "capabilities": {
      "hasLigatures": true,
      "hasContextualAlternates": true,
      "hasNumericalFeatures": true,
      "hasStylisticSets": true
    }
  },
  "cdnBase": {
    "variable": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/public-sans/fonts/variable/",
    "static": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/public-sans/fonts/webfonts/",
    "ttf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/public-sans/fonts/ttf/",
    "otf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/public-sans/fonts/otf/",
    "subsets": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/_subsets/public-sans/"
  },
  "faces": {
    "variable": {
      "PublicSansVariableRegular[wght]": {
        "name": "Public Sans Variable (weight)",
        "fileName": "PublicSans[wght].ttf",
        "format": "truetype",
        "fontStyle": "normal",
        "axes": {
          "wght": {
            "min": 100,
            "max": 900,
            "default": 100
          }
        },
        "weight": {
          "min": 100,
          "max": 900
        },
        "weightRange": "100 900"
      },
      "PublicSansVariableItalic[wght]": {
        "name": "Public Sans Italic Variable (weight)",
        "fileName": "PublicSans-Italic[wght].ttf",
        "format": "truetype",
        "fontStyle": "italic",
        "axes": {
          "wght": {
            "min": 100,
            "max": 900,
            "default": 100
          }
        },
        "weight": {
          "min": 100,
          "max": 900
        },
        "weightRange": "100 900"
      }
    },
    "static": {
      "PublicSans-Thin-Italic": {
        "name": "Public Sans Thin Italic",
        "fileName": "PublicSans-ThinItalic.woff",
        "format": "woff",
        "fontStyle": "italic",
        "fontWeight": 100
      },
      "PublicSans-Thin": {
        "name": "Public Sans Thin",
        "fileName": "PublicSans-Thin.woff",
        "format": "woff",
        "fontStyle": "normal",
        "fontWeight": 100
      },
      "PublicSans-SemiBold-Italic": {
        "name": "Public Sans SemiBold Italic",
        "fileName": "PublicSans-SemiBoldItalic.woff",
        "format": "woff",
        "fontStyle": "italic",
        "fontWeight": 600
      },
      "PublicSans-SemiBold": {
        "name": "Public Sans SemiBold",
        "fileName": "PublicSans-SemiBold.woff",
        "format": "woff",
        "fontStyle": "normal",
        "fontWeight": 600
      },
      "PublicSans-Regular": {
        "name": "Public Sans Regular",
        "fileName": "PublicSans-Regular.woff",
        "format": "woff",
        "fontStyle": "normal",
        "fontWeight": 400
      },
      "PublicSans-Medium-Italic": {
        "name": "Public Sans Medium Italic",
        "fileName": "PublicSans-MediumItalic.woff",
        "format": "woff",
        "fontStyle": "italic",
        "fontWeight": 500
      },
      "PublicSans-Medium": {
        "name": "Public Sans Medium",
        "fileName": "PublicSans-Medium.woff",
        "format": "woff",
        "fontStyle": "normal",
        "fontWeight": 500
      },
      "PublicSans-Light-Italic": {
        "name": "Public Sans Light Italic",
        "fileName": "PublicSans-LightItalic.woff",
        "format": "woff",
        "fontStyle": "italic",
        "fontWeight": 300
      },
      "PublicSans-Light": {
        "name": "Public Sans Light",
        "fileName": "PublicSans-Light.woff",
        "format": "woff",
        "fontStyle": "normal",
        "fontWeight": 300
      },
      "PublicSans-Regular-Italic": {
        "name": "Public Sans Regular Italic",
        "fileName": "PublicSans-Italic.woff",
        "format": "woff",
        "fontStyle": "italic",
        "fontWeight": 400
      },
      "PublicSans-ExtraLight-Italic": {
        "name": "Public Sans ExtraLight Italic",
        "fileName": "PublicSans-ExtraLightItalic.woff",
        "format": "woff",
        "fontStyle": "italic",
        "fontWeight": 200
      },
      "PublicSans-ExtraLight": {
        "name": "Public Sans ExtraLight",
        "fileName": "PublicSans-ExtraLight.woff",
        "format": "woff",
        "fontStyle": "normal",
        "fontWeight": 200
      },
      "PublicSans-ExtraBold-Italic": {
        "name": "Public Sans ExtraBold Italic",
        "fileName": "PublicSans-ExtraBoldItalic.woff",
        "format": "woff",
        "fontStyle": "italic",
        "fontWeight": 800
      },
      "PublicSans-ExtraBold": {
        "name": "Public Sans ExtraBold",
        "fileName": "PublicSans-ExtraBold.woff",
        "format": "woff",
        "fontStyle": "normal",
        "fontWeight": 800
      },
      "PublicSans-Bold-Italic": {
        "name": "Public Sans Bold Italic",
        "fileName": "PublicSans-BoldItalic.woff",
        "format": "woff",
        "fontStyle": "italic",
        "fontWeight": 700
      },
      "PublicSans-Bold": {
        "name": "Public Sans Bold",
        "fileName": "PublicSans-Bold.woff",
        "format": "woff",
        "fontStyle": "normal",
        "fontWeight": 700
      },
      "PublicSans-Black-Italic": {
        "name": "Public Sans Black Italic",
        "fileName": "PublicSans-BlackItalic.woff",
        "format": "woff",
        "fontStyle": "italic",
        "fontWeight": 900
      },
      "PublicSans-Black": {
        "name": "Public Sans Black",
        "fileName": "PublicSans-Black.woff",
        "format": "woff",
        "fontStyle": "normal",
        "fontWeight": 900
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
        "static": "PublicSans-400-min.woff2",
        "variable": [
          "PublicSansVF-min.ttf",
          "PublicSansVF-min.woff2"
        ]
      },
      "generatedAt": "2025-09-09T20:12:08.464Z"
    }
  }
};
