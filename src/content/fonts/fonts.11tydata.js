export default {
    permalink(data) {
        return `/fonts/${data.key}/`;
    },
    
    eleventyComputed: {
        // Get font data from the main fontFamilies data
        fontData(data) {
            return data.fontFamilies?.fonts?.[data.key] || null;
        }
    }
};