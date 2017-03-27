'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {combineReducers} from 'redux';
import {Provider} from 'react-redux';
import createRoute from './routes.jsx';
import createStore from './store/'
import reducers from './reducers/';
import {hasToken, clearCookieAll} from './util/validator'
import './index.less';
import '../node_modules/antd/dist/antd.less';
const store = createStore(reducers);

// if (!hasToken()) {
//   console.warn('无效token')
//   clearCookieAll()
//   window.location.href = './login.html'
// }

setTimeout(() => console.clear(), 1000)

ReactDom.render(
  <Provider store={store}>
    <AppContainer>
      {createRoute(store)}
    </AppContainer>
  </Provider>,
  document.getElementById('root')
);
