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
    this.handleChangeImage = this.handleChangeImage.bind(this)
    this.state = {
      buttonOkLoading: false,
      buttonCancelLoading: false
    }
    // props.form.getFieldDecorator(`formColumnTypeId`, { initialValue: props.value.type_id })
    // props.form.getFieldDecorator(`${this.props.step}Keys`, { initialValue: [] })
    process.env.NODE_ENV === 'production' || console.warn('FormStyles6', props)
  }

  setForm(props) {
    if (props.value) {
      props.form.getFieldDecorator(`formId`, { initialValue: props.value.id })
      props.form.getFieldDecorator(`formColumnTypeId`, { initialValue: props.value.type_id })
    }
    // can use data-binding to set
    // setFieldsValue(keys.filter(key => key !== k))
  }

  componentDidMount() {
    console.log('formStyle4DidMount', this.props)
    this.setForm(this.props)
  }

  componentWillUnmount() {
    // console.log('PicturesWallComponentWillUnmount')
    // this.props.setFieldsValue([])
  }

  componentWillReceiveProps(nextProps) {

  }

  handleChangeImage = (url) => url

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
            <Form.Item label="副标题" {...formItemLayout}>
              {this.props.form.getFieldDecorator(`formSubTitle`, {
                initialValue: this.props.value.sub_title,
              })(
                <Input type="text" placeholder="请输入副标题" />
                )}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 18, offset: 8 }}>
              <Button
                type="primary"
                onClick={this.handleOk}
                disabled={this.props.buttonOkDisabled}
                loading={this.state.buttonOkLoading}
              >{(this.props.buttonOkDisabled) ? '已保存' : '保存'}</Button>
              <Button
                className="y-m-l-10"
                onClick={this.handleCancel}
                loading={this.state.buttonCancelLoading}
              >删除</Button>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="视频主图" {...formItemLayout}>
              {this.props.form.getFieldDecorator('formVideoImage', {
                initialValue: this.props.value.image_url,
                getValueFromEvent: this.handleChangeImage,
                rules: [{ required: true, message: '请上传视频主图!' }],
              })(
                <PicturesWall onChange={this.handleChangeImage} />
                )}
              <p>最佳尺寸: 1200*562</p>
            </Form.Item>
            <Form.Item label="url" {...formItemLayout}>
              {this.props.form.getFieldDecorator(`formVideoUrl`, {
                initialValue: this.props.value.video_url,
                rules: [{ required: true, message: '请输入视频地址!' }],
              })(
                <Input type="textarea" placeholder="请输入视频地址" />
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
