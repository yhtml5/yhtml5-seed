import React from 'react'
import { Modal, Row, Col, Button, Radio } from 'antd'
import { Link } from 'react-router-dom';
import styles from './Modal.pcss'

function Component({ id, visible, data, onOK, onCancel, onChange }) {
  const handleChange = (e) => {
    console.log(e)
    onChange(e.target.value)
  }

  return (
    <Modal
      title="选择栏目类型"
      width={700}
      visible={visible}
      onOk={onOK}
      onCancel={onCancel}
    >
      <Radio.Group onChange={handleChange} value={id}>
        <Row gutter={16}>
          {data.map((value, index) =>
            <Col className={styles.card} span={6} key={index}>
              <img src={value.img_url} alt={value.value} />
              <Radio disabled={false} value={value.key}>{value.value}</Radio>
            </Col>)}
        </Row>
      </Radio.Group>
    </Modal>
  )
}

export default Component
