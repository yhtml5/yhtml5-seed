import React from 'react'
import {Layout, Card} from 'antd'

function Content(props) {
  return (
    <Layout.Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
      <Card>
        <div>content</div>
        {props.children}
      </Card>
    </Layout.Content>
  )
}


export default Content
