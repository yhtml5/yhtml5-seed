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

const isUndefined = (value) => typeof value === 'undefined'
const isNumber = (value) => Object.prototype.toString.call(value) === '[object Number]'
const isString = (value) => Object.prototype.toString.call(value) === '[object String]'
const isStringEmpty = (value) => Object.prototype.toString.call(value) === '[object String]' && value === ''
const isStringNotEmpty = (value) => Object.prototype.toString.call(value) === '[object String]' && value !== ''
const isFunction = (value) => Object.prototype.toString.call(value) === '[object Function]'
const isArray = (value) => Object.prototype.toString.call(value) === '[object Array]'
const isArrayEmpty = (value) => Array.isArray(value) && value.length === 0
const isArrayNotEmpty = (value) => Array.isArray(value) && value.length > 0
const isObject = (value) => Object.prototype.toString.call(value) === '[object Object]'
const isObjectEmpty = (value) => Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0

export {
  isUndefined,
  isNumber,
  isFunction,
  isArray, isArrayEmpty,
  isString, isStringEmpty, isStringNotEmpty,
  isObject, isObjectEmpty, isArrayNotEmpty
}
