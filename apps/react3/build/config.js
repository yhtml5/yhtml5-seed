function config() {
  const hostname = 'localhost'
  const port = 9999
  return {
    hostname,
    port,
    origin: 'http://' + hostname + ':' + port
  }
}

module.exports = config
