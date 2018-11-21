export default store => {
  // 这个函数在每次实例初始化的时候调用
  // subscribe方法，当你每次提交mutation之后，都会执行下面的回调函数，回调函数有两个参数，第一个mutation，表示当前提交的mutation的信息，第二个state，当前模块的state
  if (localStorage.state) {
    store.replaceState(JSON.parse(localStorage.state));
  }
  console.log('store初始化了')
  store.subscribe((mutation, state) => {
    console.log('提交mutation')
    localStorage.state = JSON.stringify(state)
  })
}
