import React from 'react'
import {Radio, Form, Button, Input, Icon, Select, Row, Col, Slider, Upload, Checkbox, Modal} from 'antd'
import PicturesWall from '../../../Components/Upload/PicturesWall.jsx'
import styles from './Form.pcss'
import FormStep from './FormStep.jsx'


function FormVideo({form, formItemLayout, formIsDone, formVideoUrl, formVideoView, formVideoIntroduction}) {

  return (
    <Col span={14}>
      <Form.Item label="是否完工"  {...formItemLayout}>
        {form.getFieldDecorator('formIsDone', {
          initialValue: formIsDone,
          rules: [{required: true, message: '请选择是否完工!'}],
        })(
          <Radio.Group>
            <Radio value="1">是</Radio>
            <Radio value="2">否</Radio>
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item label="直播地址" {...formItemLayout}>
        {form.getFieldDecorator('formVideoUrl', {
          initialValue: formVideoUrl,
          rules: [{required: true, message: '请选择直播地址!'}],
        })(
          <Input type="text" placeholder="请输入直播地址"/>
        )}
      </Form.Item>
      <Form.Item label="浏览量" {...formItemLayout}>
        {form.getFieldDecorator('formVideoView', {
          initialValue: formVideoView,
          rules: [{required: true, message: '请输入浏览量!'}],
        })(
          <Input type="text" placeholder="请输入浏览量"/>
        )}
      </Form.Item>
      <Form.Item label="直播说明" {...formItemLayout}>
        {form.getFieldDecorator('formVideoIntroduction', {
          initialValue: formVideoIntroduction,
        })(
          <Input type="textarea" placeholder="请输入直播说明"/>
        )}
      </Form.Item>
    </Col>
  )
}

export default FormVideo
