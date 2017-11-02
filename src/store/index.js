import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  foo: 1
}

const mutations = {
  FOO (state, msg) {
    console.log(`+++> Committed FOO`)
    console.log(msg)
  }
}

export default new Vuex.Store({
  state,
  mutations
})
