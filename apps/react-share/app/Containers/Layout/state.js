import { config } from '../../config'
const { title } = config()

const state = {
  title: title,
  collapsed: false,
  menus: [],
  menusOpenKeys: ['1'],
  menusDefaultOpenKeys: ['1'],
  menusSelectedKeys: [],
  menusDefaultSelectedKeys: []
}

export default state

