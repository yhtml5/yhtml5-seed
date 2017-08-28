const { version } = require('./util.js')

function config() {
  const hostname = 'localhost'
  const port = 9991
  return {
    hostname,
    port,
    version,
    title: '二维火前端例会',
    origin: 'http://' + hostname + ':' + port,
    analyzerPort: 9992,
    distributePort: 9993,
    domain: '',
    pages: [{
      key: 'app',
      name: 'app.html'
    }, {
      key: 'login',
      name: 'login.html'
    }]
  }
}

module.exports = config
