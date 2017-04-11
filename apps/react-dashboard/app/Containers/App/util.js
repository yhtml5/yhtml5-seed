import {config} from '../../config'
import {validator} from '../../util/validator'
import {getCookie} from '../../util/cookie'
import {history} from '../../redux/store'

function searchKeyWithPathname(url) {
  let keyIndex = 10
  config.siteMap.map((value, index) => {
    if (value.url == url) {
      return keyIndex = index
    }
    let subIndex = index
    if (validator.isArrayNotEmpty(value.items)) {
      value.items.map((value, index) => {
        if (value.url == url) {
          return keyIndex = subIndex
        }
      })
    }
  })
  return config.siteMap[keyIndex].key
}

let awaitStatus = true

function notRepeating(fun) {
  setTimeout(() => awaitStatus = true, 2000)
  if (awaitStatus) {
    awaitStatus = false
    fun()
  }
}

function downLoad(url) {
  if (validator.isStringNotEmpty(url)) {
    let a = document.createElement('a')
    a.href = encodeURI(url)
    a.download = 'excel'
    a.id = 'downLoad'
    a.style.display = 'none'
    // a.click()
    document.body.appendChild(a)
    document.getElementById('downLoad').click()
    document.body.removeChild(document.getElementById('downLoad'))
    a = null
  } else {
    console.error('function downLoad url should be a not empty string')
  }
}

function checkToken() {
  console.log(getCookie('token'), !getCookie('token'), history.location.pathname, history.location.pathname !== '/login')
  if (!getCookie('token') && history.location.pathname !== '/login') {
    // 提示信息失效请登录
    history.push('/login')
  }
}

export {searchKeyWithPathname, notRepeating, downLoad, checkToken}
