import React from 'react'
import {Layout, Icon} from 'antd'
import styles from '../index.pcss'

function Header({collapsed, onToggleSider}) {
  return (
    <Layout.Header style={{background: '#fff', padding: 0}}>
      <Icon
        className={styles.trigger}
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={onToggleSider}
      />
    </Layout.Header>
  )
}


export default Header
