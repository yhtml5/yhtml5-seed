// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var packageConfig = require('../../package.json')

function getVersionDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return year + '' + month + '' + day + '' + hour + '' + minute + '' + second
}

const indexVersion = '../dist/v' + packageConfig.version + '-' + getVersionDate() + '/index.html'
const assetsRootVersion = '../dist/v' + packageConfig.version + '-' + getVersionDate()

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, indexVersion),
    assetsRoot: path.resolve(__dirname, assetsRootVersion),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
