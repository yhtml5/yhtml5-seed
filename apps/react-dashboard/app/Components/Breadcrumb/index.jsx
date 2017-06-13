import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom';
import { isStringNotEmpty } from '../../util/validator'

function Component({ breadcrumbs }) {

  return (
    <Breadcrumb
      separator=">"
      style={{ marginBottom: '20px' }}
    >
      {breadcrumbs.map((value, index) => {
        return (
          <Breadcrumb.Item key={index}>
            {(isStringNotEmpty(value.href)) ? <Link to={value.href}>{value.name}</Link> : value.name}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

export default Component
