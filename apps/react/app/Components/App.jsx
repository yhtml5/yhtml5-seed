import React from 'react'
import {Link} from 'react-router-dom'
import styles from './App.pcss'
import {LazilyLoadFactory} from './LazilyLoad/index.jsx'
import {Button} from 'antd'

function App(props) {
  console.log('AppProps: ', props)

  function onDetermineDate() {
    console.log('onDetermineDate')
  }

  // const {moment} = props.moment

  return (
    <div className={styles.app}>
      <h2>Hello world 99</h2>
      <Link to="/">
        <Button
          type="primary"
          onClick={onDetermineDate()}>Primary</Button>
      </Link>
    </div>
  )
}

export  default LazilyLoadFactory(App, {
  history: () => import('history'),
})
