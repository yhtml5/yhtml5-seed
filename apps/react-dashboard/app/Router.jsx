import React from 'react'
import {Router, Route, Redirect} from 'react-router-dom'
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'
import Provider from 'react-redux/es/components/Provider'
import {store, history} from './redux/store'
import {LazilyLoadComponent} from './Components/LazilyLoad/index.jsx'
import {routeChange} from './Containers/App/route'

// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
// import User from './Containers/User/index.jsx'
// import Login from './Containers/Login/index.jsx'

// ==== lazy load route components ====

const User = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/User/index.jsx').default, 'route-User'))
const Login = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Login/index.jsx').default, 'route-Login'))

function newRouter() {
  routeChange(store, history)

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div style={{height: '100%'}}>
          <Route exact path="/" component={User}/>
          <Route exact path="/login" component={Login}/>
        </div>
      </ConnectedRouter>
    </Provider>
  )
}

export default newRouter
