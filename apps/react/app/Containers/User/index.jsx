import React from 'react'
import Layout from '../Layout/index.jsx'
import Test from './Components/Test.jsx'
const taskLazy = require("bundle-loader?lazy&name=[name]-user!./task.js")
import connect from 'react-redux/es/connect/connect'
// import {connect} from 'react-redux'

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
