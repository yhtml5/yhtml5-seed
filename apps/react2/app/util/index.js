'use strict';

import api from './apimap';
import Reqwest from 'reqwest';

var tools = {
  /*
   * 调用改核心方法 统一接口处理
   * */
  fetchData: function (param, suc = () => {
  }, err = () => {
  }) {
    var self = this;
    if (this.isString(param)) {
      param = {
        api: param
      };
    }


    param.data = param.data || {}
    param.data.token = this.getToken();
    var arrApi = this._getApi(param.api);
    param.url = param.url || arrApi[0];
    param.method = param.method || arrApi[1];
    param.type = param.type || 'json';

    if (param.type === 'jsonp') {
      param.method = 'get';
      param.type = 'jsonp';
    }
    param.success = function (res = {}) {
      suc(res);
    };
    param.error = function (error) {
      err(error);
    };
    return Reqwest(param);
  },
  getToken() {
    var $token = document.cookie;
    if ($token && $token.indexOf('ztoken') != -1) {
      $token = $token.split('ztoken=')[1];
      return $token;
    }
    return $token || '';
  },
  isToken(code){
    if (code && code == 50002) {
      return true;
    }
  },
  getCookie(params) {
    var $cookie = document.cookie.split(';');
    var arr = {};
    for (var i in params) {
      for (var j in $cookie) {
        if ($cookie[j].split("=")[0].trim() == params[i]) {
          arr[params[i]] = $cookie[j].split("=")[1];
        }
      }
    }
    return arr || '';
  },
  isDaily() {
    var host = window.location.host;
    return host.indexOf('daily') > -1;
  },

  getUrlParam: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = decodeURIComponent(window.location.search.substr(1)).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  _getApi: function (type) {
    if (!type) return ['', 'get'];
    var arr = api[type];
    if (!arr) {
      console.warn('找不到这个api', type);
      return ['', 'get'];
    } else if (this.isString(arr)) {
      arr = [arr, 'get'];
    }

    arr = arr.concat([]);
    var location = window.location,
      hostname = location.hostname;
    //线上
    arr[0] = ' http://192.168.1.235:7111' + arr[0];
    return arr;
  },
  isArray: function (object) {
    return object instanceof Array
  },
  isWindow: function (obj) {
    return obj != null && obj == obj.window
  },
  isDocument: function (obj) {
    return obj != null && obj.nodeType == obj.DOCUMENT_NODE
  },
  isObject: function (obj) {
    return this._type(obj) == "object"
  },
  isFunction: function (fn) {
    return this._type(fn) == "function"
  },
  isPlainObject: function (obj) {
    return this.isObject(obj) && !this.isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
  },
  _type: function (obj) {
    var class2type = {};
    var toString = class2type.toString;
    return obj == null ? String(obj) :
    class2type[toString.call(obj)] || "object"
  },
  isString: function (str) {
    return typeof str === 'string'
  },
  extend: function (target, source) {
    target = target || {};
    source = source || {};
    for (var key in source) {
      target[key] = source[key]
    }
    return target;

  },
  namespace: function (name) {
    return function (v) {
      return name + '-' + v;
    }
  },
  format: function (data) {
    var newData = [];
    data.map((value, index) => {
      newData.push({
        value: value.id,
        label: value.name,
        children: []
      });
      value.children.map((val, i) => {
        newData[index].children.push({
          value: val.id,
          label: val.name
        })
      })
    })
    return newData;
  }
};

export const NameSpace = tools.namespace.bind(tools);
export const Ajax = tools.fetchData.bind(tools);
export const Format = tools.format.bind(tools);
export const GetCookie = tools.getCookie.bind(tools);
export const isToken = tools.isToken.bind(tools);
export const getToken = tools.getToken.bind(tools);
export const getCookie = tools.getCookie.bind(tools)
export default tools;
