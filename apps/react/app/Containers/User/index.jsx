import React from 'react'
import Layout from '../Layout/index.jsx'
import connect from 'react-redux/es/connect/connect' // import {connect} from 'react-redux'
import Test from './Components/Test.jsx'
import {updateState} from  './task'

function User(props) {
  console.log('UserProps: ', props)

  return (
    <Layout>
      <Test/>
    </Layout>
  )
}

export default connect(state => {
  return {
    user: state.user,
  }
})(User)
