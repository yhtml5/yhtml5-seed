import React from 'react'
import {connect} from 'react-redux'
import Layout from '../Layout/index.jsx'
import Test from './Components/Test.jsx'
const taskLazy = require("bundle-loader?lazy&name=[name]-user!./task.js")

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
