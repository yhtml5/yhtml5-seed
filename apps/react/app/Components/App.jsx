import React from 'react'
import styles from './App.pcss'

import Button from 'antd/lib/button'
import 'antd/lib/button/style/index.css'

function App() {
  return (
    <div className={styles.app}>
      <h2>Hello world 99</h2>
      <Button type="primary">Primary</Button>
    </div>
  )
}

export default App
