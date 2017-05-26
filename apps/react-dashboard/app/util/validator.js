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
    return Object.prototype.toString.call(value) === '[object String]' && value === ''
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
}

export { validator }
