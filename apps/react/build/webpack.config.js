const path = require('path');
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const minify = require('html-minifier').minify;
const {version, isEnvPro, isEnvDev, isEnvDebug, hasMinString} = require('./webpack.tools.js')

let config = function () {
  return {
    context: path.resolve(__dirname, "../app"),//The base directory, an absolute path, for resolving entry points and loaders from configuration.
    entry: {
      index: './index.jsx',
      vendor: ['react', 'react-dom', 'react-redux', 'react-router', 'react-router-redux', 'redux',],
      login: './login.js',
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, '../app'),
        react: "react/dist/react" + hasMinString() + ".js",
        "react-dom": "react-dom/dist/react-dom" + hasMinString() + ".js",
        "react-redux": "react-redux/dist/react-redux" + hasMinString() + ".js",
        "react-router": "react-router/umd/ReactRouter" + hasMinString() + ".js",
        "react-router-redux": "react-router-redux/dist/ReactRouterRedux" + hasMinString() + ".js",
        redux: "redux/dist/redux" + hasMinString() + ".js",
      }
    },
    output: {
      filename: 'static/[name].[hash:6].js',//determines the name of each output bundle
      path: path.resolve(__dirname, '../dist/' + version),//The base directory, an absolute path
      pathinfo: false,//include comments in bundles with information about the contained modules
      publicPath: "./",//the URL of your output.path from the view of the HTML page,if you want to open from the local files, you can set './'
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
        test: /favicon\.png$/,
        use: [{
          loader: 'file-loader',//https://github.com/webpack/file-loader
          options: {
            name: '[name].[ext]?[hash]'
          }
        }]
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader", //string | object | loader[] the loader(s) that should be used when the css is not extracted (i.e. in an additional chunk when allChunks: false)
          notExtractLoader: "style-loader",
          loader: [
            'css-loader',//https://css-modules.github.io/webpack-demo/
            //"css-loader?sourceMap",//(required) the loader(s) that should be used for converting the resource to a css exporting module
            // 'postcss-loader'//[https://github.com/postcss/postcss,https://github.com/postcss/postcss-loader]
          ],
          query: {
            // modules: true,
            // importLoaders: 1,
            // localIdentName: '[name]-[local]-[hash:base64:5]',
            minimize: true,
          },
        })
      }, {
        test: /\.pcss$/,
        // use: [
        //     'style-loader',
        //     'css-loader?modules',
        //     'postcss-loader',
        // ],
        loader: ExtractTextPlugin.extract({//https://github.com/yhtml5/less-loader
          fallbackLoader: "style-loader", //string | object | loader[] the loader(s) that should be used when the css is not extracted (i.e. in an additional chunk when allChunks: false)
          notExtractLoader: "style-loader",
          loader: [
            'css-loader',//https://css-modules.github.io/webpack-demo/, https://github.com/css-modules/css-modules
            //"css-loader?sourceMap",//(required) the loader(s) that should be used for converting the resource to a css exporting module
            // 'postcss-loader'//[https://github.com/postcss/postcss,https://github.com/postcss/postcss-loader]
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
          publicPath: "/",// override the publicPath setting for this loader
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
      }]
    },
    plugins: [
      new ExtractTextPlugin({//https://github.com/webpack/extract-text-webpack-plugin
        filename: 'static/[name].[contenthash:6].css',
        disable: false,//disables the plugin
        allChunks: true,//extract from all additional chunks too (by default it extracts only from the initial chunk(s))
      }),
      new webpack.optimize.CommonsChunkPlugin({ //https://webpack.js.org/plugins/commons-chunk-plugin/
        names: ['vendor', 'manifest'],// Specify the common bundle's name.
        chunks: ['vendor', 'index'],//Select the source chunks by chunk names, the chunk must be a child of the commons chunk.
        // If omitted all entry chunks are selected.
        // filename: 'common',//The filename template for the commons chunk
        // minChunks: Infinity, //number|Infinity|function(module, count) -> boolean
        // Infinity (with more entries, this ensures that no other module goes into the vendor chunk)
        // children: true, //If `true` all children of the commons chunk are selected
        // async: true, // (create an async commons chunk)

      }),
      new webpack.DefinePlugin({//http://webpack.github.io/docs/list-of-plugins.html#defineplugin
        DEBUG: !isEnvPro(),
        // VERSION: JSON.stringify(pkgInfo.version),
        // CONFIG: JSON.stringify(config.runtimeConfig)
      }),
      new HtmlWebpackPlugin({//https://github.com/ampedandwired/html-webpack-plugin
        chunks: ['index', 'vendor', 'hot', 'manifest'],//only certain chunks you can limit the chunks being used
        excludeChunks: ['login'],//exclude certain chunks
        filename: 'index.html',
        template: 'template.html',
        title: 'INDEX',
        hash: false,//if true (!default) append a unique webpack compilation hash to all included scripts and CSS files. This is useful for cache busting.
        cache: true, //if true (default) try to emit the file only if it was changed
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
        chunks: ['login', 'hot'],//only certain chunks you can limit the chunks being used
        excludeChunks: ['index', 'hot', 'vendor'],
        filename: 'login.html',
        template: 'login/login.html',
        // template: '!!handlebars!src/index.hbs', // For details on `!!` see https://webpack.github.io/docs/loaders.html#loader-order
        chunksSortMode: 'auto',//'none' | 'auto' | 'dependency' | function
        title: 'LOGIN',
        favicon: 'static/favicon.ico',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          trimCustomFragments: true
        }
      }),
    ]
  };
}

console.log("Node environment: ", process.env.NODE_ENV)
console.log("Webpack absolute path: ", path.resolve(__dirname, "../apps"))

module.exports = config
