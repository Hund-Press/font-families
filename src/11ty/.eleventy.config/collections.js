export default function(config) {
  // Collection Directory pattern - automatically create "fonts" collection from published/ subfolder
  config.addCollection("fonts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/fonts/published/*.md");
  });
}