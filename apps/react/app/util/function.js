import {validator} from './validator'

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
    a.href = url
    a.download = 'hello.world'
    a.click()
    a = null
  } else {
    console.error('function downLoad url should be a not empty string')
  }
}

export {notRepeating, downLoad}
