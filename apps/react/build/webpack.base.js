const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function () {
  console.log('\n  The process.env.NODE_ENV is: ', process.env.NODE_ENV, '\n')
  return {
    // context: path.resolve(__dirname, "./app"),
    entry: {
      index: (process.env.NODE_ENV === 'development')
        ? ['react-hot-loader/patch', 'webpack-hot-middleware/client', './app/index.jsx']
        : './app/index.jsx'
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
          test: /\.html$/,
          use: [{
            loader: 'html-loader',
            // options: {
            //     root: resolve(__dirname, 'src'),
            //     attrs: ['img:src', 'link:href']
            // }
          }]
        }, {
          test: /\.(js|jsx)$/,
          include: [
            path.resolve(__dirname, "../app")
          ],
          exclude: /node_modules|build/,
          use: [
            'babel-loader',
          ],
        }, {
          test: /\.pcss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'style-loader'
            }, {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('postcss-smart-import')({/* ...options */}),
                    require('precss')({/* ...options */}),
                    require('autoprefixer')({/* ...options */})
                  ]
                }
              }
            }]
        }, {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
          })
        }, {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          exclude: /favicon\.ico/,
          use: [{
            loader: 'file-loader',//https://github.com/webpack/file-loader
            options: {
              name: '[sha512:hash:base64:7].[ext]',
              outputPath: 'static/img/',
              publicPath: '../img/',//works when you just want to prefix the name with a directory
            }
          }]
        }, {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          exclude: /favicon\.png$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 5000
            }
          }]
        }
      ],
    },
    plugins: [
      new ExtractTextPlugin('static/[name].[chunkhash:6].css'),
      new HtmlWebpackPlugin({
        chunks: ['index', 'vendor', 'manifest'],
        excludeChunks: [''],
        filename: 'app.html',
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
