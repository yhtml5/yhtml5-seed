import { UpdateState } from './action'
import { validator } from '../../util/validator'
import { config, searchKetWithPathname } from '../../config'
const { title, subTitle } = config()

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

function init() {
  return (dispatch, getState) => {
    process.env.NODE_ENV === 'production' || console.log('initializeLayout', searchKetWithPathname())

    if (searchKetWithPathname()) {
      dispatch(updateState({ menusSelectedKeys: [searchKetWithPathname()] }))
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
      menusOpenKeys: (collapsed) ? ['2', '3'] : [],
    }))

    if (collapsed) {
      setTimeout(() => dispatch(updateState({ title: title })), 100)
    } else {
      dispatch(updateState({ title: subTitle }))
    }
  }
}

const changeSubMenus = (value) => {
  return (dispatch, getState) => {
    dispatch(updateState({
      menusOpenKeys: value,
    }))
  }
}


export { updateState, init, toggleSide, changeSubMenus }
