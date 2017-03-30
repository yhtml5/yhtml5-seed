import React from 'react'
import {Card, Form, Button, Input, Icon, DatePicker, message, Select, Row, Col, Spin} from 'antd'
import {validator} from '../../app/validator'
import './index.less'
import '../../app/glob.less'

class UserAddForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    console.log('UserAddEditFormProps', props)
  }

  handleSave() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.onSave(values)
      }
    })
  }

  handleCancel() {
    this.props.form.resetFields()
    this.props.onCancel()
  }

  render() {
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 14},
    }


    return (
      <div>
        <Card className="y-m-b-40">
          <Form style={{width: '60%'}}>
            <Form.Item label="用户"
                       {...formItemLayout}>
              {this.props.form.getFieldDecorator('name', {
                rules: [{
                  required: true,
                  message: '请输入用户名！',
                }, {
                  pattern: /^[0-9a-zA-Z\u4e00-\u9fa5]+$/,
                  message: '请输入正确的用户名！',
                }],
              })(
                <Input type="text" placeholder="请输入姓名"/>
              )}
            </Form.Item>
            <Form.Item label="性别"
                       {...formItemLayout}>
              {this.props.form.getFieldDecorator('sex', {
                rules: [{
                  required: true,
                  message: '请选择性别'
                }],
                onChange: this.handleChange,
              })(
                <Select placeholder="请选择性别">
                  <Select.Option value='1'>男</Select.Option>
                  <Select.Option value='2'>女</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="手机号码"
                       {...formItemLayout}>
              {this.props.form.getFieldDecorator('phone', {
                rules: [{
                  required: true,
                  pattern: /^(13[0-9]|14[5|7]|15[0-9]|18[0-9])\d{8}$/,
                  message: '请输入正确的手机号码！',
                }],
              })(
                <Input type="text" placeholder="请输入手机号码"/>
              )}
            </Form.Item>
          </Form>
        </Card>
        {this.props.children}
        <div className="y-footer">
          <Button
            type="primary"
            loading={this.props.loading}
            onClick={this.handleSave}
          >保存</Button>
          <Button
            className="y-m-l-10"
            onClick={this.handleCancel}
          >取消</Button>
        </div >
      </div>
    )
  }
}

UserAddForm = Form.create({})(UserAddForm)

export default UserAddForm
