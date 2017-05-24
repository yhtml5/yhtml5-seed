import React from 'react'
import { Radio, Form, Button, Input, message, Icon, Select, Row, Col, Slider, Upload, Checkbox, Modal } from 'antd'
import { validator } from '../../../util/validator'
import PicturesWall from '../../../Components/Upload/PicturesWall.jsx'
import styles from './Form.pcss'

function Component({
  form, children, buttonOkDisabled, buttonOkLoading, uploadToken,
  formName, formImage, formQuota, formPrice, formSurplus, formSort,
  onOk,
 }) {
  process.env.NODE_ENV === 'production' || console.log('newForm')

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
    style: { maxWidth: '600px' }
  }

  const handleOk = (e) =>
    form.validateFields((err, values) => {
      e.preventDefault()
      console.warn('handleOk: ', {
        ...values,
      })
      if (values.formQuota < values.formSurplus) {
        message.warn('剩余不能比限额多')
        return
      }
      if (!err) {
        onOk({
          ...values,
        })
      }
    })

  const handleChangeImage = (urls) => urls

  return (
    <Form layout='horizontal' className={styles.form}>
      <Form.Item label="套餐名称" {...formItemLayout}>
        {form.getFieldDecorator('formName', {
          initialValue: formName,
          rules: [{ required: true, message: '请输入套餐名称!' }],
        })(
          <Input type="text" placeholder="请输入套餐名称" />
          )}
      </Form.Item>
      <Form.Item label="排序" {...formItemLayout}>
        {form.getFieldDecorator('formSort', {
          initialValue: formSort,
          rules: [{ required: true, message: '请输入排序!' }],
        })(
          <Input type="text" placeholder="请输入排序" />
          )}
      </Form.Item>
      <Form.Item label="套餐首图" {...formItemLayout}>
        {form.getFieldDecorator('formImage', {
          initialValue: formImage,
          getValueFromEvent: handleChangeImage,
          rules: [{ required: true, message: '请上传套餐首图!' }],
        })(
          <PicturesWall onChange={handleChangeImage} />
          )}
      </Form.Item>
      <Form.Item label="套餐单价" {...formItemLayout}>
        {form.getFieldDecorator('formPrice', {
          initialValue: formPrice,
          rules: [
            { type: "string", pattern: /^[1-9]\d{0,5}$/, required: true, message: '请输入六位正整数!' },
          ],
        })(
          <Input type="text" addonAfter="元/㎡" placeholder="请输入套餐单价" />
          )}
      </Form.Item>
      <Form.Item label="限额" {...formItemLayout}>
        {form.getFieldDecorator('formQuota', {
          initialValue: formQuota,
        })(
          <Input type="text" placeholder="请输入限额" />
          )}
      </Form.Item>
      <Form.Item label="剩余" {...formItemLayout}>
        {form.getFieldDecorator('formSurplus', {
          initialValue: formSurplus,
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            validator: (rule, value, callback) => {
              if (value && value > form.getFieldValue('formQuota')) {
                callback('剩余不能比限额多!')
              }
              callback()
            },
            message: '剩余不能比限额多!'
          }],
        })(
          <Input type="text" placeholder="请输入剩余数量" />
          )}
      </Form.Item>
      <Form.Item style={{ maxWidth: '600px' }} wrapperCol={{ span: 8, offset: 4 }}>
        <Button
          type="primary"
          onClick={handleOk}
          loading={buttonOkLoading}
          disabled={buttonOkDisabled}
        >{(buttonOkDisabled) ? '已保存' : '保存'}
        </Button>
      </Form.Item>
    </Form>
  )
}

Component = Form.create({})(Component)

export default Component
