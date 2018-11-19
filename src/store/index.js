import Vue from 'vue'
import Vuex from 'vuex'
// import config form './config/index'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import user from './module/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    user
  }
})
