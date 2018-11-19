<template>
  <div class="email">
    <button @click="handleClick">按我</button>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick () {
      this.$bus.$emit('on-click', 'hello')
    }
  },
  // 生命周期钩子
  mounted () {
    console.log(this.$bus)
  }
}
</script>
<style scoped>
.email {
  border: 1px solid green;
}
</style>
