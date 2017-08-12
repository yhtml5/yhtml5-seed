process.env.NODE_ENV = 'production'
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.base.js')
const webpackAnalyze = require('./webpack.analyze')

module.exports = function (env) {
  return webpackMerge(commonConfig(env), {
    output: {
      filename: 'static/[name].[chunkhash:6].js',
      //path: path.resolve(__dirname, '../dist/' + version),
      // publicPath: './',
      // sourceMapFilename: '[name].map'
    },
    plugins: [
      webpackAnalyze,
      (env === 'debug')
        ? () => {
        }
        : new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          mangle: {
            screw_ie8: true,
            keep_fnames: true
          },
          compress: {
            warnings: false,
            screw_ie8: true,
          },
          comments: false
        })
    ],
    performance: {
      hints: 'warning'
    }
  })
}
