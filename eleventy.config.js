import * as plugins from './src/11ty/.eleventy.config/all.js'

export default function (_11ty) {
  _11ty.addPlugin(plugins.WebC)
  _11ty.addPlugin(plugins.Styles)
  _11ty.addPlugin(plugins.Fonts)

  return {
    dir: {
      input: 'src/11ty',
      output: 'dist/site',

      data: 'data',
      layouts: 'contexts',
      includes: '',
    },
  }
}
