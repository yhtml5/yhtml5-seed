var dom =
  '<!--[if lt IE 11]>'
  + '<div class="ie-fixed">'
  + '<div class="">hi,您使用的浏览器版本过低, 请使用新版本的'
  + '<span>谷歌浏览器</span>、<span>UC浏览器</span>'
  + '</div>'
  + '<![endif]-->'

var ieDom = document.createElement('DIV')
ieDom.innerHTML = dom
document.body.appendChild(ieDom)
