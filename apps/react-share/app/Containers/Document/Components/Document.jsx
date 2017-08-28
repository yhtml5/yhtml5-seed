import React from 'react'
import { Button } from 'antd'
import documentStart from '../../../../document/README.md'
import documentES6 from '../../../../document/react.es6.md'
import documentComponent from '../../../../document/react.component.md'
import documentLifecyle from '../../../../document/react.lifecyle.md'
import documentOptimization from '../../../../document/react.optimization.md'
import documentQuestion from '../../../../document/react.question.md'
import 'github-markdown-css'
import styles from './Document.pcss'

class Component extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    var container = document.getElementById("markdown")
    let html = ''
    switch (this.props.type) {
      case 'es6':
        html = documentES6
        break;
      case 'component':
        html = documentComponent
        break;
      case 'lifecyle':
        html = documentLifecyle
        break;
      case 'optimization':
        html = documentOptimization
        break;
      case 'question':
        html = documentQuestion
        break;
      case 'flux':
        html = documentStart
        break;
      default:
        html = documentStart
        break;
    }
    container.innerHTML = html
  }

  render() {
    return (
      <div id='markdown' className='markdown-body'></div>
    )
  }
}


export default Component
