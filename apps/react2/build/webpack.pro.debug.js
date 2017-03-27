const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const DashboardPlugin = require('webpack-dashboard/plugin')
const config = require('./webpack.base.js')

module.exports = function (env) {
  return webpackMerge(config(), {
    devtool: "cheap-module-source-map",
    plugins: [
      new DashboardPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false,
        },
        compress: {
          warnings: false
        },
        sourceMap: true
      }),
    ],
  })
}
