/*
 *  Enter JavaScript-style regular expression to display
 *  https://regexper.com/
 *  Write and test regular expression
 *  http://www.regexr.com/
 */

// var is ={
//   types : ["Array", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"]
// };
// for(var i = 0, c; c = is.types[i ++ ]; ){
//   is[c] = (function(type){
//     return function(obj){
//       return Object.prototype.toString.call(obj) == "[object " + type + "]";
//     }
//     )(c);
// }

const validator = {
  isUndefined: function (value) {
    return typeof value === 'undefined'
  },
  isArray: function (value) {
    return Object.prototype.toString.call(value) === '[object Array]'
  },
  isArrayEmpty: function (value) {
    return Array.isArray(value) && value.length === 0
  },
  isArrayNotEmpty: function (value) {
    if (this.isArray(value)) {
      if (this.isArrayEmpty(value)) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  },
  isFunction: function (value) {
    return typeof (value) === "function"
  },
  isNumber: function (value) {
    return Object.prototype.toString.call(value) === '[object Number]'
  },
  isString: function (value) {
    return Object.prototype.toString.call(value) === '[object String]'
  },
  isStringEmpty: function (value) {
    return Object.prototype.toString.call(value) === '[object String]' && value == ''
  },
  isStringNotEmpty: function (value) {
    if (this.isString(value)) {
      if (value == '') {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  },
  isObject: function (value) {
    return Object.prototype.toString.call(value) === '[object Object]'
  },
  isObjectEmpty: function (value) {
    return Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0
  },
  isBankCardNum: function (str) {
    return /^(\d{14}|\d{16}|\d{19})$/.test(str)
  },
  isChinaName: function (str) {
    return /^[\u4e00-\u9fa5]{1,10}$/.test(str)
  },
  isChinaPhoneNum: function (str) {
    return /^(13[0-9]|14[5|7]|15[0-9]|18[0-9])\d{8}$/.test(str)
  },
  isEmail: function (str) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str)
  },
  isIdCard: function (str) {
    return /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(str)
  },
  isNum: function (str) {
    return /^[0-9]*$/.test(str)
  },
  isNumSixToTwenty: function (str) {
    return /^[a-zA-Z0-9]\w{5,19}$/.test(str)
  },
}

export {validator}
