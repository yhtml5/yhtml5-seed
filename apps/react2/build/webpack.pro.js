const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const DashboardPlugin = require('webpack-dashboard/plugin')
const config = require('./webpack.base.js')

module.exports = webpackMerge(config(), {
  devtool: false,
  plugins: [
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
      }
    })
  ]
})

