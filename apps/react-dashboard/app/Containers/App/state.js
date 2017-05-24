import {config} from '../../config'
const {title} = config()

const state = {
  title: title,
  communityId: '',
  uploadToken: '',
  pathnameChange: true,
  pathnameCurrent: '',
  permissions: [],
  permissionsCurrent: 5,
  selectChannels: [],
  selectColumns: [],
  selectLabels: [],
  selectedChannel: undefined,
  selectedColumn: undefined,
  selectedLabels: undefined,
}

export default state
