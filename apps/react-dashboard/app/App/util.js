// import config from '../config'
// import {validator} from '../util/validator'
//
// function getToken() {
//   var $token = document.cookie;
//   if ($token && $token.indexOf('token') != -1) {
//     $token = $token.split('token=')[1];
//     return $token;
//   }
//   return $token || '';
// }
//
// function searchKeyWithPathname(url) {
//   let keyIndex = 10
//   config.siteMap.map((value, index) => {
//     if (value.url == url) {
//       return keyIndex =å index
//     }
//     let subIndex = index
//     if (validator.isArrayNotEmpty(value.items)) {
//       value.items.map((value, index) => {
//         if (value.url == url) {
//           return keyIndex = subIndex
//         }
//       })
//     }
//   })
//   return config.siteMap[keyIndex].key
// }
//
// let awaitStatus = true
//
// function notRepeating(fun) {
//   setTimeout(() => awaitStatus = true, 2000)
//   if (awaitStatus) {
//     awaitStatus = false
//     fun()
//   }
// }
//
// function downLoad(url) {
//   if (validator.isStringNotEmpty(url)) {
//     let a = document.createElement('a')
//     a.href = url
//     a.download = 'hello.world'
//     a.click()
//     a = null
//   } else {
//     console.error('function downLoad url should be a not empty string')
//   }
//
// }
// function getApiUrl() {
//   let index = config.domains.findIndex((element, index) => element == window.location.host)
//   console.warn(index)
//   if (index == -1) {
//     return index = 0
//   }
//   return config.domains[index].api
// }
//
// export {getToken, namespace, searchKeyWithPathname, notRepeating, downLoad}
