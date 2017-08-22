const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { version, title, analyzerPort } = require('./config')()

const webpackExtractPcss = new ExtractTextPlugin(`static/[name]${(process.env.NODE_ENV === 'production') ? '.[chunkhash:6]' : ''}.pcss.css`)
const webpackExtractAntd = new ExtractTextPlugin(`static/[name]${(process.env.NODE_ENV === 'production') ? '.[chunkhash:6]' : ''}.antd.css`)

const webpackDefinePlugin = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV === 'production' ? 'production' : 'development'),
    'version': JSON.stringify(version),
    'title': JSON.stringify(title)
  },
  'DEBUG': process.env.NODE_ENV !== 'production'
})

// https://github.com/th0r/webpack-bundle-analyzer
const webpackAnalyzerPlugin = new BundleAnalyzerPlugin({
  analyzerMode: 'static', // [server,static,disabled]
  analyzerHost: '127.0.0.1',
  analyzerPort: analyzerPort,
  defaultSizes: 'parsed',// [stat,parsed,gzip]
  openAnalyzer: true,
  reportFilename: 'report/report.html',
  generateStatsFile: true,
  statsFilename: 'report/stats.json',
  statsOptions: null,
  logLevel: 'info' //['info','warn','error','silent']
})

const webpackUglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  beautify: false,
  mangle: {
    screw_ie8: true,
    keep_fnames: true
  },
  compress: {
    warnings: false,
    screw_ie8: true,
  },
  comments: false
})

const webpackCommonsChunkPlugin = {
  1: new webpack.optimize.CommonsChunkPlugin({
    children: true,
    async: true,
    minChunks: 2,
  }),
  2: new webpack.optimize.CommonsChunkPlugin({
    names: ["vendorReact", ["index", "vendorReact"]],
    // children: true,
    // async: true,
    // chunks: ['vendorReact'],
    // filename: "vendor.js",
  }),
  3: new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  })
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'vendor',
  //   // names: ["vendor", 'react'],
  //   // chunks: ["index", "react"],
  //   // filename: "vendor.js",
  //   minChunks: function (module) {
  //     return module.context && module.context.indexOf('node_modules') !== -1;
  //   },
  // }),
}

const webpackHtmlPlugin = new HtmlWebpackPlugin({
  chunks: ['author', 'index', 'vendorReact', 'manifest'],
  // excludeChunks: [''],
  filename: 'index.html',
  template: path.resolve(__dirname, './template/template.js'),
  chunksSortMode: 'dependency',
  title: title,
  hash: false,
  cache: true,
  favicon: './app/static/favicon.ico',
  minify: (process.env.NODE_ENV === 'production')
    ? {
      collapseWhitespace: true,
      removeComments: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      trimCustomFragments: true
    }
    : () => null
})

module.exports = {
  webpackAnalyzerPlugin,
  webpackCommonsChunkPlugin,
  webpackDefinePlugin,
  webpackExtractPcss,
  webpackExtractAntd,
  webpackHtmlPlugin,
  webpackUglifyJsPlugin,
}