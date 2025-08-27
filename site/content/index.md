---
layout: catalog-home
title: Font Families - Community Font Platform
description: Open font collection emphasizing user agency, minimal dependencies, and inspectable code
---

# Font Families

**Community-driven font platform** that puts **user agency** first. No vendor lock-in, no complex frameworks—just clean, inspectable code and beautiful fonts.

## Our Philosophy

This platform embodies principles that web development tools often neglect:

### User Agency Over System Control
- **Fork-first architecture**: Create completely independent font collections
- **No lock-in**: Use fonts anywhere, migrate easily, own your implementation  
- **Minimal user code**: Clean output you can understand and modify

### Inspectable, Real Code
- **View source anywhere**: See actual HTML, CSS, and JS that makes sense
- **Educational examples**: Every integration teaches web typography best practices
- **No black boxes**: Avoid abstract theming systems in favor of semantic naming

### Community Over Commerce  
- **Non-enterprise focus**: Built for individual creators, not business metrics
- **Open by default**: All fonts carry genuinely open licenses (OFL, Apache, MIT)
- **Shared infrastructure**: Community maintenance reduces individual overhead

---

## Quick Start

### Clean CSS (Recommended) {#quick-start}
```css
/* Educational CSS with performance best practices */
@font-face {
  font-family: 'Aspekta';
  src: url('https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/aspekta/fonts/webfonts/Aspekta-400.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* Prevents invisible text during font load */
}

.your-text {
  font-family: 'Aspekta', system-ui, sans-serif; /* Always provide fallbacks */
}
```

### Progressive Enhancement
```html
<!-- Preload critical fonts for performance -->
<link rel="preload" href="https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/aspekta/fonts/webfonts/Aspekta-400.woff2" as="font" type="font/woff2" crossorigin>

<!-- Works without JavaScript, optimizes when available -->
<p style="font-family: 'Aspekta', system-ui, sans-serif;">
  Beautiful typography with graceful fallbacks
</p>
```

### ES Modules (For Dynamic Use)
```javascript
// Import font data for programmatic control
import { aspekta } from 'https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/dist/modules/aspekta.js'

// Full font metrics and metadata available
console.log('Available weights:', Object.keys(aspekta.weights))
console.log('Font characteristics:', aspekta.metrics)
```

---

## Fork Your Own Collection {#fork-first}

**True user agency means complete independence.** Create your own font collection:

1. **[Fork this repository →](https://github.com/hund-press/font-families/fork)**
2. **Add your fonts** to `fonts/open-fonts/your-font-name/`
3. **Run build tools**: `npm run build` processes everything automatically
4. **Deploy anywhere**: GitHub Pages, Netlify, your own infrastructure

Your forked collection includes:
- Complete font processing pipeline  
- Generated catalog site (like this one)
- ES modules for programmatic access
- **Zero dependencies** on our infrastructure

### Why Fork-First?

- **No vendor lock-in**: Your fonts, your infrastructure, your control
- **Community learning**: Study our implementation, improve and share
- **Distributed maintenance**: Reduce single-point-of-failure risks
- **User empowerment**: Tools that increase your independence, not dependence

---

## Available Fonts

*Currently featuring high-quality fonts under open licenses*