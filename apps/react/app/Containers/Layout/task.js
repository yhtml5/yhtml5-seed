import {Modal, message, notification} from 'antd';
import {browserHistory} from 'react-router'
import {UpdateState} from './action'
import {validator} from  '../../util/validator'
// import {ajax} from '../util/ajax'
// import config from  '../config'
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
  console.log('toggleSider',)
  return (dispatch, getState) => {
    console.log('toggleSider', getState())
    const layout = getState().layout
    dispatch(updateState({collapsed: !layout.collapsed}))
    if (layout.collapsed) {
      setTimeout(() => dispatch(updateState({title: '家装后台管理系统'})), 100)
    } else {
      dispatch(updateState({title: '管'}))
    }
  }
}

export {updateState, toggleSider}
