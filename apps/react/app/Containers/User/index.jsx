import React from 'react'
import {connect} from 'react-redux'
import Layout from '../Layout/index.jsx'
import {LazilyLoad, importLazy} from '../../Components/LazilyLoad/index.jsx'

function User(props) {
  console.log('UserProps: ', props)

  return (
    <Layout>
      <LazilyLoad modules={{
        HelloWorld: () => importLazy(import ('../../Components/HelloWorld.jsx')),
        Test: () => importLazy(import ('./Components/Test.jsx')),
      }}>
        {({HelloWorld, Test}) => (
          <div>
            <HelloWorld/>
            <Test/>
          </div>
        )}
      </LazilyLoad>
    </Layout>
  )
}

export default connect(state => {
  return {
    user: state.user,
  }
})(User)
