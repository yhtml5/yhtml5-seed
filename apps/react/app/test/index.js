if (process.env.NODE_ENV !== 'production') {
  console.log('Development mode')
}

require('./a')

// setTimeout(() => require.ensure(['./b'], function (require) {
//   require('./b')
//   require('./c')
//   console.log('done!')
// }), 2000)
