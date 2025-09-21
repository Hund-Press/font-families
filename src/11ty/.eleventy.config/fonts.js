export default async function (_11ty) {
    // Simple font slug filter
    _11ty.addFilter("fontSlug", function(name) {
        return name?.toLowerCase().replace(/[^a-z0-9]/g, '-') || ''
    })
}