import React from 'react'
import { Card } from 'antd'
import connect from 'react-redux/es/connect/connect'
import Breadcrumb from '../../Components/Breadcrumb/index.jsx'
import Document from './Components/Document.jsx'

function Component({ dispatch, props, app }) {
  // DEBUG && console.log('DocumentProps: ', props)

  const breadcrumbProps = {
    breadcrumbs: [{
      name: '首页',
    }, {
      name: 'React',
    }, {
      name: 'ES6',
    }]
  }

  const documentProps = {
    type: 'es6',
  }

  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card className="y-m-b-40">
        <Document {...documentProps} />
      </Card>
    </div>
  )
}

export default connect(state => {
  return {
    app: state.app,
  }
})(Component)
