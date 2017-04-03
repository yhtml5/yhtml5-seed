if (process.env.NODE_ENV !== 'production') {
  console.log('***** Development mode *****')
}

function treeShaking() {
  let a = 2
}
function treeShaking2() {
  console('treeShaking2')
}

require('./a')

// setTimeout(() => require.ensure(['./b'], function (require) {
//   require('./b')
//   require('./c')
//   console.log('done!')
// }), 2000)
