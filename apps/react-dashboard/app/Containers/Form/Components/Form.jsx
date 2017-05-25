import React from 'react'
import { Radio, Form, Tag, Button, Input, message, Icon, Select, Row, Col, Slider, Upload, Checkbox, Modal } from 'antd'
import { validator } from '../../../util/validator'
import PicturesWall from '../../../Components/Upload/PicturesWall.jsx'
import styles from './Form.pcss'


function Component({
  form, children, buttonOkDisabled, buttonOkLoading, uploadToken,
  formName, formImage, formQuota, formPrice, formSurplus, formSort,
  onOk,
 }) {

  DEBUG && console.log('Form')

  const formItems = [
    {
      label: '中文名字',
      key: 'formChinaName',
      initialValue: undefined,
      pattern: /^[\u4e00-\u9fa5]{1,10}$/,
      placeholder: '请输入中文名',
      rules: [
        { required: true, message: '值不能为空!' },
        { pattern: /^[\u4e00-\u9fa5]{1,10}$/, message: '请输入1-10位中文字符!' }
      ],
    }, {
      label: '账号',
      key: 'formAccount',
      initialValue: undefined,
      pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
      placeholder: '请输入账号',
      rules: [
        { required: true, message: '值不能为空!' },
        { pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/, message: '请输入20字以内文字字母数字!' }
      ],
    }, {
      label: '手机号码',
      key: 'formMobilePhone',
      initialValue: undefined,
      pattern: /^(13[0-9]|14[5|7]|15[0-9]|18[0-9])\d{8}$/,
      placeholder: '请输入中文名',
      rules: [
        { required: true, message: '值不能为空!' },
        { pattern: /^(13[0-9]|14[5|7]|15[0-9]|18[0-9])\d{8}$/, message: '请输入正确的手机号码!' }
      ],
    }, {
      label: '电话号码',
      key: 'formTelePhone',
      initialValue: undefined,
      pattern: /^\d{3}-\d{8}|\d{4}-\d{7}$/,
      placeholder: '请输入中文名',
      rules: [
        { required: true, message: '值不能为空!' },
        { pattern: /^\d{3}-\d{8}|\d{4}-\d{7}$/, message: '请输入正确的电话号码!' }
      ],
    }, {
      label: 'QQ号码',
      key: 'formQQ',
      initialValue: undefined,
      pattern: /^[1-9][0-9]{4,}$/,
      placeholder: '请输入QQ号码',
      rules: [
        { required: true, message: '值不能为空!' },
        { pattern: /^[1-9][0-9]{4,}$/, message: '请输入正确的QQ号码!' }
      ],
    }, {
      label: '身份证号码',
      key: 'formIdCard',
      initialValue: undefined,
      pattern: /^([0-9]){7,18}(x|X)?$/,
      placeholder: '请输入身份证号码',
      rules: [
        { required: true, message: '值不能为空!' },
        { pattern: /^([0-9]){7,18}(x|X)?$/, message: '请输入正确的身份证号码!' }
      ],
    }, {
      label: '电子邮箱',
      key: 'formEmail',
      initialValue: undefined,
      pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      placeholder: '请输入中文名',
      rules: [
        { required: true, message: '值不能为空!' },
        { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请输入正确的邮箱!' }
      ],
    }, {
      label: '银行卡号',
      key: 'formBankCardNum',
      initialValue: undefined,
      pattern: /^(\d{14}|\d{16}|\d{19})$/,
      placeholder: '请输入银行卡号',
      rules: [
        { required: true, message: '值不能为空!' },
        { pattern: /^(\d{14}|\d{16}|\d{19})$/, message: '请输入14,16,19位正整数!' }
      ],
    }, {
      label: '折扣',
      key: 'formDiscount',
      initialValue: undefined,
      pattern: /^[0-9](\.[0-9]{1,2}){0,1}$/,
      placeholder: '请输入折扣',
      addonAfter: "折",
      rules: [{
        validator: (rule, value, callback) => {
          if (Number(value) === 0) { callback('') }
          callback()
        }, message: '折扣不能为0或空!'
      },
      { type: "string", pattern: /^[0-9](\.[0-9]{1,2}){0,1}$/, required: true, message: '请输入正确的折扣!' },
      ]
    }, {
      label: '直减',
      key: 'formDirectOff',
      initialValue: undefined,
      pattern: /^[1-9]*[1-9][0-9]*$/,
      placeholder: '请输入',
      addonBefore: "减",
      addonAfter: "元",
      rules: [
        { required: true, message: '值不能为空!' },
        { type: "string", pattern: /^[1-9]*[1-9][0-9]*$/, message: '请输入正整数!' }
      ]
    }, {
      label: '六位正整数',
      key: 'formPositiveInteger',
      initialValue: undefined,
      pattern: /^[1-9]\d{0,5}$/,
      placeholder: '请输入',
      rules: [
        { required: true, message: '值不能为空!' },
        { pattern: /^[1-9]\d{0,5}$/, message: '请输入六位正整数!' }
      ],
    }, {
      label: '最少20个字',
      key: 'formMin',
      initialValue: undefined,
      pattern: /^.{20,}$/,
      placeholder: '请输入',
      rules: [
        { required: true, message: '值不能为空!' },
        { pattern: /^.{20,}$/, message: '最少输入20个字!' }
      ]
    }, {
      label: '最多20个字',
      key: 'formMax',
      initialValue: undefined,
      pattern: /^.{0,20}$/,
      placeholder: '请输入',
      rules: [
        { required: true, message: '值不能为空!' },
        { pattern: /^.{0,20}$/, message: '最多输入20个字!' }
      ],
    }, {
      label: 'URL',
      key: 'formUrl',
      initialValue: undefined,
      pattern: /^[a-zA-z]+\:\/\/[^s]*$/,
      placeholder: '请输入URL',
      rules: [
        { required: true, message: '值不能为空!' },
        { pattern: /^[a-zA-z]+\:\/\/[^s]*$/, message: '请输入正确的 url 地址!' }
      ],
    }, {
      label: 'URL(Http)',
      key: 'formUrlHttp',
      initialValue: undefined,
      pattern: /^[a-zA-z]+\:\/\/[^s]*$/,
      placeholder: '请输入URL',
      rules: [
        { required: true, message: '值不能为空!' },
        { pattern: /^(http|https):.{1,}\..{1,}$/, message: '请输入正确的 url 地址!' }
      ],
    }, {
      label: 'IP地址',
      key: 'formIp',
      initialValue: undefined,
      pattern: /^\d+\.\d+\.\d+\.\d+$/,
      placeholder: '请输入IP地址',
      rules: [
        { required: true, message: '值不能为空!' },
        { pattern: /^\d+\.\d+\.\d+\.\d+$/, message: '请输入正确的IP地址!' }
      ],

    }
  ]

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
    //style: { maxWidth: '600px' }
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
  const handleCancel = () => {
    form.resetFields()
  }
  const handleChangeImage = (urls) => urls

  return (
    <Form layout='horizontal' className={styles.form}>
      {
        formItems.length
          ? formItems.map((value, index) =>
            <Row key={value.key}>
              <Col span={12}>
                <Form.Item label={value.label} {...formItemLayout}>
                  {form.getFieldDecorator(value.key, {
                    initialValue: value.initialValue,
                    rules: value.rules,
                  })(
                    <Input
                      type="text"
                      placeholder={value.placeholder}
                      addonAfter={value.addonAfter ? value.addonAfter : null}
                    />
                    )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Tag
                  className={styles.pattern}
                  color="blue"
                >{String(value.pattern)}</Tag>
              </Col>
            </Row>
          )
          : null
      }
      <Form.Item wrapperCol={{ span: 8, offset: 3 }}>
        <Button
          type="primary"
          onClick={handleOk}
          style={{ marginRight: '10px' }}
          loading={buttonOkLoading}
          disabled={buttonOkDisabled}
        >{(buttonOkDisabled) ? '已保存' : '保存'}
        </Button>
        <Button onClick={handleCancel} >取消</Button>
      </Form.Item>
    </Form>
  )
}

Component = Form.create({})(Component)

export default Component
