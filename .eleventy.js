module.exports = function(eleventyConfig) {
    // Copy `src/assets , js, css folders` to `_site/assets`
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/css");

    return {
        dir: {
            input: "src", // Input folder
            output: "_site", // Folder where the site is built
            includes: "_includes", // Folder for aside, header, index.njk
        },
    };
};