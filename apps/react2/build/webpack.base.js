const path = require('path');
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const minify = require('html-minifier').minify;
const {version, isEnvPro, isEnvDev, isEnvDebug, hasMinString} = require('./webpack.tools')

let config = function () {
  return {
    context: path.resolve(__dirname, "../app"),
    entry: {
      index: './index.jsx',
      vendor: ['react', 'react-dom', 'react-redux', 'react-router', 'react-router-redux', 'redux'],
      login: './app-login/index.js',
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, '../app'),
        jquery: "jquery/dist/jquery" + hasMinString() + ".js",
        react: "react/dist/react" + hasMinString() + ".js",
        "react-dom": "react-dom/dist/react-dom" + hasMinString() + ".js",
        "react-redux": "react-redux/dist/react-redux" + hasMinString() + ".js",
        "react-router": "react-router/umd/ReactRouter" + hasMinString() + ".js",
        "react-router-redux": "react-router-redux/dist/ReactRouterRedux" + hasMinString() + ".js",
        redux: "redux/dist/redux" + hasMinString() + ".js",
      }
    },
    output: {
      filename: 'static/js/[name].[hash:6].js',
      path: path.resolve(__dirname, '../dist/' + version),
      pathinfo: false,
      publicPath: "./",
    },
    module: {
      rules: [{
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          // options: {
          //     root: resolve(__dirname, 'src'),
          //     attrs: ['img:src', 'link:href']
          // }
        }]
      }, {
        //     test: /\.html$/,
        //     use: [{
        //         loader: 'html-loader',
        //         options: {
        //             root: resolve(__dirname, 'src'),
        //             attrs: ['img:src', 'link:href']
        //         }
        //     }]
        // }, {
        test: /favicon\.ico/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }]
      }, {
        test: /\.(css|less)$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          notExtractLoader: "style-loader",
          loader: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              minimize: true,
            }
          }, {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }]
        })
      }, {
        test: /\.pcss$/,
        // use: [
        //     'style-loader',
        //     'css-loader?modules',
        //     'postcss-loader',
        // ],
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          notExtractLoader: "style-loader",
          loader: [
            'css-loader',
            //"css-loader?sourceMap",
            // 'postcss-loader'
          ],
          query: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]-[local]-[hash:base64:5]',
            // minimize: true,
            camelCase: true,
            // function (loaderContext, localIdentName, localName, options) {
            // return 'whatever_random_class_name'
            // ?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]
            // }
          },
          publicPath: "/",
        })
      }, {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
        // use: ['babel-loader', 'eslint-loader']
      }, {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.ico/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[sha512:hash:base64:7].[ext]',
            outputPath: 'static/img/',
            publicPath: '../img/',
          }
        }]
      }]
    },
    plugins: [
      // new webpack.ProvidePlugin({
      //   $: 'jquery',
      //   jQuery: 'jquery',
      //   'window.jQuery': 'jquery'
      // }),
      new ExtractTextPlugin({
        filename: 'static/css/[name].[contenthash:6].css',
        disable: false,
        allChunks: true,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
        chunks: ['vendor', 'index'],
        // If omitted all entry chunks are selected.
        // filename: 'common',
        // minChunks: Infinity,
        // Infinity (with more entries, this ensures that no other module goes into the vendor chunk)
        // children: true,
        // async: true,
      }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   names: ['loginVendor', 'loginManifest'],
      //   chunks: ['loginVendor', 'login'],
      // }),
      new webpack.DefinePlugin({
        DEBUG: !isEnvPro(),
        // VERSION: JSON.stringify(pkgInfo.version),
        // CONFIG: JSON.stringify(config.runtimeConfig)
      }),
      new HtmlWebpackPlugin({
        chunks: ['index', 'vendor', 'hot', 'manifest'],
        excludeChunks: ['login', 'jquery'],
        filename: 'app.html',
        template: 'template.jsx',
        title: '智慧社区运营管理后台',
        hash: false,
        cache: true,
        favicon: 'static/favicon.ico',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          trimCustomFragments: true
        }
      }),
      new HtmlWebpackPlugin({
        chunks: ['login'],
        excludeChunks: ['index', 'vendor', 'hot'],
        filename: 'index.html',
        template: 'template.jsx',
        // template: '!!handlebars!src/index.hbs',
        // chunksSortMode: function (chunk1, chunk2) {
        //   var orders = ['jquery', 'login'];
        //   var order1 = orders.indexOf(chunk1.names[0]);
        //   var order2 = orders.indexOf(chunk2.names[0]);
        //   if (order1 > order2) {
        //     return 1;
        //   } else if (order1 < order2) {
        //     return -1;
        //   } else {
        //     return 0;
        //   }
        // },
        title: '登录',
        favicon: 'static/favicon.ico',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          trimCustomFragments: true
        }
      }),
      // new HtmlWebpackPlugin({
      //   chunks: ['register'],//only certain chunks you can limit the chunks being used
      //   excludeChunks: ['index', 'hot', 'vendor'],
      //   filename: 'register.html',
      //   template: 'template.jsx',
      //   // template: '!!handlebars!src/index.hbs',
      //   chunksSortMode: 'auto',
      //   title: '注册',
      //   favicon: 'static/favicon.ico',
      //   minify: {
      //     collapseWhitespace: true,
      //     removeComments: true,
      //     removeScriptTypeAttributes: true,
      //     removeStyleLinkTypeAttributes: true,
      //     trimCustomFragments: true
      //   }
      // }),
    ]
  };
}

console.log("Node environment: ", process.env.NODE_ENV)
console.log("Webpack absolute path: ", path.resolve(__dirname, "../app"))

module.exports = config
