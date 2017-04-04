function outputEnvironment() {
  if (process.env.NODE_ENV !== 'production') {
    console.log('***** Development mode *****')
  }

}


export {outputEnvironment}
