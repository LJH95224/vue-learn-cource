import { getAppName } from '@/api/app.js'

const actions = {
  // 如果appName是通过接口请求的话
  // updateAppName ({ commit }) {
  //   getAppName().then(res => {
  //     console.log(res)
  //     // const { info: { appName } } = res
  //     // 传过去的是一个值，不是对象
  //     // commit("SET_APP_NAME", appName);
  //     const { info } = res
  //     commit("SET_APP_NAME", info);
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // },
  // 使用getAppName() 这个方法返回了一个params，后面用.then方法处理正确的逻辑 .catch去处理异常情况 这个用的是回调的形式，看起来不是很友好，
  // 我们可以使用ES8的 async函数处理异步的问题
  async updateAppName({ commit }) {
    // 我们可以使用 await 等待异步函数执行，当执行完之后才会往下走
    // const { info: { appName } } = await getAppName()
    // commit("SET_APP_NAME", appName);

    // 在使用上面代码的时候，不能处理异常情况，所以我们需要将上面的代码放在 try catch 中
    try {
      const { info: { appName } } = await getAppName()
      commit("SET_APP_NAME", appName);
    } catch (error) {
      console.log(error)
    }
  }
}
export default actions