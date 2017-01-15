function createIframe() {
  var Iframe = document.createElement("iframe");
  Iframe.id = 'app'
  Iframe.width = '0'
  Iframe.height = '0'
  Iframe.src = 'app.html'
  document.body.appendChild(Iframe)
}
