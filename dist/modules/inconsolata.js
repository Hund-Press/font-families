/**
 * inconsolata Font Family Module
 * 
 * Generated from font-families build system
 * License: OFL-1.1
 * Author: Unknown
 * Version: Unknown
 */

export default {
  "name": "inconsolata",
  "key": "inconsolata",
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
          "ss01",
          "ss02",
          "ss03"
        ],
        "ligatures": [
          "dlig"
        ],
        "positional": [
          "mark",
          "mkmk"
        ],
        "case": [
          "case"
        ],
        "numeric": [
          "frac",
          "ordn"
        ],
        "other": [
          "aalt",
          "ccmp",
          "dnom",
          "locl",
          "numr",
          "salt",
          "subs",
          "sups",
          "zero"
        ]
      }
    },
    "stylisticSets": {
      "available": [
        {
          "tag": "ss01",
          "name": "Stylistic Set 1",
          "description": "Alternate character forms"
        },
        {
          "tag": "ss02",
          "name": "Stylistic Set 2",
          "description": "Alternate punctuation"
        },
        {
          "tag": "ss03",
          "name": "Stylistic Set 3",
          "description": "Alternate numerals"
        }
      ],
      "count": 3,
      "tags": [
        "ss01",
        "ss02",
        "ss03"
      ]
    },
    "capabilities": {
      "hasLigatures": true,
      "hasContextualAlternates": false,
      "hasNumericalFeatures": false,
      "hasStylisticSets": true
    }
  },
  "cdnBase": {
    "variable": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/inconsolata/fonts/variable/",
    "static": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/inconsolata/fonts/webfonts/",
    "ttf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/inconsolata/fonts/ttf/",
    "otf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/inconsolata/fonts/otf/",
    "subsets": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/_subsets/inconsolata/"
  },
  "faces": {
    "variable": {
      "InconsolataVariableRegular[wdth,wght]": {
        "name": "Inconsolata Variable (weight, width)",
        "fileName": "Inconsolata[wdth,wght].ttf",
        "format": "truetype",
        "fontStyle": "normal",
        "axes": {
          "wght": {
            "min": 100,
            "max": 900,
            "default": 400
          },
          "wdth": {
            "min": 50,
            "max": 200,
            "default": 100
          }
        },
        "weight": {
          "min": 100,
          "max": 900
        },
        "stretch": {
          "min": "normal",
          "max": "normal",
          "default": "normal",
          "mapping": {
            "100": "normal"
          }
        },
        "weightRange": "100 900"
      }
    },
    "static": {
      "Inconsolata-Expanded-Thin": {
        "name": "Inconsolata Expanded Thin",
        "fileName": "Inconsolata-ExpandedThin.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "expanded"
      },
      "Inconsolata-Expanded-SemiBold": {
        "name": "Inconsolata Expanded SemiBold",
        "fileName": "Inconsolata-ExpandedSemiBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "expanded"
      },
      "Inconsolata-Expanded-Regular": {
        "name": "Inconsolata Expanded Regular",
        "fileName": "Inconsolata-ExpandedRegular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "expanded"
      },
      "Inconsolata-Expanded-Medium": {
        "name": "Inconsolata Expanded Medium",
        "fileName": "Inconsolata-ExpandedMedium.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "expanded"
      },
      "Inconsolata-Expanded-Light": {
        "name": "Inconsolata Expanded Light",
        "fileName": "Inconsolata-ExpandedLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "expanded"
      },
      "Inconsolata-Expanded-ExtraLight": {
        "name": "Inconsolata Expanded ExtraLight",
        "fileName": "Inconsolata-ExpandedExtraLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "expanded"
      },
      "Inconsolata-Expanded-ExtraBold": {
        "name": "Inconsolata Expanded ExtraBold",
        "fileName": "Inconsolata-ExpandedExtraBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "expanded"
      },
      "Inconsolata-Expanded-Bold": {
        "name": "Inconsolata Expanded Bold",
        "fileName": "Inconsolata-ExpandedBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "expanded"
      },
      "Inconsolata-Expanded-Black": {
        "name": "Inconsolata Expanded Black",
        "fileName": "Inconsolata-ExpandedBlack.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 900,
        "fontStretch": "expanded"
      },
      "Inconsolata-UltraCondensed-Thin": {
        "name": "Inconsolata Ultra Condensed Thin",
        "fileName": "Inconsolata-UltraCondensedThin.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "ultra-condensed"
      },
      "Inconsolata-UltraCondensed-SemiBold": {
        "name": "Inconsolata Ultra Condensed SemiBold",
        "fileName": "Inconsolata-UltraCondensedSemiBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "ultra-condensed"
      },
      "Inconsolata-UltraCondensed-Regular": {
        "name": "Inconsolata Ultra Condensed Regular",
        "fileName": "Inconsolata-UltraCondensedRegular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "ultra-condensed"
      },
      "Inconsolata-UltraCondensed-Medium": {
        "name": "Inconsolata Ultra Condensed Medium",
        "fileName": "Inconsolata-UltraCondensedMedium.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "ultra-condensed"
      },
      "Inconsolata-UltraCondensed-Light": {
        "name": "Inconsolata Ultra Condensed Light",
        "fileName": "Inconsolata-UltraCondensedLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "ultra-condensed"
      },
      "Inconsolata-UltraCondensed-ExtraLight": {
        "name": "Inconsolata Ultra Condensed ExtraLight",
        "fileName": "Inconsolata-UltraCondensedExtraLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "ultra-condensed"
      },
      "Inconsolata-UltraCondensed-ExtraBold": {
        "name": "Inconsolata Ultra Condensed ExtraBold",
        "fileName": "Inconsolata-UltraCondensedExtraBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "ultra-condensed"
      },
      "Inconsolata-UltraCondensed-Bold": {
        "name": "Inconsolata Ultra Condensed Bold",
        "fileName": "Inconsolata-UltraCondensedBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "ultra-condensed"
      },
      "Inconsolata-UltraCondensed-Black": {
        "name": "Inconsolata Ultra Condensed Black",
        "fileName": "Inconsolata-UltraCondensedBlack.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 900,
        "fontStretch": "ultra-condensed"
      },
      "Inconsolata-Thin": {
        "name": "Inconsolata Thin",
        "fileName": "Inconsolata-Thin.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "normal"
      },
      "Inconsolata-SemiExpanded-Thin": {
        "name": "Inconsolata Semi Expanded Thin",
        "fileName": "Inconsolata-SemiExpandedThin.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "semi-expanded"
      },
      "Inconsolata-SemiExpanded-SemiBold": {
        "name": "Inconsolata Semi Expanded SemiBold",
        "fileName": "Inconsolata-SemiExpandedSemiBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "semi-expanded"
      },
      "Inconsolata-SemiExpanded-Regular": {
        "name": "Inconsolata Semi Expanded Regular",
        "fileName": "Inconsolata-SemiExpandedRegular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "semi-expanded"
      },
      "Inconsolata-SemiExpanded-Medium": {
        "name": "Inconsolata Semi Expanded Medium",
        "fileName": "Inconsolata-SemiExpandedMedium.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "semi-expanded"
      },
      "Inconsolata-SemiExpanded-Light": {
        "name": "Inconsolata Semi Expanded Light",
        "fileName": "Inconsolata-SemiExpandedLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "semi-expanded"
      },
      "Inconsolata-SemiExpanded-ExtraLight": {
        "name": "Inconsolata Semi Expanded ExtraLight",
        "fileName": "Inconsolata-SemiExpandedExtraLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "semi-expanded"
      },
      "Inconsolata-SemiExpanded-ExtraBold": {
        "name": "Inconsolata Semi Expanded ExtraBold",
        "fileName": "Inconsolata-SemiExpandedExtraBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "semi-expanded"
      },
      "Inconsolata-SemiExpanded-Bold": {
        "name": "Inconsolata Semi Expanded Bold",
        "fileName": "Inconsolata-SemiExpandedBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "semi-expanded"
      },
      "Inconsolata-SemiExpanded-Black": {
        "name": "Inconsolata Semi Expanded Black",
        "fileName": "Inconsolata-SemiExpandedBlack.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 900,
        "fontStretch": "semi-expanded"
      },
      "Inconsolata-Condensed-Thin": {
        "name": "Inconsolata Condensed Thin",
        "fileName": "Inconsolata-CondensedThin.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "condensed"
      },
      "Inconsolata-Condensed-SemiBold": {
        "name": "Inconsolata Condensed SemiBold",
        "fileName": "Inconsolata-CondensedSemiBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "condensed"
      },
      "Inconsolata-Condensed-Regular": {
        "name": "Inconsolata Condensed Regular",
        "fileName": "Inconsolata-CondensedRegular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "condensed"
      },
      "Inconsolata-Condensed-Medium": {
        "name": "Inconsolata Condensed Medium",
        "fileName": "Inconsolata-CondensedMedium.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "condensed"
      },
      "Inconsolata-Condensed-Light": {
        "name": "Inconsolata Condensed Light",
        "fileName": "Inconsolata-CondensedLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "condensed"
      },
      "Inconsolata-Condensed-ExtraLight": {
        "name": "Inconsolata Condensed ExtraLight",
        "fileName": "Inconsolata-CondensedExtraLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "condensed"
      },
      "Inconsolata-Condensed-ExtraBold": {
        "name": "Inconsolata Condensed ExtraBold",
        "fileName": "Inconsolata-CondensedExtraBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "condensed"
      },
      "Inconsolata-Condensed-Bold": {
        "name": "Inconsolata Condensed Bold",
        "fileName": "Inconsolata-CondensedBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "condensed"
      },
      "Inconsolata-Condensed-Black": {
        "name": "Inconsolata Condensed Black",
        "fileName": "Inconsolata-CondensedBlack.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 900,
        "fontStretch": "condensed"
      },
      "Inconsolata-SemiBold": {
        "name": "Inconsolata SemiBold",
        "fileName": "Inconsolata-SemiBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "normal"
      },
      "Inconsolata-Regular": {
        "name": "Inconsolata Regular",
        "fileName": "Inconsolata-Regular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "normal"
      },
      "Inconsolata-Medium": {
        "name": "Inconsolata Medium",
        "fileName": "Inconsolata-Medium.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "normal"
      },
      "Inconsolata-Light": {
        "name": "Inconsolata Light",
        "fileName": "Inconsolata-Light.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "normal"
      },
      "Inconsolata-ExtraLight": {
        "name": "Inconsolata ExtraLight",
        "fileName": "Inconsolata-ExtraLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "normal"
      },
      "Inconsolata-ExtraCondensed-Thin": {
        "name": "Inconsolata Extra Condensed Thin",
        "fileName": "Inconsolata-ExtraCondensedThin.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "extra-condensed"
      },
      "Inconsolata-ExtraCondensed-SemiBold": {
        "name": "Inconsolata Extra Condensed SemiBold",
        "fileName": "Inconsolata-ExtraCondensedSemiBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "extra-condensed"
      },
      "Inconsolata-ExtraCondensed-Regular": {
        "name": "Inconsolata Extra Condensed Regular",
        "fileName": "Inconsolata-ExtraCondensedRegular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "extra-condensed"
      },
      "Inconsolata-ExtraCondensed-Medium": {
        "name": "Inconsolata Extra Condensed Medium",
        "fileName": "Inconsolata-ExtraCondensedMedium.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "extra-condensed"
      },
      "Inconsolata-ExtraCondensed-Light": {
        "name": "Inconsolata Extra Condensed Light",
        "fileName": "Inconsolata-ExtraCondensedLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "extra-condensed"
      },
      "Inconsolata-ExtraCondensed-ExtraLight": {
        "name": "Inconsolata Extra Condensed ExtraLight",
        "fileName": "Inconsolata-ExtraCondensedExtraLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "extra-condensed"
      },
      "Inconsolata-ExtraCondensed-ExtraBold": {
        "name": "Inconsolata Extra Condensed ExtraBold",
        "fileName": "Inconsolata-ExtraCondensedExtraBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "extra-condensed"
      },
      "Inconsolata-ExtraCondensed-Bold": {
        "name": "Inconsolata Extra Condensed Bold",
        "fileName": "Inconsolata-ExtraCondensedBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "extra-condensed"
      },
      "Inconsolata-ExtraCondensed-Black": {
        "name": "Inconsolata Extra Condensed Black",
        "fileName": "Inconsolata-ExtraCondensedBlack.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 900,
        "fontStretch": "extra-condensed"
      },
      "Inconsolata-ExtraBold": {
        "name": "Inconsolata ExtraBold",
        "fileName": "Inconsolata-ExtraBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "normal"
      },
      "Inconsolata-Bold": {
        "name": "Inconsolata Bold",
        "fileName": "Inconsolata-Bold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "normal"
      },
      "Inconsolata-Black": {
        "name": "Inconsolata Black",
        "fileName": "Inconsolata-Black.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 900,
        "fontStretch": "normal"
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
        "static": "Inconsolata-400-min.woff2",
        "variable": [
          "InconsolataVF-min.ttf",
          "InconsolataVF-min.woff2"
        ]
      },
      "generatedAt": "2025-09-09T20:12:08.466Z"
    }
  }
};
