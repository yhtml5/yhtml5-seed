import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router';
import {Card, Button, Checkbox, Spin, notification} from 'antd'
import {validator} from '../../app/validator'
import Selector from './Selector'
import {isBuildingsEmpty} from  './util'
import {updateBuildings, changePage, toStep2, cancelGenerateBill}  from './task';

function Step1(props) {
  console.log('Step1Props: ', props)

  function onNext() {
    console.log(isBuildingsEmpty(props.generateBill.buildings2), props.generateBill.buildings2)
    if (isBuildingsEmpty(props.generateBill.buildings2)) {
      notification['warning']({
        key: 'selectBuildings',
        message: '请选择楼幢',
        description: '',
        duration: 2,
      })
    } else {
      props.dispatch(toStep2())
    }
  }

  function onCancel() {
    props.router.push('/propertyPayment')
  }

  function onMark(value) {
    props.dispatch(updateBuildings(value))
  }

  return (
    <Card className="y-m-b-40"
          title="楼幢信息">
      <Spin tip="获取楼幢信息中..."
            spinning={props.generateBill.selectorsLoading}
            size="large">
        <div className="y-selectors">
          {props.generateBill.buildings.length
            ? props.generateBill.buildings.map((value, index) => {
              return (
                <Selector
                  key={index}
                  value={value}
                  index={index}
                  onMark={onMark}
                />
              )
            })
            : '暂无数据'}
        </div>
      </Spin>
      <div className="text-center y-m-t-20">
        <Button
          type="primary"
          className="y-m-l-10"
          onClick={onNext}
        >下一步</Button>
        <Button
          className="y-m-l-10"
          onClick={onCancel}
        >取消</Button>
      </div>
    </Card>
  )
}

export default connect(state => {
  return {
    generateBill: state.generateBill,
  }
})(Step1);
