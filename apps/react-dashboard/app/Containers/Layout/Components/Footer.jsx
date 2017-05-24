import React from 'react'
import { Layout } from 'antd'
import { config } from '../../../config'
const { title, copyright, version } = config()

const Footer = () =>
  <Layout.Footer style={{ textAlign: 'center' }}>
    Copyright © 2011-2017 {copyright} 当前呈现版本 {version}
  </Layout.Footer>

export default Footer
