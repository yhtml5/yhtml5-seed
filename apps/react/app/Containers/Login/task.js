import {UpdateState} from './action'
import {history} from '../../redux/store'
import {validator} from  '../../util/validator'
import ajax from  '../../util/ajax'
import {config} from '../../config'
const {title, subTitle} = config()

// import {searchKeyWithPathname} from './util'
// import {history} from '../store/index'

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

function submitLogin() {
  history.push('/')
  return (dispatch, getState) => {
    console.log('login', getState(), history)
    dispatch(ajaxLogin())
  }
}

export {updateState, submitLogin}
