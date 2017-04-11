import {UpdateState} from './action'
import {setCookie, getCookie, clearCookie} from '../../util/cookie'
import {history} from '../../redux/store'
import {validator} from  '../../util/validator'
import {ajax} from  '../../util/index'
import {config} from '../../config'
const {title, root, cookie} = config()
// import {history} from '../store/index'
// import {searchKeyWithPathname} from './util'

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

function initializeLogin() {
  return (dispatch, getState) => {
    console.log('initializeLogin')
    dispatch(updateState({
      root: false,
      LoginLoading: false
    }))
  }
}

function ajaxLogin() {
  return (dispatch, getState) => {
    dispatch(updateState({LoginLoading: true}))
    const params = getState().login
    if (params.LoginName === root.name && params.LoginPassword === root.password) {
      clearCookie()
      setCookie(cookie.token, getState().app.token, 3)
      dispatch(updateState({root: true, LoginLoading: true}))
      history.push('/')
      return
    }
    ajax(
      'property/site/menus',
      {
        name: params.LoginName,
        password: params.LoginPassword,
      },
      () => {
        dispatch(updateState({LoginLoading: false}))
      },
      () => {
        setTimeout(() => dispatch(updateState({LoginLoading: false})), 1000)
      },
      (response) => {
        dispatch(updateState({LoginLoading: false}))
      }
    )
  }
}

function submitLogin(values) {
  return (dispatch, getState) => {
    console.log('submitLogin', getState(), values)
    dispatch(updateState(values))
    dispatch(ajaxLogin())
  }
}

export {updateState, submitLogin, initializeLogin}
