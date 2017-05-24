import React from 'react'
import {Modal, Form, Select, Radio, Input, Spin, Upload, Icon,message} from 'antd'
import {updateState} from '../task'
class newModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit() {
    this.props.form.validateFields((err, values) => {
      if (!!err) {
        return;
      }
      var ID = this.props.id;
      this.props.onOk({
        id: ID,
        name: values.name,
        intro: values.intro,
        title: values.title,
        keyword: values.keyword,
        description: values.description,
      }, this.props.form.resetFields)
    });
  }

  handleCancel() {
    this.props.onCancel()
    this.props.form.resetFields()
  }


  render() {
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18},
    };
    return (
      <Modal title={this.props.titles}
             visible={this.props.visible}
             confirmLoading={this.props.confirmLoading}
             okText="确定"
             cancelText="取消"
             onOk={this.handleSubmit.bind(this)}
             onCancel={this.handleCancel.bind(this)}
      >
        <Spin tip="获取数据中..."
              spinning={(this.props.modalLoading) ? this.props.modalLoading : false}>
          <Form>
            <Form.Item label="频道名称" {...formItemLayout}>
              {this.props.form.getFieldDecorator('name', {
                initialValue: this.props.name,
                rules: [
                  {required: true, message: '请输入频道名称!'},
                ]
              })(
                <Input maxLength={10} placeholder="请输入频道名称"/>
              )}
            </Form.Item>
            <Form.Item label="频道说明" {...formItemLayout}>
              {this.props.form.getFieldDecorator('intro', {
                initialValue: this.props.intro,
                rules: [
                  { type: "string",message: '请输入频道说明!'},
                ]
              })(
                <Input type="textarea" maxLength={200} rows={4} placeholder="200字以内，文字，数字，标点符号，字母"/>
              )}
            </Form.Item>
            <Form.Item label="页面title" {...formItemLayout}>
              {this.props.form.getFieldDecorator('title', {
                initialValue: this.props.title,
                rules: [
                  { type: "string",message: '请输入页面title!'},
                ]
              })(
                <Input  maxLength={100} rows={4} placeholder="100字以内，文字，数字，标点符号，字母"/>
              )}
            </Form.Item>
            <Form.Item label="keywords" {...formItemLayout}>
              {this.props.form.getFieldDecorator('keyword', {
                initialValue: this.props.keyword,
                rules: [
                  { type: "string",message: '请输入频道说明!'},
                ]
              })(
                <Input  rows={4} placeholder="文字最多10个词，每个词用，隔开"/>
              )}
            </Form.Item>
            <Form.Item label="description" {...formItemLayout}>
              {this.props.form.getFieldDecorator('description', {
                initialValue: this.props.description,
                rules: [
                  {type: "string",message: '请输入description!'},
                ]
              })(
                <Input type="textarea" maxLength={500} rows={4} placeholder="500字以内，文字，数字，标点符号，字母"/>
              )}
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    )
  }

}

newModal = Form.create({})(newModal)

export default newModal

