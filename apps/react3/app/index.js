import _ from 'lodash'
import React from 'react'
import ReactDom from 'react-dom'
import {combineReducers} from 'redux'
import {Provider} from 'react-redux'
import './index.css'
import './test/index'

function component() {
  var element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'Webpack'], ' ')
  return element
}

document.body.appendChild(component())
