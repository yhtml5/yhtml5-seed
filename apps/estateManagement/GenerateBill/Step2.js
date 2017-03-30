import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router';
import {Card, Button, Checkbox, Form, Select, Input, DatePicker, Spin} from 'antd'
import Selector from './Selector'
import {backStep1, toStep3}  from './task';
import {validator} from '../../app/validator'

class Step2 extends React.Component {
  constructor(props) {
    super(props)
    // this.handleNext = this.handleNext.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      a: 1
    };
    console.log('Step2Props: ', props)
  }

  // handleNext() {
  //   this.props.dispatch(toStep3())
  //   this.props.router.push('/generateBill/step3')
  // }

  handleCancel() {
    this.props.dispatch(backStep1())
    console.log('onCancel')
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(toStep3(values))
        console.log('Received values of form: ', values);
      }
    })
  }

  handleChange(value) {
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    }
    return (
      <Card className="y-m-b-40">
        <Form onSubmit={this.handleSubmit}
              children
              style={{marginTop: 40, marginBottom: 50}}>
          <Form.Item
            label="缴费项目"
            {...formItemLayout}
          >
            <Spin tip='获取缴费项目中...'
                  spinning={this.props.generateBill.step2SelectProjectLoading}>
              {getFieldDecorator('formProjectId', {
                rules: [{
                  required: true,
                  message: '请选择一个缴费项目'
                }],
                onChange: this.handleChange,
              })(
                <Select placeholder="请选择缴费项目">
                  {this.props.generateBill.formProjects.map((value, index) => {
                    return (
                      <Select.Option key={index} value={value.id}>{value.name}</Select.Option>
                    )
                  })}
                </Select>
              )}
            </Spin>
          </Form.Item>
          <Form.Item
            label="账期时间"
            {...formItemLayout}
          >
            {getFieldDecorator('formTime', {
              rules: [{
                type: 'array',
                required: true,
                message: '请选择账期时间'
              }],
            })(
              <DatePicker.RangePicker showTime format="YYYY-MM-DD"/>
            )}
          </Form.Item>
          <Form.Item label="选择公式"
                     {...formItemLayout}>
            <Spin tip='获取公式中...'
                  spinning={this.props.generateBill.step2SelectFormulaLoading}>
              {getFieldDecorator('formFormulaId', {
                rules: [{
                  required: true,
                  message: '请选择一个公式'
                }],
                onChange: this.handleChange,
              })(
                <Select placeholder="请选择公式">
                  {this.props.generateBill.formFormulas.map((value, index) => {
                    return (
                      <Select.Option key={index} value={value.id}>{value.name} 【{value.formula}】</Select.Option>
                    )
                  })}
                </Select>
              )}
            </Spin>
          </Form.Item>
        </Form>

        <div className="text-center y-m-t-20">
          <Button
            type="primary"
            className="y-m-l-10"
            loading={this.props.generateBill.step2ButtonNextLoading}
            onClick={this.handleSubmit}
          >下一步</Button>
          <Button
            className="y-m-l-10"
            onClick={this.handleCancel}
          >取消</Button>
        </div>
      </Card>
    )
  }
}
Step2 = Form.create({})(Step2);

export default connect(state => {
  return {
    generateBill: state.generateBill,
  }
})(Step2);
