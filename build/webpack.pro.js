const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const config = require('./webpack.config')

module.exports = function (env) {
    return webpackMerge(config(), {
        devtool: false,
        plugins: [
            new webpack.DefinePlugin({
                //this performs search-and-replace operations on the original source code. Any occurrence of process.env.NODE_ENV in the imported code is replaced by by "production"
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                },
            }),
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    comments: false,  // remove all comments, include copyright information
                },
                compress: {
                    warnings: false
                }
                // sourceMap: true
                //config.devtool && (config.devtool.indexOf("sourcemap") >= 0 || config.devtool.indexOf("source-map") >= 0),
                //Specify an output file where to generate source map.
            }),

        ]
    })
}
