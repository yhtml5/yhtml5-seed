import {browserHistory} from 'react-router'
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

function toggleSider() {
  return (dispatch, getState) => {
    console.log('toggleSider', getState())
    const layout = getState().layout
    dispatch(updateState({collapsed: !layout.collapsed}))
    if (layout.collapsed) {
      setTimeout(() => dispatch(updateState({title: title})), 100)
    } else {
      dispatch(updateState({title: subTitle}))
    }
  }
}

export {updateState, toggleSider}
