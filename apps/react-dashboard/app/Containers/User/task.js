import {ajaxUserList} from './ajax'
import {UpdateState} from './action'
import {config} from '../../config'
import {validator} from  '../../util/validator'
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

const initializeUser = (values) =>
  async (dispatch, getState) => {
    console.log('initializeUser', getState(), values)
    dispatch(updateState({}))

    const params = getState().user
    const params2 = getState().app

    await ajaxUserList({...params, ...params2}, dispatch)
    console.warn('done!')
    setTimeout(() => dispatch(updateState({LoginLoading: false})), 1000)
  }

const searchUserList = (values) =>
  async (dispatch, getState) => {
    console.log('searchUserList', getState(), values)
    dispatch(updateState({}))

    const params = getState().user
    const params2 = getState().app

    await ajaxUserList({...params, ...params2}, dispatch)
    console.warn('done!')
    setTimeout(() => dispatch(updateState({LoginLoading: false})), 1000)
  }


const resetUserList = (values) =>
  async (dispatch, getState) => {
    console.log('resetUserList', getState(), values)
    dispatch(updateState({}))

    const params = getState().user
    const params2 = getState().app

    await ajaxUserList({...params, ...params2}, dispatch)
    console.warn('done!')
    setTimeout(() => dispatch(updateState({LoginLoading: false})), 1000)
  }

export {updateState, initializeUser, searchUserList, resetUserList}
