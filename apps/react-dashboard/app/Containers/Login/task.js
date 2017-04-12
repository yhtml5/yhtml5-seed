import {UpdateState} from './action'
import {setCookie, getCookie, clearCookie} from '../../util/cookie'
import {history} from '../../redux/store'
import {validator} from  '../../util/validator'
import {ajaxLogin, ajaxLogout} from  './ajax'
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
    dispatch(updateState({
      root: false,
      LoginLoading: false
    }))
  }
}

const login = (values) =>
  async (dispatch, getState) => {
    console.log('loginIn', getState(), values)
    dispatch(updateState({...values, LoginLoading: true}))

    const params = getState().login
    const params2 = getState().app
    if (params.LoginName === root.name && params.LoginPassword === root.password) {
      clearCookie()
      setCookie(cookie.token, getState().app.token, 3)
      dispatch(updateState({root: true, LoginLoading: true}))
      history.push('/')
      return
    }

    await ajaxLogin({...params, ...params2}, dispatch)
    console.warn('done!')
    setTimeout(() => dispatch(updateState({LoginLoading: false})), 1000)
  }

const logout = (resolve, reject) =>
  async (dispatch, getState) => {
    console.log('loginOut', getState())
    const params = getState().app

    await ajaxLogout(params, dispatch, resolve, reject)
    resolve()
    console.warn('done!')
    history.push('/login')
    clearCookie()
  }

export {updateState, login, logout, initializeLogin}
