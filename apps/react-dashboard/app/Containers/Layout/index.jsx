import React from 'react'
import { Layout } from 'antd'
import connect from 'react-redux/es/connect/connect'
import { logout } from '../Login/task'
import Sider from './Components/Sider.jsx'
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import Content from './Components/Content.jsx'
import { toggleSide, changeSubMenus } from './task'

function newLayout({ dispatch, app, layout, children }) {
  process.env.NODE_ENV === 'production' || console.log('newLayoutProps: ', layout)

  const LayoutProps = {
    id: "layout",
    style: { minHeight: '100%' },
  }
  const SiderProps = {
    title: layout.title,
    collapsed: layout.collapsed,
    permissions: app.permissions,
    openKeys: layout.menusOpenKeys,
    defaultOpenKeys: layout.menusDefaultOpenKeys,
    selectedKeys: layout.menusSelectedKeys,
    defaultSelectedKeys: layout.menusDefaultSelectedKeys,
    onOpenChange(value) {
      dispatch(changeSubMenus(value))
    }
  }
  const HeaderProps = {
    collapsed: layout.collapsed,
    onToggleSide() {
      dispatch(toggleSide())
    },
    onLogout(resolve, reject) {
      console.log('onLoginOut')
      dispatch(logout(resolve, reject))
    },
  }
  const ContentProps = {}
  const FooterProps = {}

  return (
    <Layout {...LayoutProps}>
      <Sider {...SiderProps} />
      <Layout>
        <Header {...HeaderProps} />
        <Content {...ContentProps}>
          {children}
        </Content>
        <Footer {...FooterProps} />
      </Layout>
    </Layout>
  )
}

export default connect(state => {
  return {
    layout: state.layout,
    app: state.app,
  }
})(newLayout)
