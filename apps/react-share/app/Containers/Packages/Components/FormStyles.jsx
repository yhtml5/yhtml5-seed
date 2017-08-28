import React from 'react'
import { Radio, Form, Button, Input, Icon, Select, Row, Col, Slider, Upload, Checkbox, Modal } from 'antd'
import PicturesWall from '../../../Components/Upload/PicturesWall.jsx'
import styles from './Form.pcss'
import FormStyle1 from './FormStyle1.jsx'
import FormStyle2 from './FormStyle2.jsx'
import FormStyle3 from './FormStyle3.jsx'
import FormStyle4 from './FormStyle4.jsx'
import FormStyle5 from './FormStyle5.jsx'
import FormStyle6 from './FormStyle6.jsx'
import FormStyle7 from './FormStyle7.jsx'
import FormStyle8 from './FormStyle8.jsx'

function Component({ columnsStyles, formType, onOk, onCancel }) {
  console.log('FormStyles', columnsStyles)

  return (
    <div>
      {
        columnsStyles.map((value, index) => {
          const formStyleProps = {
            key: (value.id) ? value.id : value.type_id,
            formType: formType,
            value: value,
            onOk(value) {
              onOk(value)
            },
            onCancel(value) {
              onCancel(value)
            },
          }

          if (value.type_id == 1) {
            return <FormStyle1 title='样式一' {...formStyleProps} />
          } else if (value.type_id == 2) {
            return <FormStyle2 title='样式二' {...formStyleProps} />
          } else if (value.type_id == 3) {
            return <FormStyle3 title='样式三' {...formStyleProps} />
          } else if (value.type_id == 4) {
            return <FormStyle4 title='样式四' {...formStyleProps} />
          } else if (value.type_id == 5) {
            return <FormStyle5 title='样式五' {...formStyleProps} />
          } else if (value.type_id == 6) {
            return <FormStyle6 title='样式六' {...formStyleProps} />
          } else if (value.type_id == 7) {
            return <FormStyle7 title='样式七' {...formStyleProps} />
          } else if (value.type_id == 8) {
            return <FormStyle8 title='样式八' {...formStyleProps} />
          }
        })
      }
    </div>
  )
}

export default Component
