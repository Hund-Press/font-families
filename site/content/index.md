---
layout: catalog-home
title: Font Families - Open Font Collection
description: Curated collection of open-licensed fonts for web development
---

# Font Families

A comprehensive font resource platform featuring curated open-licensed fonts, processing tools, and community curation.

## Features

- **Open Source Fonts**: All fonts are available under open licenses (OFL, Apache, MIT)
- **CDN Ready**: Optimized for web delivery via jsDelivr CDN
- **ES Modules**: Import fonts directly into your JavaScript projects
- **UFR Structure**: Unified Font Repository structure for better organization
- **Community Driven**: Accept community contributions of open-licensed fonts

## Quick Start

### Via CDN

```javascript
// Import individual font modules
import { aspekta } from 'https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/dist/modules/aspekta.js'

// Or import all fonts
import allFonts from 'https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/dist/modules/all.js'
```

### Via NPM

```bash
npm install @hund-press/font-families
```

```javascript
import { aspekta } from '@hund-press/font-families'
```

## Font Collection

Browse our curated collection of open-licensed fonts:

<div class="font-grid">
<!-- Font list will be populated by Eleventy data -->
</div>

## Contributing

We welcome contributions of open-licensed fonts! Please see our [contribution guidelines](https://github.com/hund-press/font-families/blob/main/CONTRIBUTING.md) for details.

## License

This project is MIT licensed. Individual fonts retain their original licenses (OFL, Apache, MIT, etc.).