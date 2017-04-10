const isUsername = /^[0-9a-zA-Z.@]{5,30}$/;
const isPassword = /^\S{6,20}$/;

function setCookie(name, value, hour) {
  var currentTime = new Date();
  currentTime.setTime(currentTime.getTime() + (hour * 60 * 60 * 1000));
  document.cookie = name + "=" + value + "; " + "expires=" + currentTime.toGMTString()
}

function addClass(id, className) {
  let c = document.getElementById(id).className
  const reg = new RegExp(className, 'g')
  if (!reg.test(c)) {
    return document.getElementById(id).className = c + ' ' + className
  }
}

function removeClass(id, className) {
  return document.getElementById(id).className = document.getElementById(id).className.replace(' ' + className, '')
}

function addListener(id, event, eventOld, callback) {
  var n = document.getElementById(id);
  if (n.addEventListener) {
    n.addEventListener("click", callback);
  } else if (n.attachEvent) {  // >=IE 8 及更早 IE 版本
    n.attachEvent("onclick", callback);
  }
}

function documentReady(callback) {
  if (document.readyState === 'complete' || document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

function fade(id, time, opacity) {
  var style = document.getElementById(id).style
  style.transition = 'opacity ' + time + 's';
  style.opacity = opacity;
}

export {isPassword, isUsername, setCookie, addClass, removeClass, fade, addListener, documentReady}
