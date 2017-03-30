'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader' // AppContainer is a necessary wrapper component for HMR
import {Provider} from 'react-redux'
import {store} from './redux/store'
import Router from './Router.jsx'
import './global.css'
import './test/index'

// import '../node_modules/antd/dist/antd.less'

const render = (ROUTER) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ROUTER/>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Router)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Router.jsx', () => {
    render(Router)
  })
}
