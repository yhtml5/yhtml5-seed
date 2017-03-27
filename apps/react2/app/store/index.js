'use strict';

import {
	createStore,
	applyMiddleware
} from 'redux';
import thunkMiddleware from 'redux-thunk';

const createStoreWithMdware = applyMiddleware(
	thunkMiddleware
)(createStore);

export default createStoreWithMdware;