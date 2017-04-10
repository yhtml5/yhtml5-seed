function setCookie(cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = "expires=" + d.toGMTString()
  document.cookie = cname + "=" + cvalue + "; " + expires
}

function getCookie(name) {
  if (new RegExp(name, 'g').test(document.cookie)) {
    return document.cookie.split(name)[1].split("=")[1].split(";")[0]
  } else {
    return false
  }
}

function checkCookie() {
  var user = getCookie("zusername")
  if (user != "") {
    alert("Welcome again " + user)
  }
  else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("zusername", user, 30)
    }
  }
}
function clearCookie(cookieName) {
  document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}
function clearCookieAll() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  if (keys) {
    for (var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
}

export {getCookie, clearCookieAll}
