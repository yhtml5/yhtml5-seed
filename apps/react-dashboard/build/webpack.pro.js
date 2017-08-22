const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.base.js')
const { webpackBundleAnalyzerPlugin, webpackUglifyJsPlugin } = require('./webpack.plugins')

module.exports = function () {
  return webpackMerge(commonConfig(), {
    output: {
      filename: 'static/[name].[chunkhash:6].js',
      //path: path.resolve(__dirname, '../dist/' + version),
      // publicPath: './',
      // sourceMapFilename: '[name].map'
    },
    plugins: [
      webpackUglifyJsPlugin,
      (process.env.NODE_ENV === 'production-debug')
        ? webpackBundleAnalyzerPlugin
        : () => null
    ],
    performance: {
      hints: 'warning'
    }
  })
}
