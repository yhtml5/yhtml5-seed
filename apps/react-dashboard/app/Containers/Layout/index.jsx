import React from 'react'
import { Layout } from 'antd'
import connect from 'react-redux/es/connect/connect'
import { logout } from '../Login/task'
import Sider from './Components/Sider.jsx'
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import Content from './Components/Content.jsx'
import { toggleSide, changeSubMenus } from './task'

function Component({ dispatch, app, props, children }) {
  DEBUG && console.log('newLayoutProps: ', props)

  const LayoutProps = {
    id: "layout",
    style: { minHeight: '100%' },
  }
  const SubLayoutProps = {
    style: {
      marginLeft: props.collapsed ? '64px' : '200px',
    },
    className: 'y-transition-all'
  }
  const SiderProps = {
    title: props.title,
    collapsed: props.collapsed,
    permissions: app.permissions,
    openKeys: props.menusOpenKeys,
    defaultOpenKeys: props.menusDefaultOpenKeys,
    selectedKeys: props.menusSelectedKeys,
    defaultSelectedKeys: props.menusDefaultSelectedKeys,
    onOpenChange(value) {
      dispatch(changeSubMenus(value))
    }
  }
  const HeaderProps = {
    collapsed: props.collapsed,
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
      <Layout {...SubLayoutProps}>
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
    app: state.app,
    props: state.layout,
  }
})(Component)
