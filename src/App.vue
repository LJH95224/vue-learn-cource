<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{name: 'home'}">Home</router-link> |
      <router-link :to="{name: 'about'}">About</router-link>
    </div>
    <transition-group :name="routerTransiton">
      <router-view key="default"/>
      <router-view key="email" name="email" />
      <router-view key="tel" name="tel" />
    </transition-group>
  </div>
</template>
<script>
export default {
  data () {
    return {
      routerTransiton: ''
    }
  },
  watch: {
    '$route' (to) {
      // 首先我们先来判断to.query有没有值，有值的话再判断to.query.transitionName，有没有值，有值的话，将值赋值给routerTransiton
      to.query && to.query.transitionName && (this.routerTransiton = to.query.transitionName)
    }
  }
}
</script>


<style lang="less">
// 先来设置页面进入的效果
.router-enter{
  // 代表页面，还没有显示，加载一开始的状态
  opacity: 0;
}
.router-enter-active{
  transition: opacity 1s ease;
}
.router-enter-to{
  // 页面完全显示的效果
  opacity: 1;
}
// 页面注销离开的效果
.router-leave{
  // 代表页面，还没有显示，加载一开始的状态
  opacity: 1;
}
.router-leave-active{
  transition: opacity 1s ease;
}
.router-leave-to{
  // 页面完全显示的效果
  opacity: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
