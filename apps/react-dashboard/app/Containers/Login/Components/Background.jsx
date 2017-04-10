import React from 'react'
import {Card} from 'antd'
import Footer from '../../Layout/Components/Footer.jsx'
import styles from './Background.pcss'

function Background({children, title}) {
  return (
    <div className={styles.login}>
      <Card className={styles.card}>
        <h1 className={styles.title}>{title}</h1>
        {children}
      </Card>
      <Footer/>
    </div>
  )
}

export default Background

