import {UpdateState} from './action';

const initialState = {
  communityId: '',
  navLeftLoading: false,
  pathnameChange: true,
  pathnameCurrent: '',
  permissions: [],
  permissionsCurrent: 5,
  menus: [],
  menusCurrent: '10',
  menusSubCurrent: 'home',
}

export default function index(state = initialState, action = {}) {
  switch (action.type) {
    case UpdateState:
      return Object.assign({}, state, action.payload)
    case 'UpdatePathname':
      return Object.assign({}, state, {
        pathnameChange: action.payload != state.pathnameCurrent,
        pathnameCurrent: action.payload
      })
    default:
      return state;
  }
}
