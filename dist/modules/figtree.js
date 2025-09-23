/**
 * Figtree Font Family Module
 * 
 * Generated from font-families build system
 * License: OFL-1.1
 * Author: Erik Kennedy <erik.d.kennedy@gmail.com>
 * Version: Unknown
 */

export default {
  "name": "Figtree",
  "key": "figtree",
  "attribution": {
    "author": "Erik Kennedy <erik.d.kennedy@gmail.com>",
    "license": "OFL-1.1",
    "description": "A simple and friendly geometric sans serif font.\n\n![](documentation/figtree-banner.png)\n\n![](documentation/figtree-letterforms.png)\n\n![](documentation/figtree-vibes.png)\n\n![](documentation/figtree-fea"
  },
  "weight": {
    "range": "300-900",
    "byFormat": {
      "variable": {
        "min": 300,
        "max": 900,
        "default": 400
      },
      "static": {
        "min": 300,
        "max": 900,
        "instances": [
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
  "languages": {
    "scripts": [
      {
        "name": "Latin",
        "coverage": 0.373,
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
          "Latin Extended-B",
          "Latin Extended Additional"
        ]
      }
    ],
    "total": 11
  },
  "features": {
    "openType": {
      "categories": {
        "stylistic": [
          "ss01",
          "ss02"
        ],
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
          "dnom",
          "locl",
          "numr",
          "sinf",
          "subs",
          "sups",
          "rvrn"
        ]
      }
    },
    "stylisticSets": {
      "ss01": {
        "name": "Stylistic Set 1",
        "description": ""
      },
      "ss02": {
        "name": "Stylistic Set 2",
        "description": ""
      }
    },
    "capabilities": {
      "hasLigatures": false,
      "hasContextualAlternates": false,
      "hasNumericalFeatures": true,
      "hasStylisticSets": true
    }
  },
  "cdnBase": {
    "variable": "https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.10.5/fonts/open-fonts/figtree/fonts/variable/",
    "static": "https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.10.5/fonts/open-fonts/figtree/fonts/webfonts/",
    "ttf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.10.5/fonts/open-fonts/figtree/fonts/ttf/",
    "otf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.10.5/fonts/open-fonts/figtree/fonts/otf/",
    "subsets": "https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.10.5/subsets/figtree/"
  },
  "faces": {
    "variable": {
      "figtree-variable-regular[wght]": {
        "name": "Figtree Variable (weight)",
        "fileName": "Figtree[wght].ttf",
        "format": "truetype",
        "fontStyle": "normal",
        "axes": {
          "wght": {
            "min": 300,
            "max": 900,
            "default": 300
          }
        },
        "weight": {
          "min": 300,
          "max": 900
        },
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -250,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 700,
            "xHeight": 500,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 762,
            "spaceWidth": 250,
            "bbox": {
              "minX": -170,
              "minY": -220,
              "maxX": 1100,
              "maxY": 912
            }
          }
        },
        "weightRange": "300 900"
      },
      "figtree-variable-italic[wght]": {
        "name": "Figtree Italic Variable (weight)",
        "fileName": "Figtree-Italic[wght].ttf",
        "format": "truetype",
        "fontStyle": "italic",
        "axes": {
          "wght": {
            "min": 300,
            "max": 900,
            "default": 300
          }
        },
        "weight": {
          "min": 300,
          "max": 900
        },
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -250,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 700,
            "xHeight": 500,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 777,
            "spaceWidth": 250,
            "bbox": {
              "minX": -170,
              "minY": -222,
              "maxX": 1125,
              "maxY": 912
            }
          }
        },
        "weightRange": "300 900"
      }
    },
    "static": {
      "figtree-semibold-italic": {
        "name": "Figtree SemiBold Italic",
        "fileName": "Figtree-SemiBoldItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 600,
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -250,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 700,
            "xHeight": 500,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 778,
            "spaceWidth": 250,
            "bbox": {
              "minX": -176,
              "minY": -222,
              "maxX": 1121,
              "maxY": 937
            }
          }
        }
      },
      "figtree-semibold": {
        "name": "Figtree SemiBold",
        "fileName": "Figtree-SemiBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 600,
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -250,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 700,
            "xHeight": 500,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 766,
            "spaceWidth": 250,
            "bbox": {
              "minX": -176,
              "minY": -220,
              "maxX": 1100,
              "maxY": 937
            }
          }
        }
      },
      "figtree-regular": {
        "name": "Figtree Regular",
        "fileName": "Figtree-Regular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -250,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 700,
            "xHeight": 500,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 763,
            "spaceWidth": 250,
            "bbox": {
              "minX": -172,
              "minY": -220,
              "maxX": 1100,
              "maxY": 917
            }
          }
        }
      },
      "figtree-medium-italic": {
        "name": "Figtree Medium Italic",
        "fileName": "Figtree-MediumItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 500,
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -250,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 700,
            "xHeight": 500,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 778,
            "spaceWidth": 250,
            "bbox": {
              "minX": -174,
              "minY": -222,
              "maxX": 1122,
              "maxY": 927
            }
          }
        }
      },
      "figtree-medium": {
        "name": "Figtree Medium",
        "fileName": "Figtree-Medium.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 500,
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -250,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 700,
            "xHeight": 500,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 764,
            "spaceWidth": 250,
            "bbox": {
              "minX": -174,
              "minY": -220,
              "maxX": 1100,
              "maxY": 927
            }
          }
        }
      },
      "figtree-light-italic": {
        "name": "Figtree Light Italic",
        "fileName": "Figtree-LightItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 300,
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -250,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 700,
            "xHeight": 500,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 777,
            "spaceWidth": 250,
            "bbox": {
              "minX": -170,
              "minY": -222,
              "maxX": 1125,
              "maxY": 912
            }
          }
        }
      },
      "figtree-light": {
        "name": "Figtree Light",
        "fileName": "Figtree-Light.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 300,
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -250,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 700,
            "xHeight": 500,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 762,
            "spaceWidth": 250,
            "bbox": {
              "minX": -170,
              "minY": -220,
              "maxX": 1100,
              "maxY": 912
            }
          }
        }
      },
      "figtree-regular-italic": {
        "name": "Figtree Regular Italic",
        "fileName": "Figtree-Italic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 400,
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -250,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 700,
            "xHeight": 500,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 778,
            "spaceWidth": 250,
            "bbox": {
              "minX": -172,
              "minY": -222,
              "maxX": 1124,
              "maxY": 917
            }
          }
        }
      },
      "figtree-extrabold-italic": {
        "name": "Figtree ExtraBold Italic",
        "fileName": "Figtree-ExtraBoldItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 800,
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -250,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 700,
            "xHeight": 500,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 781,
            "spaceWidth": 250,
            "bbox": {
              "minX": -182,
              "minY": -222,
              "maxX": 1119,
              "maxY": 964
            }
          }
        }
      },
      "figtree-extrabold": {
        "name": "Figtree ExtraBold",
        "fileName": "Figtree-ExtraBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 800,
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -250,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 700,
            "xHeight": 500,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 770,
            "spaceWidth": 250,
            "bbox": {
              "minX": -183,
              "minY": -220,
              "maxX": 1100,
              "maxY": 964
            }
          }
        }
      },
      "figtree-bold-italic": {
        "name": "Figtree Bold Italic",
        "fileName": "Figtree-BoldItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 700,
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -250,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 700,
            "xHeight": 500,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 779,
            "spaceWidth": 250,
            "bbox": {
              "minX": -179,
              "minY": -222,
              "maxX": 1120,
              "maxY": 949
            }
          }
        }
      },
      "figtree-bold": {
        "name": "Figtree Bold",
        "fileName": "Figtree-Bold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -250,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 700,
            "xHeight": 500,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 767,
            "spaceWidth": 250,
            "bbox": {
              "minX": -179,
              "minY": -220,
              "maxX": 1100,
              "maxY": 949
            }
          }
        }
      },
      "figtree-black-italic": {
        "name": "Figtree Black Italic",
        "fileName": "Figtree-BlackItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 900,
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -250,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 700,
            "xHeight": 500,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 784,
            "spaceWidth": 250,
            "bbox": {
              "minX": -186,
              "minY": -222,
              "maxX": 1121,
              "maxY": 979
            }
          }
        }
      },
      "figtree-black": {
        "name": "Figtree Black",
        "fileName": "Figtree-Black.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 900,
        "metrics": {
          "layout": {
            "ascent": 950,
            "descent": -250,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 700,
            "xHeight": 500,
            "unitsPerEm": 1000
          },
          "fallback": {
            "avgCharWidth": 784,
            "spaceWidth": 250,
            "bbox": {
              "minX": -206,
              "minY": -220,
              "maxX": 1100,
              "maxY": 979
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
        "static": "Figtree-400-min.woff2",
        "variable": [
          "FigtreeVF-min.ttf",
          "FigtreeVF-min.woff2"
        ]
      },
      "generatedAt": "2025-09-23T14:10:05.556Z"
    }
  }
};
