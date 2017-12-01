import React from 'react'
import ReactDOM from 'react-dom'
import Router from './Router.jsx'
import './global.css'

const render = (Components) => {
  ReactDOM.render(
    // module.hot
    //   ? (function () {
    //     const { AppContainer } = require('react-hot-loader')
    //     return <AppContainer>
    //       <Components />
    //     </AppContainer>
    //   })()
    //   :
       <Components />
    , document.getElementById('root')
  )
}

render(Router)

// Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept('./Router.jsx', () => {
//     render(Router)
//     console.clear()
//   })
// }
