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
const Function = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Function/index.jsx').default, 'route-Function'))
const Form = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Form/index.jsx').default, 'route-Form'))
const Packages = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Packages/index.jsx').default, 'route-Packages'))
const PackagesAddEdit = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Packages/indexAddEdit.jsx').default, 'route-PackagesAddEdit'))
const Demo = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Demo/index.jsx').default, 'route-Demo'))
const DemoLifecyle = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Demo/demo.lifecyle.jsx').default, 'route-Demo-lifecyle'))
const Document = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Document/index.jsx').default, 'route-Document'))
const DocumentES6 = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Document/react.es6.jsx').default, 'route-Document-ES6'))
const DocumentComponent = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Document/react.component.jsx').default, 'route-Document-Component'))
const DocumentLifecyle = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Document/react.lifecyle.jsx').default, 'route-Document-Lifecyle'))
const DocumentOptimization = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Document/react.optimization.jsx').default, 'route-Document-Optimization'))
const DocumentQuestion = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Document/react.question.jsx').default, 'route-Document-Question'))

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
          {/*<Route path="/demo" component={Demo} />*/}
          <Layout>
            <Route path="/" component={Document} exact />
            <Route path="/form" component={Form} />
            <Route path="/demo" component={Demo} />
            <Route path="/demo-lifecyle" component={DemoLifecyle} />
            <Route path="/document" component={Document} />
            <Route path="/document-es6" component={DocumentES6} />
            <Route path="/document-component" component={DocumentComponent} />
            <Route path="/document-lifecyle" component={DocumentLifecyle} />
            <Route path="/document-optimization" component={DocumentOptimization} />
            <Route path="/document-question" component={DocumentQuestion} />
            <Route path="/function" component={Function} />
            <Route path="/packages" component={Packages} exact />
            <Route path="/packages/add" component={PackagesAddEdit} />
            <Route path="/packages/edit" component={PackagesAddEdit} />
          </Layout>
          <Route component={NoMatch} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
}

export default newRouter
