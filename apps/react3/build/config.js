function config() {
  const hostname = 'localhost'
  const port = 9999
  return {
    hostname,
    port,
    origin: 'http://' + hostname + ':' + port,
    domain: ''
  }
}

module.exports = config
