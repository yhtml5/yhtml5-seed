import React from 'react'
import { Row, Col, Button } from 'antd'
import { Link } from 'react-router-dom';
// import { validator } from '../../util/validator'
import styles from './Header.pcss'

function Component({
  packageId, status, isReco, headerPreviewDisabled, headerOnlineDisabled, headerRecommendDisabled,
  onBack, openIntro, onPreview, toggleStatus, toggleRecommendation
}) {
  return (
    <Row>
      <Col span={12}>
        <Button
          onClick={onBack}
          style={{ marginRight: '10px' }}
          icon="rollback"
        />
        <Button onClick={openIntro}>套餐效果图说明</Button>
      </Col>
      <Col span={12} style={{ textAlign: 'right' }}>
        <Button
          disabled={headerPreviewDisabled}
          type="primary"
          onClick={onPreview}
        >预览</Button>
        <Button
          disabled={headerOnlineDisabled}
          style={{ marginLeft: '10px' }}
          onClick={() => toggleStatus(packageId, (Number(status) === 1) ? 2 : 1)}
        >{(Number(status) === 1) ? '下线' : '上线'}</Button>
        <Button
          disabled={headerRecommendDisabled}
          style={{ marginLeft: '10px' }}
          onClick={() => toggleRecommendation(packageId, (Number(isReco) === 1) ? 2 : 1)}
        >{(Number(isReco) === 1) ? '取消推荐' : '推荐首页'}</Button>
      </Col>
      <hr className={styles.hr} />
    </Row>
  )
}

export default Component
