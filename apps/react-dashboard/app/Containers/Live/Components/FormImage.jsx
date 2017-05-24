import React from 'react'
import {Radio, Form, Button, Input, Icon, Select, Row, Col, Slider, Upload, Checkbox, Modal} from 'antd'
import {validator} from '../../../util/validator'
import PicturesWall from '../../../Components/Upload/PicturesWall.jsx'
import styles from './Form.pcss'
import FormStep from './FormStep.jsx'


function FormImage({form, formStep, formImages, changeFormStep}) {
  console.log('FormImage', formImages)

  const step1Props = {
    form: form,
    step: 'step1',
    title: '水电改造',
    images: formImages[0],
    style: {display: (formStep >= 1) ? 'block' : 'none'},
    setFieldsValue(value) {
      form.setFieldsValue({
        step1Keys: value,
      })
    }
  }

  const step2Props = {
    form: form,
    step: 'step2',
    title: '厨卫墙砖',
    images: formImages[1],
    style: {display: (formStep >= 2) ? 'block' : 'none'},
    setFieldsValue(value) {
      form.setFieldsValue({
        step2Keys: value,
      })
    }
  }

  const step3Props = {
    form: form,
    step: 'step3',
    title: '木工/油漆工',
    images: formImages[2],
    style: {display: (formStep >= 3) ? 'block' : 'none'},
    setFieldsValue(value) {
      form.setFieldsValue({
        step3Keys: value,
      })
    }
  }

  const step4Props = {
    form: form,
    step: 'step4',
    title: '安装环节',
    images: formImages[3],
    style: {display: (formStep >= 4) ? 'block' : 'none'},
    setFieldsValue(value) {
      form.setFieldsValue({
        step4Keys: value,
      })
    }
  }

  const step5Props = {
    form: form,
    step: 'step5',
    title: '验房环节',
    images: formImages[4],
    style: {display: (formStep === 5) ? 'block' : 'none'},
    setFieldsValue(value) {
      form.setFieldsValue({
        step5Keys: value,
      })
    }
  }

  const handleChangeFormStep = (value) => {
    changeFormStep((value) ? value / 20 : 0)
  }

  return (
    <Col span={14}>
      <Slider step={20}
              defaultValue={formStep * 20}
              className={styles.slider}
              onChange={handleChangeFormStep}
              marks={{0: '未开工', 20: '水电改造', 40: '厨卫墙砖', 60: '木工/油漆工', 80: '安装环节', 100: '验房环节'}}/>
      <FormStep {...step1Props} />
      <FormStep {...step2Props} />
      <FormStep {...step3Props} />
      <FormStep {...step4Props} />
      <FormStep {...step5Props} />
    </Col>
  )
}

export default FormImage
