'use strict';

import {
  combineReducers
} from 'redux';
import serveManager from './estateManager/serveManager';
import serveManagerAdd from './estateManager/serveManagerAdd';
import serveManagerUpdate from './estateManager/serveManagerUpdate';
import serveManagerSub from './estateManager/serveManagerSub';

import communityManager from './estateManager/communityManager';
import communityManagerAdd from './estateManager/communityManagerAdd';
import communityManagerEdit from './estateManager/communityManagerEdit';

import estateCompanyManager from './estateManager/estateCompanyManager';
import estateCompanyUpdate from './estateManager/estateCompanyUpdate';
import estateCompanyAdd from './estateManager/estateCompanyAdd';

import payment from './payment/payment';
import Public from './public';

//import header from './memeberManager/header';
import {
  routerReducer
} from 'react-router-redux';

//将现有的reduces加上路由的reducer
const rootReducer = combineReducers({
  serveManager,
  serveManagerAdd,
  serveManagerUpdate,
  serveManagerSub,
  communityManager,
  communityManagerAdd,
  communityManagerEdit,
  estateCompanyManager,
  estateCompanyUpdate,
  estateCompanyAdd,
  payment,
  Public,
  routing: routerReducer
});

export default rootReducer;
