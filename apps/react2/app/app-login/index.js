import 'normalize.css'
import reqwest from 'reqwest'
import {isPassword, isUsername, setCookie, addClass, fade, removeClass, addListener, documentReady} from './utils'
import './ie'
import './index.css'

/*
 * 1.you don't need jquery, bootstrap
 * 2.css compress
 * 3.IE 8+
 */

'strict';
var states = {
  loading: function (loading) {
    if (loading) {
      fade('loginForm', '.5', '0')
      addClass('wrapper', 'form-success')
      document.getElementById('loginButton').disabled = true
    } else {
      removeClass('wrapper', 'form-success')
      fade('loginForm', '1', '1')
      setTimeout(function () {
        document.getElementById('loginButton').disabled = false
      }, 1200)
    }
  },
  getValue: function getValue(id) {
    return document.getElementById(id).value
  },
  notice: function (active, message) {
    var n = document.getElementById('notice')
    if (active) {
      setTimeout(() => addClass('notice', 'active'), 800)
      setTimeout(() => removeClass('notice', 'active'), 2800)
      document.getElementById('noticeText').innerHTML = message
    } else {
      // n.classList.remove('active')
      removeClass('notice', 'active')
    }
  }
}

function checkUsername() {
  if (states.getValue('loginUsername') === '') {
    document.getElementById('loginErrorUsername').innerHTML = '用户名不能为空'
    addClass('loginErrorUsername', 'error')
    return false
    // } else if (!isUsername.test(states.getValue('loginUsername'))) {
    //   document.getElementById('loginErrorUsername').innerHTML = '用户名为5-30位，不含特殊字符'
    //   addClass('loginErrorUsername', 'error')
    //   return false
  } else {
    removeClass('loginErrorUsername', 'error');
    return true
  }
}

function checkPassword() {
  if (states.getValue('loginPassword') === '') {
    document.getElementById('loginErrorPassword').innerHTML = '密码不能为空'
    addClass('loginErrorPassword', 'error')
    return false
    // } else if (!isPassword.test(states.getValue('loginPassword'))) {
    //   document.getElementById('loginErrorPassword').innerHTML = '请输入6-20位密码'
    //   addClass('loginErrorPassword', 'error')
    //   return false
  } else {
    removeClass('loginErrorPassword', 'error');
    return true
  }
}

function checkLogin() {
  var loginData = {
    data: JSON.stringify({
      username: states.getValue('loginUsername'),
      password: states.getValue('loginPassword'),
      system_type: '1'
    })
  }

  if (checkUsername() & checkPassword()) {
    states.loading(true)
    states.notice(false, '')
    queryLogin(loginData)
  }
}

function queryLogin(params) {
  reqwest({
    url: "http://192.168.1.235:7111/property/user/login",
    data: params,
    type: 'json',
    method: 'post',
    success: function (response) {
      if (response.code == 20000) {
        setCookie('ztoken', response.data.token, 2)
        location.href = "./app.html"
      } else {
        setTimeout(states.loading, 800, false)
        states.notice(true, response.error.errorMsg)
      }
    },
    error: function (err) {
      setTimeout(states.loading, 800, false)
      console.warn('请检查网络')
    },
  })
}

addListener('loginButton', 'click', 'onclick', function () {
  checkLogin()
})
