import { config } from '../../config'
const { title } = config()

const state = {
  title: title,
  collapsed: false,
  menus: [],
  menusOpenKeys: ['1', '2', '3'],
  menusDefaultOpenKeys: ['1', '2', '3'],
  menusSelectedKeys: [],
  menusDefaultSelectedKeys: []
}

export default state

