import React from 'react'
import {Breadcrumb} from 'antd'
import {Link} from 'react-router-dom';
import {validator} from  '../../util/validator'

const list = [{
  name: '首页',
}, {
  name: '列表',
}, {
  name: '详情',
}]

function newBreadcrumb() {
  return (
    <Breadcrumb
      separator=">"
      style={{marginBottom: '20px'}}
    >
      {list.map((value, index) => {
        return (
          <Breadcrumb.Item key={index}>
            {(validator.isStringNotEmpty(value.href)) ? <Link to={value.href}>{value.name}</Link> : value.name }
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

export default newBreadcrumb
