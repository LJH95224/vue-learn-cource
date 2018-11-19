<template>
  <div>
    <p>这是store页面</p>
    <!-- v-model 是双向绑定，  -->
    <!-- <a-input v-model="inputValue"></a-input> -->
    <!-- 上面那种写法是下面这种写法的简写方法 -->
    <!-- <a-input :value="inputValue" @input="handleInput"></a-input> -->

    <a-input @input="handleInput" />
    <!-- <p>{{ inputValue }}</p> -->
    <a-show :content="inputValue" />
  </div>
</template>

<script>
import AInput from '_c/AInput'
import AShow from '_c/AShow'
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
  methods: {
    handleInput (val) {
      this.inputValue = val
    }
  }
}
</script>

<style>

</style>
