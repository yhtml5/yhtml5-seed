'use strict';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Route} from 'react-router'
import {routerReducer, routerMiddleware, push} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk';
import reducers from './reducers'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
// const routerMiddleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(thunk, routerMiddleware(history))
)

export  {store, history}
