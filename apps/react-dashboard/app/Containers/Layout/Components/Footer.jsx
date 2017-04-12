import React from 'react'
import {Layout} from 'antd'
import {config} from '../../../config'
const {title, copyright} = config()

const Footer = () =>
  <Layout.Footer style={{textAlign: 'center'}}>
    {title} ©2017 powered by {copyright}
  </Layout.Footer>

export default Footer
