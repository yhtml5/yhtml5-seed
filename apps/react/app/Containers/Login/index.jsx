import React from 'react'
import {connect} from 'react-redux'
import Form from './Components/Form.jsx'
import {submitLogin} from './task'

function Login({dispatch, login}) {
  console.log('LoginProps: ', login)

  const FormProps = {
    onSubmit () {
      dispatch(submitLogin())
    }
  }

  return (
    <Form {...FormProps}/>
  )
}

export default connect(state => {
  return {
    login: state.login,
  }
})(Login)
