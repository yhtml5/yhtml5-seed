import Vue from 'vue'
import router from './router/router'
import Index from './router/home.vue'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Index/>',
  components: {Index}
}).$mount('#app')
