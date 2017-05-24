import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import styles from './Sider.pcss'
import { searchMenuWithKey } from '../../../config'

/**
 * Todo
 * selectedKeys={selectedKeys}
 *
 * @param collapsed
 * @param title
 * @param selectedKeys
 * @param openKeys
 * @param defaultOpenKeys
 * @param permissions
 * @returns {XML}
 * @constructor
 */

function Sider({
  collapsed, title, selectedKeys, openKeys, defaultOpenKeys, permissions,
  onOpenChange
}) {

  const handleSelect = (obj) => {
    // console.log('handleSelect', obj)
  }

  const handleClick = (obj) => {
    // console.log('handleClick', obj)
  }

  const handleOpenChange = (openKeys) => {
    onOpenChange(openKeys)
  }


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
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        defaultOpenKeys={['2', '3']}
        defaultSelectedKeys={['20']}
        onSelect={handleSelect}
        onClick={handleClick}
        onOpenChange={handleOpenChange}
      >
        {permissions.map((value, index) => {
          let menus = searchMenuWithKey(value.key)
          return (
            <Menu.SubMenu key={menus.key} title={<span><Icon type={menus.icon} /><span className="nav-text">{menus.name}</span></span>}>
              {value.children.map((value, index) => {
                let subMenus = searchMenuWithKey(value.key)
                if (subMenus.items) {
                  return <Menu.Item key={subMenus.key}>
                    <Link className={styles.link}
                      to={subMenus.pathname}
                    >{subMenus.name}</Link>
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

//  selectedKeys={selectedKeys}

Sider.__ANT_LAYOUT_SIDER = true

export default Sider
