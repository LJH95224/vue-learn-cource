<template>
  <div>
    <p>这是store页面</p>
    <!-- v-model 是双向绑定，  -->
    <!-- <a-input v-model="inputValue"></a-input> -->
    <!-- 上面那种写法是下面这种写法的简写方法 -->
    <!-- <a-input :value="inputValue" @input="handleInput"></a-input> -->

    <a-input @input="handleInput" />
    <p>{{ inputValue }} -> lastLetter is {{ inputVlaueLastLetter }}</p>
    <!-- <a-show :content="inputValue" /> -->
    <p>appName: {{ appName }}</p>
    <p>appNameWithVersion: {{ appNameWithVersion }}</p>
    <p>userName: {{ userName }}</p>
    <p>fisrtLetter: {{ fisrtLetter }}</p>
  </div>
</template>

<script>
import AInput from '_c/AInput'
import AShow from '_c/AShow'
import { mapState, mapGetters } from 'vuex'
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
      userName: state => state.user.userName
    }),

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
    // appNameWithVersion () {
    //   return this.$store.getters.appNameWithVersion
    // },
    // ...mapGetters('user',[
    //   // 'appNameWithVersion',
    //   'fisrtLetter'
    // ])
  },
  methods: {
    handleInput (val) {
      this.inputValue = val
    }
  }
}
</script>
