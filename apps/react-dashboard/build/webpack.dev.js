process.env.NODE_ENV = 'development'
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.base.js')
const {port} = require('./config')()

module.exports = function (env) {
  return webpackMerge(commonConfig(env), {
    output: {
      publicPath: '/',
      sourceMapFilename: '[name].map'
      // pathinfo: true,
    },
    devtool: 'inline-source-map',
    devServer: {
      clientLogLevel: "info",
      contentBase: path.join(__dirname, "../dist"),
      compress: true,
      host: "0.0.0.0",
      port: port,
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
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      // enable HMR globally
      new webpack.NamedModulesPlugin(),
      // prints more readable module names in the browser console on HMR updates
      new webpack.NoEmitOnErrorsPlugin()
    ]
  })
}
