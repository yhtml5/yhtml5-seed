const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (env) {
  console.log('\n  The process.env.NODE_ENV is: ', chalk.cyan.bold(process.env.NODE_ENV), '\n')
  const extractPcss = new ExtractTextPlugin(`static/[name]${(process.env.NODE_ENV === 'production') ? '.[chunkhash:6]' : ''}.pcss.css`)
  const extractAntd = new ExtractTextPlugin(`static/[name]${(process.env.NODE_ENV === 'production') ? '.[chunkhash:6]' : ''}.antd.css`)

  return {
    // context: path.resolve(__dirname, "./app"),
    entry: {
      index: (process.env.NODE_ENV === 'development')
        ? ['react-hot-loader/patch', 'webpack-hot-middleware/client', './app/index.jsx']
        : ['./app/index.jsx'],
      vendorReact: ['react', 'react-dom', 'redux-thunk', 'react-router-redux', 'react-router-dom', 'react-redux'],
      // ajax: './app/util/ajax.js'
    },
    output: {
      filename: 'static/[name].js',
      chunkFilename: 'static/[name]-[id].js',
      path: path.resolve(__dirname, '../dist/')
    },
    resolve: {
      // extensions: [".jsx", ".js"],
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
          test: /\.yhtml$/,
          use: [{
            loader: 'html-loader',
            // options: {
            //     root: resolve(__dirname, 'src'),
            //     attrs: ['img:src', 'link:href']
            // }
          }]
        }, {
          test: /\.pcss$/,
          exclude: /node_modules/,
          use: extractPcss.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                modules: true,
                minimize: env === 'production',
                localIdentName: (env === 'production') ? '[local]-[hash:base64:6]' : '[path][name]-[local]',
                camelCase: true,
                // sourceMap: true,
                // importLoaders: 1,
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
          })
        }, {
          test: /\.css$/,
          include: [path.resolve(__dirname, "../node_modules/antd")],
          use: extractAntd.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                minimize: env === 'production'
              }
            }]
          })
        }, {
          test: /\.(js|jsx)$/,
          include: [
            path.resolve(__dirname, "../app")
          ],
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                // ["env", {
                //   "targets": {
                //     "browsers": ["last 2 versions", "safari >= 7"]
                //   }
                // }],
                ["es2015", {
                  "modules": false
                }],
                "stage-2",
                "react"
              ],
              plugins: [
                'transform-runtime',
                ["import", {
                  "libraryName": "antd",
                  "style": "css" //`style: true` 会加载 less 文件
                }]
              ]
            }
          }
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
      extractPcss,
      extractAntd,
      new HtmlWebpackPlugin({
        chunks: ['index', 'vendorReact', 'manifest'],
        // excludeChunks: [''],
        filename: 'app.html',
        template: path.resolve(__dirname, './template/template.js'),
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
        children: true,
        async: true,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ["vendorReact", ["index", "vendorReact"]],
        // children: true,
        // async: true,
        // chunks: ['vendorReact'],
        // filename: "vendor.js",
      }),
      new webpack.optimize.CommonsChunkPlugin({
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
    ]
  }
}
