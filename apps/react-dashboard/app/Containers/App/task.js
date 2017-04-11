// import {UpdateState} from './action'
// import {ajax} from '../util/ajax'
// import {validator} from  '../util/validator'
// import config from  '../config'
// import {searchKeyWithPathname} from './util'
// import {history} from '../store/index'
//
// function updateState(data) {
//   if (validator.isObject(data)) {
//     return {
//       type: UpdateState,
//       payload: data
//     }
//   } else {
//     console.error('action updateState params must be a object')
//   }
// }
//
// function ajaxMenus() {
//   return (dispatch, getState) => {
//     dispatch(updateState({}))
//     ajax(
//       'property/site/menus', '',
//       () => {
//         dispatch(updateState({}))
//       },
//       () => {
//         dispatch(updateState({}))
//       },
//       (response) => {
//         Array.prototype.clone = function () {
//           return this.concat()
//         }
//
//         function checkResponse() {
//           if (validator.isArray(response.data)) {
//             return response.data
//           } else {
//             return []
//           }
//         }
//
//         function getMenus() {
//           let newMenus = checkResponse().clone()
//           newMenus[0].children[0] = {
//             key: '10',
//             name: '工作台',
//           }
//           return newMenus
//         }
//
//         function getMenus2() {
//           let newMenus = checkResponse().clone().filter((value) => value.key != '1')
//           let newMenus2 = [{
//             key: '1',
//             name: '首页',
//             children: [{
//               key: '10',
//               name: '工作台',
//             }]
//           }]
//           return newMenus2.concat(newMenus)
//         }
//
//         function mapAuthority(data) {
//           let authority = []
//           let subAuthority = []
//           for (let i = 0; i < data.length; i++) {
//             subAuthority = subAuthority.concat(data[i].children.map((value, index) => value.key))
//           }
//           if (validator.isArray(data)) {
//             authority = data.map((value, index) => value.key).concat(subAuthority, ['10']).sort()
//             return authority
//           } else {
//             return []
//           }
//         }
//
//         dispatch(updateState({
//           permissions: mapAuthority(checkResponse()),
//           menus: getMenus2()
//         }))
//         dispatch(verifyPermissions(history.getCurrentLocation().pathname))
//       }
//     )
//   }
// }
//
//
// function verifyPermissions(pathname) {
//   console.log('verifyPermissions', searchKeyWithPathname(pathname))
//   return (dispatch, getState) => {
//     if (getState().app.permissions.indexOf(searchKeyWithPathname(pathname)) < 0) {
//       notification['warn']({
//         key: 'communities',
//         message: '提示',
//         description: '您没有此功能权限',
//         duration: 6,
//       })
//       history.push('/')
//     }
//     dispatch(updateState({}))
//   }
// }
//
//
// function changeMenus(pathname) {
//   return (dispatch, getState) => {
//     dispatch(updateState({
//       menusCurrent: searchKeyWithPathname(pathname)
//     }))
//   }
// }
//
// function changeCommunitySelect(val) {
//   return (dispatch, getState) => {
//     dispatch(updateState({
//       communityId: val
//     }))
//   }
// }
//
// export {
//   ajaxMenus, updateState,
//   changeMenus, verifyPermissions, changeCommunitySelect
// }
