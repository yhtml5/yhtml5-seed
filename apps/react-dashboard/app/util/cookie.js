import {encrypt, decrypted} from './security'

/**
 * set cookie.
 *
 * Todo: sha1
 *
 * @param {String} name
 * @param {String} value
 * @param {number} hour
 */

function setCookie(name, value, hour) {
  let currentTime = new Date()
  currentTime.setTime(currentTime.getTime() + (hour * 60 * 60 * 1000))
  document.cookie = 'token=hello world'
  document.cookie = `${name}=${encrypt(value)};expires=${currentTime.toGMTString()}`
}

const getCookie = (name) => {
  return (new RegExp(name, 'g').test(document.cookie))
    ? decrypted(document.cookie.split(name)[1].split("=")[1].split(";")[0])
    : false
}
const clearCookie = (name) => {
  if (name) {
    setCookie(name, '', -1)
  } else {
    const keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    if (keys) {
      keys.forEach((key) => setCookie(key, '', -1))
    }
  }
}

export {setCookie, getCookie, clearCookie}
