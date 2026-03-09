module.exports = function (eleventyConfig) {
  // Copy `src/assets` to `_site/assets`
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addPassthroughCopy("src/css");

  return {
    dir: {
      input: "src", // Input folder
      includes: "_includes", // Folder for aside, header, index.njk
      output: "_site", // Folder where the site is built
    },
  };
};
