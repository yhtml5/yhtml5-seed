import {UpdateState} from './action'
import {history} from '../../redux/store'
import {validator} from  '../../util/validator'
import {config} from '../../config'
const {title, subTitle} = config()
import {ajax} from  '../../util/index'

// import {searchKeyWithPathname} from './util'
// import {history} from '../store/index'

// const ajax = (url, param, fail, error, success) => require.ensure([], require => {
//   require('../../util/ajax').default(url, param, fail, error, success)
// }, 'ajax')

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
  console.log('submitLogin')
  history.push('/')
  return (dispatch, getState) => {
    console.log('submitLogin', getState(), history)
    dispatch(ajaxLogin())
  }
}

export {updateState, submitLogin}
