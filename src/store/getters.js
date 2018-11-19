const getters = {
  // 比如我现在想定义一个值，这个值依赖于state里面的appName计算的
  // 
  appNameWithVersion: (state) => {
    // return state.appName + 'v2.0' 
    // 或者
    return `${state.appName}v2.0`
  }
};
export default getters