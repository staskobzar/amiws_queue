// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'

import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'

import App from './App'
import WebSock from './websock'
import store from './store'
import './filters'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(WebSock, store)

Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App }
})
