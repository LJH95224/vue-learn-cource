<template>
  <div>
    <p>vuex的双向绑定</p>
    <!-- 方法一 -->
    <!-- <a-input :value="stateValue" @input="handleStateValueChange"/> -->
    <!-- 方法二 -->
      <a-input v-model="stateValue"/> 
     <p>{{ stateValue }}</p>

    <p>这是store页面</p>
    <!-- v-model 是双向绑定，  -->
    <!-- <a-input v-model="inputValue"></a-input> -->
    <!-- 上面那种写法是下面这种写法的简写方法 -->
    <!-- <a-input :value="inputValue" @input="handleInput"></a-input> -->

    <!-- <a-input @input="handleInput" /> -->
    <p>{{ inputValue }} -> lastLetter is {{ inputVlaueLastLetter }}</p>
    <!-- <a-show :content="inputValue" /> -->
    <p>appName: {{ appName }}</p>
    <p>appNameWithVersion: {{ appNameWithVersion }}</p>
    <p>userName: {{ userName }}</p>
    <p>fisrtLetter: {{ fisrtLetter }}</p>
    <button @click="handleChangeAppName">修改appName</button>
    <p>{{ appVersion }}</p>
    <button @click="changeUserName">修改用户名</button>
    <button @click="regisetModule">动态注册模块</button>
    <p v-for="(li, index) in todoList" :key="index">{{ li }}</p>
  </div>
</template>

<script>
import AInput from '_c/AInput'
import AShow from '_c/AShow'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
// import { createNamespacedHelpers } from 'vuex'
// const { mapState, mapGetters } = createNamespacedHelpers('user')
export default {
  name: 'store',
  data () {
    return {
      inputValue: ''
    }
  },
  components: {
    AInput,
    AShow
  },
  computed: {
    // appName () {
    //   return this.$store.state.appName
    // },
    // userName () {
    //   return this.$store.state.user.userName
    // }

    // 前面三个点是es6里面的展开操作符
    // ...mapState([
    //   'appName'
    // ]),
    ...mapState({
      appName: state => state.appName,
      userName: state => state.user.userName,
      appVersion: state => state.appVersion,
      todoList: state => state.user.todo ? state.user.todo.todoList : [],
      // stateValue: state => state.stateValue
    }),
    stateValue: {
      // 当你读取的时候会调用这个方法
      get () {
        return this.$store.state.stateValue
      },
      // 当你给stateValue赋值的时候，会调用这个方法
      set (value) {
        this.SET_STATE_VALUE(value)
      }
    },
    // 使用createNamespacedHelpers的时候
    // ...mapState({
    //   userName: state => state.userName
    // })
    // 不使用createNamespacedHelpers的时候，在mapState里面指定模块名
    // ...mapState('user', {
    //   userName: state => state.userName
    // }),
    inputVlaueLastLetter () {
      return this.inputValue.substr(-1, 1) 
    },
    appNameWithVersion () {
      return this.$store.getters.appNameWithVersion
    },
    // 有命名空间
    // ...mapGetters('user',[
    //   'fisrtLetter'
    // ])

    // 没有命名空间
    ...mapGetters([
      'fisrtLetter'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_USER_NAME',
      'SET_APP_NAME',
      'SET_STATE_VALUE'
    ]),
    ...mapActions([
      'updateAppName'
    ]),
    handleInput (val) {
      this.inputValue = val
    },
    handleChangeAppName () {
      // 两个参数
      // this.$store.commit('SET_APP_NAME', {
      //   appName: 'newAppName'
      // })
      // 一个参数
      // this.$store.commit({
      //   type: 'SET_APP_NAME',
      //   appName: 'newAppName'
      // }),

      // 新加一个state参数
      // this.$store.commit('SET_APP_VERSION')

      // 使用mapMutations修改appName的值
      // 当传入mutations的值是数组的时候
      // this.SET_APP_NAME('newAppName')
      // 当传入mutations的值为对象的时候
      // this.SET_APP_NAME({appName: 'newAppName'})

      this.updateAppName()
    },
    changeUserName () {
      this.SET_USER_NAME('vue-course')
      // 除了使用mapActions，我们还可以使用 store实例上的一个方法触发一个actions
      // this.$store.dispatch('updateAppName', '123')

      // 错误的方法
      // this.$store.state.user.userName = 'haha'
    },
    regisetModule () {
      // 动态注册模块，给user模块添加一个todo的子模块
      this.$store.registerModule(['user', 'todo'], {
        state: {
          todoList: [
            '学习mutations',
            '学习Actions'
          ]
        }
      })
    },
    handleStateValueChange (val) {
      this.SET_STATE_VALUE(val)
    }
  }
}
</script>
