import { UpdateState } from './action'
import { setCookie, getCookie, clearCookie } from '../../util/cookie'
import { history } from '../../redux/store'
import { validator } from '../../util/validator'
import { ajaxLogin, ajaxLogout } from './ajax'
import { config } from '../../config'
const { title, root, cookie } = config()

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

function init() {
  return (dispatch, getState) => {
    dispatch(updateState({
      root: false,
      LoginLoading: false
    }))
  }
}

const login = (values) =>
  async (dispatch, getState) => {
    process.env.NODE_ENV === 'production' || console.log('loginIn', getState(), values)

    dispatch(updateState({ ...values, LoginLoading: true }))
    clearCookie()

    const params = getState().login
    if (params.LoginName === root.name && params.LoginPassword === root.password) {
      setCookie(cookie.token, cookie.tokenValue, 3)
      dispatch(updateState({ root: true, LoginLoading: true }))
      history.push('/')
      return
    }

    await ajaxLogin({ ...params }, dispatch)
      .then(() => {
        setCookie(cookie.token, getState().login.token, 6)
        setCookie(cookie.userName, getState().login.userName, 6)
        history.push('/')
      }).catch(() => {
        console.error('ajaxLogin fail!')
      })

    dispatch(updateState({ root: false, LoginLoading: false }))

    process.env.NODE_ENV === 'production' || console.log('login done!')
  }

const logout = (resolve, reject) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('loginOut', getState())
    }
    const params = getState().login

    await ajaxLogout(params, dispatch, resolve, reject)
    resolve()
    clearCookie()
    dispatch(updateState({ root: false, token: '', userName: '', userId: '' }))
    history.push('/login')
  }

export { updateState, init, login, logout }
