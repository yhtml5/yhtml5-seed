'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
// import moment from 'moment';
import {AppContainer} from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import App from './components/App.jsx';
import '~/components/text.yhtml5'
import '~/components/style.css'
import '~/components/style2.css'
import '~/components/a.js'

//webpack splits code using require.ensure()
// require.ensure([], function (require) {
//     require('./b');
// });

const render = (Component, hot) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};
render(App);

/**
 *  ReactDOM.render(
 *  <AppContainer>
 *  <App />
 *  </AppContainer>,
 *  );
 **/

function component() {
  var element = document.createElement('div');
  element.innerHTML = 'Hello webpack10'
  return element;
}
document.body.appendChild(component());

// console.log(moment().format());

// Hot Module Replacement API
// If you use Webpack 2 in ES modules mode, you can
// use <App /> here rather than require() a <NextApp />.
if (module.hot) {
  module.hot.accept('./components/App.jsx', () => {
    const NewApp = require('./components/App.jsx').App
    render(NewApp)
  });
}
