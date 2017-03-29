const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {version, isMin} = require('./util')

module.exports = function () {
  console.log('  The process.env.NODE_ENV is: ', process.env.NODE_ENV, '\n')
  return {
    // context: path.resolve(__dirname, "../app"),
    entry: {
      index: './app/index.js', // path?
    },
    output: {
      filename: 'static/[name].js',
      path: path.resolve(__dirname, '../dist/'),
    },
    resolve: {
      alias: {
        // '~': path.resolve(__dirname, '../app'),
        // jquery: "jquery/dist/jquery" + isMin() + ".js",
        // react: "./node_modules/react/dist/react" + isMin() + ".js",
        // "react-dom": "./node_modules/react-dom/dist/react-dom" + isMin() + ".js",
        // "react-redux": "./node_modules/react-redux/dist/react-redux" + isMin() + ".js",
        // "react-router": "./node_modules/react-router/umd/ReactRouter" + isMin() + ".js",
        // "react-router-redux": "./node_modules/react-router-redux/dist/ReactRouterRedux" + isMin() + ".js",
        // redux: "./node_modules/redux/dist/redux" + isMin() + ".js",
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: ['to-string-loader', 'css-loader']
          })
        }, {
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader'
        }, {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        }
      ],
    },
    plugins: [
      new ExtractTextPlugin('static/[name].[chunkhash:6].css'),
      new HtmlWebpackPlugin({
        chunks: ['index', 'vendor', 'manifest'],
        excludeChunks: [''],
        filename: 'index.html',
        template: './app/template.js',
        chunksSortMode: 'dependency',
        title: 'Test',
        hash: false,
        cache: true,
        favicon: './app/static/favicon.ico',
        minify: (process.env.NODE_ENV === 'production') ?
          {
            collapseWhitespace: true,
            removeComments: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            trimCustomFragments: true
          }
          : () => null
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        // names: ["vendor", 'react'],
        // chunks: ["vendor", "react"],
        // filename: "vendor.js",
        minChunks: function (module) {
          return module.context && module.context.indexOf('node_modules') !== -1;
        },
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      }),
    ]
  }
}
