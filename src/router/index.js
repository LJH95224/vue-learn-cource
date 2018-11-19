import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import { setTitle } from '@/lib/util'

Vue.use(Router)

// 将创建实例单独拿出来，
const router = new Router({
  routes: routes
})

const HAS_LOGINED = true

// 在router实例上进行全局守卫 router实例的beforeEach，这个方法可以注册一个全局前置守卫。
// to 和 from 都是路由对象，to表示即将跳转的路由对象，from表示当前你即将离开的路由对象
// next是一个函数，如果你确定要跳转会用到next函数
router.beforeEach((to, from, next) => {

  // 如果你这个to.meta是真的话， 就会执行后面的这个函数
  to.meta && setTitle(to.meta.title)
  
  if (to.name !== 'login') {
    // 如果我们即将跳转的页面不是登录页面，来做一些处理
    if (HAS_LOGINED) {
      // 已经登录，直接跳转
      next()
    } else {
      // 还没有登录，跳转到登录页面
      next({ name: 'login' })
    }
  } else {
    // 如果跳转到的是登录页面，
    if (HAS_LOGINED) {
      // 已经登录，直接跳转
      next({ name: 'home' })
    } else {
      // 还没有登录，跳转到登录页面
      next()
    }
  }
})

router.afterEach((to, from) => {
  // logining = false
})

export default router
