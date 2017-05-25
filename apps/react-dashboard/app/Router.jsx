import React from 'react'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import Provider from 'react-redux/es/components/Provider'
import { store, history } from './redux/store'
import { LazilyLoadComponent } from './Components/LazilyLoad/index.jsx'
import { routeChange } from './Containers/App/route'
import Layout from './Containers/Layout/index.jsx'

/**
 *
 * Todo
 * 1.import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
 *
 *
 */

// ==== lazy load route components ====

const Login = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Login/index.jsx').default, 'route-Login'))
const Demo = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Demo/index.jsx').default, 'route-Demo'))
const Document = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Document/index.jsx').default, 'route-Document'))
const Form = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Form/index.jsx').default, 'route-Form'))
const Question = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Question/index.jsx').default, 'route-Question'))
const Navigation = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Navigation/index.jsx').default, 'route-Navigation'))
const Live = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Live/index.jsx').default, 'route-Live'))
const LiveAdd = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Live/indexAdd.jsx').default, 'route-LiveAdd'))
const LiveEdit = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Live/indexEdit.jsx').default, 'route-LiveEdit'))
const Packages = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Packages/index.jsx').default, 'route-Packages'))
const PackagesAddEdit = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Packages/indexAddEdit.jsx').default, 'route-PackagesAddEdit'))

const NoMatch = () => (
  <div>
    <h3>404</h3>
  </div>
)

function newRouter() {
  routeChange(store, history)

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Layout>
            <Route path="/" component={Document} exact />
            <Route path="/form" component={Form} />
            <Route path="/demo" component={Demo} />
            <Route path="/document" component={Document} />
            <Route path="/navigation" component={Navigation} />
            <Route path="/live" component={Live} exact />
            <Route path="/live/add" component={LiveAdd} />
            <Route path="/live/edit" component={LiveEdit} />
            <Route path="/packages" component={Packages} exact />
            <Route path="/packages/add" component={PackagesAddEdit} />
            <Route path="/packages/edit" component={PackagesAddEdit} />
            <Route path="/question" component={Question} exact />
          </Layout>
          <Route component={NoMatch} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
}

export default newRouter
