import React from 'react'
import {Layout, Card} from 'antd'
// import Breadcrumb from '../../../Components/Breadcrumb/index.jsx'

function Content(props) {
  return (
    <Layout.Content style={{margin: '16px 24px', minHeight: 280}}>
      {props.children}
    </Layout.Content>

  )
}

export default Content
