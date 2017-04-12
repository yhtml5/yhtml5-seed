import React from 'react'
import {Link} from 'react-router-dom'
import {Layout, Menu, Icon} from 'antd'
import styles from '../index.pcss'
import {searchMenuWithKey} from '../../../config'

function Sider({collapsed, title, selectedKeys, openKeys, defaultOpenKeys, permissions}) {

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className={styles.logo}>
        <p className={styles.title}>{title}</p>
      </div>
      <Menu mode={(collapsed) ? "vertical" : "inline"}
            theme="dark"
            selectedKeys={selectedKeys}
            defaultOpenKeys={defaultOpenKeys}
      >
        {permissions.map((value, index) => {
          let menus = searchMenuWithKey(value.key)
          return (
            <Menu.SubMenu key={menus.key} title={<span><Icon type={menus.icon}/><span className="nav-text">{menus.name}</span></span>}>
              {value.children.map((value, index) => {
                let subMenus = searchMenuWithKey(value.key)
                if (subMenus.items) {
                  return <Menu.Item key={subMenus.key}>
                    <Link to={subMenus.pathname}>{subMenus.name}</Link>
                  </Menu.Item>
                }
              })}
            </Menu.SubMenu>
          )
        })}
      </Menu>
    </Layout.Sider>
  )
}


Sider.__ANT_LAYOUT_SIDER = true

export default Sider
