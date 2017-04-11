import reqwest from 'reqwest'
import message from 'antd/lib/message/index'
import {config, getApiUrl} from '../config.js'
import {history} from '../redux/store'
import {getCookie} from './cookie.js'
import {validator} from  './validator'
let {cookie, entryUrl} = config()

function ajax(url, param, fail, error, success) {
  // console.clear()
  if (!validator.isString(url)) {
    return console.warn('ajax url should be a non-empty string')
  } else if (!(validator.isObject(param) || validator.isString(param))) {
    return console.warn('ajax param should be the object')
  } else if (!(validator.isFunction(fail) && validator.isFunction(error) && validator.isFunction(success))) {
    return console.warn('ajax callback should be a function')
  } else {
  }
  let newParam = {
    data: JSON.stringify(param),
    token: getCookie(cookie.token)
  }
  console.log('ajaxParam-' + url + ': ', newParam)
  reqwest({
    url: getApiUrl() + '/' + url,
    type: 'json',
    method: 'get',
    data: newParam,
    contentType: 'application/json',
    error: function (error) {
      message.destroy()
      message.error('网络异常, http状态码：' + error.status, 3);
      console.error(error)
      fail()
    },
    success: function (response) {
      message.destroy()
      if (response.code === 20000) {
        success(response)
      } else if (response.code === 50002) {
        message.info('当前登录状态已失效，2秒后自动将跳转到登录页...', 3);
        setTimeout(() => {
          history.push(entryUrl)
        }, 2000)
      } else {
        message.error((response.error.errorMsg) ? response.error.errorMsg : '网络异常')
        error()
      }
      console.log('ajaxResponse-' + url + ': ', response)
    }
  })
}

export default ajax
