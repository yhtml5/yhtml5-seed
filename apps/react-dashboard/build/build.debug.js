process.env.NODE_ENV = 'production-debug'
const ora = require('ora')
require('shelljs/global')
const path = require('path')
const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')
const webpackConfig = require('./webpack.pro.js')()
// const serve = require('serve')
// const { distributePort } = require('./config')()

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

// const server = serve(__dirname, {
//   port: distributePort,
//   ignore: ['node_modules']
// })
