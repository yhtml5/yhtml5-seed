import React from 'react'
import { Layout, Icon, Menu, Dropdown } from 'antd'
import { Modal } from 'antd'
import styles from './Header.pcss'
import { config } from '../../../config.js'
import { getCookie } from '../../../util/cookie.js'
let { cookie } = config()

function Header({ collapsed, onToggleSide, onLogout }) {

  const handleOk = (e) => {
    const key = e.key
    if (key === 'logout') {
      showConfirm()
    } else if (key === 'reset') {
      console.log('reset')
    } else {
      console.error('Checkout Layout/Components/Header.jsx')
    }
  }

  const showConfirm = () => {
    Modal.confirm({
      title: '确认退出该账号?',
      content: '',
      onOk() {
        return new Promise((resolve, reject) => {
          onLogout(resolve, reject)
        }).catch(() => console.log('Oops errors!'))
      },
      onCancel() {

      },
    })
  }

  const menu = (
    <Menu
      style={{ textAlign: 'center' }}
      onClick={handleOk}
    >
      <Menu.Item key='reset'>修改密码</Menu.Item>
      <Menu.Item key='logout'>退出登录</Menu.Item>
    </Menu>
  )

  return (
    <Layout.Header style={{ background: '#fff', padding: 0 }}>
      <Icon
        className={styles.trigger}
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={onToggleSide}
      />
      <Dropdown overlay={menu}>
        <div className={styles.name}>
          <a className="ant-dropdown-link">
            <Icon type="user" />{getCookie(cookie.userName)}
          </a>
        </div>
      </Dropdown>
    </Layout.Header>
  )
}


export default Header
