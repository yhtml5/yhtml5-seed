require('./a')

if (process.env.NODE_ENV !== 'production') {
  console.log('Development mode')
}

// setTimeout(() => require.ensure(['./b'], function (require) {
//   require('./b')
//   require('./c')
//   console.log('done!')
// }), 2000)
