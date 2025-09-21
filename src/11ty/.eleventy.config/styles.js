export default async function (_11ty) {
    _11ty.addPassthroughCopy({
        'src/styles': '/css',
    })
}