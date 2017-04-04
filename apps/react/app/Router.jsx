'use strict';
import React from 'react'
import {Router, Route, Redirect} from 'react-router'
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'
import {history} from './redux/store'
import Layout from './Containers/Layout/index.jsx'
// import LayoutLazy from './Containers/Layout/indexLazy.jsx'
import App from './Components/App.jsx'

// import {routeChange, verifyPermissions} from './app/route'

function newRouter() {
  // routeChange(history)
  console.log('newRouter')
  return (
    <ConnectedRouter history={history}>
      <div style={{height: '100%'}}>
        <Route exact path="/" component={Layout}/>
        <Route path="/app" component={App}/>
      </div>
    </ConnectedRouter>
  )
}

export default newRouter
