import React from 'react'
import { Radio, Form, Button, Input, Icon, Select, Row, Col, Slider, Upload, Checkbox } from 'antd'
import PicturesWall from '../../../Components/Upload/PicturesWall.jsx'
import styles from './Form.pcss'

let uuid = 2

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
    this.handleAddImage = this.handleAddImage.bind(this)
    this.handleRemoveImage = this.handleRemoveImage.bind(this)
    this.state = {
      buttonOkLoading: false,
      buttonCancelLoading: false
    }
    process.env.NODE_ENV === 'production' || console.warn('FormStyles7', props)
  }

  setForm(props) {
    if (props.value) {
      props.form.getFieldDecorator(`formId`, { initialValue: props.value.id })
      props.form.getFieldDecorator(`formColumnTypeId`, { initialValue: props.value.type_id })
      props.value.items.forEach((value, index) => {
        uuid++
        const keys = props.form.getFieldValue(`keys`)
        const nextKeys = keys.concat(uuid)
        this.props.form.setFieldsValue({ keys: nextKeys })
        props.form.getFieldDecorator(`formUrl${uuid}`, { initialValue: value.external_link })
        props.form.getFieldDecorator(`formImageUrl${uuid}`, { initialValue: (value.image_url) ? [value.image_url] : [] })
      })
    }
  }

  componentWillMount() {
    console.log('componentWillMount', this.props)
    this.props.form.getFieldDecorator('keys', { initialValue: (this.props.value.items && this.props.value.items.length > 0) ? [] : [1] })
  }

  componentDidMount() {
    console.log('formStyle7DidMount', this.props)
    this.setForm(this.props)
  }

  componentWillUnmount() {
    // console.log('PicturesWallComponentWillUnmount')
    // this.props.setFieldsValue([])
  }

  componentWillReceiveProps(nextProps) {

  }


  handleAddImage = () => {
    uuid++
    // can use data-binding to get
    const keys = this.props.form.getFieldValue('keys')
    const nextKeys = keys.concat(uuid)
    // can use data-binding to set
    // important! notify form to detect changes
    this.props.form.setFieldsValue({ keys: nextKeys })
  }

  handleRemoveImage = (k) => {
    const keys = this.props.form.getFieldValue('keys')
    // if (keys.length === 1) {
    //   return
    // }
    this.props.form.setFieldsValue({ keys: keys.filter(key => key !== k) })
  }

  handleChangeImage = (url) => url

  handleOk(e) {
    this.props.form.validateFields((err, values) => {
      e.preventDefault()
      const keys = this.props.form.getFieldValue('keys')
      const getItems = () => keys.map((k) => {
        return {
          image_url: this.props.form.getFieldValue(`formImageUrl${k}`) ? this.props.form.getFieldValue(`formImageUrl${k}`)[0] : '',
          external_link: this.props.form.getFieldValue(`formUrl${k}`),
        }
      })

      console.warn('handleOk: ', { ...values, items: getItems() })
      if (!err) {
        this.props.onOk({ ...values, items: getItems() })
      }
    })
  }

  handleCancel() {
    let id = this.props.form.getFieldValue('formId')
    this.props.onCancel(id)
    //  this.props.setFieldsValue(keys.filter(key => key !== k))
  }

  render() {
    const keys = this.props.form.getFieldValue('keys')
    const formItems = keys.map((k, index) => {
      return (
        <div key={index}>
          <Form.Item label="上传图片" {...formItemLayout} key={k} required={false}>
            {this.props.form.getFieldDecorator(`formImageUrl${k}`, {
              // initialValue: [],
              getValueFromEvent: this.handleChangeImage,
              rules: [{ required: true, message: '请上传图片!' }],
            })(
              <PicturesWall onChange={this.handleChangeImage} />
              )}
            <p>最佳尺寸: 1200*720</p>
          </Form.Item>
          <Form.Item label="url" labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
            {this.props.form.getFieldDecorator(`formUrl${k}`, {
              //initialValue: this.props.value.video_url,
            })(
              <Input type="textarea" placeholder="请输入url" style={{ width: '80%', marginRight: 8 }} />
              )}
            <Icon
              className={styles.delete}
              type="minus-circle-o"
              // disabled={keys.length === 1}
              onClick={() => this.handleRemoveImage(k)}
            />
          </Form.Item>
        </div>
      )
    })

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
            {formItems}
            {(keys.length < 3)
              ? <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                <Button type="dashed" onClick={this.handleAddImage} style={{ width: '60%' }}>
                  <Icon type="plus" /> 新增菜单
              </Button>
              </Form.Item>
              : null
            }
          </Col>
        </Row>
        <hr className={styles.hr2} />
      </Form>
    )
  }
}

Component = Form.create({})(Component)

export default Component
