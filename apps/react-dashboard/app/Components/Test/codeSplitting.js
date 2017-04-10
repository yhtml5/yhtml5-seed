function determineDate() {
  import('moment').then(function (moment) {
    console.log(moment().format())
  }).catch(function (err) {
    console.log('Failed to load moment', err)
  })
}

export {determineDate}
