import React from 'react'
import {Radio, Form, Button, Input, Icon, Select, Row, Col, Slider, Upload, Checkbox} from 'antd'
import PicturesWall from '../../../Components/Upload/PicturesWall.jsx'
import styles from './Form.pcss'

let uuid = 1
let count = 1


const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 16},
  style: {maxWidth: '800px'}
}

class FormStep extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddImage = this.handleAddImage.bind(this)
    this.handleRemoveImage = this.handleRemoveImage.bind(this)
    this.handleChangeImage = this.handleChangeImage.bind(this)
    this.state = {}
    props.form.getFieldDecorator(`${this.props.step}Keys`, {initialValue: []})
    process.env.NODE_ENV === 'production' || console.error('FormStep', props.images)
  }

  setImages(props) {
    if (props.images) {
      props.images.ext.forEach((value, index) => {
        uuid++
        const keys = props.form.getFieldValue(`${props.step}Keys`)
        const nextKeys = keys.concat(uuid)

        props.setFieldsValue(nextKeys)
        props.form.getFieldDecorator(`${props.step}ImageIntroduction${uuid}`, {initialValue: value.intro})
        props.form.getFieldDecorator(`${props.step}ImageUpload${uuid}`, {initialValue: (value.image) ? [value.image] : []})

        console.warn('keys\n', keys, '\nvalue:', value, value.intro, '\nother:', uuid, nextKeys)

        // let intro = {}
        // intro[`${step}ImageIntroduction${keys}`] = value.intro
        // form.setFieldsValue(intro)
      })
    }
    // can use data-binding to set
    // setFieldsValue(keys.filter(key => key !== k))
  }

  componentDidMount() {
    console.log('FormStepComponentDidMount', this.props)
    this.setImages(this.props)
  }

  componentWillUnmount() {
    console.log('PicturesWallComponentWillUnmount')
    this.props.setFieldsValue([])
  }

  componentWillReceiveProps(nextProps) {
    // console.log('FormStepComponentWillReceiveProps', this.props, nextProps)
    //
    // if (count !== 3) {
    //   count++
    //   this.setImages(this.props)
    // }


    // this.setImages(nextProps)
    // if (this.props.images.ext.length !== nextProps.images.ext.length) {
    //   this.setImages(nextProps)
    // }

    // if (nextProps.images.ext.length && nextProps.images.ext.length !== form.getFieldValue(`${this.props.step}Keys`).length) {
    //
    //   nextProps.images.ext.forEach((value, index) => {
    //     uuid++
    //     const keys = this.props.form.getFieldValue(`${this.props.step}Keys`)
    //     const nextKeys = keys.concat(uuid)
    //
    //     this.props.form.getFieldDecorator(`${this.props.step}ImageIntroduction${keys}`, {initialValue: value.intro})
    //
    //     console.warn('keys', keys, value, uuid, nextKeys)
    //
    //     // setFieldsValue(nextKeys)
    //     // let intro = {}
    //     // intro[`${step}ImageIntroduction${keys}`] = value.intro
    //     // form.setFieldsValue(intro)
    //   })
    // }
  }


  handleAddImage = () => {
    uuid++
    // can use data-binding to get
    const keys = this.props.form.getFieldValue(`${this.props.step}Keys`)
    const nextKeys = keys.concat(uuid)
    console.log(this.props.step, keys, nextKeys)
    // can use data-binding to set
    // important! notify form to detect changes
    this.props.setFieldsValue(nextKeys)
  }

  handleRemoveImage = (k) => {
    // can use data-binding to get
    const keys = this.props.form.getFieldValue(`${this.props.step}Keys`)
    // We need at least one passenger
    // if (keys.length === 1) {
    //   return
    // }
    // can use data-binding to set
    this.props.setFieldsValue(keys.filter(key => key !== k))
  }

  handleChangeImage = (url) => url


  render() {
    const keys = this.props.form.getFieldValue(`${this.props.step}Keys`)
    const formItems = keys.map((k, index) => {
      return (
        <div key={index}>
          <Form.Item label="直播图片" {...formItemLayout} key={k} required={false}>
            {this.props.form.getFieldDecorator(`${this.props.step}ImageUpload${k}`, {
              // initialValue: [],
              getValueFromEvent: this.handleChangeImage,
            })(
              <PicturesWall onChange={this.handleChangeImage}/>
            )}
          </Form.Item>
          <Form.Item label="图片说明" labelCol={ {span: 6}} wrapperCol={{span: 16}}>
            {this.props.form.getFieldDecorator(`${this.props.step}ImageIntroduction${k}`, {
              // initialValue: `${this.props.step}ImageIntroduction${k}`,
            })(
              <Input type="text" placeholder="请输入文字说明" style={{width: '80%', marginRight: 8}}/>
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
      <div style={this.props.style}>
        <Form.Item label={this.props.title} {...formItemLayout} >
          {this.props.form.getFieldDecorator(this.props.step, {
            initialValue: true,
            rules: [{required: true, message: '请选择类型!'}],
          })(
            <Checkbox defaultChecked disabled/>
          )}
        </Form.Item>
        <Form.Item label="文字说明" {...formItemLayout}>
          {this.props.form.getFieldDecorator(`${this.props.step}Introduction`, {
            initialValue: (this.props.images) ? this.props.images.intro : undefined,
          })(
            <Input type="textarea" placeholder="请输入文字说明"/>
          )}
        </Form.Item>
        {formItems}
        <Form.Item wrapperCol={{span: 16, offset: 6}}>
          <Button type="dashed" onClick={this.handleAddImage} style={{width: '60%'}}>
            <Icon type="plus"/> 新增图片
          </Button>
        </Form.Item>
        <hr className={styles.hr}/>
      </div>
    )
  }
}


export default FormStep
