/**
 * Font Families - Combined Module
 * 
 * Contains all open-licensed font families available via public CDN
 * Generated from font-families build system
 */

export default {
  "public-sans": {
    "name": "public-sans",
    "slug": "public-sans",
    "license": "OFL-1.1",
    "description": "",
    "weight": {
      "range": "100-900",
      "total": 9,
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
      },
      "coverage": {
        "variableOnly": [],
        "staticOnly": [],
        "both": [
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
    },
    "usage": {
      "variable": {
        "bestFor": "Dynamic weight adjustment, animations, responsive design",
        "weightRange": "100-900"
      },
      "static": {
        "bestFor": "Maximum weight variety, extreme weights, fallback support",
        "weightRange": "100-900"
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
        "VariableRegular[wght]": {
          "name": "Public-sans Variable - weight axis",
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
          "stretch": "normal",
          "weightRange": "100 900"
        },
        "VariableItalic[wght]": {
          "name": "Public-sans Variable - weight axis",
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
          "stretch": "normal",
          "weightRange": "100 900"
        }
      },
      "static": {
        "PublicSans-ThinItalic": {
          "name": "Public-sans Italic Italic",
          "fileName": "PublicSans-ThinItalic.woff",
          "format": "woff",
          "fontStyle": "italic",
          "fontWeight": 100,
          "fontStretch": "normal"
        },
        "PublicSans-Thin": {
          "name": "Public-sans 100",
          "fileName": "PublicSans-Thin.woff",
          "format": "woff",
          "fontStyle": "normal",
          "fontWeight": 100,
          "fontStretch": "normal"
        },
        "PublicSans-SemiBoldItalic": {
          "name": "Public-sans Italic Italic",
          "fileName": "PublicSans-SemiBoldItalic.woff",
          "format": "woff",
          "fontStyle": "italic",
          "fontWeight": 600,
          "fontStretch": "normal"
        },
        "PublicSans-SemiBold": {
          "name": "Public-sans 600",
          "fileName": "PublicSans-SemiBold.woff",
          "format": "woff",
          "fontStyle": "normal",
          "fontWeight": 600,
          "fontStretch": "normal"
        },
        "PublicSans-Regular": {
          "name": "Public-sans Regular",
          "fileName": "PublicSans-Regular.woff",
          "format": "woff",
          "fontStyle": "normal",
          "fontWeight": 400,
          "fontStretch": "normal"
        },
        "PublicSans-MediumItalic": {
          "name": "Public-sans Italic Italic",
          "fileName": "PublicSans-MediumItalic.woff",
          "format": "woff",
          "fontStyle": "italic",
          "fontWeight": 500,
          "fontStretch": "normal"
        },
        "PublicSans-Medium": {
          "name": "Public-sans 500",
          "fileName": "PublicSans-Medium.woff",
          "format": "woff",
          "fontStyle": "normal",
          "fontWeight": 500,
          "fontStretch": "normal"
        },
        "PublicSans-LightItalic": {
          "name": "Public-sans Italic Italic",
          "fileName": "PublicSans-LightItalic.woff",
          "format": "woff",
          "fontStyle": "italic",
          "fontWeight": 300,
          "fontStretch": "normal"
        },
        "PublicSans-Light": {
          "name": "Public-sans 300",
          "fileName": "PublicSans-Light.woff",
          "format": "woff",
          "fontStyle": "normal",
          "fontWeight": 300,
          "fontStretch": "normal"
        },
        "PublicSans-Italic": {
          "name": "Public-sans Italic Italic",
          "fileName": "PublicSans-Italic.woff",
          "format": "woff",
          "fontStyle": "italic",
          "fontWeight": 400,
          "fontStretch": "normal"
        },
        "PublicSans-ExtraLightItalic": {
          "name": "Public-sans Italic Italic",
          "fileName": "PublicSans-ExtraLightItalic.woff",
          "format": "woff",
          "fontStyle": "italic",
          "fontWeight": 200,
          "fontStretch": "normal"
        },
        "PublicSans-ExtraLight": {
          "name": "Public-sans 200",
          "fileName": "PublicSans-ExtraLight.woff",
          "format": "woff",
          "fontStyle": "normal",
          "fontWeight": 200,
          "fontStretch": "normal"
        },
        "PublicSans-ExtraBoldItalic": {
          "name": "Public-sans Italic Italic",
          "fileName": "PublicSans-ExtraBoldItalic.woff",
          "format": "woff",
          "fontStyle": "italic",
          "fontWeight": 800,
          "fontStretch": "normal"
        },
        "PublicSans-ExtraBold": {
          "name": "Public-sans 800",
          "fileName": "PublicSans-ExtraBold.woff",
          "format": "woff",
          "fontStyle": "normal",
          "fontWeight": 800,
          "fontStretch": "normal"
        },
        "PublicSans-BoldItalic": {
          "name": "Public-sans Bold Italic Italic",
          "fileName": "PublicSans-BoldItalic.woff",
          "format": "woff",
          "fontStyle": "italic",
          "fontWeight": 700,
          "fontStretch": "normal"
        },
        "PublicSans-Bold": {
          "name": "Public-sans Bold",
          "fileName": "PublicSans-Bold.woff",
          "format": "woff",
          "fontStyle": "normal",
          "fontWeight": 700,
          "fontStretch": "normal"
        },
        "PublicSans-BlackItalic": {
          "name": "Public-sans Italic Italic",
          "fileName": "PublicSans-BlackItalic.woff",
          "format": "woff",
          "fontStyle": "italic",
          "fontWeight": 900,
          "fontStretch": "normal"
        },
        "PublicSans-Black": {
          "name": "Public-sans 900",
          "fileName": "PublicSans-Black.woff",
          "format": "woff",
          "fontStyle": "normal",
          "fontWeight": 900,
          "fontStretch": "normal"
        }
      }
    }
  },
  "league-mono": {
    "name": "league-mono",
    "slug": "league-mono",
    "weight": {
      "range": "100-800",
      "total": 8,
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
      },
      "coverage": {
        "variableOnly": [],
        "staticOnly": [],
        "both": [
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
    },
    "usage": {
      "variable": {
        "bestFor": "Dynamic weight adjustment, animations, responsive design",
        "weightRange": "100-800"
      },
      "static": {
        "bestFor": "Maximum weight variety, extreme weights, fallback support",
        "weightRange": "100-800"
      }
    },
    "cdnBase": {
      "variable": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/league-mono/fonts/variable/",
      "static": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/league-mono/fonts/webfonts/",
      "ttf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/league-mono/fonts/ttf/",
      "otf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/league-mono/fonts/otf/",
      "subsets": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/_subsets/league-mono/"
    },
    "faces": {
      "variable": {
        "VariableRegular[wdth,wght]": {
          "name": "League-mono Variable - weight axis, width axis",
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
        "LeagueMono-WideUltraLight": {
          "name": "League-mono 200",
          "fileName": "LeagueMono-WideUltraLight.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 200,
          "fontStretch": "ultra-expanded"
        },
        "LeagueMono-WideThin": {
          "name": "League-mono 100",
          "fileName": "LeagueMono-WideThin.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 100,
          "fontStretch": "ultra-expanded"
        },
        "LeagueMono-WideSemiBold": {
          "name": "League-mono 600",
          "fileName": "LeagueMono-WideSemiBold.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 600,
          "fontStretch": "ultra-expanded"
        },
        "LeagueMono-WideRegular": {
          "name": "League-mono Regular",
          "fileName": "LeagueMono-WideRegular.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 400,
          "fontStretch": "ultra-expanded"
        },
        "LeagueMono-WideMedium": {
          "name": "League-mono 500",
          "fileName": "LeagueMono-WideMedium.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 500,
          "fontStretch": "ultra-expanded"
        },
        "LeagueMono-WideLight": {
          "name": "League-mono 300",
          "fileName": "LeagueMono-WideLight.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 300,
          "fontStretch": "ultra-expanded"
        },
        "LeagueMono-WideExtraBold": {
          "name": "League-mono 800",
          "fileName": "LeagueMono-WideExtraBold.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 800,
          "fontStretch": "ultra-expanded"
        },
        "LeagueMono-WideBold": {
          "name": "League-mono Bold",
          "fileName": "LeagueMono-WideBold.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 700,
          "fontStretch": "ultra-expanded"
        },
        "LeagueMono-UltraLight": {
          "name": "League-mono 200",
          "fileName": "LeagueMono-UltraLight.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 200,
          "fontStretch": "normal"
        },
        "LeagueMono-Thin": {
          "name": "League-mono 100",
          "fileName": "LeagueMono-Thin.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 100,
          "fontStretch": "normal"
        },
        "LeagueMono-SemiBold": {
          "name": "League-mono 600",
          "fileName": "LeagueMono-SemiBold.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 600,
          "fontStretch": "normal"
        },
        "LeagueMono-Regular": {
          "name": "League-mono Regular",
          "fileName": "LeagueMono-Regular.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 400,
          "fontStretch": "normal"
        },
        "LeagueMono-NarrowUltraLight": {
          "name": "League-mono 200",
          "fileName": "LeagueMono-NarrowUltraLight.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 200,
          "fontStretch": "semi-condensed"
        },
        "LeagueMono-NarrowThin": {
          "name": "League-mono 100",
          "fileName": "LeagueMono-NarrowThin.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 100,
          "fontStretch": "semi-condensed"
        },
        "LeagueMono-NarrowSemiBold": {
          "name": "League-mono 600",
          "fileName": "LeagueMono-NarrowSemiBold.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 600,
          "fontStretch": "semi-condensed"
        },
        "LeagueMono-NarrowRegular": {
          "name": "League-mono Regular",
          "fileName": "LeagueMono-NarrowRegular.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 400,
          "fontStretch": "semi-condensed"
        },
        "LeagueMono-NarrowMedium": {
          "name": "League-mono 500",
          "fileName": "LeagueMono-NarrowMedium.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 500,
          "fontStretch": "semi-condensed"
        },
        "LeagueMono-NarrowLight": {
          "name": "League-mono 300",
          "fileName": "LeagueMono-NarrowLight.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 300,
          "fontStretch": "semi-condensed"
        },
        "LeagueMono-NarrowExtraBold": {
          "name": "League-mono 800",
          "fileName": "LeagueMono-NarrowExtraBold.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 800,
          "fontStretch": "semi-condensed"
        },
        "LeagueMono-NarrowBold": {
          "name": "League-mono Bold",
          "fileName": "LeagueMono-NarrowBold.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 700,
          "fontStretch": "semi-condensed"
        },
        "LeagueMono-Medium": {
          "name": "League-mono 500",
          "fileName": "LeagueMono-Medium.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 500,
          "fontStretch": "normal"
        },
        "LeagueMono-Light": {
          "name": "League-mono 300",
          "fileName": "LeagueMono-Light.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 300,
          "fontStretch": "normal"
        },
        "LeagueMono-ExtraBold": {
          "name": "League-mono 800",
          "fileName": "LeagueMono-ExtraBold.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 800,
          "fontStretch": "normal"
        },
        "LeagueMono-ExtendedUltraLight": {
          "name": "League-mono 200",
          "fileName": "LeagueMono-ExtendedUltraLight.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 200,
          "fontStretch": "expanded"
        },
        "LeagueMono-ExtendedThin": {
          "name": "League-mono 100",
          "fileName": "LeagueMono-ExtendedThin.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 100,
          "fontStretch": "expanded"
        },
        "LeagueMono-ExtendedSemiBold": {
          "name": "League-mono 600",
          "fileName": "LeagueMono-ExtendedSemiBold.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 600,
          "fontStretch": "expanded"
        },
        "LeagueMono-ExtendedRegular": {
          "name": "League-mono Regular",
          "fileName": "LeagueMono-ExtendedRegular.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 400,
          "fontStretch": "expanded"
        },
        "LeagueMono-ExtendedMedium": {
          "name": "League-mono 500",
          "fileName": "LeagueMono-ExtendedMedium.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 500,
          "fontStretch": "expanded"
        },
        "LeagueMono-ExtendedLight": {
          "name": "League-mono 300",
          "fileName": "LeagueMono-ExtendedLight.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 300,
          "fontStretch": "expanded"
        },
        "LeagueMono-ExtendedExtraBold": {
          "name": "League-mono 800",
          "fileName": "LeagueMono-ExtendedExtraBold.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 800,
          "fontStretch": "expanded"
        },
        "LeagueMono-ExtendedBold": {
          "name": "League-mono Bold",
          "fileName": "LeagueMono-ExtendedBold.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 700,
          "fontStretch": "expanded"
        },
        "LeagueMono-CondensedUltraLight": {
          "name": "League-mono 200",
          "fileName": "LeagueMono-CondensedUltraLight.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 200,
          "fontStretch": "condensed"
        },
        "LeagueMono-CondensedThin": {
          "name": "League-mono 100",
          "fileName": "LeagueMono-CondensedThin.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 100,
          "fontStretch": "condensed"
        },
        "LeagueMono-CondensedSemiBold": {
          "name": "League-mono 600",
          "fileName": "LeagueMono-CondensedSemiBold.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 600,
          "fontStretch": "condensed"
        },
        "LeagueMono-CondensedMedium": {
          "name": "League-mono 500",
          "fileName": "LeagueMono-CondensedMedium.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 500,
          "fontStretch": "condensed"
        },
        "LeagueMono-CondensedLight": {
          "name": "League-mono 300",
          "fileName": "LeagueMono-CondensedLight.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 300,
          "fontStretch": "condensed"
        },
        "LeagueMono-CondensedExtraBold": {
          "name": "League-mono 800",
          "fileName": "LeagueMono-CondensedExtraBold.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 800,
          "fontStretch": "condensed"
        },
        "LeagueMono-CondensedBold": {
          "name": "League-mono Bold",
          "fileName": "LeagueMono-CondensedBold.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 700,
          "fontStretch": "condensed"
        },
        "LeagueMono-Condensed": {
          "name": "League-mono Regular",
          "fileName": "LeagueMono-Condensed.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 400,
          "fontStretch": "condensed"
        },
        "LeagueMono-Bold": {
          "name": "League-mono Bold",
          "fileName": "LeagueMono-Bold.otf",
          "format": "opentype",
          "fontStyle": "normal",
          "fontWeight": 700,
          "fontStretch": "normal"
        }
      }
    }
  },
  "inconsolata": {
    "name": "inconsolata",
    "slug": "inconsolata",
    "license": "OFL-1.1",
    "description": "",
    "weight": {
      "range": "100-900",
      "total": 9,
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
      },
      "coverage": {
        "variableOnly": [],
        "staticOnly": [],
        "both": [
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
    },
    "usage": {
      "variable": {
        "bestFor": "Dynamic weight adjustment, animations, responsive design",
        "weightRange": "100-900"
      },
      "static": {
        "bestFor": "Maximum weight variety, extreme weights, fallback support",
        "weightRange": "100-900"
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
        "VariableRegular[wdth,wght]": {
          "name": "Inconsolata Variable - weight axis, width axis",
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
        "InconsolataUltraExpanded-Thin": {
          "name": "Inconsolata 100",
          "fileName": "Inconsolata-UltraExpandedThin.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 100,
          "fontStretch": "expanded"
        },
        "InconsolataUltraExpanded-SemiBold": {
          "name": "Inconsolata 600",
          "fileName": "Inconsolata-UltraExpandedSemiBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 600,
          "fontStretch": "expanded"
        },
        "InconsolataUltraExpanded-Regular": {
          "name": "Inconsolata Regular",
          "fileName": "Inconsolata-UltraExpandedRegular.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 400,
          "fontStretch": "expanded"
        },
        "InconsolataUltraExpanded-Medium": {
          "name": "Inconsolata 500",
          "fileName": "Inconsolata-UltraExpandedMedium.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 500,
          "fontStretch": "expanded"
        },
        "InconsolataUltraExpanded-Light": {
          "name": "Inconsolata 300",
          "fileName": "Inconsolata-UltraExpandedLight.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 300,
          "fontStretch": "expanded"
        },
        "InconsolataUltraExpanded-ExtraLight": {
          "name": "Inconsolata 200",
          "fileName": "Inconsolata-UltraExpandedExtraLight.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 200,
          "fontStretch": "expanded"
        },
        "InconsolataUltraExpanded-ExtraBold": {
          "name": "Inconsolata 800",
          "fileName": "Inconsolata-UltraExpandedExtraBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 800,
          "fontStretch": "expanded"
        },
        "InconsolataUltraExpanded-Bold": {
          "name": "Inconsolata Bold",
          "fileName": "Inconsolata-UltraExpandedBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 700,
          "fontStretch": "expanded"
        },
        "InconsolataUltraExpanded-Black": {
          "name": "Inconsolata 900",
          "fileName": "Inconsolata-UltraExpandedBlack.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 900,
          "fontStretch": "expanded"
        },
        "InconsolataUltraCondensed-Thin": {
          "name": "Inconsolata 100",
          "fileName": "Inconsolata-UltraCondensedThin.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 100,
          "fontStretch": "ultra-condensed"
        },
        "InconsolataUltraCondensed-SemiBold": {
          "name": "Inconsolata 600",
          "fileName": "Inconsolata-UltraCondensedSemiBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 600,
          "fontStretch": "ultra-condensed"
        },
        "InconsolataUltraCondensed-Regular": {
          "name": "Inconsolata Regular",
          "fileName": "Inconsolata-UltraCondensedRegular.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 400,
          "fontStretch": "ultra-condensed"
        },
        "InconsolataUltraCondensed-Medium": {
          "name": "Inconsolata 500",
          "fileName": "Inconsolata-UltraCondensedMedium.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 500,
          "fontStretch": "ultra-condensed"
        },
        "InconsolataUltraCondensed-Light": {
          "name": "Inconsolata 300",
          "fileName": "Inconsolata-UltraCondensedLight.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 300,
          "fontStretch": "ultra-condensed"
        },
        "InconsolataUltraCondensed-ExtraLight": {
          "name": "Inconsolata 200",
          "fileName": "Inconsolata-UltraCondensedExtraLight.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 200,
          "fontStretch": "ultra-condensed"
        },
        "InconsolataUltraCondensed-ExtraBold": {
          "name": "Inconsolata 800",
          "fileName": "Inconsolata-UltraCondensedExtraBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 800,
          "fontStretch": "ultra-condensed"
        },
        "InconsolataUltraCondensed-Bold": {
          "name": "Inconsolata Bold",
          "fileName": "Inconsolata-UltraCondensedBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 700,
          "fontStretch": "ultra-condensed"
        },
        "InconsolataUltraCondensed-Black": {
          "name": "Inconsolata 900",
          "fileName": "Inconsolata-UltraCondensedBlack.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 900,
          "fontStretch": "ultra-condensed"
        },
        "Inconsolata-Thin": {
          "name": "Inconsolata 100",
          "fileName": "Inconsolata-Thin.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 100,
          "fontStretch": "normal"
        },
        "InconsolataSemiExpanded-Thin": {
          "name": "Inconsolata 100",
          "fileName": "Inconsolata-SemiExpandedThin.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 100,
          "fontStretch": "semi-expanded"
        },
        "InconsolataSemiExpanded-SemiBold": {
          "name": "Inconsolata 600",
          "fileName": "Inconsolata-SemiExpandedSemiBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 600,
          "fontStretch": "semi-expanded"
        },
        "InconsolataSemiExpanded-Regular": {
          "name": "Inconsolata Regular",
          "fileName": "Inconsolata-SemiExpandedRegular.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 400,
          "fontStretch": "semi-expanded"
        },
        "InconsolataSemiExpanded-Medium": {
          "name": "Inconsolata 500",
          "fileName": "Inconsolata-SemiExpandedMedium.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 500,
          "fontStretch": "semi-expanded"
        },
        "InconsolataSemiExpanded-Light": {
          "name": "Inconsolata 300",
          "fileName": "Inconsolata-SemiExpandedLight.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 300,
          "fontStretch": "semi-expanded"
        },
        "InconsolataSemiExpanded-ExtraLight": {
          "name": "Inconsolata 200",
          "fileName": "Inconsolata-SemiExpandedExtraLight.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 200,
          "fontStretch": "semi-expanded"
        },
        "InconsolataSemiExpanded-ExtraBold": {
          "name": "Inconsolata 800",
          "fileName": "Inconsolata-SemiExpandedExtraBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 800,
          "fontStretch": "semi-expanded"
        },
        "InconsolataSemiExpanded-Bold": {
          "name": "Inconsolata Bold",
          "fileName": "Inconsolata-SemiExpandedBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 700,
          "fontStretch": "semi-expanded"
        },
        "InconsolataSemiExpanded-Black": {
          "name": "Inconsolata 900",
          "fileName": "Inconsolata-SemiExpandedBlack.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 900,
          "fontStretch": "semi-expanded"
        },
        "InconsolataSemiCondensed-Thin": {
          "name": "Inconsolata 100",
          "fileName": "Inconsolata-SemiCondensedThin.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 100,
          "fontStretch": "condensed"
        },
        "InconsolataSemiCondensed-SemiBold": {
          "name": "Inconsolata 600",
          "fileName": "Inconsolata-SemiCondensedSemiBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 600,
          "fontStretch": "condensed"
        },
        "InconsolataSemiCondensed-Regular": {
          "name": "Inconsolata Regular",
          "fileName": "Inconsolata-SemiCondensedRegular.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 400,
          "fontStretch": "condensed"
        },
        "InconsolataSemiCondensed-Medium": {
          "name": "Inconsolata 500",
          "fileName": "Inconsolata-SemiCondensedMedium.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 500,
          "fontStretch": "condensed"
        },
        "InconsolataSemiCondensed-Light": {
          "name": "Inconsolata 300",
          "fileName": "Inconsolata-SemiCondensedLight.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 300,
          "fontStretch": "condensed"
        },
        "InconsolataSemiCondensed-ExtraLight": {
          "name": "Inconsolata 200",
          "fileName": "Inconsolata-SemiCondensedExtraLight.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 200,
          "fontStretch": "condensed"
        },
        "InconsolataSemiCondensed-ExtraBold": {
          "name": "Inconsolata 800",
          "fileName": "Inconsolata-SemiCondensedExtraBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 800,
          "fontStretch": "condensed"
        },
        "InconsolataSemiCondensed-Bold": {
          "name": "Inconsolata Bold",
          "fileName": "Inconsolata-SemiCondensedBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 700,
          "fontStretch": "condensed"
        },
        "InconsolataSemiCondensed-Black": {
          "name": "Inconsolata 900",
          "fileName": "Inconsolata-SemiCondensedBlack.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 900,
          "fontStretch": "condensed"
        },
        "Inconsolata-SemiBold": {
          "name": "Inconsolata 600",
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
          "name": "Inconsolata 500",
          "fileName": "Inconsolata-Medium.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 500,
          "fontStretch": "normal"
        },
        "Inconsolata-Light": {
          "name": "Inconsolata 300",
          "fileName": "Inconsolata-Light.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 300,
          "fontStretch": "normal"
        },
        "Inconsolata-ExtraLight": {
          "name": "Inconsolata 200",
          "fileName": "Inconsolata-ExtraLight.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 200,
          "fontStretch": "normal"
        },
        "InconsolataExtraExpanded-Thin": {
          "name": "Inconsolata 100",
          "fileName": "Inconsolata-ExtraExpandedThin.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 100,
          "fontStretch": "expanded"
        },
        "InconsolataExtraExpanded-SemiBold": {
          "name": "Inconsolata 600",
          "fileName": "Inconsolata-ExtraExpandedSemiBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 600,
          "fontStretch": "expanded"
        },
        "InconsolataExtraExpanded-Regular": {
          "name": "Inconsolata Regular",
          "fileName": "Inconsolata-ExtraExpandedRegular.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 400,
          "fontStretch": "expanded"
        },
        "InconsolataExtraExpanded-Medium": {
          "name": "Inconsolata 500",
          "fileName": "Inconsolata-ExtraExpandedMedium.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 500,
          "fontStretch": "expanded"
        },
        "InconsolataExtraExpanded-Light": {
          "name": "Inconsolata 300",
          "fileName": "Inconsolata-ExtraExpandedLight.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 300,
          "fontStretch": "expanded"
        },
        "InconsolataExtraExpanded-ExtraLight": {
          "name": "Inconsolata 200",
          "fileName": "Inconsolata-ExtraExpandedExtraLight.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 200,
          "fontStretch": "expanded"
        },
        "InconsolataExtraExpanded-ExtraBold": {
          "name": "Inconsolata 800",
          "fileName": "Inconsolata-ExtraExpandedExtraBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 800,
          "fontStretch": "expanded"
        },
        "InconsolataExtraExpanded-Bold": {
          "name": "Inconsolata Bold",
          "fileName": "Inconsolata-ExtraExpandedBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 700,
          "fontStretch": "expanded"
        },
        "InconsolataExtraExpanded-Black": {
          "name": "Inconsolata 900",
          "fileName": "Inconsolata-ExtraExpandedBlack.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 900,
          "fontStretch": "expanded"
        },
        "InconsolataExtraCondensed-Thin": {
          "name": "Inconsolata 100",
          "fileName": "Inconsolata-ExtraCondensedThin.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 100,
          "fontStretch": "extra-condensed"
        },
        "InconsolataExtraCondensed-SemiBold": {
          "name": "Inconsolata 600",
          "fileName": "Inconsolata-ExtraCondensedSemiBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 600,
          "fontStretch": "extra-condensed"
        },
        "InconsolataExtraCondensed-Regular": {
          "name": "Inconsolata Regular",
          "fileName": "Inconsolata-ExtraCondensedRegular.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 400,
          "fontStretch": "extra-condensed"
        },
        "InconsolataExtraCondensed-Medium": {
          "name": "Inconsolata 500",
          "fileName": "Inconsolata-ExtraCondensedMedium.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 500,
          "fontStretch": "extra-condensed"
        },
        "InconsolataExtraCondensed-Light": {
          "name": "Inconsolata 300",
          "fileName": "Inconsolata-ExtraCondensedLight.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 300,
          "fontStretch": "extra-condensed"
        },
        "InconsolataExtraCondensed-ExtraLight": {
          "name": "Inconsolata 200",
          "fileName": "Inconsolata-ExtraCondensedExtraLight.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 200,
          "fontStretch": "extra-condensed"
        },
        "InconsolataExtraCondensed-ExtraBold": {
          "name": "Inconsolata 800",
          "fileName": "Inconsolata-ExtraCondensedExtraBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 800,
          "fontStretch": "extra-condensed"
        },
        "InconsolataExtraCondensed-Bold": {
          "name": "Inconsolata Bold",
          "fileName": "Inconsolata-ExtraCondensedBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 700,
          "fontStretch": "extra-condensed"
        },
        "InconsolataExtraCondensed-Black": {
          "name": "Inconsolata 900",
          "fileName": "Inconsolata-ExtraCondensedBlack.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 900,
          "fontStretch": "extra-condensed"
        },
        "Inconsolata-ExtraBold": {
          "name": "Inconsolata 800",
          "fileName": "Inconsolata-ExtraBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 800,
          "fontStretch": "normal"
        },
        "InconsolataExpanded-Thin": {
          "name": "Inconsolata 100",
          "fileName": "Inconsolata-ExpandedThin.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 100,
          "fontStretch": "expanded"
        },
        "InconsolataExpanded-SemiBold": {
          "name": "Inconsolata 600",
          "fileName": "Inconsolata-ExpandedSemiBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 600,
          "fontStretch": "expanded"
        },
        "InconsolataExpanded-Regular": {
          "name": "Inconsolata Regular",
          "fileName": "Inconsolata-ExpandedRegular.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 400,
          "fontStretch": "expanded"
        },
        "InconsolataExpanded-Medium": {
          "name": "Inconsolata 500",
          "fileName": "Inconsolata-ExpandedMedium.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 500,
          "fontStretch": "expanded"
        },
        "InconsolataExpanded-Light": {
          "name": "Inconsolata 300",
          "fileName": "Inconsolata-ExpandedLight.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 300,
          "fontStretch": "expanded"
        },
        "InconsolataExpanded-ExtraLight": {
          "name": "Inconsolata 200",
          "fileName": "Inconsolata-ExpandedExtraLight.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 200,
          "fontStretch": "expanded"
        },
        "InconsolataExpanded-ExtraBold": {
          "name": "Inconsolata 800",
          "fileName": "Inconsolata-ExpandedExtraBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 800,
          "fontStretch": "expanded"
        },
        "InconsolataExpanded-Bold": {
          "name": "Inconsolata Bold",
          "fileName": "Inconsolata-ExpandedBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 700,
          "fontStretch": "expanded"
        },
        "InconsolataExpanded-Black": {
          "name": "Inconsolata 900",
          "fileName": "Inconsolata-ExpandedBlack.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 900,
          "fontStretch": "expanded"
        },
        "InconsolataCondensed-Thin": {
          "name": "Inconsolata 100",
          "fileName": "Inconsolata-CondensedThin.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 100,
          "fontStretch": "condensed"
        },
        "InconsolataCondensed-SemiBold": {
          "name": "Inconsolata 600",
          "fileName": "Inconsolata-CondensedSemiBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 600,
          "fontStretch": "condensed"
        },
        "InconsolataCondensed-Regular": {
          "name": "Inconsolata Regular",
          "fileName": "Inconsolata-CondensedRegular.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 400,
          "fontStretch": "condensed"
        },
        "InconsolataCondensed-Medium": {
          "name": "Inconsolata 500",
          "fileName": "Inconsolata-CondensedMedium.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 500,
          "fontStretch": "condensed"
        },
        "InconsolataCondensed-Light": {
          "name": "Inconsolata 300",
          "fileName": "Inconsolata-CondensedLight.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 300,
          "fontStretch": "condensed"
        },
        "InconsolataCondensed-ExtraLight": {
          "name": "Inconsolata 200",
          "fileName": "Inconsolata-CondensedExtraLight.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 200,
          "fontStretch": "condensed"
        },
        "InconsolataCondensed-ExtraBold": {
          "name": "Inconsolata 800",
          "fileName": "Inconsolata-CondensedExtraBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 800,
          "fontStretch": "condensed"
        },
        "InconsolataCondensed-Bold": {
          "name": "Inconsolata Bold",
          "fileName": "Inconsolata-CondensedBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 700,
          "fontStretch": "condensed"
        },
        "InconsolataCondensed-Black": {
          "name": "Inconsolata 900",
          "fileName": "Inconsolata-CondensedBlack.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 900,
          "fontStretch": "condensed"
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
          "name": "Inconsolata 900",
          "fileName": "Inconsolata-Black.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 900,
          "fontStretch": "normal"
        }
      }
    }
  },
  "ibm": {
    "name": "ibm",
    "slug": "ibm",
    "version": "1.1.0",
    "license": "OFL-1.1",
    "description": "",
    "weight": {
      "range": "Unknown",
      "total": 0,
      "byFormat": {
        "variable": null,
        "static": null
      },
      "coverage": {
        "variableOnly": [],
        "staticOnly": [],
        "both": []
      }
    },
    "usage": null,
    "cdnBase": {
      "variable": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/ibm/fonts/variable/",
      "static": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/ibm/fonts/webfonts/",
      "ttf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/ibm/fonts/ttf/",
      "otf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/ibm/fonts/otf/",
      "subsets": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/_subsets/ibm/"
    },
    "faces": {
      "variable": {},
      "static": {}
    }
  },
  "crimson-pro": {
    "name": "crimson-pro",
    "slug": "crimson-pro",
    "license": "OFL-1.1",
    "description": "",
    "weight": {
      "range": "200-900",
      "total": 8,
      "byFormat": {
        "variable": {
          "min": 200,
          "max": 900,
          "default": 400
        },
        "static": {
          "min": 200,
          "max": 900,
          "instances": [
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
      },
      "coverage": {
        "variableOnly": [],
        "staticOnly": [],
        "both": [
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
    },
    "usage": {
      "variable": {
        "bestFor": "Dynamic weight adjustment, animations, responsive design",
        "weightRange": "200-900"
      },
      "static": {
        "bestFor": "Maximum weight variety, extreme weights, fallback support",
        "weightRange": "200-900"
      }
    },
    "cdnBase": {
      "variable": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/crimson-pro/fonts/variable/",
      "static": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/crimson-pro/fonts/webfonts/",
      "ttf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/crimson-pro/fonts/ttf/",
      "otf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/crimson-pro/fonts/otf/",
      "subsets": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/_subsets/crimson-pro/"
    },
    "faces": {
      "variable": {
        "VariableRegular[wght]": {
          "name": "Crimson-pro Variable - weight axis",
          "fileName": "CrimsonPro[wght].ttf",
          "format": "truetype",
          "fontStyle": "normal",
          "axes": {
            "wght": {
              "min": 200,
              "max": 900,
              "default": 400
            }
          },
          "weight": {
            "min": 200,
            "max": 900
          },
          "stretch": "normal",
          "weightRange": "200 900"
        },
        "VariableItalic[wght]": {
          "name": "Crimson-pro Variable - weight axis",
          "fileName": "CrimsonPro-Italic[wght].ttf",
          "format": "truetype",
          "fontStyle": "italic",
          "axes": {
            "wght": {
              "min": 200,
              "max": 900,
              "default": 400
            }
          },
          "weight": {
            "min": 200,
            "max": 900
          },
          "stretch": "normal",
          "weightRange": "200 900"
        }
      },
      "static": {
        "CrimsonPro-SemiBoldItalic": {
          "name": "Crimson-pro Italic Italic",
          "fileName": "CrimsonPro-SemiBoldItalic.woff2",
          "format": "woff2",
          "fontStyle": "italic",
          "fontWeight": 600,
          "fontStretch": "normal"
        },
        "CrimsonPro-SemiBold": {
          "name": "Crimson-pro 600",
          "fileName": "CrimsonPro-SemiBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 600,
          "fontStretch": "normal"
        },
        "CrimsonPro-Regular": {
          "name": "Crimson-pro Regular",
          "fileName": "CrimsonPro-Regular.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 400,
          "fontStretch": "normal"
        },
        "CrimsonPro-MediumItalic": {
          "name": "Crimson-pro Italic Italic",
          "fileName": "CrimsonPro-MediumItalic.woff2",
          "format": "woff2",
          "fontStyle": "italic",
          "fontWeight": 500,
          "fontStretch": "normal"
        },
        "CrimsonPro-Medium": {
          "name": "Crimson-pro 500",
          "fileName": "CrimsonPro-Medium.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 500,
          "fontStretch": "normal"
        },
        "CrimsonPro-LightItalic": {
          "name": "Crimson-pro Italic Italic",
          "fileName": "CrimsonPro-LightItalic.woff2",
          "format": "woff2",
          "fontStyle": "italic",
          "fontWeight": 300,
          "fontStretch": "normal"
        },
        "CrimsonPro-Light": {
          "name": "Crimson-pro 300",
          "fileName": "CrimsonPro-Light.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 300,
          "fontStretch": "normal"
        },
        "CrimsonPro-Italic": {
          "name": "Crimson-pro Italic Italic",
          "fileName": "CrimsonPro-Italic.woff2",
          "format": "woff2",
          "fontStyle": "italic",
          "fontWeight": 400,
          "fontStretch": "normal"
        },
        "CrimsonPro-ExtraLightItalic": {
          "name": "Crimson-pro Italic Italic",
          "fileName": "CrimsonPro-ExtraLightItalic.woff2",
          "format": "woff2",
          "fontStyle": "italic",
          "fontWeight": 200,
          "fontStretch": "normal"
        },
        "CrimsonPro-ExtraLight": {
          "name": "Crimson-pro 200",
          "fileName": "CrimsonPro-ExtraLight.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 200,
          "fontStretch": "normal"
        },
        "CrimsonPro-ExtraBoldItalic": {
          "name": "Crimson-pro Italic Italic",
          "fileName": "CrimsonPro-ExtraBoldItalic.woff2",
          "format": "woff2",
          "fontStyle": "italic",
          "fontWeight": 800,
          "fontStretch": "normal"
        },
        "CrimsonPro-ExtraBold": {
          "name": "Crimson-pro 800",
          "fileName": "CrimsonPro-ExtraBold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 800,
          "fontStretch": "normal"
        },
        "CrimsonPro-BoldItalic": {
          "name": "Crimson-pro Bold Italic Italic",
          "fileName": "CrimsonPro-BoldItalic.woff2",
          "format": "woff2",
          "fontStyle": "italic",
          "fontWeight": 700,
          "fontStretch": "normal"
        },
        "CrimsonPro-Bold": {
          "name": "Crimson-pro Bold",
          "fileName": "CrimsonPro-Bold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 700,
          "fontStretch": "normal"
        },
        "CrimsonPro-BlackItalic": {
          "name": "Crimson-pro Italic Italic",
          "fileName": "CrimsonPro-BlackItalic.woff2",
          "format": "woff2",
          "fontStyle": "italic",
          "fontWeight": 900,
          "fontStretch": "normal"
        },
        "CrimsonPro-Black": {
          "name": "Crimson-pro 900",
          "fileName": "CrimsonPro-Black.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 900,
          "fontStretch": "normal"
        }
      }
    }
  },
  "atkinson-hyperlegible": {
    "name": "atkinson-hyperlegible",
    "slug": "atkinson-hyperlegible",
    "version": "1.0.0",
    "author": "Braille Institute of America",
    "license": "OFL-1.1",
    "description": "",
    "weight": {
      "range": "400-700",
      "total": 2,
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
      },
      "coverage": {
        "variableOnly": [],
        "staticOnly": [
          400,
          700
        ],
        "both": []
      }
    },
    "usage": {
      "static": {
        "bestFor": "Maximum weight variety, extreme weights, fallback support",
        "weightRange": "400-700"
      }
    },
    "cdnBase": {
      "variable": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/atkinson-hyperlegible/fonts/variable/",
      "static": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/atkinson-hyperlegible/fonts/webfonts/",
      "ttf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/atkinson-hyperlegible/fonts/ttf/",
      "otf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/atkinson-hyperlegible/fonts/otf/",
      "subsets": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/_subsets/atkinson-hyperlegible/"
    },
    "faces": {
      "variable": {},
      "static": {
        "AtkinsonHyperlegible-Regular": {
          "name": "Atkinson-hyperlegible Regular",
          "fileName": "AtkinsonHyperlegible-Regular.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 400,
          "fontStretch": "normal"
        },
        "AtkinsonHyperlegible-Italic": {
          "name": "Atkinson-hyperlegible Italic Italic",
          "fileName": "AtkinsonHyperlegible-Italic.woff2",
          "format": "woff2",
          "fontStyle": "italic",
          "fontWeight": 400,
          "fontStretch": "normal"
        },
        "AtkinsonHyperlegible-BoldItalic": {
          "name": "Atkinson-hyperlegible Bold Italic Italic",
          "fileName": "AtkinsonHyperlegible-BoldItalic.woff2",
          "format": "woff2",
          "fontStyle": "italic",
          "fontWeight": 700,
          "fontStretch": "normal"
        },
        "AtkinsonHyperlegible-Bold": {
          "name": "Atkinson-hyperlegible Bold",
          "fileName": "AtkinsonHyperlegible-Bold.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 700,
          "fontStretch": "normal"
        }
      }
    }
  },
  "aspekta": {
    "name": "aspekta",
    "slug": "aspekta",
    "version": "2.100",
    "author": "Ivo Dolenc",
    "license": "OFL-1.1",
    "description": "",
    "weight": {
      "range": "50-1000",
      "total": 20,
      "byFormat": {
        "variable": {
          "min": 100,
          "max": 900,
          "default": 400
        },
        "static": {
          "min": 50,
          "max": 1000,
          "instances": [
            50,
            100,
            150,
            200,
            250,
            300,
            350,
            400,
            450,
            500,
            550,
            600,
            650,
            700,
            750,
            800,
            850,
            900,
            950,
            1000
          ]
        }
      },
      "coverage": {
        "variableOnly": [],
        "staticOnly": [
          50,
          950,
          1000
        ],
        "both": [
          100,
          150,
          200,
          250,
          300,
          350,
          400,
          450,
          500,
          550,
          600,
          650,
          700,
          750,
          800,
          850,
          900
        ]
      }
    },
    "usage": {
      "variable": {
        "bestFor": "Dynamic weight adjustment, animations, responsive design",
        "weightRange": "100-900",
        "limitations": "Extreme weights (950, 50, 1000) not available"
      },
      "static": {
        "bestFor": "Maximum weight variety, extreme weights, fallback support",
        "weightRange": "50-1000",
        "advantages": "Includes all designed weights including extremes (950, 50, 1000)"
      }
    },
    "cdnBase": {
      "variable": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/aspekta/fonts/variable/",
      "static": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/aspekta/fonts/webfonts/",
      "ttf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/aspekta/fonts/ttf/",
      "otf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/aspekta/fonts/otf/",
      "subsets": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/_subsets/aspekta/"
    },
    "faces": {
      "variable": {
        "VariableRegular[wght]": {
          "name": "Aspekta Variable - weight axis",
          "fileName": "AspektaVF.ttf",
          "format": "truetype",
          "fontStyle": "normal",
          "axes": {
            "wght": {
              "min": 100,
              "max": 900,
              "default": 400
            }
          },
          "weight": {
            "min": 100,
            "max": 900
          },
          "stretch": "normal",
          "weightRange": "100 900"
        }
      },
      "static": {
        "Aspekta-950": {
          "name": "Aspekta 950",
          "fileName": "Aspekta-950.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 950,
          "fontStretch": "normal"
        },
        "Aspekta-900": {
          "name": "Aspekta 900",
          "fileName": "Aspekta-900.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 900,
          "fontStretch": "normal"
        },
        "Aspekta-850": {
          "name": "Aspekta 850",
          "fileName": "Aspekta-850.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 850,
          "fontStretch": "normal"
        },
        "Aspekta-800": {
          "name": "Aspekta 800",
          "fileName": "Aspekta-800.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 800,
          "fontStretch": "normal"
        },
        "Aspekta-750": {
          "name": "Aspekta 750",
          "fileName": "Aspekta-750.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 750,
          "fontStretch": "normal"
        },
        "Aspekta-700": {
          "name": "Aspekta Bold",
          "fileName": "Aspekta-700.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 700,
          "fontStretch": "normal"
        },
        "Aspekta-650": {
          "name": "Aspekta 650",
          "fileName": "Aspekta-650.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 650,
          "fontStretch": "normal"
        },
        "Aspekta-600": {
          "name": "Aspekta 600",
          "fileName": "Aspekta-600.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 600,
          "fontStretch": "normal"
        },
        "Aspekta-550": {
          "name": "Aspekta 550",
          "fileName": "Aspekta-550.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 550,
          "fontStretch": "normal"
        },
        "Aspekta-500": {
          "name": "Aspekta 500",
          "fileName": "Aspekta-500.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 500,
          "fontStretch": "normal"
        },
        "Aspekta-50": {
          "name": "Aspekta 50",
          "fileName": "Aspekta-50.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 50,
          "fontStretch": "normal"
        },
        "Aspekta-450": {
          "name": "Aspekta 450",
          "fileName": "Aspekta-450.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 450,
          "fontStretch": "normal"
        },
        "Aspekta-400": {
          "name": "Aspekta Regular",
          "fileName": "Aspekta-400.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 400,
          "fontStretch": "normal"
        },
        "Aspekta-350": {
          "name": "Aspekta 350",
          "fileName": "Aspekta-350.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 350,
          "fontStretch": "normal"
        },
        "Aspekta-300": {
          "name": "Aspekta 300",
          "fileName": "Aspekta-300.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 300,
          "fontStretch": "normal"
        },
        "Aspekta-250": {
          "name": "Aspekta 250",
          "fileName": "Aspekta-250.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 250,
          "fontStretch": "normal"
        },
        "Aspekta-200": {
          "name": "Aspekta 200",
          "fileName": "Aspekta-200.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 200,
          "fontStretch": "normal"
        },
        "Aspekta-150": {
          "name": "Aspekta 150",
          "fileName": "Aspekta-150.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 150,
          "fontStretch": "normal"
        },
        "Aspekta-1000": {
          "name": "Aspekta 1000",
          "fileName": "Aspekta-1000.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 1000,
          "fontStretch": "normal"
        },
        "Aspekta-100": {
          "name": "Aspekta 100",
          "fileName": "Aspekta-100.woff2",
          "format": "woff2",
          "fontStyle": "normal",
          "fontWeight": 100,
          "fontStretch": "normal"
        }
      }
    }
  }
};

// Individual exports for convenience
export const publicSans = {
  "name": "public-sans",
  "slug": "public-sans",
  "license": "OFL-1.1",
  "description": "",
  "weight": {
    "range": "100-900",
    "total": 9,
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
    },
    "coverage": {
      "variableOnly": [],
      "staticOnly": [],
      "both": [
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
  },
  "usage": {
    "variable": {
      "bestFor": "Dynamic weight adjustment, animations, responsive design",
      "weightRange": "100-900"
    },
    "static": {
      "bestFor": "Maximum weight variety, extreme weights, fallback support",
      "weightRange": "100-900"
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
      "VariableRegular[wght]": {
        "name": "Public-sans Variable - weight axis",
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
        "stretch": "normal",
        "weightRange": "100 900"
      },
      "VariableItalic[wght]": {
        "name": "Public-sans Variable - weight axis",
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
        "stretch": "normal",
        "weightRange": "100 900"
      }
    },
    "static": {
      "PublicSans-ThinItalic": {
        "name": "Public-sans Italic Italic",
        "fileName": "PublicSans-ThinItalic.woff",
        "format": "woff",
        "fontStyle": "italic",
        "fontWeight": 100,
        "fontStretch": "normal"
      },
      "PublicSans-Thin": {
        "name": "Public-sans 100",
        "fileName": "PublicSans-Thin.woff",
        "format": "woff",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "normal"
      },
      "PublicSans-SemiBoldItalic": {
        "name": "Public-sans Italic Italic",
        "fileName": "PublicSans-SemiBoldItalic.woff",
        "format": "woff",
        "fontStyle": "italic",
        "fontWeight": 600,
        "fontStretch": "normal"
      },
      "PublicSans-SemiBold": {
        "name": "Public-sans 600",
        "fileName": "PublicSans-SemiBold.woff",
        "format": "woff",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "normal"
      },
      "PublicSans-Regular": {
        "name": "Public-sans Regular",
        "fileName": "PublicSans-Regular.woff",
        "format": "woff",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "normal"
      },
      "PublicSans-MediumItalic": {
        "name": "Public-sans Italic Italic",
        "fileName": "PublicSans-MediumItalic.woff",
        "format": "woff",
        "fontStyle": "italic",
        "fontWeight": 500,
        "fontStretch": "normal"
      },
      "PublicSans-Medium": {
        "name": "Public-sans 500",
        "fileName": "PublicSans-Medium.woff",
        "format": "woff",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "normal"
      },
      "PublicSans-LightItalic": {
        "name": "Public-sans Italic Italic",
        "fileName": "PublicSans-LightItalic.woff",
        "format": "woff",
        "fontStyle": "italic",
        "fontWeight": 300,
        "fontStretch": "normal"
      },
      "PublicSans-Light": {
        "name": "Public-sans 300",
        "fileName": "PublicSans-Light.woff",
        "format": "woff",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "normal"
      },
      "PublicSans-Italic": {
        "name": "Public-sans Italic Italic",
        "fileName": "PublicSans-Italic.woff",
        "format": "woff",
        "fontStyle": "italic",
        "fontWeight": 400,
        "fontStretch": "normal"
      },
      "PublicSans-ExtraLightItalic": {
        "name": "Public-sans Italic Italic",
        "fileName": "PublicSans-ExtraLightItalic.woff",
        "format": "woff",
        "fontStyle": "italic",
        "fontWeight": 200,
        "fontStretch": "normal"
      },
      "PublicSans-ExtraLight": {
        "name": "Public-sans 200",
        "fileName": "PublicSans-ExtraLight.woff",
        "format": "woff",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "normal"
      },
      "PublicSans-ExtraBoldItalic": {
        "name": "Public-sans Italic Italic",
        "fileName": "PublicSans-ExtraBoldItalic.woff",
        "format": "woff",
        "fontStyle": "italic",
        "fontWeight": 800,
        "fontStretch": "normal"
      },
      "PublicSans-ExtraBold": {
        "name": "Public-sans 800",
        "fileName": "PublicSans-ExtraBold.woff",
        "format": "woff",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "normal"
      },
      "PublicSans-BoldItalic": {
        "name": "Public-sans Bold Italic Italic",
        "fileName": "PublicSans-BoldItalic.woff",
        "format": "woff",
        "fontStyle": "italic",
        "fontWeight": 700,
        "fontStretch": "normal"
      },
      "PublicSans-Bold": {
        "name": "Public-sans Bold",
        "fileName": "PublicSans-Bold.woff",
        "format": "woff",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "normal"
      },
      "PublicSans-BlackItalic": {
        "name": "Public-sans Italic Italic",
        "fileName": "PublicSans-BlackItalic.woff",
        "format": "woff",
        "fontStyle": "italic",
        "fontWeight": 900,
        "fontStretch": "normal"
      },
      "PublicSans-Black": {
        "name": "Public-sans 900",
        "fileName": "PublicSans-Black.woff",
        "format": "woff",
        "fontStyle": "normal",
        "fontWeight": 900,
        "fontStretch": "normal"
      }
    }
  }
};\n\nexport const leagueMono = {
  "name": "league-mono",
  "slug": "league-mono",
  "weight": {
    "range": "100-800",
    "total": 8,
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
    },
    "coverage": {
      "variableOnly": [],
      "staticOnly": [],
      "both": [
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
  },
  "usage": {
    "variable": {
      "bestFor": "Dynamic weight adjustment, animations, responsive design",
      "weightRange": "100-800"
    },
    "static": {
      "bestFor": "Maximum weight variety, extreme weights, fallback support",
      "weightRange": "100-800"
    }
  },
  "cdnBase": {
    "variable": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/league-mono/fonts/variable/",
    "static": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/league-mono/fonts/webfonts/",
    "ttf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/league-mono/fonts/ttf/",
    "otf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/league-mono/fonts/otf/",
    "subsets": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/_subsets/league-mono/"
  },
  "faces": {
    "variable": {
      "VariableRegular[wdth,wght]": {
        "name": "League-mono Variable - weight axis, width axis",
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
      "LeagueMono-WideUltraLight": {
        "name": "League-mono 200",
        "fileName": "LeagueMono-WideUltraLight.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "ultra-expanded"
      },
      "LeagueMono-WideThin": {
        "name": "League-mono 100",
        "fileName": "LeagueMono-WideThin.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "ultra-expanded"
      },
      "LeagueMono-WideSemiBold": {
        "name": "League-mono 600",
        "fileName": "LeagueMono-WideSemiBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "ultra-expanded"
      },
      "LeagueMono-WideRegular": {
        "name": "League-mono Regular",
        "fileName": "LeagueMono-WideRegular.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "ultra-expanded"
      },
      "LeagueMono-WideMedium": {
        "name": "League-mono 500",
        "fileName": "LeagueMono-WideMedium.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "ultra-expanded"
      },
      "LeagueMono-WideLight": {
        "name": "League-mono 300",
        "fileName": "LeagueMono-WideLight.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "ultra-expanded"
      },
      "LeagueMono-WideExtraBold": {
        "name": "League-mono 800",
        "fileName": "LeagueMono-WideExtraBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "ultra-expanded"
      },
      "LeagueMono-WideBold": {
        "name": "League-mono Bold",
        "fileName": "LeagueMono-WideBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "ultra-expanded"
      },
      "LeagueMono-UltraLight": {
        "name": "League-mono 200",
        "fileName": "LeagueMono-UltraLight.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "normal"
      },
      "LeagueMono-Thin": {
        "name": "League-mono 100",
        "fileName": "LeagueMono-Thin.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "normal"
      },
      "LeagueMono-SemiBold": {
        "name": "League-mono 600",
        "fileName": "LeagueMono-SemiBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "normal"
      },
      "LeagueMono-Regular": {
        "name": "League-mono Regular",
        "fileName": "LeagueMono-Regular.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "normal"
      },
      "LeagueMono-NarrowUltraLight": {
        "name": "League-mono 200",
        "fileName": "LeagueMono-NarrowUltraLight.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "semi-condensed"
      },
      "LeagueMono-NarrowThin": {
        "name": "League-mono 100",
        "fileName": "LeagueMono-NarrowThin.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "semi-condensed"
      },
      "LeagueMono-NarrowSemiBold": {
        "name": "League-mono 600",
        "fileName": "LeagueMono-NarrowSemiBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "semi-condensed"
      },
      "LeagueMono-NarrowRegular": {
        "name": "League-mono Regular",
        "fileName": "LeagueMono-NarrowRegular.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "semi-condensed"
      },
      "LeagueMono-NarrowMedium": {
        "name": "League-mono 500",
        "fileName": "LeagueMono-NarrowMedium.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "semi-condensed"
      },
      "LeagueMono-NarrowLight": {
        "name": "League-mono 300",
        "fileName": "LeagueMono-NarrowLight.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "semi-condensed"
      },
      "LeagueMono-NarrowExtraBold": {
        "name": "League-mono 800",
        "fileName": "LeagueMono-NarrowExtraBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "semi-condensed"
      },
      "LeagueMono-NarrowBold": {
        "name": "League-mono Bold",
        "fileName": "LeagueMono-NarrowBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "semi-condensed"
      },
      "LeagueMono-Medium": {
        "name": "League-mono 500",
        "fileName": "LeagueMono-Medium.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "normal"
      },
      "LeagueMono-Light": {
        "name": "League-mono 300",
        "fileName": "LeagueMono-Light.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "normal"
      },
      "LeagueMono-ExtraBold": {
        "name": "League-mono 800",
        "fileName": "LeagueMono-ExtraBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "normal"
      },
      "LeagueMono-ExtendedUltraLight": {
        "name": "League-mono 200",
        "fileName": "LeagueMono-ExtendedUltraLight.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "expanded"
      },
      "LeagueMono-ExtendedThin": {
        "name": "League-mono 100",
        "fileName": "LeagueMono-ExtendedThin.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "expanded"
      },
      "LeagueMono-ExtendedSemiBold": {
        "name": "League-mono 600",
        "fileName": "LeagueMono-ExtendedSemiBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "expanded"
      },
      "LeagueMono-ExtendedRegular": {
        "name": "League-mono Regular",
        "fileName": "LeagueMono-ExtendedRegular.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "expanded"
      },
      "LeagueMono-ExtendedMedium": {
        "name": "League-mono 500",
        "fileName": "LeagueMono-ExtendedMedium.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "expanded"
      },
      "LeagueMono-ExtendedLight": {
        "name": "League-mono 300",
        "fileName": "LeagueMono-ExtendedLight.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "expanded"
      },
      "LeagueMono-ExtendedExtraBold": {
        "name": "League-mono 800",
        "fileName": "LeagueMono-ExtendedExtraBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "expanded"
      },
      "LeagueMono-ExtendedBold": {
        "name": "League-mono Bold",
        "fileName": "LeagueMono-ExtendedBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "expanded"
      },
      "LeagueMono-CondensedUltraLight": {
        "name": "League-mono 200",
        "fileName": "LeagueMono-CondensedUltraLight.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "condensed"
      },
      "LeagueMono-CondensedThin": {
        "name": "League-mono 100",
        "fileName": "LeagueMono-CondensedThin.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "condensed"
      },
      "LeagueMono-CondensedSemiBold": {
        "name": "League-mono 600",
        "fileName": "LeagueMono-CondensedSemiBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "condensed"
      },
      "LeagueMono-CondensedMedium": {
        "name": "League-mono 500",
        "fileName": "LeagueMono-CondensedMedium.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "condensed"
      },
      "LeagueMono-CondensedLight": {
        "name": "League-mono 300",
        "fileName": "LeagueMono-CondensedLight.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "condensed"
      },
      "LeagueMono-CondensedExtraBold": {
        "name": "League-mono 800",
        "fileName": "LeagueMono-CondensedExtraBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "condensed"
      },
      "LeagueMono-CondensedBold": {
        "name": "League-mono Bold",
        "fileName": "LeagueMono-CondensedBold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "condensed"
      },
      "LeagueMono-Condensed": {
        "name": "League-mono Regular",
        "fileName": "LeagueMono-Condensed.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "condensed"
      },
      "LeagueMono-Bold": {
        "name": "League-mono Bold",
        "fileName": "LeagueMono-Bold.otf",
        "format": "opentype",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "normal"
      }
    }
  }
};\n\nexport const inconsolata = {
  "name": "inconsolata",
  "slug": "inconsolata",
  "license": "OFL-1.1",
  "description": "",
  "weight": {
    "range": "100-900",
    "total": 9,
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
    },
    "coverage": {
      "variableOnly": [],
      "staticOnly": [],
      "both": [
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
  },
  "usage": {
    "variable": {
      "bestFor": "Dynamic weight adjustment, animations, responsive design",
      "weightRange": "100-900"
    },
    "static": {
      "bestFor": "Maximum weight variety, extreme weights, fallback support",
      "weightRange": "100-900"
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
      "VariableRegular[wdth,wght]": {
        "name": "Inconsolata Variable - weight axis, width axis",
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
      "InconsolataUltraExpanded-Thin": {
        "name": "Inconsolata 100",
        "fileName": "Inconsolata-UltraExpandedThin.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "expanded"
      },
      "InconsolataUltraExpanded-SemiBold": {
        "name": "Inconsolata 600",
        "fileName": "Inconsolata-UltraExpandedSemiBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "expanded"
      },
      "InconsolataUltraExpanded-Regular": {
        "name": "Inconsolata Regular",
        "fileName": "Inconsolata-UltraExpandedRegular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "expanded"
      },
      "InconsolataUltraExpanded-Medium": {
        "name": "Inconsolata 500",
        "fileName": "Inconsolata-UltraExpandedMedium.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "expanded"
      },
      "InconsolataUltraExpanded-Light": {
        "name": "Inconsolata 300",
        "fileName": "Inconsolata-UltraExpandedLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "expanded"
      },
      "InconsolataUltraExpanded-ExtraLight": {
        "name": "Inconsolata 200",
        "fileName": "Inconsolata-UltraExpandedExtraLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "expanded"
      },
      "InconsolataUltraExpanded-ExtraBold": {
        "name": "Inconsolata 800",
        "fileName": "Inconsolata-UltraExpandedExtraBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "expanded"
      },
      "InconsolataUltraExpanded-Bold": {
        "name": "Inconsolata Bold",
        "fileName": "Inconsolata-UltraExpandedBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "expanded"
      },
      "InconsolataUltraExpanded-Black": {
        "name": "Inconsolata 900",
        "fileName": "Inconsolata-UltraExpandedBlack.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 900,
        "fontStretch": "expanded"
      },
      "InconsolataUltraCondensed-Thin": {
        "name": "Inconsolata 100",
        "fileName": "Inconsolata-UltraCondensedThin.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "ultra-condensed"
      },
      "InconsolataUltraCondensed-SemiBold": {
        "name": "Inconsolata 600",
        "fileName": "Inconsolata-UltraCondensedSemiBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "ultra-condensed"
      },
      "InconsolataUltraCondensed-Regular": {
        "name": "Inconsolata Regular",
        "fileName": "Inconsolata-UltraCondensedRegular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "ultra-condensed"
      },
      "InconsolataUltraCondensed-Medium": {
        "name": "Inconsolata 500",
        "fileName": "Inconsolata-UltraCondensedMedium.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "ultra-condensed"
      },
      "InconsolataUltraCondensed-Light": {
        "name": "Inconsolata 300",
        "fileName": "Inconsolata-UltraCondensedLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "ultra-condensed"
      },
      "InconsolataUltraCondensed-ExtraLight": {
        "name": "Inconsolata 200",
        "fileName": "Inconsolata-UltraCondensedExtraLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "ultra-condensed"
      },
      "InconsolataUltraCondensed-ExtraBold": {
        "name": "Inconsolata 800",
        "fileName": "Inconsolata-UltraCondensedExtraBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "ultra-condensed"
      },
      "InconsolataUltraCondensed-Bold": {
        "name": "Inconsolata Bold",
        "fileName": "Inconsolata-UltraCondensedBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "ultra-condensed"
      },
      "InconsolataUltraCondensed-Black": {
        "name": "Inconsolata 900",
        "fileName": "Inconsolata-UltraCondensedBlack.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 900,
        "fontStretch": "ultra-condensed"
      },
      "Inconsolata-Thin": {
        "name": "Inconsolata 100",
        "fileName": "Inconsolata-Thin.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "normal"
      },
      "InconsolataSemiExpanded-Thin": {
        "name": "Inconsolata 100",
        "fileName": "Inconsolata-SemiExpandedThin.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "semi-expanded"
      },
      "InconsolataSemiExpanded-SemiBold": {
        "name": "Inconsolata 600",
        "fileName": "Inconsolata-SemiExpandedSemiBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "semi-expanded"
      },
      "InconsolataSemiExpanded-Regular": {
        "name": "Inconsolata Regular",
        "fileName": "Inconsolata-SemiExpandedRegular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "semi-expanded"
      },
      "InconsolataSemiExpanded-Medium": {
        "name": "Inconsolata 500",
        "fileName": "Inconsolata-SemiExpandedMedium.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "semi-expanded"
      },
      "InconsolataSemiExpanded-Light": {
        "name": "Inconsolata 300",
        "fileName": "Inconsolata-SemiExpandedLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "semi-expanded"
      },
      "InconsolataSemiExpanded-ExtraLight": {
        "name": "Inconsolata 200",
        "fileName": "Inconsolata-SemiExpandedExtraLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "semi-expanded"
      },
      "InconsolataSemiExpanded-ExtraBold": {
        "name": "Inconsolata 800",
        "fileName": "Inconsolata-SemiExpandedExtraBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "semi-expanded"
      },
      "InconsolataSemiExpanded-Bold": {
        "name": "Inconsolata Bold",
        "fileName": "Inconsolata-SemiExpandedBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "semi-expanded"
      },
      "InconsolataSemiExpanded-Black": {
        "name": "Inconsolata 900",
        "fileName": "Inconsolata-SemiExpandedBlack.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 900,
        "fontStretch": "semi-expanded"
      },
      "InconsolataSemiCondensed-Thin": {
        "name": "Inconsolata 100",
        "fileName": "Inconsolata-SemiCondensedThin.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "condensed"
      },
      "InconsolataSemiCondensed-SemiBold": {
        "name": "Inconsolata 600",
        "fileName": "Inconsolata-SemiCondensedSemiBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "condensed"
      },
      "InconsolataSemiCondensed-Regular": {
        "name": "Inconsolata Regular",
        "fileName": "Inconsolata-SemiCondensedRegular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "condensed"
      },
      "InconsolataSemiCondensed-Medium": {
        "name": "Inconsolata 500",
        "fileName": "Inconsolata-SemiCondensedMedium.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "condensed"
      },
      "InconsolataSemiCondensed-Light": {
        "name": "Inconsolata 300",
        "fileName": "Inconsolata-SemiCondensedLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "condensed"
      },
      "InconsolataSemiCondensed-ExtraLight": {
        "name": "Inconsolata 200",
        "fileName": "Inconsolata-SemiCondensedExtraLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "condensed"
      },
      "InconsolataSemiCondensed-ExtraBold": {
        "name": "Inconsolata 800",
        "fileName": "Inconsolata-SemiCondensedExtraBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "condensed"
      },
      "InconsolataSemiCondensed-Bold": {
        "name": "Inconsolata Bold",
        "fileName": "Inconsolata-SemiCondensedBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "condensed"
      },
      "InconsolataSemiCondensed-Black": {
        "name": "Inconsolata 900",
        "fileName": "Inconsolata-SemiCondensedBlack.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 900,
        "fontStretch": "condensed"
      },
      "Inconsolata-SemiBold": {
        "name": "Inconsolata 600",
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
        "name": "Inconsolata 500",
        "fileName": "Inconsolata-Medium.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "normal"
      },
      "Inconsolata-Light": {
        "name": "Inconsolata 300",
        "fileName": "Inconsolata-Light.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "normal"
      },
      "Inconsolata-ExtraLight": {
        "name": "Inconsolata 200",
        "fileName": "Inconsolata-ExtraLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "normal"
      },
      "InconsolataExtraExpanded-Thin": {
        "name": "Inconsolata 100",
        "fileName": "Inconsolata-ExtraExpandedThin.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "expanded"
      },
      "InconsolataExtraExpanded-SemiBold": {
        "name": "Inconsolata 600",
        "fileName": "Inconsolata-ExtraExpandedSemiBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "expanded"
      },
      "InconsolataExtraExpanded-Regular": {
        "name": "Inconsolata Regular",
        "fileName": "Inconsolata-ExtraExpandedRegular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "expanded"
      },
      "InconsolataExtraExpanded-Medium": {
        "name": "Inconsolata 500",
        "fileName": "Inconsolata-ExtraExpandedMedium.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "expanded"
      },
      "InconsolataExtraExpanded-Light": {
        "name": "Inconsolata 300",
        "fileName": "Inconsolata-ExtraExpandedLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "expanded"
      },
      "InconsolataExtraExpanded-ExtraLight": {
        "name": "Inconsolata 200",
        "fileName": "Inconsolata-ExtraExpandedExtraLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "expanded"
      },
      "InconsolataExtraExpanded-ExtraBold": {
        "name": "Inconsolata 800",
        "fileName": "Inconsolata-ExtraExpandedExtraBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "expanded"
      },
      "InconsolataExtraExpanded-Bold": {
        "name": "Inconsolata Bold",
        "fileName": "Inconsolata-ExtraExpandedBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "expanded"
      },
      "InconsolataExtraExpanded-Black": {
        "name": "Inconsolata 900",
        "fileName": "Inconsolata-ExtraExpandedBlack.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 900,
        "fontStretch": "expanded"
      },
      "InconsolataExtraCondensed-Thin": {
        "name": "Inconsolata 100",
        "fileName": "Inconsolata-ExtraCondensedThin.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "extra-condensed"
      },
      "InconsolataExtraCondensed-SemiBold": {
        "name": "Inconsolata 600",
        "fileName": "Inconsolata-ExtraCondensedSemiBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "extra-condensed"
      },
      "InconsolataExtraCondensed-Regular": {
        "name": "Inconsolata Regular",
        "fileName": "Inconsolata-ExtraCondensedRegular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "extra-condensed"
      },
      "InconsolataExtraCondensed-Medium": {
        "name": "Inconsolata 500",
        "fileName": "Inconsolata-ExtraCondensedMedium.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "extra-condensed"
      },
      "InconsolataExtraCondensed-Light": {
        "name": "Inconsolata 300",
        "fileName": "Inconsolata-ExtraCondensedLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "extra-condensed"
      },
      "InconsolataExtraCondensed-ExtraLight": {
        "name": "Inconsolata 200",
        "fileName": "Inconsolata-ExtraCondensedExtraLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "extra-condensed"
      },
      "InconsolataExtraCondensed-ExtraBold": {
        "name": "Inconsolata 800",
        "fileName": "Inconsolata-ExtraCondensedExtraBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "extra-condensed"
      },
      "InconsolataExtraCondensed-Bold": {
        "name": "Inconsolata Bold",
        "fileName": "Inconsolata-ExtraCondensedBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "extra-condensed"
      },
      "InconsolataExtraCondensed-Black": {
        "name": "Inconsolata 900",
        "fileName": "Inconsolata-ExtraCondensedBlack.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 900,
        "fontStretch": "extra-condensed"
      },
      "Inconsolata-ExtraBold": {
        "name": "Inconsolata 800",
        "fileName": "Inconsolata-ExtraBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "normal"
      },
      "InconsolataExpanded-Thin": {
        "name": "Inconsolata 100",
        "fileName": "Inconsolata-ExpandedThin.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "expanded"
      },
      "InconsolataExpanded-SemiBold": {
        "name": "Inconsolata 600",
        "fileName": "Inconsolata-ExpandedSemiBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "expanded"
      },
      "InconsolataExpanded-Regular": {
        "name": "Inconsolata Regular",
        "fileName": "Inconsolata-ExpandedRegular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "expanded"
      },
      "InconsolataExpanded-Medium": {
        "name": "Inconsolata 500",
        "fileName": "Inconsolata-ExpandedMedium.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "expanded"
      },
      "InconsolataExpanded-Light": {
        "name": "Inconsolata 300",
        "fileName": "Inconsolata-ExpandedLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "expanded"
      },
      "InconsolataExpanded-ExtraLight": {
        "name": "Inconsolata 200",
        "fileName": "Inconsolata-ExpandedExtraLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "expanded"
      },
      "InconsolataExpanded-ExtraBold": {
        "name": "Inconsolata 800",
        "fileName": "Inconsolata-ExpandedExtraBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "expanded"
      },
      "InconsolataExpanded-Bold": {
        "name": "Inconsolata Bold",
        "fileName": "Inconsolata-ExpandedBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "expanded"
      },
      "InconsolataExpanded-Black": {
        "name": "Inconsolata 900",
        "fileName": "Inconsolata-ExpandedBlack.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 900,
        "fontStretch": "expanded"
      },
      "InconsolataCondensed-Thin": {
        "name": "Inconsolata 100",
        "fileName": "Inconsolata-CondensedThin.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "condensed"
      },
      "InconsolataCondensed-SemiBold": {
        "name": "Inconsolata 600",
        "fileName": "Inconsolata-CondensedSemiBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "condensed"
      },
      "InconsolataCondensed-Regular": {
        "name": "Inconsolata Regular",
        "fileName": "Inconsolata-CondensedRegular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "condensed"
      },
      "InconsolataCondensed-Medium": {
        "name": "Inconsolata 500",
        "fileName": "Inconsolata-CondensedMedium.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "condensed"
      },
      "InconsolataCondensed-Light": {
        "name": "Inconsolata 300",
        "fileName": "Inconsolata-CondensedLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "condensed"
      },
      "InconsolataCondensed-ExtraLight": {
        "name": "Inconsolata 200",
        "fileName": "Inconsolata-CondensedExtraLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "condensed"
      },
      "InconsolataCondensed-ExtraBold": {
        "name": "Inconsolata 800",
        "fileName": "Inconsolata-CondensedExtraBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "condensed"
      },
      "InconsolataCondensed-Bold": {
        "name": "Inconsolata Bold",
        "fileName": "Inconsolata-CondensedBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "condensed"
      },
      "InconsolataCondensed-Black": {
        "name": "Inconsolata 900",
        "fileName": "Inconsolata-CondensedBlack.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 900,
        "fontStretch": "condensed"
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
        "name": "Inconsolata 900",
        "fileName": "Inconsolata-Black.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 900,
        "fontStretch": "normal"
      }
    }
  }
};\n\nexport const ibm = {
  "name": "ibm",
  "slug": "ibm",
  "version": "1.1.0",
  "license": "OFL-1.1",
  "description": "",
  "weight": {
    "range": "Unknown",
    "total": 0,
    "byFormat": {
      "variable": null,
      "static": null
    },
    "coverage": {
      "variableOnly": [],
      "staticOnly": [],
      "both": []
    }
  },
  "usage": null,
  "cdnBase": {
    "variable": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/ibm/fonts/variable/",
    "static": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/ibm/fonts/webfonts/",
    "ttf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/ibm/fonts/ttf/",
    "otf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/ibm/fonts/otf/",
    "subsets": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/_subsets/ibm/"
  },
  "faces": {
    "variable": {},
    "static": {}
  }
};\n\nexport const crimsonPro = {
  "name": "crimson-pro",
  "slug": "crimson-pro",
  "license": "OFL-1.1",
  "description": "",
  "weight": {
    "range": "200-900",
    "total": 8,
    "byFormat": {
      "variable": {
        "min": 200,
        "max": 900,
        "default": 400
      },
      "static": {
        "min": 200,
        "max": 900,
        "instances": [
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
    },
    "coverage": {
      "variableOnly": [],
      "staticOnly": [],
      "both": [
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
  },
  "usage": {
    "variable": {
      "bestFor": "Dynamic weight adjustment, animations, responsive design",
      "weightRange": "200-900"
    },
    "static": {
      "bestFor": "Maximum weight variety, extreme weights, fallback support",
      "weightRange": "200-900"
    }
  },
  "cdnBase": {
    "variable": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/crimson-pro/fonts/variable/",
    "static": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/crimson-pro/fonts/webfonts/",
    "ttf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/crimson-pro/fonts/ttf/",
    "otf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/crimson-pro/fonts/otf/",
    "subsets": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/_subsets/crimson-pro/"
  },
  "faces": {
    "variable": {
      "VariableRegular[wght]": {
        "name": "Crimson-pro Variable - weight axis",
        "fileName": "CrimsonPro[wght].ttf",
        "format": "truetype",
        "fontStyle": "normal",
        "axes": {
          "wght": {
            "min": 200,
            "max": 900,
            "default": 400
          }
        },
        "weight": {
          "min": 200,
          "max": 900
        },
        "stretch": "normal",
        "weightRange": "200 900"
      },
      "VariableItalic[wght]": {
        "name": "Crimson-pro Variable - weight axis",
        "fileName": "CrimsonPro-Italic[wght].ttf",
        "format": "truetype",
        "fontStyle": "italic",
        "axes": {
          "wght": {
            "min": 200,
            "max": 900,
            "default": 400
          }
        },
        "weight": {
          "min": 200,
          "max": 900
        },
        "stretch": "normal",
        "weightRange": "200 900"
      }
    },
    "static": {
      "CrimsonPro-SemiBoldItalic": {
        "name": "Crimson-pro Italic Italic",
        "fileName": "CrimsonPro-SemiBoldItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 600,
        "fontStretch": "normal"
      },
      "CrimsonPro-SemiBold": {
        "name": "Crimson-pro 600",
        "fileName": "CrimsonPro-SemiBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "normal"
      },
      "CrimsonPro-Regular": {
        "name": "Crimson-pro Regular",
        "fileName": "CrimsonPro-Regular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "normal"
      },
      "CrimsonPro-MediumItalic": {
        "name": "Crimson-pro Italic Italic",
        "fileName": "CrimsonPro-MediumItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 500,
        "fontStretch": "normal"
      },
      "CrimsonPro-Medium": {
        "name": "Crimson-pro 500",
        "fileName": "CrimsonPro-Medium.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "normal"
      },
      "CrimsonPro-LightItalic": {
        "name": "Crimson-pro Italic Italic",
        "fileName": "CrimsonPro-LightItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 300,
        "fontStretch": "normal"
      },
      "CrimsonPro-Light": {
        "name": "Crimson-pro 300",
        "fileName": "CrimsonPro-Light.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "normal"
      },
      "CrimsonPro-Italic": {
        "name": "Crimson-pro Italic Italic",
        "fileName": "CrimsonPro-Italic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 400,
        "fontStretch": "normal"
      },
      "CrimsonPro-ExtraLightItalic": {
        "name": "Crimson-pro Italic Italic",
        "fileName": "CrimsonPro-ExtraLightItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 200,
        "fontStretch": "normal"
      },
      "CrimsonPro-ExtraLight": {
        "name": "Crimson-pro 200",
        "fileName": "CrimsonPro-ExtraLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "normal"
      },
      "CrimsonPro-ExtraBoldItalic": {
        "name": "Crimson-pro Italic Italic",
        "fileName": "CrimsonPro-ExtraBoldItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 800,
        "fontStretch": "normal"
      },
      "CrimsonPro-ExtraBold": {
        "name": "Crimson-pro 800",
        "fileName": "CrimsonPro-ExtraBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "normal"
      },
      "CrimsonPro-BoldItalic": {
        "name": "Crimson-pro Bold Italic Italic",
        "fileName": "CrimsonPro-BoldItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 700,
        "fontStretch": "normal"
      },
      "CrimsonPro-Bold": {
        "name": "Crimson-pro Bold",
        "fileName": "CrimsonPro-Bold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "normal"
      },
      "CrimsonPro-BlackItalic": {
        "name": "Crimson-pro Italic Italic",
        "fileName": "CrimsonPro-BlackItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 900,
        "fontStretch": "normal"
      },
      "CrimsonPro-Black": {
        "name": "Crimson-pro 900",
        "fileName": "CrimsonPro-Black.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 900,
        "fontStretch": "normal"
      }
    }
  }
};\n\nexport const atkinsonHyperlegible = {
  "name": "atkinson-hyperlegible",
  "slug": "atkinson-hyperlegible",
  "version": "1.0.0",
  "author": "Braille Institute of America",
  "license": "OFL-1.1",
  "description": "",
  "weight": {
    "range": "400-700",
    "total": 2,
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
    },
    "coverage": {
      "variableOnly": [],
      "staticOnly": [
        400,
        700
      ],
      "both": []
    }
  },
  "usage": {
    "static": {
      "bestFor": "Maximum weight variety, extreme weights, fallback support",
      "weightRange": "400-700"
    }
  },
  "cdnBase": {
    "variable": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/atkinson-hyperlegible/fonts/variable/",
    "static": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/atkinson-hyperlegible/fonts/webfonts/",
    "ttf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/atkinson-hyperlegible/fonts/ttf/",
    "otf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/atkinson-hyperlegible/fonts/otf/",
    "subsets": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/_subsets/atkinson-hyperlegible/"
  },
  "faces": {
    "variable": {},
    "static": {
      "AtkinsonHyperlegible-Regular": {
        "name": "Atkinson-hyperlegible Regular",
        "fileName": "AtkinsonHyperlegible-Regular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "normal"
      },
      "AtkinsonHyperlegible-Italic": {
        "name": "Atkinson-hyperlegible Italic Italic",
        "fileName": "AtkinsonHyperlegible-Italic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 400,
        "fontStretch": "normal"
      },
      "AtkinsonHyperlegible-BoldItalic": {
        "name": "Atkinson-hyperlegible Bold Italic Italic",
        "fileName": "AtkinsonHyperlegible-BoldItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 700,
        "fontStretch": "normal"
      },
      "AtkinsonHyperlegible-Bold": {
        "name": "Atkinson-hyperlegible Bold",
        "fileName": "AtkinsonHyperlegible-Bold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "normal"
      }
    }
  }
};\n\nexport const aspekta = {
  "name": "aspekta",
  "slug": "aspekta",
  "version": "2.100",
  "author": "Ivo Dolenc",
  "license": "OFL-1.1",
  "description": "",
  "weight": {
    "range": "50-1000",
    "total": 20,
    "byFormat": {
      "variable": {
        "min": 100,
        "max": 900,
        "default": 400
      },
      "static": {
        "min": 50,
        "max": 1000,
        "instances": [
          50,
          100,
          150,
          200,
          250,
          300,
          350,
          400,
          450,
          500,
          550,
          600,
          650,
          700,
          750,
          800,
          850,
          900,
          950,
          1000
        ]
      }
    },
    "coverage": {
      "variableOnly": [],
      "staticOnly": [
        50,
        950,
        1000
      ],
      "both": [
        100,
        150,
        200,
        250,
        300,
        350,
        400,
        450,
        500,
        550,
        600,
        650,
        700,
        750,
        800,
        850,
        900
      ]
    }
  },
  "usage": {
    "variable": {
      "bestFor": "Dynamic weight adjustment, animations, responsive design",
      "weightRange": "100-900",
      "limitations": "Extreme weights (950, 50, 1000) not available"
    },
    "static": {
      "bestFor": "Maximum weight variety, extreme weights, fallback support",
      "weightRange": "50-1000",
      "advantages": "Includes all designed weights including extremes (950, 50, 1000)"
    }
  },
  "cdnBase": {
    "variable": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/aspekta/fonts/variable/",
    "static": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/aspekta/fonts/webfonts/",
    "ttf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/aspekta/fonts/ttf/",
    "otf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/fonts/open-fonts/aspekta/fonts/otf/",
    "subsets": "https://cdn.jsdelivr.net/gh/hund-press/font-families@1.5.2/_subsets/aspekta/"
  },
  "faces": {
    "variable": {
      "VariableRegular[wght]": {
        "name": "Aspekta Variable - weight axis",
        "fileName": "AspektaVF.ttf",
        "format": "truetype",
        "fontStyle": "normal",
        "axes": {
          "wght": {
            "min": 100,
            "max": 900,
            "default": 400
          }
        },
        "weight": {
          "min": 100,
          "max": 900
        },
        "stretch": "normal",
        "weightRange": "100 900"
      }
    },
    "static": {
      "Aspekta-950": {
        "name": "Aspekta 950",
        "fileName": "Aspekta-950.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 950,
        "fontStretch": "normal"
      },
      "Aspekta-900": {
        "name": "Aspekta 900",
        "fileName": "Aspekta-900.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 900,
        "fontStretch": "normal"
      },
      "Aspekta-850": {
        "name": "Aspekta 850",
        "fileName": "Aspekta-850.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 850,
        "fontStretch": "normal"
      },
      "Aspekta-800": {
        "name": "Aspekta 800",
        "fileName": "Aspekta-800.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 800,
        "fontStretch": "normal"
      },
      "Aspekta-750": {
        "name": "Aspekta 750",
        "fileName": "Aspekta-750.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 750,
        "fontStretch": "normal"
      },
      "Aspekta-700": {
        "name": "Aspekta Bold",
        "fileName": "Aspekta-700.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "fontStretch": "normal"
      },
      "Aspekta-650": {
        "name": "Aspekta 650",
        "fileName": "Aspekta-650.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 650,
        "fontStretch": "normal"
      },
      "Aspekta-600": {
        "name": "Aspekta 600",
        "fileName": "Aspekta-600.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 600,
        "fontStretch": "normal"
      },
      "Aspekta-550": {
        "name": "Aspekta 550",
        "fileName": "Aspekta-550.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 550,
        "fontStretch": "normal"
      },
      "Aspekta-500": {
        "name": "Aspekta 500",
        "fileName": "Aspekta-500.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 500,
        "fontStretch": "normal"
      },
      "Aspekta-50": {
        "name": "Aspekta 50",
        "fileName": "Aspekta-50.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 50,
        "fontStretch": "normal"
      },
      "Aspekta-450": {
        "name": "Aspekta 450",
        "fileName": "Aspekta-450.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 450,
        "fontStretch": "normal"
      },
      "Aspekta-400": {
        "name": "Aspekta Regular",
        "fileName": "Aspekta-400.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "fontStretch": "normal"
      },
      "Aspekta-350": {
        "name": "Aspekta 350",
        "fileName": "Aspekta-350.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 350,
        "fontStretch": "normal"
      },
      "Aspekta-300": {
        "name": "Aspekta 300",
        "fileName": "Aspekta-300.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 300,
        "fontStretch": "normal"
      },
      "Aspekta-250": {
        "name": "Aspekta 250",
        "fileName": "Aspekta-250.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 250,
        "fontStretch": "normal"
      },
      "Aspekta-200": {
        "name": "Aspekta 200",
        "fileName": "Aspekta-200.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 200,
        "fontStretch": "normal"
      },
      "Aspekta-150": {
        "name": "Aspekta 150",
        "fileName": "Aspekta-150.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 150,
        "fontStretch": "normal"
      },
      "Aspekta-1000": {
        "name": "Aspekta 1000",
        "fileName": "Aspekta-1000.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 1000,
        "fontStretch": "normal"
      },
      "Aspekta-100": {
        "name": "Aspekta 100",
        "fileName": "Aspekta-100.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 100,
        "fontStretch": "normal"
      }
    }
  }
};
