/**
 * Crimson Pro Font Family Module
 * 
 * Generated from font-families build system
 * License: OFL-1.1
 * Author: Unknown
 * Version: Unknown
 */

export default {
  "name": "Crimson Pro",
  "key": "crimson-pro",
  "attribution": {
    "license": "OFL-1.1",
    "description": ""
  },
  "weight": {
    "range": "200-900",
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
    }
  },
  "languages": {
    "scripts": [
      {
        "name": "Latin",
        "coverage": 0.647,
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
        "ligatures": [
          "dlig",
          "liga"
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
          "sinf",
          "subs",
          "sups",
          "rvrn"
        ]
      }
    },
    "stylisticSets": null,
    "capabilities": {
      "hasLigatures": true,
      "hasContextualAlternates": false,
      "hasNumericalFeatures": true,
      "hasStylisticSets": false
    }
  },
  "cdnBase": {
    "variable": "https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.10.2/fonts/open-fonts/crimson-pro/fonts/variable/",
    "static": "https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.10.2/fonts/open-fonts/crimson-pro/fonts/webfonts/",
    "ttf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.10.2/fonts/open-fonts/crimson-pro/fonts/ttf/",
    "otf": "https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.10.2/fonts/open-fonts/crimson-pro/fonts/otf/",
    "subsets": "https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.10.2/subsets/crimson-pro/"
  },
  "faces": {
    "variable": {
      "crimson-pro-variable-regular[wght]": {
        "name": "Crimson Pro Variable (weight)",
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
        "metrics": {
          "layout": {
            "ascent": 918,
            "descent": -220,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 587,
            "xHeight": 430,
            "unitsPerEm": 1024
          },
          "fallback": {
            "avgCharWidth": 775,
            "spaceWidth": 256,
            "bbox": {
              "minX": -110,
              "minY": -286,
              "maxX": 1181,
              "maxY": 984
            }
          }
        },
        "weightRange": "200 900"
      },
      "crimson-pro-variable-italic[wght]": {
        "name": "Crimson Pro Italic Variable (weight)",
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
        "metrics": {
          "layout": {
            "ascent": 918,
            "descent": -220,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 587,
            "xHeight": 430,
            "unitsPerEm": 1024
          },
          "fallback": {
            "avgCharWidth": 835,
            "spaceWidth": 256,
            "bbox": {
              "minX": -160,
              "minY": -287,
              "maxX": 1232,
              "maxY": 990
            }
          }
        },
        "weightRange": "200 900"
      }
    },
    "static": {
      "crimson-pro-semibold-italic": {
        "name": "Crimson Pro SemiBold Italic",
        "fileName": "CrimsonPro-SemiBoldItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 600,
        "metrics": {
          "layout": {
            "ascent": 918,
            "descent": -220,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 587,
            "xHeight": 436,
            "unitsPerEm": 1024
          },
          "fallback": {
            "avgCharWidth": 856,
            "spaceWidth": 256,
            "bbox": {
              "minX": -166,
              "minY": -290,
              "maxX": 1260,
              "maxY": 996
            }
          }
        }
      },
      "crimson-pro-semibold": {
        "name": "Crimson Pro SemiBold",
        "fileName": "CrimsonPro-SemiBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 600,
        "metrics": {
          "layout": {
            "ascent": 918,
            "descent": -220,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 587,
            "xHeight": 436,
            "unitsPerEm": 1024
          },
          "fallback": {
            "avgCharWidth": 795,
            "spaceWidth": 256,
            "bbox": {
              "minX": -113,
              "minY": -289,
              "maxX": 1212,
              "maxY": 985
            }
          }
        }
      },
      "crimson-pro-regular": {
        "name": "Crimson Pro Regular",
        "fileName": "CrimsonPro-Regular.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 400,
        "metrics": {
          "layout": {
            "ascent": 918,
            "descent": -220,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 587,
            "xHeight": 430,
            "unitsPerEm": 1024
          },
          "fallback": {
            "avgCharWidth": 775,
            "spaceWidth": 256,
            "bbox": {
              "minX": -110,
              "minY": -286,
              "maxX": 1181,
              "maxY": 984
            }
          }
        }
      },
      "crimson-pro-medium-italic": {
        "name": "Crimson Pro Medium Italic",
        "fileName": "CrimsonPro-MediumItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 500,
        "metrics": {
          "layout": {
            "ascent": 918,
            "descent": -220,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 587,
            "xHeight": 433,
            "unitsPerEm": 1024
          },
          "fallback": {
            "avgCharWidth": 845,
            "spaceWidth": 256,
            "bbox": {
              "minX": -163,
              "minY": -288,
              "maxX": 1245,
              "maxY": 993
            }
          }
        }
      },
      "crimson-pro-medium": {
        "name": "Crimson Pro Medium",
        "fileName": "CrimsonPro-Medium.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 500,
        "metrics": {
          "layout": {
            "ascent": 918,
            "descent": -220,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 587,
            "xHeight": 433,
            "unitsPerEm": 1024
          },
          "fallback": {
            "avgCharWidth": 784,
            "spaceWidth": 256,
            "bbox": {
              "minX": -111,
              "minY": -287,
              "maxX": 1196,
              "maxY": 984
            }
          }
        }
      },
      "crimson-pro-light-italic": {
        "name": "Crimson Pro Light Italic",
        "fileName": "CrimsonPro-LightItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 300,
        "metrics": {
          "layout": {
            "ascent": 918,
            "descent": -220,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 587,
            "xHeight": 427,
            "unitsPerEm": 1024
          },
          "fallback": {
            "avgCharWidth": 827,
            "spaceWidth": 256,
            "bbox": {
              "minX": -157,
              "minY": -286,
              "maxX": 1221,
              "maxY": 987
            }
          }
        }
      },
      "crimson-pro-light": {
        "name": "Crimson Pro Light",
        "fileName": "CrimsonPro-Light.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 300,
        "metrics": {
          "layout": {
            "ascent": 918,
            "descent": -220,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 587,
            "xHeight": 427,
            "unitsPerEm": 1024
          },
          "fallback": {
            "avgCharWidth": 766,
            "spaceWidth": 256,
            "bbox": {
              "minX": -108,
              "minY": -284,
              "maxX": 1169,
              "maxY": 984
            }
          }
        }
      },
      "crimson-pro-regular-italic": {
        "name": "Crimson Pro Regular Italic",
        "fileName": "CrimsonPro-Italic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 400,
        "metrics": {
          "layout": {
            "ascent": 918,
            "descent": -220,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 587,
            "xHeight": 430,
            "unitsPerEm": 1024
          },
          "fallback": {
            "avgCharWidth": 835,
            "spaceWidth": 256,
            "bbox": {
              "minX": -160,
              "minY": -287,
              "maxX": 1232,
              "maxY": 990
            }
          }
        }
      },
      "crimson-pro-extralight-italic": {
        "name": "Crimson Pro ExtraLight Italic",
        "fileName": "CrimsonPro-ExtraLightItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 200,
        "metrics": {
          "layout": {
            "ascent": 918,
            "descent": -220,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 587,
            "xHeight": 425,
            "unitsPerEm": 1024
          },
          "fallback": {
            "avgCharWidth": 820,
            "spaceWidth": 256,
            "bbox": {
              "minX": -155,
              "minY": -285,
              "maxX": 1212,
              "maxY": 985
            }
          }
        }
      },
      "crimson-pro-extralight": {
        "name": "Crimson Pro ExtraLight",
        "fileName": "CrimsonPro-ExtraLight.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 200,
        "metrics": {
          "layout": {
            "ascent": 918,
            "descent": -220,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 587,
            "xHeight": 425,
            "unitsPerEm": 1024
          },
          "fallback": {
            "avgCharWidth": 760,
            "spaceWidth": 256,
            "bbox": {
              "minX": -107,
              "minY": -283,
              "maxX": 1159,
              "maxY": 984
            }
          }
        }
      },
      "crimson-pro-extrabold-italic": {
        "name": "Crimson Pro ExtraBold Italic",
        "fileName": "CrimsonPro-ExtraBoldItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 800,
        "metrics": {
          "layout": {
            "ascent": 918,
            "descent": -220,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 587,
            "xHeight": 443,
            "unitsPerEm": 1024
          },
          "fallback": {
            "avgCharWidth": 883,
            "spaceWidth": 256,
            "bbox": {
              "minX": -174,
              "minY": -293,
              "maxX": 1298,
              "maxY": 1003
            }
          }
        }
      },
      "crimson-pro-extrabold": {
        "name": "Crimson Pro ExtraBold",
        "fileName": "CrimsonPro-ExtraBold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 800,
        "metrics": {
          "layout": {
            "ascent": 918,
            "descent": -220,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 587,
            "xHeight": 443,
            "unitsPerEm": 1024
          },
          "fallback": {
            "avgCharWidth": 823,
            "spaceWidth": 256,
            "bbox": {
              "minX": -117,
              "minY": -293,
              "maxX": 1254,
              "maxY": 994
            }
          }
        }
      },
      "crimson-pro-bold-italic": {
        "name": "Crimson Pro Bold Italic",
        "fileName": "CrimsonPro-BoldItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 700,
        "metrics": {
          "layout": {
            "ascent": 918,
            "descent": -220,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 587,
            "xHeight": 439,
            "unitsPerEm": 1024
          },
          "fallback": {
            "avgCharWidth": 869,
            "spaceWidth": 256,
            "bbox": {
              "minX": -170,
              "minY": -292,
              "maxX": 1278,
              "maxY": 999
            }
          }
        }
      },
      "crimson-pro-bold": {
        "name": "Crimson Pro Bold",
        "fileName": "CrimsonPro-Bold.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 700,
        "metrics": {
          "layout": {
            "ascent": 918,
            "descent": -220,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 587,
            "xHeight": 439,
            "unitsPerEm": 1024
          },
          "fallback": {
            "avgCharWidth": 808,
            "spaceWidth": 256,
            "bbox": {
              "minX": -115,
              "minY": -291,
              "maxX": 1232,
              "maxY": 990
            }
          }
        }
      },
      "crimson-pro-black-italic": {
        "name": "Crimson Pro Black Italic",
        "fileName": "CrimsonPro-BlackItalic.woff2",
        "format": "woff2",
        "fontStyle": "italic",
        "fontWeight": 900,
        "metrics": {
          "layout": {
            "ascent": 918,
            "descent": -220,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 587,
            "xHeight": 446,
            "unitsPerEm": 1024
          },
          "fallback": {
            "avgCharWidth": 895,
            "spaceWidth": 256,
            "bbox": {
              "minX": -177,
              "minY": -295,
              "maxX": 1315,
              "maxY": 1006
            }
          }
        }
      },
      "crimson-pro-black": {
        "name": "Crimson Pro Black",
        "fileName": "CrimsonPro-Black.woff2",
        "format": "woff2",
        "fontStyle": "normal",
        "fontWeight": 900,
        "metrics": {
          "layout": {
            "ascent": 918,
            "descent": -220,
            "lineGap": 0
          },
          "sizing": {
            "capHeight": 587,
            "xHeight": 446,
            "unitsPerEm": 1024
          },
          "fallback": {
            "avgCharWidth": 835,
            "spaceWidth": 256,
            "bbox": {
              "minX": -119,
              "minY": -295,
              "maxX": 1272,
              "maxY": 998
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
        "static": "CrimsonPro-400-min.woff2",
        "variable": [
          "CrimsonProVF-min.ttf",
          "CrimsonProVF-min.woff2"
        ]
      },
      "generatedAt": "2025-09-22T00:07:28.260Z"
    }
  }
};
