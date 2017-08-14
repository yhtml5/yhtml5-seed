// https://github.com/th0r/webpack-bundle-analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { analyzerPort } = require('./config')()

module.exports = new BundleAnalyzerPlugin({
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