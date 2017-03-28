const ora = require('ora')
require('shelljs/global')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.pro.js')()
process.env.NODE_ENV = 'production'

console.log(
  '\n  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)
console.log('  The process.env.NODE_ENV is: ', process.env.NODE_ENV, '\n')

let spinnerSetting = ora('Program initialization')
spinnerSetting.start()
spinnerSetting.color = 'blue'
spinnerSetting.succeed()
spinnerSetting.stop()

let spinnerWebpack = ora('Webpack for production...')

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
