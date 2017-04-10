import React from 'react'
import {Layout} from 'antd'
import connect from 'react-redux/es/connect/connect'// import {connect} from 'react-redux'
import Sider from './Components/Sider.jsx'
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import Content from './Components/Content.jsx'
// import {toggleSider} from './task'

function newLayout({dispatch, layout, children}) {
  console.log('newLayoutProps: ', layout)

  const taskLoad = (task) => require.ensure([], require => {
    let {toggleSider} = require('./task')
    switch (task) {
      case 'onToggleSider':
        return dispatch(toggleSider())
      default:
        return console.error('no task')
    }
  }, 'task-layout')

  const LayoutProps = {
    id: "layout",
    style: {height: '100%'},
    className: "ant-layout-has-sider"
  }
  const SiderProps = {
    collapsed: layout.collapsed,
    title: layout.title,
  }
  const HeaderProps = {
    collapsed: layout.collapsed,
    onToggleSider(){
      taskLoad('onToggleSider')
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
  }
})(newLayout)
