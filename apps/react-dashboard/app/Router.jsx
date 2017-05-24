import React from 'react'
import {Router, Route, Redirect, Switch} from 'react-router-dom'
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'
import Provider from 'react-redux/es/components/Provider'
import {store, history} from './redux/store'
import {LazilyLoadComponent} from './Components/LazilyLoad/index.jsx'
import {routeChange} from './Containers/App/route'
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
const Ad = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Ad/index.jsx').default, 'route-Ad'))
const AdPlacement = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/AdPlacement/index.jsx').default, 'route-AdPlacement'))
const Link = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Link/index.jsx').default, 'route-Link'))
const WeChat = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/WeChat/index.jsx').default, 'route-WeChat'))
const Information = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Information/index.jsx').default, 'route-Information'))
const InformationAdd = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Information/InformationAdd.jsx').default, 'route-InformationAdd'))
const InformationEdit = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Information/InformationEdit.jsx').default, 'route-InformationEdit'))
const Log = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Log/index.jsx').default, 'route-Log'))
const LogAdd = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Log/InformationAdd.jsx').default, 'route-LogAdd'))
const LogEdit = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Log/InformationEdit.jsx').default, 'route-LogEdit'))
const Question = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Question/index.jsx').default, 'route-Question'))
const QuestionAdd = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Question/InformationAdd.jsx').default, 'route-QuestionAdd'))
const QuestionEdit = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Question/InformationEdit.jsx').default, 'route-QuestionEdit'))
const Channel = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Channel/index.jsx').default, 'route-Channel'))
const Label = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Label/index.jsx').default, 'route-Label'))
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
          <Route path="/login" component={Login}/>
          <Layout>
            <Route path="/" component={Navigation} exact/>
            <Route path="/navigation" component={Navigation}/>
            <Route path="/live" component={Live} exact/>
            <Route path="/live/add" component={LiveAdd}/>
            <Route path="/live/edit" component={LiveEdit}/>
            <Route path="/packages" component={Packages} exact/>
            <Route path="/packages/add" component={PackagesAddEdit}/>
            <Route path="/packages/edit" component={PackagesAddEdit}/>
            <Route path="/ad" component={Ad}/>
            <Route path="/adPlacement" component={AdPlacement}/>
            <Route path="/link" component={Link}/>
            <Route path="/WeChat" component={WeChat}/>
            <Route path="/channel" component={Channel}/>
            <Route path="/information" component={Information} exact/>
            <Route path="/information/add" component={InformationAdd}/>
            <Route path="/information/edit" component={InformationEdit}/>
            <Route path="/log" component={Log} exact/>
            <Route path="/log/add" component={LogAdd} exact/>
            <Route path="/log/edit" component={LogEdit} exact/>
            <Route path="/question" component={Question} exact/>
            <Route path="/question/add" component={QuestionAdd}/>
            <Route path="/question/edit" component={QuestionEdit}/>
            <Route path="/label" component={Label}/>
          </Layout>
          <Route component={NoMatch}/>
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
}

export default newRouter
