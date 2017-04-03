import React from 'react'
import {Link} from 'react-router-dom'
import styles from './App.pcss'
import {LazilyLoadFactory} from './LazilyLoad/index.jsx'
import {Button} from 'antd'
import {determineDate} from './Test/codeSplitting'

function App() {
  function onDetermineDate() {
    determineDate()
  }

  return (
    <div className={styles.app}>
      <h2>Hello world 99</h2>
      <Link to="/app">
        <Button
          type="primary"
          onClick={onDetermineDate()}>Primary</Button>
      </Link>
    </div>
  )
}

export  default LazilyLoadFactory(App, {
  moment: () => import('lodash'),
})
