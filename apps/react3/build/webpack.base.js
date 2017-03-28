const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {version} = require('./util')

module.exports = function () {
  return {
    entry: {
      index: './app/index.js', // path?
    },
    output: {
      filename: 'static/[name].js',
      path: path.resolve(__dirname, '../dist/'),
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
        // favicon: 'static/favicon.ico',
        // minify: {
        //   collapseWhitespace: true,
        //   removeComments: true,
        //   removeScriptTypeAttributes: true,
        //   removeStyleLinkTypeAttributes: true,
        //   trimCustomFragments: true
        // }
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
