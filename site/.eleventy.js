/**
 * Eleventy Configuration for Font Families Catalog Site
 * 
 * Builds a public catalog site showcasing open-licensed fonts
 * Following the llm-notes pattern established in hund-press
 */

export default function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("site/styles");
  eleventyConfig.addPassthroughCopy("fonts/open-fonts");
  eleventyConfig.addPassthroughCopy("aspekta"); // Legacy support
  
  // Set directories
  return {
    dir: {
      input: "site/content",
      includes: "../_includes",
      data: "../_data", 
      output: "site/_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"]
  };
}