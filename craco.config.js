const path = require('path')
// const CracoAlias = require('craco-alias')
// const CracoForkTSCheckerPlugin = require('./craco-fork-ts-checker-plugin')

module.exports = {
  // plugins: [
  //   {
  //     plugin: CracoAlias,
  //     options: {
  //       source: 'tsconfig',
  //       tsConfigPath: './tsconfig.base.json',
  //       baseUrl: './',
  //       debug: true
  //     }
  //   }
  // ],
  // plugins: [
  //   {
  //     plugin: CracoForkTSCheckerPlugin,
  //     options: {
  //       memoryLimit: 6144 // set memory usage in MB, in this example 6GB
  //     }
  //   }
  // ],
  babel: {
    loaderOptions: (babelLoaderOptions) => {
      const origBabelPresetCRAIndex = babelLoaderOptions.presets.findIndex(
        (preset) => {
          return preset[0].includes('babel-preset-react-app')
        }
      )

      const origBabelPresetCRA =
        babelLoaderOptions.presets[origBabelPresetCRAIndex]

      babelLoaderOptions.presets[origBabelPresetCRAIndex] =
        function overridenPresetCRA(api, opts, env) {
          const babelPresetCRAResult = require(origBabelPresetCRA[0])(
            api,
            origBabelPresetCRA[1],
            env
          )

          babelPresetCRAResult.presets.forEach((preset) => {
            // detect @babel/preset-react with {development: true, runtime: 'automatic'}
            const isReactPreset =
              preset &&
              preset[1] &&
              preset[1].runtime === 'automatic' &&
              preset[1].development === true
            if (isReactPreset) {
              preset[1].importSource = '@welldone-software/why-did-you-render'
            }
          })

          return babelPresetCRAResult
        }

      return babelLoaderOptions
    }
  },
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')]
    }
  },
  webpack: {
    alias: {
      '@page': path.resolve(__dirname, 'src/page/'),
      '@apis': path.resolve(__dirname, 'src/apis/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@constants': path.resolve(__dirname, 'src/constants/'),
      '@helpers': path.resolve(__dirname, 'src/helpers/'),
      '@abis': path.resolve(__dirname, 'src/abis/'),
      '@images': path.resolve(__dirname, 'public/images/')
    }
  }
}
