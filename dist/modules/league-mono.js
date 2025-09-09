/**
 * league-mono Font Family Module
 * 
 * Generated from font-families build system
 * License: Unknown
 * Author: Unknown
 * Version: Unknown
 */

export default {
  "name": "league-mono",
  "key": "league-mono",
  "description": "League mono monospace font family with variable font technology and 40 weights. Ideal for code and terminal use",
  "weight": {
    "range": "100-800",
    "byFormat": {
      "variable": {
        "min": 100,
        "max": 800,
        "default": 400
      },
      "static": {
        "min": 100,
        "max": 800,
        "instances": [
          100,
          200,
          300,
          400,
          500,
          600,
          700,
          800
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
        "positional": [
          "mark",
          "mkmk"
        ],
        "case": [
          "case"
        ],
        "numeric": [
          "ordn",
          "pnum",
          "tnum"
        ],
        "other": [
          "aalt",
          "ccmp",
          "locl"
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
      "hasLigatures": false,
      "hasContextualAlternates": false,
      "hasNumericalFeatures": true,
      "hasStylisticSets": true
    }
  },
  "cdnBase": {
    "variable": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.6.0/fonts/open-fonts/league-mono/fonts/variable/",
    "static": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.6.0/fonts/open-fonts/league-mono/fonts/webfonts/",
    "ttf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.6.0/fonts/open-fonts/league-mono/fonts/ttf/",
    "otf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.6.0/fonts/open-fonts/league-mono/fonts/otf/",
    "subsets": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.6.0/_subsets/league-mono/"
  },
  "faces": {
    "variable": {
      "LeagueMonoVariableRegular[wdth,wght]": {
        "name": "League Mono Variable (weight, width)",
        "fileName": "LeagueMono-VF.ttf",
        "format": "truetype",
        "fontStyle": "normal",
        "axes": {
          "wght": {
            "min": 100,
            "max": 800,
            "default": 100
          },
          "wdth": {
            "min": 50,
            "max": 200,
            "default": 50
          }
        },
        "weight": {
          "min": 100,
          "max": 800
        },
        "stretch": {
          "min": "condensed",
          "max": "expanded",
          "default": "condensed",
          "mapping": {
            "50": "condensed",
            "80": "semi-condensed",
            "115": "normal",
            "150": "extra-expanded",
            "200": "expanded"
          }
        },
        "weightRange": "100 800"
      }
    },
    "static": {
      "LeagueMono-UltraExpanded-ExtraLight": {
        "name": "League Mono Ultra Expanded ExtraLight",
        "fileName": "LeagueMono-WideUltraLight.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "ultra-expanded"
      },
      "LeagueMono-UltraExpanded-Thin": {
        "name": "League Mono Ultra Expanded Thin",
        "fileName": "LeagueMono-WideThin.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "ultra-expanded"
      },
      "LeagueMono-UltraExpanded-SemiBold": {
        "name": "League Mono Ultra Expanded SemiBold",
        "fileName": "LeagueMono-WideSemiBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "ultra-expanded"
      },
      "LeagueMono-UltraExpanded-Regular": {
        "name": "League Mono Ultra Expanded Regular",
        "fileName": "LeagueMono-WideRegular.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "ultra-expanded"
      },
      "LeagueMono-UltraExpanded-Medium": {
        "name": "League Mono Ultra Expanded Medium",
        "fileName": "LeagueMono-WideMedium.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "ultra-expanded"
      },
      "LeagueMono-UltraExpanded-Light": {
        "name": "League Mono Ultra Expanded Light",
        "fileName": "LeagueMono-WideLight.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "ultra-expanded"
      },
      "LeagueMono-UltraExpanded-ExtraBold": {
        "name": "League Mono Ultra Expanded ExtraBold",
        "fileName": "LeagueMono-WideExtraBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "ultra-expanded"
      },
      "LeagueMono-UltraExpanded-Bold": {
        "name": "League Mono Ultra Expanded Bold",
        "fileName": "LeagueMono-WideBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "ultra-expanded"
      },
      "LeagueMono-ExtraLight": {
        "name": "League Mono ExtraLight",
        "fileName": "LeagueMono-UltraLight.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "normal"
      },
      "LeagueMono-Thin": {
        "name": "League Mono Thin",
        "fileName": "LeagueMono-Thin.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "normal"
      },
      "LeagueMono-SemiBold": {
        "name": "League Mono SemiBold",
        "fileName": "LeagueMono-SemiBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "normal"
      },
      "LeagueMono-Regular": {
        "name": "League Mono Regular",
        "fileName": "LeagueMono-Regular.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "normal"
      },
      "LeagueMono-SemiCondensed-ExtraLight": {
        "name": "League Mono Semi Condensed ExtraLight",
        "fileName": "LeagueMono-NarrowUltraLight.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "semi-condensed"
      },
      "LeagueMono-SemiCondensed-Thin": {
        "name": "League Mono Semi Condensed Thin",
        "fileName": "LeagueMono-NarrowThin.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "semi-condensed"
      },
      "LeagueMono-SemiCondensed-SemiBold": {
        "name": "League Mono Semi Condensed SemiBold",
        "fileName": "LeagueMono-NarrowSemiBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "semi-condensed"
      },
      "LeagueMono-SemiCondensed-Regular": {
        "name": "League Mono Semi Condensed Regular",
        "fileName": "LeagueMono-NarrowRegular.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "semi-condensed"
      },
      "LeagueMono-SemiCondensed-Medium": {
        "name": "League Mono Semi Condensed Medium",
        "fileName": "LeagueMono-NarrowMedium.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "semi-condensed"
      },
      "LeagueMono-SemiCondensed-Light": {
        "name": "League Mono Semi Condensed Light",
        "fileName": "LeagueMono-NarrowLight.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "semi-condensed"
      },
      "LeagueMono-SemiCondensed-ExtraBold": {
        "name": "League Mono Semi Condensed ExtraBold",
        "fileName": "LeagueMono-NarrowExtraBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "semi-condensed"
      },
      "LeagueMono-SemiCondensed-Bold": {
        "name": "League Mono Semi Condensed Bold",
        "fileName": "LeagueMono-NarrowBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "semi-condensed"
      },
      "LeagueMono-Medium": {
        "name": "League Mono Medium",
        "fileName": "LeagueMono-Medium.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "normal"
      },
      "LeagueMono-Light": {
        "name": "League Mono Light",
        "fileName": "LeagueMono-Light.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "normal"
      },
      "LeagueMono-ExtraBold": {
        "name": "League Mono ExtraBold",
        "fileName": "LeagueMono-ExtraBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "normal"
      },
      "LeagueMono-Expanded-ExtraLight": {
        "name": "League Mono Expanded ExtraLight",
        "fileName": "LeagueMono-ExtendedUltraLight.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "expanded"
      },
      "LeagueMono-Expanded-Thin": {
        "name": "League Mono Expanded Thin",
        "fileName": "LeagueMono-ExtendedThin.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "expanded"
      },
      "LeagueMono-Expanded-SemiBold": {
        "name": "League Mono Expanded SemiBold",
        "fileName": "LeagueMono-ExtendedSemiBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "expanded"
      },
      "LeagueMono-Expanded-Regular": {
        "name": "League Mono Expanded Regular",
        "fileName": "LeagueMono-ExtendedRegular.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "expanded"
      },
      "LeagueMono-Expanded-Medium": {
        "name": "League Mono Expanded Medium",
        "fileName": "LeagueMono-ExtendedMedium.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "expanded"
      },
      "LeagueMono-Expanded-Light": {
        "name": "League Mono Expanded Light",
        "fileName": "LeagueMono-ExtendedLight.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "expanded"
      },
      "LeagueMono-Expanded-ExtraBold": {
        "name": "League Mono Expanded ExtraBold",
        "fileName": "LeagueMono-ExtendedExtraBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "expanded"
      },
      "LeagueMono-Expanded-Bold": {
        "name": "League Mono Expanded Bold",
        "fileName": "LeagueMono-ExtendedBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "expanded"
      },
      "LeagueMono-Condensed-ExtraLight": {
        "name": "League Mono Condensed ExtraLight",
        "fileName": "LeagueMono-CondensedUltraLight.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "condensed"
      },
      "LeagueMono-Condensed-Thin": {
        "name": "League Mono Condensed Thin",
        "fileName": "LeagueMono-CondensedThin.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "condensed"
      },
      "LeagueMono-Condensed-SemiBold": {
        "name": "League Mono Condensed SemiBold",
        "fileName": "LeagueMono-CondensedSemiBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "condensed"
      },
      "LeagueMono-Condensed-Medium": {
        "name": "League Mono Condensed Medium",
        "fileName": "LeagueMono-CondensedMedium.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "condensed"
      },
      "LeagueMono-Condensed-Light": {
        "name": "League Mono Condensed Light",
        "fileName": "LeagueMono-CondensedLight.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "condensed"
      },
      "LeagueMono-Condensed-ExtraBold": {
        "name": "League Mono Condensed ExtraBold",
        "fileName": "LeagueMono-CondensedExtraBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "condensed"
      },
      "LeagueMono-Condensed-Bold": {
        "name": "League Mono Condensed Bold",
        "fileName": "LeagueMono-CondensedBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "condensed"
      },
      "LeagueMono-Condensed-Regular": {
        "name": "League Mono Condensed Regular",
        "fileName": "LeagueMono-Condensed.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "condensed"
      },
      "LeagueMono-Bold": {
        "name": "League Mono Bold",
        "fileName": "LeagueMono-Bold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 700,
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
        "static": "LeagueMono-400-min.woff2",
        "variable": [
          "LeagueMonoVF-min.ttf",
          "LeagueMonoVF-min.woff2"
        ]
      },
      "generatedAt": "2025-09-09T20:15:11.392Z"
    }
  }
};
