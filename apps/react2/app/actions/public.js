'use strict';
import {Ajax, NameSpace, GetCookie} from '../util/';
import  {clearCookieAll} from  '../util/cookie'
import {message} from 'antd';
let ns = NameSpace('public');

export const LOGOUT = ns('LOGOUT');

export const RESET_PASSWORD = ns('RESET_PASSWORD');
export const RESET_PASSWORD_SUCCESS = ns('RESET_PASSWORD_SUCCESS');
export const RESET_PASSWORD_FAILED = ns('RESET_PASSWORD_FAILED');


function tokenInvalid() {
  message.info('登录信息已失效，3秒后将自动跳转到登录页...');
  setTimeout(function () {
    // location.href = "/index.html";
  }, 2000)
}

function logout() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
    })
    Ajax({
      api: 'logout',
      data: {
        data: {},
      }
    }, json => {
      console.log('Response: ', json)
      var code = json.code;
      if (code == 20000) {
        message.success('登出成功，3秒后返回登录页');
        clearCookieAll()
        setTimeout(function () {
          location.href = "/index.html";
        }, 2000)
      } else if (code == 50002) {
        tokenInvalid()
      } else {
        message.error('未知错误，错误信息: ' + json.error.errorMsg);
      }
    }, json => {
      message.error('服务器错误，请检查网络或重试');
    })
  }
}

function resetPassword(params) {
  var defaultParam = {},
    params = Object.assign({}, defaultParam, params);
  params = JSON.stringify(params);
  return (dispatch) => {
    dispatch({
      type: RESET_PASSWORD,
      data: ''
    })
    Ajax({
      api: 'resetPassword',
      data: {
        data: params,
      }
    }, json => {
      console.clear()
      console.log('Response: ', json)
      if (json.code == 20000) {
        message.success('密码修改成功，3秒后返回登录页');
        setTimeout(function () {
          location.href = "/index.html";
        }, 2000)
      } else if (json.code == 50001) {
        message.error(json.error.errorMsg);
      } else if (json.code == 50002) {
        tokenInvalid()
      } else {
        message.error('未知错误，错误信息: ' + json.error.errorMsg);
      }
    }, json => {
      message.error('服务器错误，请检查网络或重试');
    })
  }
}

export {logout, resetPassword, tokenInvalid}
