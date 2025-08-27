export default {
    permalink(data) {
        return `/fonts/${data.slug}/`
    },
    
    eleventyComputed: {
        // Get font data from the main fontFamilies data
        fontData(data) {
            return data.fontFamilies?.fonts?.[data.slug] || null
        }
    }
}