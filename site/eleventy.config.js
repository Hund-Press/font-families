// Font Families Catalog Site Configuration
// Following Derek's ESM and modular approach

export default function(eleventyConfig) {
  
  // Copy static assets
  eleventyConfig.addPassthroughCopy("styles/**/*");
  eleventyConfig.addPassthroughCopy("assets/**/*");
  eleventyConfig.addPassthroughCopy("../catalog.json");
  
  // Filters for font processing - educational and inspectable
  eleventyConfig.addFilter("fontSlug", function(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  });
  
  eleventyConfig.addFilter("formatLicense", function(license) {
    const licenseMap = {
      'OFL-1.1': 'SIL Open Font License 1.1',
      'Apache-2.0': 'Apache License 2.0', 
      'MIT': 'MIT License'
    };
    return licenseMap[license] || license;
  });
  
  // Generate educational CSS examples with comments explaining best practices
  eleventyConfig.addFilter("generateFontFaceCSS", function(font) {
    if (!font.static) return '';
    
    let css = `/* ${font.name} - ${font.license} licensed font */\n`;
    css += `/* Font by ${font.author || 'Unknown'} */\n\n`;
    
    // Generate educational CSS with explanatory comments
    Object.entries(font.static).forEach(([filename, fontData]) => {
      if (fontData.weight && filename.includes('.woff2')) {
        const cleanFilename = filename.split('/').pop();
        const cdnUrl = `https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/${font.slug}/fonts/webfonts/${cleanFilename}`;
        
        css += `@font-face {\n`;
        css += `  font-family: '${font.name}';\n`;
        css += `  src: url('${cdnUrl}') format('woff2');\n`;
        css += `  font-weight: ${fontData.weight};\n`;
        css += `  font-style: ${fontData.style};\n`;
        css += `  font-display: swap; /* Prevents invisible text during font load */\n`;
        css += `}\n\n`;
      }
    });
    
    return css;
  });
  
  // Generate complete integration examples
  eleventyConfig.addFilter("generateIntegrationExample", function(font) {
    const examples = {
      css: this.generateFontFaceCSS(font),
      html: `<!-- Preload for better performance -->
<link rel="preload" href="https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/${font.slug}/fonts/webfonts/Aspekta-400.woff2" as="font" type="font/woff2" crossorigin>

<!-- In your CSS -->
.heading { font-family: '${font.name}', system-ui, sans-serif; }`,
      
      js: `// ES Module import
import { ${font.slug} } from 'https://cdn.jsdelivr.net/gh/hund-press/font-families@v1.2.0/dist/modules/${font.slug}.js'

// Use font data programmatically
console.log('Available weights:', Object.keys(${font.slug}.weights))`
    };
    
    return examples;
  });
  
  return {
    dir: {
      input: "content",
      includes: "../_includes", 
      data: "../_data",
      output: "../dist/site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}