import WebcPlugin from '@11ty/eleventy-plugin-webc'

export default async function (_11ty) {
    _11ty.addPlugin(WebcPlugin, {
        components: [
            'src/components/**/*.webc',
        ],
    })
}