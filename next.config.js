const {join} = require('path')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

const debug = process.env.NODE_ENV !== 'production'

module.exports = {
  webpack(config, {dev}) {
    if (!dev) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: join(__dirname, 'reports/bundles.html'),
        defaultSizes: 'gzip'
      }))
    }

    config.module.rules = config.module.rules.map(rule => {
      if (rule.loader === 'babel-loader') {
        rule.options.cacheDirectory = false
      }
      return rule
    })

    return config
  },

  assetPrefix: debug ? '' : '/geoverview/',

  exportPathMap() {
    return {
      '/': {page: '/'}
    }
  }
}
