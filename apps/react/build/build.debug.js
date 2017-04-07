const ora = require('ora')
require('shelljs/global')
const path = require('path')
const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')
const webpackConfig = require('./webpack.pro.js')('debug')

webpack(webpackConfig, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
      children: false,
      chunks: false,
      chunkModules: false,
      colors: true,
      modules: false,
      progress: true,
    }) + '\n')
}).apply(new DashboardPlugin())
