<template>
  <div>{{ name }}</div>
</template>

<script>
export default {
  props: {
    name: {
      // 他可以接收String或者number类型，
      type:String,
      // 要是没由传入那么就会显示默认的
      default: 'lison'
    }
  }
}
</script>