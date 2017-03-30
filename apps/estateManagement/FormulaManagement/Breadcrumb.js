import React from 'react'
import {Breadcrumb} from 'antd'

function newBreadcrumb() {
  return (
    <Breadcrumb separator=">">
      <Breadcrumb.Item>缴费管理</Breadcrumb.Item>
      <Breadcrumb.Item>公式管理</Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default newBreadcrumb
