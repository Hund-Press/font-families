---
title: Atkinson Hyperlegible
designer: Braille Institute of America
license: OFL-1.1
version: "1.0.0"
description: A new typeface – greater legibility and readability for low vision readers
slug: atkinson-hyperlegible
date: 2025-08-29
---

# {{ title }}

**{{ description }}**

- **Designer**: {{ designer }}
- **License**: {{ license }}
- **Version**: {{ version }}
- **Character Sets**: Latin Extended support

## Font Specimen

<div class="specimen-showcase">
  <div class="specimen-large" data-font="atkinson-hyperlegible">
    <h2>The quick brown fox jumps over the lazy dog</h2>
  </div>
  <div class="specimen-weights" data-font="atkinson-hyperlegible">
    <p style="font-weight: 400;">Regular: The five boxing wizards jump quickly</p>
    <p style="font-weight: 700;">Bold: The five boxing wizards jump quickly</p>
  </div>
  <div class="specimen-styles" data-font="atkinson-hyperlegible">
    <p style="font-style: normal;">Normal: Designed for accessibility and legibility</p>
    <p style="font-style: italic;">Italic: Designed for accessibility and legibility</p>
  </div>
</div>

## Integration Examples

### CSS with @font-face

```css
@font-face {
  font-family: "Atkinson Hyperlegible";
  src: url("https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/atkinson-hyperlegible/fonts/webfonts/AtkinsonHyperlegible-Regular.woff2") format("woff2");
  font-display: swap;
  font-style: normal;
  font-weight: 400;
}

@font-face {
  font-family: "Atkinson Hyperlegible";
  src: url("https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/atkinson-hyperlegible/fonts/webfonts/AtkinsonHyperlegible-Bold.woff2") format("woff2");
  font-display: swap;
  font-style: normal;
  font-weight: 700;
}

body {
  font-family: "Atkinson Hyperlegible", ui-sans-serif, system-ui, sans-serif;
}
```

### HTML with preload

```html
<link rel="preload" 
      href="https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/atkinson-hyperlegible/fonts/webfonts/AtkinsonHyperlegible-Regular.woff2" 
      as="font" 
      type="font/woff2" 
      crossorigin>
```

## License

Atkinson Hyperlegible is licensed under {{ license }} by {{ designer }}.

Free to use in any project, commercial or personal.