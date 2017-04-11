import React from 'react'
import {Layout} from 'antd'
import {config} from '../../../config'
const {title, copyright} = config()

function Footer() {
  return (
    <Layout.Footer style={{textAlign: 'center'}}>
      {title} ©2017 powered by {copyright}
    </Layout.Footer>
  )
}

export default Footer
