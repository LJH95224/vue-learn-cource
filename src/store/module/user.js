const state = {
  userName: 'Alfred'
}
const getters = {
  fisrtLetter: (state) => {
    return state.userName.substr(0, 1)
  }
}
const mutations = {
  //
}
const actions = {
  //
}

// 使用es6模块将导出去
export default {
  namespaced: true, // namespaced设置为true的话，说明命名空间要使用true的
  getters,
  state,
  mutations,
  actions
}
