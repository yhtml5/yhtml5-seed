const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.base.js')
const {version} = require('./util')


module.exports = function (env) {
  return webpackMerge(commonConfig(), {
    output: {
      filename: 'static/[name].[chunkhash:6].js',
      path: path.resolve(__dirname, '../dist/' + version),
      // publicPath: './',
      // sourceMapFilename: '[name].map'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          warnings: false,
          screw_ie8: true
        },
        comments: false
      })
    ]
  })
}
