import React from 'react'
import connect from 'react-redux/es/connect/connect' // import {connect} from 'react-redux'
import Background from './Components/Background.jsx'
import Form from './Components/Form.jsx'

// import {submitLogin} from './task'


function Login({dispatch, login}) {
  console.log('LoginProps: ', login)

  const taskLoad = (task) => require.ensure([], require => {
    let {submitLogin} = require('./task')
    switch (task) {
      case 'onSubmit':
        return dispatch(submitLogin())
      default:
        return console.error('no task')
    }
  }, 'task-login')

  const BackgroundProps = {
    title: login.title
  }

  const FormProps = {
    onSubmit () {
      taskLoad('onSubmit')
    }
  }

  return (
    <Background {...BackgroundProps}>
      <Form {...FormProps}/>
    </Background>
  )
}

export default connect(state => {
  return {
    login: state.login,
  }
})(Login)
