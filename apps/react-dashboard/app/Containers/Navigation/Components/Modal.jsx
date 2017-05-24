import React from 'react'
import {Modal, Form, Select, Radio, Input, Spin} from 'antd'
import {validator} from '../../../util/validator'


function newModal({
                    form, visible, confirmLoading, onOk, onCancel, onChange, title, selectChannels,
                    modalLoading, modalChannel, modalChannelId, modalLinkUrl, modalName, modalSort, modalType, navTypes
                  }) {

  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
  }

  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        onOk(values, form.resetFields)
      }
    })
  }

  const handleCancel = () => {
    onCancel()
    form.resetFields()
  }

  const handleChange = (value) => {
    onChange(value)
  }

  return (
    <Modal title={title}
           visible={visible}
           confirmLoading={confirmLoading}
           okText="确定"
           cancelText="取消"
           onOk={handleSubmit}
           onCancel={handleCancel}
    >
      <Spin tip="获取数据中..."
            spinning={(modalLoading) ? modalLoading : false}>
        <Form>
          <Form.Item label="导航名称" {...formItemLayout}>
            {form.getFieldDecorator('modalName', {
              initialValue: modalName,
              rules: [
                {required: true, message: '请输入导航名称!'},
              ]
            })(
              <Input placeholder="请输入导航名称"/>
            )}
          </Form.Item>
          <Form.Item label="导航排序" {...formItemLayout}>
            {form.getFieldDecorator('modalSort', {
              initialValue: modalSort,
              rules: [
                {required: true, message: '请输入导航排序!'},
              ]
            })(
              <Input placeholder="请输入导航排序"/>
            )}
          </Form.Item>
          <Form.Item label="导航类型" {...formItemLayout}>
            {form.getFieldDecorator('modalType', {
              initialValue: modalType,
              rules: [
                {required: true, message: '请选择导航类型!'},
              ]
            })(
              <Select placeholder="请选择一个导航类型"
                      onChange={handleChange}
              >
                {navTypes.length
                  ? navTypes.map((values, index) => <Select.Option key={index} value={String(values.key)}>{values.value}</Select.Option>)
                  : '渲染中...'
                }
              </Select>
            )}
          </Form.Item>
          {
            (modalType === '2')
              ?
              <Form.Item label="链接地址" {...formItemLayout}>
                {form.getFieldDecorator('modalLinkUrl', {
                  initialValue: modalLinkUrl,
                  rules: [
                    {required: true, message: '请输入链接地址!'},
                  ]
                })(
                  <Input placeholder="请输入链接地址"/>
                )}
              </Form.Item>
              :
              <Form.Item label="所属频道" {...formItemLayout}>
                {form.getFieldDecorator('modalChannel', {
                  initialValue: modalChannel,
                  rules: [{required: true, message: '请选择所属频道!'}],
                })(
                  <Select placeholder="请选择一个频道">
                    {selectChannels.map((values, index) =>
                      <Select.Option key={index} value={String(values.channel_id)}>{values.channel_name}</Select.Option>)
                    }
                  </Select>
                )}
              </Form.Item>
          }
        </Form>
      </Spin>
    </Modal>
  )
}


//<Radio.Group>
//  <Radio value="a">频道</Radio>
//  <Radio value="b">链接</Radio>
//</Radio.Group>

newModal = Form.create({})(newModal)

export default newModal

