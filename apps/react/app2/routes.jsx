'use strict';
import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import communityManager from './containers/estateManager/communityManager';
import communityManagerAdd from './containers/estateManager/communityManagerAdd';
import communityManagerEdit from './containers/estateManager/communityManagerEdit';
import estateCompanyManager from './containers/estateManager/estateCompanyManager';
import estateCompanyUpdate from './containers/estateManager/estateCompanyUpdate';
import estateCompanyAdd from './containers/estateManager/estateCompanyAdd';
import serveManager from './containers/estateManager/serveManager';
import serveManagerAdd from './containers/estateManager/serveManagerAdd';
import serveManagerUpdate from './containers/estateManager/serveManagerUpdate';
import serveManagerSub from './containers/estateManager/serveManagerSub';
import Payment from './containers/payment/Payment';
import {syncHistoryWithStore} from 'react-router-redux';
import Layout from './layout/';
import Home from './containers/estateManager/serveManager'
export default (store) => {
  //创建一个与store事件同步的history对象
  const history = syncHistoryWithStore(hashHistory, store);
  return <Router history={history}>
    <Route path="/" component={Layout}>
      <Route path="Home" component={Home}/>
      <Route path="communityManager" component={communityManager}/>
      <Route path="communityManagerAdd" component={communityManagerAdd}/>
      <Route path="communityManagerEdit" component={communityManagerEdit}/>
      <Route path="estateCompanyManager" component={estateCompanyManager}/>
      <Route path="estateCompanyUpdate" component={estateCompanyUpdate}/>
      <Route path="estateCompanyAdd" component={estateCompanyAdd}/>
      <Route path="serveManager" component={serveManager}/>
      <Route path="serveManagerAdd" component={serveManagerAdd}/>
      <Route path="serveManagerUpdate" component={serveManagerUpdate}/>
      <Route path="serveManagerSub" component={serveManagerSub}/>
      <Route path="payment" component={Payment}/>
      <Route path="*" component={serveManager}/>
      <IndexRoute component={Home}/>
    </Route>
  </Router>;
};
