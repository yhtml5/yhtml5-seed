import {initializeLogin} from '../Login/task'
import {checkToken} from './util'
// import {ajaxMenus, changeMenus, verifyPermissions} from './task'

function listener(store, history) {
  console.clear()
  console.warn('routeChange')
  const pathname = history.location.pathname
  checkToken()
  store.dispatch({type: 'UpdatePathname', payload: pathname})
  if (store.getState().app.pathnameChange) {
    console.warn('routeChangeTrue')
    // store.dispatch(ajaxMenus())
    // store.dispatch(changeMenus(pathname))
    switch (pathname) {
      case '/':
        console.log('in the root route')
        break
      case '/login':
        store.dispatch(initializeLogin())
        break
      default:
        break
    }
  }
}

function routeChange(store, history) {
  (process.env.NODE_ENV === 'production')
    ? console.clear()
    : () => {
    console.group('router')
    console.warn('store', store)
    console.warn('state', store.getState())
    console.warn('history', history)
    console.warn('pathname', history.location.pathname)
    console.groupEnd()
  }

  listener(store, history)
  history.listen(() => listener(store, history))
}

export {routeChange}
