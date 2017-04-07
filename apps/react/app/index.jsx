'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader' // AppContainer is a necessary wrapper component for HMR
import 'antd/lib/style/index.css'
import 'antd/lib/message/style/index.css'
import Router from './Router.jsx'
import './global.pcss'


const render = (Components) => {
  ReactDOM.render(
    <AppContainer>
      <Components/>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Router)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Router.jsx', () => {
    render(Router)
    console.clear()
  })
}
