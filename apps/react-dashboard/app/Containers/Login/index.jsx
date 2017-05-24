import React from 'react'
import connect from 'react-redux/es/connect/connect'
import Background from './Components/Background.jsx'
import Form from './Components/Form.jsx'
import { login } from './task'

/**
 *  Todo
 *  https://www.zhihu.com/#signin
 *
 */

function Component({ dispatch, props, app }) {
  process.env.NODE_ENV === 'production' || console.log('LoginProps: ', props)
  const BackgroundProps = {
    title: app.title
  }
  const FormProps = {
    loading: props.LoginLoading,
    hasRegister: props.hasRegister,
    onSubmit(values) {
      dispatch(login(values))
    }
  }

  return (
    <Background {...BackgroundProps}>
      <Form {...FormProps} />
    </Background>
  )
}

export default connect(state => {
  return {
    app: state.app,
    props: state.login,
  }
})(Component)
