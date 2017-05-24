import {config} from '../../config'
const {title} = config()

const state = {
  title: title,
  collapsed: false,
  menus: [],
  menusOpenKeys: ['2', '3'],
  menusDefaultOpenKeys: ['2', '3'],
  menusSelectedKeys: [],
  menusDefaultSelectedKeys: []
}

export default state

