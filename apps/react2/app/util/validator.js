function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}

function isEmptyArray(array) {
  return (Array.isArray(array) && array.length === 0)
}

function hasCookie(name) {
  var result = new RegExp(name, 'g').test(document.cookie) && !(document.cookie.split(name + '=')[1].split(';')[0] === '');
  return result
}

function hasToken() {
  var result = /ztoken/g.test(document.cookie) && !(document.cookie.split('ztoken=')[1].split(';')[0] === '');
  return result
}
function clearCookieAll() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
}

export {isEmptyObject, isEmptyArray, hasCookie, hasToken, clearCookieAll}
