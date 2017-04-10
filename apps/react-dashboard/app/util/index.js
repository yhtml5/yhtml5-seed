// import {notRepeating, downLoad} from './function'
// import {validator} from './validator'

const ajax = (url, param, fail, error, success) => require.ensure([], require => {
  require('./ajax').default(url, param, fail, error, success)
}, 'ajax')

export {ajax}
