import {config} from '../../config'
const {title} = config()

const state = {
  title: title,
  token: '112311241',
  communityId: '',
  pathnameChange: true,
  pathnameCurrent: '',
  permissions: [],
  permissionsCurrent: 5,
}

export default state
