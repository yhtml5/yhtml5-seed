const ora = require('ora')
const opn = require('opn')
const express = require("express")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackConfig = require("./webpack.dev")()
const {port, hostname, origin} = require('./config')()

console.log('\n  Hi,又在写bug了？\n')

let loading = ora('Program initialization')
loading.start()
loading.color = 'blue'

const app = express()
const compiler = webpack(webpackConfig);

// app.use('/static', express.static(__dirname + '../../'))

app.use(webpackDevMiddleware(compiler, {
  publicPath: "/" // Same as `output.publicPath` in most cases.
}))

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

app.listen(port, function () {
  console.log('  you server will running on ' + origin + '\n')
})

loading.succeed()
loading.stop()
setTimeout(() => opn(origin), 1000)
