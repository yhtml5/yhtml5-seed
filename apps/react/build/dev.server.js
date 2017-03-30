const ora = require('ora')
const opn = require('opn')
const express = require("express")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const webpackConfig = require("./webpack.dev")()
const {port, hostname, origin} = require('./config')()
const app = express()
const compiler = webpack(webpackConfig)

console.log('\n  Hi,又在写bug了？\n')

let loading = ora('Program initialization')
loading.start()
loading.color = 'blue'

// app.use('/static', express.static(__dirname + '../../'))

app.use(webpackDevMiddleware(compiler, {
  // publicPath: webpackConfig.output.publicPath,
  index: 'app.html',
  stats: {color: true},
  historyApiFallback: true
  // noInfo: true,
}))

app.use(webpackHotMiddleware(compiler, {
  // log: console.log,
  // path: '/__webpack_hmr',
  // heartbeat: 10 * 1000
}))

// app.get("/", function(req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

app.listen(port, function () {
  console.log('  you server will running on ' + origin + '\n')
})

loading.succeed()
loading.stop()
setTimeout(() => opn(origin), 1000)
