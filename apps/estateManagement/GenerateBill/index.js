import React from 'react'
import {Row, Col, Card, Icon, Popconfirm, Modal, Pagination, Button, Form} from 'antd'
import {connect} from 'react-redux'
import Breadcrumb from '../../app/components/Breadcrumb'
import Progress from './Progress.js'
import Selectors from './Step1.js'
import DetectionConfirm from './DetectionConfirm'
import {updateBuildings, changePage}  from './task';
import {validator} from  '../../app/validator'
import './index.less'

function GenerateBill(props) {
  console.log('GenerateBill: ', props)

  const progressProps = {
    current: props.generateBill.step,
    steps: [{
      title: '选择楼幢',
    }, {
      title: '账单设置',
    }, {
      title: '生成账单',
    }]
  }

  const breadcrumbProps = {
    list: [{
      name: '缴费管理',
    }, {
      name: '物业缴费',
      href: '/propertyPayment'
    }, {
      name: '生成账单',
    }]
  }

  return (
    <div className="generateBill">
      <Breadcrumb {...breadcrumbProps}/>
      {(props.location.pathname == '/generateBill/bill') ? '' : <Progress {...progressProps}/>}
      {props.children}
    </div>
  )
}

export default connect(state => {
  return {
    generateBill: state.generateBill,
  }
})(GenerateBill);
