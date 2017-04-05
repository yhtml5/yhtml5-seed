import React from 'react'
import {connect} from 'react-redux'
import {LazilyLoad, importLazy} from '../../Components/LazilyLoad/index.jsx'

function Login(props) {
  console.log('UserProps: ', props)

  const FormProps = {
    onSubmit (e) {
      e.preventDefault();

    }
  }

  return (
    <LazilyLoad modules={{
      HelloWorld: () => importLazy(import ('../../Components/HelloWorld.jsx')),
      Form: () => importLazy(import ('./Components/Form.jsx')),
    }}>
      {({HelloWorld, Form}) => (
        <div>
          <Form {...FormProps}/>
        </div>
      )}
    </LazilyLoad>
  )
}

export default connect(state => {
  return {
    login: state.login,
  }
})(Login)
