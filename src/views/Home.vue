<template>
  <div class="home">
    <b>{{ food }}</b>
    <button @click="handleClick('back')">返回上一页</button>
    <button @click="handleClick('push')">跳转到parent</button>
    <button @click="handleClick('replace')">替换到parent</button>
    <button @click="getInfo">请求数据</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axiox'
import { getUserInfo } from '@/api/user'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  props: {
    food: {
      type: String,
      default: 'pear'
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log(to.name)
    next()
  },
  beforeRouteLeave (to, from, next) {
    const leave = confirm('您确定要离开吗？')
    if (leave) {
      next()
    } else {
      // next里面加上false，表示不能离开此页面
      next(false)
    }
  },
  methods: {
    handleClick (type) {
      // 我们使用编程时导航的时候，需要用到一个路由实例。 路由实例就是 this.$router
      if (type === 'back') {
        // 路由实例有很多的方法，我们现在要返回上一页。我们可以用 this.$router.go(-1)。 返回后面的一页
        // 如果 this.$router.go(1) 那么就是前进到下一页。
        // this.$router.go(-1)
        // 除了可以用这种方式可以后退的，我们还可以用 this.$router.back()
        this.$router.back()
      } else if (type === 'push') {
        // 通过路径的方式
        // this.$router.push('/parent')
        // 命名路由的方式
        /*
        this.$router.push({
          name: 'parent',
          // 同时我们也可以在对象里面添加一些信息，比如：
          query: {
            name: "Alfred"
          }
        })*/
        /*
        // 跳转到 argu 页面
        this.$router.push({
          name: 'argu',
          // 同时我们也可以在对象里面添加一些信息，比如：
          params: {
            name: "Alfred"
          }
        })*/
        // 使用 ES6 的模板语法
        const name = 'Alfred'
        this.$router.push({
          path: `/argu/${name}`
        })
      } else if (type === 'replace') {
        this.$router.replace({
          name: 'parent'
        })
      }
    },
    getInfo () {
      // axios方法
      // axios.post('/getUserInfo', { userId: 21 }).then(res => {
      //   console.log(res) 
      // })
      // 
      getUserInfo({ userId: 21 }).then(res => {
        console.log('res:', res)
      })
    }
  }
}
</script>