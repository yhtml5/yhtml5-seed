'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import Router from './Router.jsx'
import './global.pcss'

const render = (Components) => {
  ReactDOM.render(
    (false) ?
      (function () {
        const {AppContainer} = require('react-hot-loader')
        return <AppContainer>
          <Components/>
        </AppContainer>
      })()
      : <Components/>
    , document.getElementById('root')
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
