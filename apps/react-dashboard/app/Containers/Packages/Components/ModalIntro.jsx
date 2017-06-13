import React from 'react'
import { Modal, Col, Button } from 'antd'
import { Link } from 'react-router-dom';
import styles from './Modal.pcss'
import url from './introduction.png'

function Component({ visible, onOK }) {
  return (
    <Modal
      title="套餐效果图说明"
      className={styles.modal}
      visible={visible}
      onOk={onOK}
      onCancel={onOK}
      footer={null}
    >
      <img src={url} alt="套餐效果图说明" />
    </Modal>
  )
}

export default Component
