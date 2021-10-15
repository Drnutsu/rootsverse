// new file called "craco-fork-ts-checker-plugin.js"

module.exports = {
  overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions }) => {
    const ForkTsCheckerWebpackPlugin = webpackConfig.plugins.find(
      (plugin) => plugin.constructor.name === 'ForkTsCheckerWebpackPlugin'
    )

    // If we can't find the loader then throw an error.
    if (!ForkTsCheckerWebpackPlugin) {
      throw new Error('could not find ForkTsCheckerWebpackPlugin')
    }

    if (!pluginOptions.memoryLimit) {
      console.log('No memoryLimit option passed in, defaulting to 2048 MB')
    }

    // Loop through each match, increasing memory usage
    ForkTsCheckerWebpackPlugin.memoryLimit = pluginOptions.memoryLimit || 2048

    // if you want to make sure this is working you can console.log(webpackConfig)

    return webpackConfig
  }
}
