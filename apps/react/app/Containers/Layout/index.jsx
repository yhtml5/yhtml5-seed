import React from 'react'
import {connect} from 'react-redux'
import {Layout} from 'antd'
import Sider from './Components/Sider.jsx'
import Header from './Components/Header.jsx'
import Content from './Components/Content.jsx'
import {toggleSider} from  './task'


function newLayout(props) {
  console.log('newLayoutProps: ', props)
  const LayoutProps = {
    id: "layout",
    style: {height: '100%'},
    className: "ant-layout-has-sider"
  }
  const SiderProps = {
    collapsed: props.layout.collapsed,
    title: props.layout.title,
  }
  const HeaderProps = {
    collapsed: props.layout.collapsed,
    onToggleSider(){
      props.dispatch(toggleSider())
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
