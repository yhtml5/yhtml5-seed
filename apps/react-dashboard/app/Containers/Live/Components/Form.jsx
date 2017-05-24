import React from 'react'
import { Radio, Form, Button, Input, Icon, Select, Row, Col, Slider, Upload, Checkbox, Modal } from 'antd'
import { validator } from '../../../util/validator'
import PicturesWall from '../../../Components/Upload/PicturesWall.jsx'
import styles from './Form.pcss'
import FormStep from './FormStep.jsx'
import FormVideo from './FormVideo.jsx'
import FormImage from './FormImage.jsx'

let formMainImage

function newForm(
  { form, children, buttonOkLoading, buttonCancelLoading, uploadToken,
    selectChannels, selectColumns, selectLabels, selectedChannel, selectedColumn, selectedLabels,
    onCancel, onOk, changeSelectChannels, changeSelectColumns, changeFormType, changeFormStep,
    formChannel, formColumn, formLabel, formId, formTitle, formMainImage, formCommunityName, formAnnouncer, formDesignImage, formSort,
    formArea, formAreas, formHome, formHomes, formStep, formSteps, formType, formTypes, formImages, formIsHomepage, formIsDone,
    formVideoView, formVideoIntroduction, formVideoUrl,
 }) {
  process.env.NODE_ENV === 'production' || console.log('newForm')

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
    style: { maxWidth: '800px' }
  }

  const formVideoProps = {
    formItemLayout: formItemLayout,
    form: form,
    formIsDone: formIsDone,
    formVideoUrl: formVideoUrl,
    formVideoView: formVideoView,
    formVideoIntroduction: formVideoIntroduction
  }

  const formImageProps = {
    form: form,
    formImages: formImages,
    formStep: formStep,
    changeFormStep: changeFormStep
  }

  const generateImagesArray = (values) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('generateImagesArray', values)
    }

    let array = []
    const generateSubImagesArray = (values, step) =>
      values[`${step}Keys`].map((value, index) => {
        return {
          intro: values[`${step}ImageIntroduction${value}`],
          image: (() => {
            const images = values[`${step}ImageUpload${value}`]
            if (images && /\//g.test(images)) {
              return images[0]
            } else {
              return ''
            }
          })()
        }
      })

    const getLiveImageId = (index) => (formImages[index]) ? formImages[index].live_img_id : ''

    for (let i = 1; i < 6; i++) {
      if (values[`step${i}`]) {
        array.push({
          type_id: i,
          live_img_id: getLiveImageId(i - 1),
          intro: values[`step${i}Introduction`],
          ext: generateSubImagesArray(values, `step${i}`)
        })
      }
    }

    return array
  }

  const handleOk = (e) =>
    form.validateFields((err, values) => {
      e.preventDefault()
      console.warn('handleOk: ', {
        ...values,
        formImages: generateImagesArray(values),
        formMainImage: form.getFieldValue('formMainImage')[0]
      })
      if (!err) {
        onOk({
          ...values,
          formImages: generateImagesArray(values),
          formMainImage: form.getFieldValue('formMainImage')[0]
        })
      }
    })

  const handleCancel = () => {
    form.resetFields()
    onCancel({ ...form.getFieldsValue(), formType: undefined })
  }

  const handleChangeChannels = (id) => {
    // form.resetFields(['formLabel', 'formColumn'])
    changeSelectChannels(id)
  }

  const handleChangeColumns = (value) => {
    // form.resetFields(['formLabel'])
    // changeSelectColumns(value)
  }

  const handleChangeFormType = (e) => {
    e.preventDefault()
    changeFormType(e.target.value)
  }

  const handleChangeImage = (urls) => {
    console.log('handleChangeImage', urls)
    return urls
  }

  return (
    <Form layout='horizontal' className={styles.form}>
      <Row>
        <Col span={10}>
          <Form.Item {...formItemLayout} label="直播类型">
            {form.getFieldDecorator('formType', {
              initialValue: formType,
              rules: [{ required: true, message: '请选择直播类型!' }],
            })(
              <Radio.Group onChange={handleChangeFormType}>
                {formTypes.map((values, index) =>
                  <Radio key={index}
                    value={String(values.id)}
                    disabled={!!(formId)}
                  >{values.name}</Radio>)
                }
              </Radio.Group>
              )}
          </Form.Item>
          <Form.Item label="所属频道" {...formItemLayout}>
            {form.getFieldDecorator('formChannel', {
              initialValue: formChannel,
              rules: [{ required: true, message: '请选择所属频道!' }],
            })(
              <Select placeholder="请选择一个频道" onChange={handleChangeChannels}>
                {selectChannels.map((values, index) =>
                  <Select.Option key={index} value={String(values.channel_id)}>{values.channel_name}</Select.Option>
                )}
              </Select>
              )}
          </Form.Item>
          <Form.Item label="所属栏目" {...formItemLayout}>
            {form.getFieldDecorator('formColumn', {
              initialValue: formColumn,
            })(
              <Select placeholder="请选择所属栏目" onChange={handleChangeColumns}>
                {selectColumns.map((values, index) =>
                  <Select.Option key={index} value={String(values.column_id)}>{values.column_name}</Select.Option>
                )}
              </Select>
              )}
          </Form.Item>
          <Form.Item label="关联标签" {...formItemLayout}>
            {form.getFieldDecorator('formLabel', {
              initialValue: formLabel,
            })(
              <Select mode="multiple" placeholder="请选择关联标签">
                {selectLabels.map((values, index) =>
                  <Select.Option key={index} value={String(values.id)}>{values.name}</Select.Option>
                )}
              </Select>
              )}
          </Form.Item>
          <Form.Item label="户型大小" {...formItemLayout}>
            {form.getFieldDecorator('formArea', {
              initialValue: formArea,
              rules: [{ required: true, message: '请选择户型大小!' }],
            })(
              <Select placeholder="请选择户型大小">
                {formAreas.map((values, index) =>
                  <Select.Option key={index} value={String(values.id)}>{values.name}</Select.Option>
                )}
              </Select>
              )}
          </Form.Item>
          <Form.Item label="房屋户型" {...formItemLayout}>
            {form.getFieldDecorator('formHome', {
              initialValue: formHome,
              rules: [{ required: true, message: '请选择房屋户型!' }],
            })(
              <Select placeholder="请先选择房屋户型">
                {formHomes.map((values, index) =>
                  <Select.Option key={index} value={String(values.id)}>{values.name}</Select.Option>
                )}
              </Select>
              )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="推荐到首页">
            {form.getFieldDecorator('formIsHomepage', {
              initialValue: formIsHomepage,
              rules: [{ required: true, message: '请选择是否推荐到首页!' }],
            })(
              <Radio.Group>
                <Radio value="1">是</Radio>
                <Radio value="2">否</Radio>
              </Radio.Group>
              )}
          </Form.Item>
          <Form.Item label="设计图" {...formItemLayout}>
            {form.getFieldDecorator('formDesignImage', {
              initialValue: formDesignImage,
              getValueFromEvent: handleChangeImage,
              rules: [{ required: true, message: '请上传设计图!' }],
            })(
              <PicturesWall  max={20} />
              )}
          </Form.Item>
          <Form.Item label="直播主图" {...formItemLayout}>
            {form.getFieldDecorator('formMainImage', {
              initialValue: formMainImage,
              getValueFromEvent: handleChangeImage,
              rules: [{ required: true, message: '请上传直播主图!' }],
            })(
              <PicturesWall onChange={handleChangeImage} />
              )}
          </Form.Item>
          <Form.Item label="直播标题" {...formItemLayout}>
            {form.getFieldDecorator('formTitle', {
              initialValue: formTitle,
              rules: [{ required: true, message: '请选择直播标题!' }],
            })(
              <Input type="text" placeholder="请输入直播标题" />
              )}
          </Form.Item>
          <Form.Item label="小区名称" {...formItemLayout}>
            {form.getFieldDecorator('formCommunityName', {
              initialValue: formCommunityName,
            })(
              <Input type="text" placeholder="请输入小区名称" />
              )}
          </Form.Item>
          <Form.Item label="发布者" {...formItemLayout}>
            {form.getFieldDecorator('formAnnouncer', {
              initialValue: formAnnouncer,
              rules: [{ required: true, message: '请输入发布者!' }],
            })(
              <Input type="text" placeholder="请输入发布者" />
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
        </Col>
        {(formType === '1') ? <FormVideo {...formVideoProps} /> : null}
        {(formType === '2') ? <FormImage {...formImageProps} /> : null}
      </Row>
      <Form.Item wrapperCol={{ span: 21, offset: 3 }}>
        <Button
          type="primary"
          onClick={handleOk}
          loading={buttonOkLoading}
        >提交</Button>
        <Button
          className="y-m-l-10"
          onClick={handleCancel}
          loading={buttonCancelLoading}
        >取消</Button>
      </Form.Item>
    </Form>
  )
}

newForm = Form.create({})(newForm)

export default newForm
