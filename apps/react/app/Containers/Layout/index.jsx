import React from 'react'
import {connect} from 'react-redux'
import {Layout} from 'antd'
import Sider from './Components/Sider.jsx'
import Header from './Components/Header.jsx'
import Content from './Components/Content.jsx'
import {toggleSider} from  './task'


function newLayout({dispatch, layout, children}) {
  console.clear()
  console.log('newLayoutProps: ', layout)
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
      dispatch(toggleSider())
    }
  }
  const ContentProps = {}

  return (
    <Layout {...LayoutProps}>
      <Sider {...SiderProps}/>
      <Layout>
        <Header {...HeaderProps}/>
        <Content {...ContentProps}/>
      </Layout>
    </Layout>
  )
}

export default connect(state => {
  return {
    layout: state.layout,
  }
})(newLayout)
