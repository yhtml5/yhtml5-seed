'use strict';
import React from 'react'
import {Router, Route, Redirect} from 'react-router'
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'
import {history} from './redux/store'
import App from './Components/App.jsx'
import Layout from './Components/Layout/index.jsx'

// import {routeChange, verifyPermissions} from './app/route'
// import Home from './containers/homePage/index'
// import FormulaManagement from './containers/FormulaManagement/index'
// import ParkingFee from './containers/ParkingFee/index'
// import UserManagement from './containers/UserManagement/index'
// import UserAdd from './containers/UserManagement/UserAdd'
// import UserEdit from './containers/UserManagement/UserEdit'
// import GenerateBill from  './containers/GenerateBill/index'
// import Step1 from './containers/GenerateBill/Step1'
// import Step2 from './containers/GenerateBill/Step2'
// import Step3 from './containers/GenerateBill/Step3'
// import Layout from './layout/'
// import 'antd/dist/antd.css'


function newRouter() {
  // routeChange(history)
  return (
    <ConnectedRouter history={history}>
      <div style={{height: '100%'}}>
        <Route path="/" component={Layout}/>
        <Route path="/test" component={App}/>
      </div>
    </ConnectedRouter>
  )
}

export default newRouter
