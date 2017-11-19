// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'

import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/clock-o'
import 'vue-awesome/icons/phone-square'
import 'vue-awesome/icons/user-circle'
import 'vue-awesome/icons/user-circle-o'
import 'vue-awesome/icons/server'
import 'vue-awesome/icons/check'
import 'vue-awesome/icons/pause-circle'
import 'vue-awesome/icons/play-circle'
import 'vue-awesome/icons/pause-circle-o'
import 'vue-awesome/icons/play-circle-o'
import 'vue-awesome/icons/users'
import 'vue-awesome/icons/user'
import 'vue-awesome/icons/volume-control-phone'
import 'vue-awesome/icons/phone'
import 'vue-awesome/icons/calendar-check-o'
import 'vue-awesome/icons/hourglass-half'
import 'vue-awesome/icons/hourglass-start'
import 'vue-awesome/icons/arrow-circle-right'
import 'vue-awesome/icons/balance-scale'
import 'vue-awesome/icons/level-up'
import 'vue-awesome/icons/exchange'
import 'vue-awesome/icons/check-circle-o'
import 'vue-awesome/icons/chain-broken'
import 'vue-awesome/icons/exclamation-circle'
import 'vue-awesome/icons/dot-circle-o'

import Notifications from 'vue-notification'

import App from './App'
import WebSock from './websock'
import store from './store'
import './filters'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(WebSock, store)
Vue.use(Notifications)

Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App }
})
