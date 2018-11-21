const state = {
  userName: 'Alfred'
}
const getters = {
  fisrtLetter: (state) => {
    return state.userName.substr(0, 1)
  }
}
const mutations = {
  SET_USER_NAME (state, params) {
    state.userName = params
  }
}
const actions = {
  // state指的是 user.js里面的state rootState指代的是根实例上的state
  updateUserName ({ commit, state, rootState, dispath }) {
    // rootState.appName  --> 获取根实例上的state
    dispath('xxx', ' ')
  },
  xxx () {

  }
}

// 使用es6模块将导出去
export default {
  // namespaced: true, // namespaced设置为true的话，说明命名空间要使用true的
  getters,
  state,
  mutations,
  actions
}
