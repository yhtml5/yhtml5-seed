import { config } from '../../config'
import { getCookie } from '../../util/cookie'
import { isObject,isArrayEmpty,isStringEmpty } from '../../util/validator'
import { updateState as updateLoginState } from '../Login/task'
import { UpdateState } from './action'
import { ajaxPermissions, ajaxChannelColumnsList, ajaxLabels, ajaxUploadToken } from './ajax'
import { history } from '../../redux/store'

const { title, root, cookie } = config()

/**
 * Todo
 *
 * 1. Merge [changeSelectChannels/changeSelectColumns、 selectChannels/selectColumns]
 *
 */

function updateState(data) {
  if (isObject(data)) {
    return {
      type: UpdateState,
      payload: data
    }
  } else {
    console.error('action updateState params must be a object')
  }
}

function initializeApp() {
  process.env.NODE_ENV === 'production' || console.log('initializeApp', getCookie(cookie.token))

  return (dispatch, getState) => {
    dispatch(getPermissions())
    dispatch(updateLoginState({
      token: getCookie(cookie.token),
    }))
    dispatch(updateState({
      selectColumns: [],
      selectedChannel: undefined,
      selectedColumn: undefined,
      selectedLabel: undefined,
    }))

    if (history.location.pathname !== '/login') {
      if (isArrayEmpty(getState().app.selectChannels)) {
        ajaxChannelColumnsList(dispatch)
      }
      if (isStringEmpty(getState().app.uploadToken)) {
        ajaxUploadToken(dispatch)
      }
    }
  }
}


const getPermissions = () =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('getPermissions', getState())
    }
    // dispatch(updateState({LoginLoading: true}))
    await ajaxPermissions({}, dispatch)
    console.warn('getPermissionsDone!')
  }

const changeSelectChannels = (channel) =>
  async (dispatch, getState) => {
    let keyIndex = 0
    let channels = getState().app.selectChannels

    channels.forEach((value, index) => {
      if (value.channel_id === channel) {
        return keyIndex = index
      }
    })

    dispatch(updateState({
      selectColumns: channels[keyIndex].columns,
    }))
  }

const changeSelectColumns = (column) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('changeSelectColumns', getState(), column)
    }
    const channel = getState().app.selectedChannel

    // await ajaxLabelsWithParams(dispatch, {channel, column})

    // dispatch(updateState({
    //   selectedLabel: undefined
    // }))
  }

const selectChannels = (id, isLabel) =>
  async (dispatch, getState) => {
    process.env.NODE_ENV === 'production' || console.log('changeSelectChannels', id)

    const channels = getState().app.selectChannels
    const index = channels.findIndex((value, index) => value.channel_id === id)

    if (isLabel) {
      await ajaxLabels(dispatch, { channelId: id, columnId: 0 })
    }

    if (index < 0) {
      return false
    } else {
      dispatch(updateState({
        selectedChannel: id,
        selectedColumn: undefined,
        selectedLabels: undefined,
        selectColumns: channels[index].columns,
      }))
    }
  }

const selectColumns = (id) =>
  async (dispatch, getState) => {
    process.env.NODE_ENV !== 'production' || console.log('changeSelectColumns', getState())
    const channel = getState().app.selectedChannel

    await ajaxLabels(dispatch, { channelId: channel, columnId: id })

    dispatch(updateState({
      selectedColumn: id,
      selectedLabels: undefined
    }))
  }

const getLabels = (value) =>
  async (dispatch, getState) => {
    process.env.NODE_ENV !== 'production' || console.log('getLabels', value)
    await ajaxLabels(dispatch, { ...value })
  }

const resetChannelsColumns = () =>
  (dispatch, getState) => {
    dispatch(updateState({
      selectedChannel: undefined,
      selectedColumn: undefined,
      selectedLabels: undefined,
    }))
  }

// function verifyPermissions(pathname) {
//   console.log('verifyPermissions', searchKeyWithPathname(pathname))
//   return (dispatch, getState) => {
//     if (getState().app.permissions.indexOf(searchKeyWithPathname(pathname)) < 0) {
//       notification['warn']({
//         key: 'communities',
//         message: '提示',
//         description: '您没有此功能权限',
//         duration: 6,
//       })
//       history.push('/')
//     }
//     dispatch(updateState({}))
//   }
// }


export { updateState, initializeApp, changeSelectChannels, changeSelectColumns, selectChannels, selectColumns, resetChannelsColumns, getLabels }
