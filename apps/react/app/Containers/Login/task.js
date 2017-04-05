import {history} from '../../redux/store'
import {UpdateState} from './action'
import {validator} from  '../../util/validator'
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

function submitLogin() {
  history.push('/')
  return (dispatch, getState) => {
    console.log('login', getState(), history)
  }
}

export {updateState, submitLogin}
