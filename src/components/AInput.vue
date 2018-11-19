<template>
  <input @input="handleInput" :value="value" />
</template>
<script>
export default {
  name: 'AInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    handleInput (event) {
      // 获取文本框中value的值
      const value = event.target.value
      // 将编辑后的值，使用事件将value推出去
      this.$emit('input', value)
    }
  }
}
</script>

<style>

</style>
