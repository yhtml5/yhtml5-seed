const ora = require('ora')
const express = require("express")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackConfig = require("./webpack.dev")()
process.env.NODE_ENV = 'development'

console.log('\n  Hi,又在写bug了？\n')
console.log('  The process.env.NODE_ENV is: ', process.env.NODE_ENV, '\n')

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

app.listen(9999, function () {
  console.log("  you server will running on http://0.0.0.0:9999!\n")
})

loading.succeed()
loading.stop()
