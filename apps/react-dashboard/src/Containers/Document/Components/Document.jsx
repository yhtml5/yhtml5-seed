import React from 'react'
import { Button } from 'antd'
import markdown from './document.md'
import 'github-markdown-css'

import styles from './Document.pcss'

class Component extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const container = document.getElementById("markdown")
    container.innerHTML = markdown
  }

  render() {
    return (
      <div id='markdown' className='markdown-body'></div>
    )
  }
}


export default Component
