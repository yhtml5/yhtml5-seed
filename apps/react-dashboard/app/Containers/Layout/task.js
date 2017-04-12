import {UpdateState} from './action'
import {validator} from  '../../util/validator'
import {config} from '../../config'
const {title, subTitle} = config()
import ajax from  '../../util/ajax'

// import ajax from  '../../util/ajax'
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

function toggleSider() {
  return (dispatch, getState) => {
    const layout = getState().layout
    dispatch(ajaxLogin())
    dispatch(updateState({collapsed: !layout.collapsed}))
    if (layout.collapsed) {
      setTimeout(() => dispatch(updateState({title: title})), 100)
    } else {
      dispatch(updateState({title: subTitle}))
    }
  }
}

export {updateState, toggleSider}
