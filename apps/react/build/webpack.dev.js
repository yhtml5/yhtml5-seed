const path = require('path');
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config.js')

module.exports = function (env) {
  return webpackMerge(config(), {
    entry: {
      hot: 'react-hot-loader/patch',//activate HMR for React;
      // 'webpack/hot/only-dev-server'//bundle the client for hot reloading only- means to only hot reload for successful updates
      // 'webpack-dev-server/client?http://localhost:8080', (--inline,inline:true)
      // --bundle the client for webpack-dev-server and connect to the provided endpoint

    },
    devServer: {
      clientLogLevel: "info", //[none, error, warning, info (default)]
      contentBase: path.join(__dirname, "../dist"), //serves everything from our dist/ directory
      compress: true, //enable gzip
      host: "0.0.0.0",// server can accessible externally
      hot: true,// enable HMR on the server
      inline: true,//defult inline, <iframe>
      port: 61200,
      publicPath: '/', //The bundled files will be available in the browser under this path.|| demo: /assets/
      noInfo: false,//webpack bundle information that is shown,Errors and warnings will still be shown.
      quiet: false,//errors or warnings from webpack are not visible.
      watchContentBase: false,//File changes will trigger a full page reload
      historyApiFallback: true, //if 404 return
    },
    devtool: "cheap-module-source-map",// [cheap-eval-source-map,cheap-module-source-map,false] , production set false, https://webpack.js.org/configuration/devtool/
    plugins: [
      new DashboardPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      // enable HMR globally
      new webpack.NamedModulesPlugin(),
      // prints more readable module names in the browser console on HMR updates
    ],
    performance: {
      hints: false
    }
  })
}
