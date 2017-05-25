import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { history } from '../../redux/store'
import Breadcrumb from '../../Components/Breadcrumb/index.jsx'
import Cards from './Components/Cards.jsx'
import { notRepeating } from '../../util/util'
import { toggleStatus } from './task'

function Component({ dispatch, props, app }) {
  DEBUG && console.log('DemoProps: ', props, app)

  const breadcrumbProps = {
    breadcrumbs: [{
      name: '首页',
    }, {
      name: '基础组件',
    }, {
      name: '功能函数',
    }]
  }
  const cardProps = {
    title: props.testTitle
  }

  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Cards {...cardProps} />
    </div>
  )
}

export default connect(state => {
  return {
    app: state.app,
    props: state.demo,
  }
})(Component)
