---
title: Atkinson Hyperlegible
key: atkinson-hyperlegible
description: "A font designed to increase legibility for readers with low vision by emphasizing character recognition"
author: Braille Institute of America
license: OFL-1.1
version: 1.0.0
tags:
  - font
  - accessibility
  - legibility
  - reading
---

**{{ description }}**

- **Designer**: {{ author }}
- **License**: {{ license }}
- **Version**: {{ version }}
- **Character Sets**: Latin Extended support

## Font Specimen

<div class="specimen-showcase">
  <div class="specimen-large" data-font="atkinson-hyperlegible">
    <h2>The quick brown fox jumps over the lazy dog</h2>
  </div>
  <div class="specimen-weights" data-font="atkinson-hyperlegible">
    <div class="weight-demo" data-weight="400">Regular: Typography matters for readability</div>
    <div class="weight-demo" data-weight="400" data-style="italic">Italic: Typography matters for readability</div>
    <div class="weight-demo" data-weight="700">Bold: Typography matters for readability</div>
    <div class="weight-demo" data-weight="700" data-style="italic">Bold Italic: Typography matters for readability</div>
  </div>
</div>

## Quick Integration

### CSS

```css
@font-face {
  font-family: 'Atkinson Hyperlegible';
  src: url('https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/atkinson-hyperlegible/fonts/webfonts/AtkinsonHyperlegible-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: 'Atkinson Hyperlegible', system-ui, sans-serif;
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

Atkinson Hyperlegible is licensed under **{{ license }}** by **{{ author }}**.

Free to use in any project, commercial or personal.

<style>
.specimen-showcase {
  margin: 2rem 0;
  padding: 2rem;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  background: #fafafa;
}

.specimen-large h2 {
  font-size: 2.5rem;
  margin: 0 0 2rem 0;
  line-height: 1.2;
}

.specimen-weights {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.weight-demo {
  font-size: 1.2rem;
  line-height: 1.4;
}

[data-font="atkinson-hyperlegible"] {
  font-family: 'Atkinson Hyperlegible', system-ui, sans-serif;
}

[data-weight="400"] { font-weight: 400; }
[data-weight="700"] { font-weight: 700; }
[data-style="italic"] { font-style: italic; }

pre {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}
</style>