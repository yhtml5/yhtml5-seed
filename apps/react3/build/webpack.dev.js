const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.base.js')

module.exports = function (env) {
  return webpackMerge(commonConfig(), {
    devtool: 'inline-source-map',
    output: {
      publicPath: '/',
      sourceMapFilename: '[name].map'
      // pathinfo: true,
    },
    devServer: {
      clientLogLevel: "info",
      contentBase: path.join(__dirname, "../dist"),
      compress: true,
      host: "0.0.0.0",
      port: 9999,
      hot: true,
      inline: true,
      publicPath: '/',
      quiet: false,
      watchContentBase: false,
      historyApiFallback: true,
      noInfo: false,
      stats: 'minimal',
    },
    performance: {
      hints: false
    }
  })
}
