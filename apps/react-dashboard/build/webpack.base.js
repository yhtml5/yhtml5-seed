const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { version, title } = require('./config')()

module.exports = function (env) {
  console.log('\n  The process.env.NODE_ENV is: ', chalk.cyan.bold(process.env.NODE_ENV, env), '\n')

  const extractPcss = new ExtractTextPlugin(`static/[name]${(process.env.NODE_ENV === 'production') ? '.[chunkhash:6]' : ''}.pcss.css`)
  const extractAntd = new ExtractTextPlugin(`static/[name]${(process.env.NODE_ENV === 'production') ? '.[chunkhash:6]' : ''}.antd.css`)

  return {
    // context: path.resolve(__dirname, "./app"),
    entry: {
      author: './build/template/author.js',
      index: (process.env.NODE_ENV === 'development')
        ? ['react-hot-loader/patch', 'webpack-hot-middleware/client', './app/index.jsx']
        : ['./app/index.jsx'],
      vendorReact: ['react', 'react-dom', 'redux-thunk', 'react-router-redux', 'react-router-dom', 'react-redux'],
      // ajax: './app/util/ajax.js'
    },
    output: {
      filename: 'static/[name].js',
      chunkFilename: `static/[name]-[id]${(env === 'production') ? '.[chunkhash:6]' : ''}.js`,
      path: path.resolve(__dirname, `../dist/${process.env.NODE_ENV === 'production' ? version : ''}`),
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
        // reqwest: "./node_modules/reqwest/reqwest" + (process.env.NODE_ENV === 'production') ? '.min' : '' + ".js",
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
                sourceMap: false,
                // importLoaders: 1,
              }
            }, {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('postcss-smart-import')({/* ...options */ }),
                    require('precss')({/* ...options */ }),
                    require('autoprefixer')({/* ...options */ })
                  ]
                }
              }
            }]
          })
        },
        {
          test: /\.css$/,
          //include: /wangeditor/,
          exclude: /antd/,
          use: extractPcss.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                minimize: env === 'production',
                sourceMap: false,
              }
            }]
          })
        },
        {
          test: /\.css$/,
          include: /antd/, //[path.resolve(__dirname, "../node_modules/antd")],
          use: [{
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
            options: {
              modules: false,
              minimize: env === 'production',
              sourceMap: false,
            }
          }]
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
            loader: 'url-loader',//https://github.com/webpack/file-loader
            options: {
              name: '[name].[hash:6].[ext]',
              limit: 5000,
              outputPath: 'static/img/',
              publicPath: '',//works when you just want to prefix the name with a directory
            }
          }]
        }, {
          test: /\.md$/,
          use: [
            {
              loader: "html-loader"
            },
            {
              loader: "markdown-loader",
              options: {
                // highlight: function (code) {
                //   return require('highlight').highlightAuto(code).value;
                // }
                //pedantic: true,
                //renderer
              }
            }
          ]
        }
      ],
    },
    plugins: [
      extractPcss,
      extractAntd,
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV === 'production' ? 'production' : 'development'),
          'version': JSON.stringify(version),
          'title': JSON.stringify(title)
        },
        'DEBUG': process.env.NODE_ENV !== 'production'
      }),
      new HtmlWebpackPlugin({
        chunks: ['author', 'index', 'vendorReact', 'manifest'],
        // excludeChunks: [''],
        filename: 'index.html',
        template: path.resolve(__dirname, './template/template.js'),
        chunksSortMode: 'dependency',
        title: title,
        hash: false,
        cache: true,
        favicon: './app/static/favicon.ico',
        minify: (env === 'production') ?
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
        minChunks: 2,
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
