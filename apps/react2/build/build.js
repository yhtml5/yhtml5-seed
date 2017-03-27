// https://github.com/shelljs/shelljs
// https://github.com/sindresorhus/ora
// require('./check-versions')()
var ora = require('ora')
require('shelljs/global')
var path = require('path')
var webpack = require('webpack')
var webpackConfig = require('./webpack.pro.js')

var spinnerSetting = ora('Setting NODE_ENV')
spinnerSetting.start()
spinnerSetting.color = 'blue'
env.NODE_ENV = 'production'

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

spinnerSetting.succeed()
spinnerSetting.stop()

var spinnerWebpack = ora('Webpack for production...')
spinnerWebpack.start()
spinnerWebpack.color = 'blue'

// "prebuild":"clear",
// "build":"NODE_ENV=production  webpack --progress --hide-modules --colors --config build/webpack.pro.js",
// var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
// rm('-rf', assetsPath)
// mkdir('-p', assetsPath)
// cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinnerWebpack.succeed()
  spinnerSetting.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
      children: false,
      chunks: false,
      chunkModules: false,
      colors: true,
      modules: false,
      progress: true,
    }) + '\n')
})




