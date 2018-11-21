import vue from 'vue'

const mutations = {
  SET_APP_NAME (state, params) {
    state.appName = params
  },
  // 新添加一个state属性
  SET_APP_VERSION (state) {
    vue.set(state, "appVersion", 'v2.0')
  },
  SET_STATE_VALUE (state, value) {
    state.stateValue = value
  }
}
export default mutations