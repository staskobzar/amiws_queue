// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'
import App from './App'
import WebSock from './websock'
import store from './store'
import './filters'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(WebSock, store)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App }
})
