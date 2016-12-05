import Vue from 'vue'
import router from './router/index'
import App from './App'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
}).$mount('#app')
