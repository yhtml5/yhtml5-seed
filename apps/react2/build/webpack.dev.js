const path = require('path');
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'production'
const config = require('./webpack.base.js')

module.exports = function (env) {
  return webpackMerge(config(), {
    entry: {
      hot: 'react-hot-loader/patch',
    },
    devtool: "cheap-module-source-map",
    devServer: {
      clientLogLevel: "info",
      contentBase: path.join(__dirname, "../dist"),
      compress: true,
      host: "0.0.0.0",
      hot: true,
      inline: true,
      port: 61200,
      publicPath: '/',
      noInfo: false,
      quiet: false,
      watchContentBase: false,
      historyApiFallback: true,
    },
    plugins: [
      new DashboardPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ],
    performance: {
      hints: false
    }
  })
}
