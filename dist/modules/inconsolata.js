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
      "generatedAt": "2025-09-09T18:38:48.424Z"
    }
  }
};
