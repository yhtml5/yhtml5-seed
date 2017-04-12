import {UpdateState} from './action'
import {ajaxPermissions} from './ajax'
import {validator} from  '../../util/validator'
import {config} from  '../../config'
import {searchKeyWithPathname} from './util'
import {history} from '../../redux/store'

function updateState(data) {
  if (validator.isObject(data)) {
    return {
      type: UpdateState,
      payload: data
    }
  } else {
    console.error('action updateState params must be a object')
  }
}

function initializeApp() {
  return (dispatch, getState) => {
    dispatch(getPermissions())
  }
}


const getPermissions = () =>
  async (dispatch, getState) => {
    console.log('getPermissions', getState())
    // dispatch(updateState({LoginLoading: true}))
    await ajaxPermissions({}, dispatch)
    console.warn('getPermissionsDone!')
  }


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


export {updateState, initializeApp}
