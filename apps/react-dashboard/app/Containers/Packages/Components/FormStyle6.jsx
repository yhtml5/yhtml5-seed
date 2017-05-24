import React from 'react'
import { Radio, Form, Button, Input, Icon, Select, Row, Col, Slider, Upload, Checkbox } from 'antd'
import { validator } from '../../../util/validator'
import PicturesWall from '../../../Components/Upload/PicturesWall.jsx'
import styles from './Form.pcss'

let uuid = 9000

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
  // style: { maxWidth: '600px' }
}

class Component extends React.Component {
  constructor(props) {
    super(props)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.state = {
      buttonOkLoading: false,
      buttonCancelLoading: false
    }
    // props.form.getFieldDecorator(`formColumnTypeId`, { initialValue: props.value.type_id })
    process.env.NODE_ENV === 'production' || console.warn('FormStyles6', props)
  }

  setForm(props) {
    if (props.value) {
      props.form.getFieldDecorator(`formColumnTypeId`, { initialValue: props.value.type_id })
      props.form.getFieldDecorator(`formId`, { initialValue: props.value.id })
    }
  }

  componentDidMount() {
    console.log('formStyle6DidMount', this.props)
    this.setForm(this.props)
  }

  componentWillUnmount() {
    // console.log('PicturesWallComponentWillUnmount')
    // this.props.setFieldsValue([])
  }

  componentWillReceiveProps(nextProps) {

  }

  handleOk(e) {
    this.props.form.validateFields((err, values) => {
      e.preventDefault()
      console.warn('handleOk: ', { ...values })
      if (!err) {
        this.props.onOk({ ...values })
      }
    })
  }

  handleCancel() {
    let id = this.props.form.getFieldValue('formId')
    this.props.onCancel(id)
    //  this.props.setFieldsValue(keys.filter(key => key !== k))
  }

  render() {
    return (
      <Form layout='horizontal' className={styles.form}>
        <Row>
          <Col span={16} offset={4} >
            <h3 className={styles.title}>{this.props.title}</h3>
          </Col>
          <Col span={12}>
            <Form.Item label="栏目名称" {...formItemLayout}>
              {this.props.form.getFieldDecorator(`formName`, {
                initialValue: this.props.value.c_name,
                rules: [  { type: "string", pattern: /^.{0,20}$/, message: '最大输入20个字!' } ],
              })(
                <Input type="text" placeholder="请输入栏目名称" />
                )}
            </Form.Item>
            <Form.Item label="导航名称" {...formItemLayout}>
              {this.props.form.getFieldDecorator(`formNav`, {
                initialValue: this.props.value.n_name,
              })(
                <Input type="text" placeholder="请输入导航名称" />
                )}
            </Form.Item>
            <Form.Item label="栏目排序" {...formItemLayout}>
              {this.props.form.getFieldDecorator(`formSort`, {
                initialValue: this.props.value.sort_order,
                rules: [{ required: true, message: '请输入栏目排序!' }],
              })(
                <Input type="text" placeholder="请输入栏目排序" />
                )}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 18, offset: 8 }}>
              <Button
                type="primary"
                onClick={this.handleOk}
                loading={this.state.buttonOkLoading}
              >保存</Button>
              <Button
                className="y-m-l-10"
                onClick={this.handleCancel}
                loading={this.state.buttonCancelLoading}
              >删除</Button>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="文本内容" {...formItemLayout}>
              {this.props.form.getFieldDecorator(`formIntro`, {
                initialValue: this.props.value.content,
                rules: [{ required: true, message: '请输入文本内容!' }],
              })(
                <Input type="textarea" placeholder="请输入文本内容" />
                )}
            </Form.Item>
          </Col>
        </Row>
        <hr className={styles.hr2} />
      </Form>
    )
  }
}

Component = Form.create({})(Component)

export default Component
