import React from 'react'
import {connect} from 'react-redux'
import Form from './Components/Form.jsx'
import Background from './Components/Background.jsx'
const taskLazy = require("bundle-loader?lazy&name=[name]-login!./task.js")

function Login({dispatch, login}) {
  console.log('LoginProps: ', login)

  const BackgroundProps = {
    title: login.title
  }

  const FormProps = {
    onSubmit () {
      taskLazy(({submitLogin}) => dispatch(submitLogin()))
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
