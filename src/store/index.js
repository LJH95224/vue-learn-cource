import Vue from 'vue'
import Vuex from 'vuex'
// import config form './config/index'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import user from './module/user'

import saveInLocal from './plugin/saveInLocal'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: false,         // 严格模式
  // 在开发环境设置为严格模式，在生产环境（打包之后）设置为非严格模式
  strict: process.env.NODE_ENV === 'development',
  state,
  getters,
  mutations,
  actions,
  modules: {
    user
  },
  plugins: [
    saveInLocal
  ]
})
