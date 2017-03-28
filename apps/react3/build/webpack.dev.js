const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.base.js')

module.exports = function (env) {
  return webpackMerge(commonConfig(), {
    devtool: 'cheap-module-source-map',
    output: {
      publicPath: '/',
      sourceMapFilename: '[name].map'
      // pathinfo: true,
    },
    devServer: {
      port: 9999,
      host: '0.0.0.0',
      historyApiFallback: true,
      noInfo: false,
      stats: 'minimal',
      publicPath: '/'
    }
  })
}
