import {UpdateState} from './action'
import {history} from '../../redux/store'
import {validator} from  '../../util/validator'
import {config} from '../../config'
const {title, subTitle} = config()
import {ajax} from  '../../util/index'

// ====== Basic. ======

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
  console.log('initializeLogin')
}

// ====== Ajax. ======

function ajaxLogin() {
  return (dispatch, getState) => {
    dispatch(updateState({}))
    ajax(
      'property/site/menus', '',
      () => {
        dispatch(updateState({}))
      },
      () => {
        dispatch(updateState({}))
      },
      (response) => {
      }
    )
  }
}

// ====== Business logic. ======

function submitLogin() {
  console.log('submitLogin')
  history.push('/')
  return (dispatch, getState) => {
    console.log('submitLogin', getState(), history)
    dispatch(ajaxLogin())
  }
}

export {updateState, submitLogin, initializeLogin}
