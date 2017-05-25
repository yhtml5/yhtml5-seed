import React from 'react'
import { Button, Row, Col, Card, Alert } from 'antd'
import styles from './Cards.pcss'

function Component({ title }) {

  const curlyBracesl = '{'
  const curlyBracesr = '}'
  const cards = [
    {
      title: 'Cookie',
      usage: ''
    }
  ]

  return (
    <Row>
      {cards.map((value, index) =>
        <Col key={value.title} span={12} lg={{ span: 8 }}>
          <Card
            title={value.title}
            className={styles.card}
            extra={<a>More</a>}
          >
            <Button
              type='primary'
              style={{ marginRight: '10px' }}
            >setCookie</Button>
            <Button
              style={{ marginRight: '10px' }}
            >getCookie</Button>
            <Button
              style={{ marginRight: '10px' }}
            >clearCookie</Button>
            <div className={styles.code}>
              <h3>Usage</h3>
              <code>
                import {curlyBracesl}cookie{curlyBracesr} from 'app/util/cookie.js'<br /><br />
                setCookie(name, value, hour)<br />
                getCookie(name)<br />
                clearCookie(name)
            </code>
            </div>
          </Card>
        </Col>
      )}
      <Col key='Download' span={12} lg={{ span: 8 }}>
        <Card
          title='Download'
          className={styles.card}
          extra={<a>More</a>}
        >
          <Button
            type='primary'
            style={{ marginRight: '10px' }}
          >Download</Button>
          <div className={styles.code}>
            <h3>Usage</h3>
            <code>
              import {curlyBracesl}cookie{curlyBracesr} from 'app/util/cookie.js'<br /><br />
              setCookie(name, value, hour)<br />
              getCookie(name)<br />
              clearCookie(name)
            </code>
          </div>
        </Card>
      </Col>
      <Col key='NotRepeat' span={12} lg={{ span: 8 }}>
        <Card
          title='NotRepeat'
          className={styles.card}
          extra={<a>More</a>}
        >
          <Button
            type='primary'
            style={{ marginRight: '10px' }}
          >NotRepeat</Button>
          <div className={styles.code}>
            <h3>Usage</h3>
            <code>
              import {curlyBracesl}cookie{curlyBracesr} from 'app/util/cookie.js'<br /><br />
              setCookie(name, value, hour)<br />
              getCookie(name)<br />
              clearCookie(name)
            </code>
          </div>
        </Card>
      </Col>
      <Col key='Print' span={12} lg={{ span: 8 }}>
        <Card
          title='Print'
          className={styles.card}
          extra={<a>More</a>}
        >
          <Button
            type='primary'
            style={{ marginRight: '10px' }}
          >Print</Button>
          <div className={styles.code}>
            <h3>Usage</h3>
            <code>
              import {curlyBracesl}cookie{curlyBracesr} from 'app/util/cookie.js'<br /><br />
              setCookie(name, value, hour)<br />
              getCookie(name)<br />
              clearCookie(name)
            </code>
          </div>
        </Card>
      </Col>
    </Row>
  )
}

export default Component
