import {config} from '../../config'
const {subTitle} = config()

const state = {
  title: subTitle,
  collapsed: true,
  menus: [],
  menusOpenKeys: ['2'],
  menusDefaultOpenKeys: [],
  menusSelectedKeys: [],
}

export default state

