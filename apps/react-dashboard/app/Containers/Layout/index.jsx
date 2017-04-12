import React from 'react'
import {Layout} from 'antd'
import connect from 'react-redux/es/connect/connect'// import {connect} from 'react-redux'
import Sider from './Components/Sider.jsx'
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import Content from './Components/Content.jsx'
import {toggleSider} from './task'
import {logout} from '../Login/task'

function newLayout({dispatch, app, layout, children}) {
  console.log('newLayoutProps: ', layout)

  const LayoutProps = {
    id: "layout",
    style: {minHeight: '100%'},
  }
  const SiderProps = {
    title: layout.title,
    collapsed: layout.collapsed,
    permissions: app.permissions,
    openKeys: layout.menusOpenKeys,
    defaultOpenKeys: layout.menusDefaultOpenKeys,
    selectedKeys: layout.menusSelectedKeys,
  }
  const HeaderProps = {
    collapsed: layout.collapsed,
    onToggleSider(){
      dispatch(toggleSider())
    },
    onLogout(resolve, reject){
      console.log('onLoginOut')
      dispatch(logout(resolve, reject))
    }
  }

  const ContentProps = {}
  const FooterProps = {}

  return (
    <Layout {...LayoutProps}>
      <Sider {...SiderProps}/>
      <Layout>
        <Header {...HeaderProps}/>
        <Content {...ContentProps}>
          {children}
        </Content>
        <Footer {...FooterProps}/>
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
