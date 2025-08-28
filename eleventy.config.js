import * as plugins from './.eleventy.config/all.js'

export default function (_11ty) {
    _11ty.addPlugin(plugins.WebC)
    _11ty.addPlugin(plugins.Styles)
    _11ty.addPlugin(plugins.Fonts)

    return {
        dir: {
            input: 'src',
            output: 'dist',

            data: 'data',
            layouts: 'contexts',
            includes: '',
        },
    }
}