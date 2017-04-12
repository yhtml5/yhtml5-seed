import {UpdateState} from './action'
import {validator} from  '../../util/validator'
import {config} from '../../config'
const {title, subTitle} = config()
import ajax from  '../../util/ajax'
import {history} from '../../redux/store'
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

function initializeLayout() {
  return (dispatch, getState) => {
    dispatch(updateState({
      root: false,
      LoginLoading: false
    }))
  }
}

function toggleSider() {
  return (dispatch, getState) => {
    const layout = getState().layout
    dispatch(updateState({
      collapsed: !layout.collapsed,
      menusDefaultOpenKeys: [],
    }))
    if (layout.collapsed) {
      setTimeout(() => dispatch(updateState({title: title})), 100)
    } else {
      dispatch(updateState({title: subTitle}))
    }
  }
}


export {updateState, initializeLayout, toggleSider}
