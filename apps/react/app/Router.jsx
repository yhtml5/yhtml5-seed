'use strict';
import React from 'react'
import {Router, Route, Redirect} from 'react-router'
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'
import {history} from './redux/store'
import User from './Containers/User/index.jsx'
import Login from './Containers/Login/index.jsx'

// import {routeChange, verifyPermissions} from './app/route'

function newRouter() {
  // routeChange(history)
  console.log('newRouter')
  return (
    <ConnectedRouter history={history}>
      <div style={{height: '100%'}}>
        <Route exact path="/" component={User}/>
        <Route exact path="/login" component={Login}/>
      </div>
    </ConnectedRouter>
  )
}

export default newRouter
