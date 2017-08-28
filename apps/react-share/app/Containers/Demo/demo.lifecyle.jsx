import React from 'react'
import { Card } from 'antd'
import connect from 'react-redux/es/connect/connect'
import { history } from '../../redux/store'
import Breadcrumb from '../../Components/Breadcrumb/index.jsx'
import Test from './Components/Test.class.jsx'
import { notRepeating } from '../../util/util'
import { toggleStatus } from './task'

function Component({ dispatch, props, app }) {
  // DEBUG && console.log('DemoProps: ', props, app)

  const breadcrumbProps = {
    breadcrumbs: [{
      name: '首页',
    }, {
      name: 'Demo',
    }, {
      name: 'Lifecyle',
    }]
  }
  
  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card className="y-m-b-40">
        <Test/>
      </Card>
    </div>
  )
}

export default connect(state => {
  return {
    app: state.app,
  }
})(Component)
