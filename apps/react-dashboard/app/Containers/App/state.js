import {config} from '../../config'
const {title} = config()

const state = {
  title: title,
  token: '112311241',
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

export default state
