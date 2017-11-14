import { UpdateState } from './action'
import { isObject } from '../../util/validator'
import { config, searchKeyWithPathname } from '../../config'
const { title, subTitle } = config()

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

function init() {
  return (dispatch, getState) => {
    process.env.NODE_ENV === 'production' || console.log('initializeLayout', searchKeyWithPathname())
    const selectedKeys = searchKeyWithPathname()

    if (selectedKeys) {
      dispatch(updateState({
        menusSelectedKeys: [selectedKeys],
        menusOpenKeys: selectedKeys ? [selectedKeys[0]] : []
      }))
    }

    document.body.clientWidth < 996 && dispatch(toggleSide('close'))

    dispatch(updateState({
      root: false,
      LoginLoading: false,
    }))
  }
}

function toggleSide(status) {
  return (dispatch, getState) => {
    const collapsed = getState().layout.collapsed

    if (status === 'close') {
      dispatch(updateState({
        collapsed: true,
        menusOpenKeys: [],
      }))
      setTimeout(() => dispatch(updateState({ title: subTitle })), 100)
      return
    }

    dispatch(updateState({
      collapsed: !collapsed,
      menusOpenKeys: (collapsed) ? ['1'] : [],
    }))

    if (collapsed) {
      setTimeout(() => dispatch(updateState({ title: title })), 100)
    } else {
      dispatch(updateState({ title: subTitle }))
    }
  }
}

const changeSubMenus = (value) =>
  (dispatch, getState) => {

    function getMenusOpenKeys(params) {
      if (value && value.length > 0) {
        return [value[value.length - 1]]
      } else {
        return value
      }
    }

    dispatch(updateState({
      menusOpenKeys: getMenusOpenKeys(),
    }))
  }


export { updateState, init, toggleSide, changeSubMenus }
