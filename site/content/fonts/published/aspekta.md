---
slug: aspekta
title: Aspekta
description: A versatile sans-serif typeface by Ivo Dolenc, designed for clarity and readability
---

# {{ title }}

**{{ description }}**

- **Designer**: {{ fontData.author }}
- **License**: {{ fontData.license }} 
- **Version**: {{ fontData.version }}
- **Formats**: WOFF2, TTF, Variable Font
- **Character Sets**: Latin (full), Cyrillic support available

{{ fontData.description }}

## Font Specimen

<div class="specimen-showcase">
  <div class="specimen-large" data-font="aspekta">
    <h2 style="font-family: system-ui; font-weight: 400;">The quick brown fox jumps over the lazy dog</h2>
  </div>
  
  <div class="specimen-weights" data-font="aspekta">
    <div class="weight-demo" data-weight="300" style="font-family: system-ui; font-weight: 300;">Light: Typography matters for readability</div>
    <div class="weight-demo" data-weight="400" style="font-family: system-ui; font-weight: 400;">Regular: Typography matters for readability</div>
    <div class="weight-demo" data-weight="500" style="font-family: system-ui; font-weight: 500;">Medium: Typography matters for readability</div>
    <div class="weight-demo" data-weight="700" style="font-family: system-ui; font-weight: 700;">Bold: Typography matters for readability</div>
  </div>
</div>

## Integration Examples

### Basic CSS (Recommended for most projects)

```css
/* {{ title }} - Clean, educational CSS */
/* Font by {{ fontData.author }} under {{ fontData.license }} */

@font-face {
  font-family: 'Aspekta';
  src: url('https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/aspekta/fonts/webfonts/Aspekta-400.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* Prevents invisible text during font load */
}

@font-face {
  font-family: 'Aspekta';
  src: url('https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/aspekta/fonts/webfonts/Aspekta-700.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap; /* Prevents invisible text during font load */
}

/* Usage examples with semantic class names */
.heading-primary {
  font-family: '{{ fontData.name }}', system-ui, sans-serif;
  font-weight: 700;
  font-size: 2rem;
  line-height: 1.2;
}

.body-text {
  font-family: '{{ fontData.name }}', system-ui, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.6;
}

.caption-text {
  font-family: '{{ fontData.name }}', system-ui, sans-serif;
  font-weight: 300;
  font-size: 0.875rem;
  line-height: 1.4;
}
```

### Performance-Optimized HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Preload critical font weights for better performance -->
  <link rel="preload" 
        href="https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/{{ slug }}/fonts/webfonts/{{ fontData.name }}-400.woff2" 
        as="font" 
        type="font/woff2" 
        crossorigin>
  
  <title>Your Site with {{ title }}</title>
  <style>
    /* Inline critical font styles for fastest rendering */
    @font-face {
      font-family: 'Aspekta';
      src: url('https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/aspekta/fonts/webfonts/Aspekta-400.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    
    body {
      font-family: 'Aspekta', system-ui, sans-serif;
      font-weight: 400;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <h1>Beautiful typography with {{ title }}</h1>
  <p>This demonstrates font loading best practices that you can learn from and adapt.</p>
</body>
</html>
```

### JavaScript ES Module

```javascript
// Import font data for programmatic use
import { {{ slug }} } from 'https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/dist/modules/{{ slug }}.js'

// Font data includes metrics, weights, and CDN URLs
console.log('Available weights:', Object.keys({{ slug }}.weights))
console.log('Font metrics:', {{ slug }}.metrics)

// Generate CSS programmatically
function generateFontCSS(fontData, weight = 400) {
  return `
    font-family: '${fontData.name}', system-ui, sans-serif;
    font-weight: ${weight};
    font-display: swap;
  `
}

// Use in your application
document.querySelector('.dynamic-text').style.cssText = generateFontCSS({{ slug }}, 500)
```

## Typography Best Practices

### Choosing Weights Wisely

{{ title }} offers a full range of weights (100-900). For most web projects:

- **300 (Light)**: Captions, secondary text, large headings where delicacy is desired
- **400 (Regular)**: Body text, default weight for readable content  
- **500 (Medium)**: Subheadings, emphasized text without full boldness
- **700 (Bold)**: Primary headings, strong emphasis, call-to-action text

### Performance Considerations

```css
/* Only load weights you actually use */
@font-face {
  font-family: '{{ title }}';
  src: url('https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/{{ slug }}/fonts/webfonts/{{ fontData.name }}-400.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* Critical for performance */
}

/* Variable font alternative - single file for all weights */
@font-face {
  font-family: '{{ title }} Variable';
  src: url('https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/{{ slug }}/fonts/webfonts/{{ fontData.name }}VF.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```

### Accessibility Guidelines

- **Minimum size**: 16px for body text ensures readability
- **Line height**: 1.5-1.6 provides comfortable reading spacing
- **Color contrast**: Ensure WCAG AA compliance (4.5:1 ratio minimum)
- **Fallback fonts**: Always provide system fonts as fallbacks

## Integration Patterns

### Static Site Integration

Perfect for Eleventy, Jekyll, Hugo, or any static site generator:

```html
<!-- In your HTML head -->
<link rel="preload" href="https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/{{ slug }}/fonts/webfonts/{{ fontData.name }}-400.woff2" as="font" type="font/woff2" crossorigin>

<!-- In your CSS -->
body { font-family: '{{ title }}', system-ui, sans-serif; }
```

### Single Page Application

For React, Vue, Svelte applications:

```javascript
// Import font data
import { {{ slug }} } from 'https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/dist/modules/{{ slug }}.js'

// Use in styled-components, emotion, or CSS-in-JS
const StyledText = styled.p`
  font-family: '{{ title }}', system-ui, sans-serif;
  font-weight: ${props => {{ slug }}.weights[props.weight] ? props.weight : 400};
`
```

### Build Tool Integration

Using Webpack, Vite, or Parcel:

```javascript
// Download fonts to your project for offline use
// Then reference locally instead of CDN
@font-face {
  font-family: '{{ title }}';
  src: url('./assets/fonts/{{ fontData.name }}-400.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

## Fork Your Own Font Collection

Want to create your own curated font collection? 

1. **Fork this repository**: [github.com/hund-press/font-families](https://github.com/hund-press/font-families/fork)
2. **Add your fonts**: Place them in `fonts/open-fonts/your-font-name/`
3. **Run the build**: `npm run build` generates everything automatically
4. **Deploy anywhere**: GitHub Pages, Netlify, your own server

Your forked collection will include:
- Automated font processing and optimization
- Generated catalog site (just like this one)
- ES modules for programmatic access  
- Complete independence - no dependencies on our infrastructure

## Technical Details

- **File Size**: ~45KB per weight (WOFF2 format)
- **Character Support**: Latin Extended, basic Cyrillic available
- **OpenType Features**: Kerning, ligatures where applicable
- **Browser Support**: All modern browsers (WOFF2), fallback to system fonts
- **CDN Performance**: Global edge locations via jsDelivr

## License & Attribution

{{ title }} is licensed under **SIL Open Font License 1.1**. 

Original font by **{{ fontData.author }}**. You are free to use this font in any project, commercial or personal. The font files are served via this collection under the same license terms.

**Attribution appreciated but not required** for the font files. If you appreciate this font collection and want to support open font resources, consider linking to [font-families](https://github.com/hund-press/font-families) or the [original font source](https://github.com/hund-press/font-families/tree/main/{{ slug }}).

---

*This font page demonstrates educational integration patterns you can study and adapt. View source to see clean, semantic HTML and inspect the CSS for performance best practices.*