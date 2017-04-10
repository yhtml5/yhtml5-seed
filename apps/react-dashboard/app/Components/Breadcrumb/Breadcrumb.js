import React from 'react'
import {Breadcrumb} from 'antd'
import {Link} from 'react-router-dom';
import {validator} from  '../validator'

function newBreadcrumb({list}) {
  return (
    <Breadcrumb separator=">">
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
