<template>
  <div class="split-pane-wrapper" ref="outer">
    <div class="pane pane-left" :style="{ width:leftOffsetPercent, paddingRight: `${this.triggerWidth / 2}px` }">
      <!-- <button @click="handleClick">修改宽度</button> -->
      <!-- 父组件往子组件里面填充内容 -->
      <slot name="left"></slot>
    </div>
    <div class="pane-trigger-con" @mousedown="handleMouseDown" :style="{ left:triggerLeft, width: `${this.triggerWidth}px` }"></div>
    <div class="pane pane-right" :style="{ left:leftOffsetPercent, paddingLeft: `${this.triggerWidth / 2}px` }">
      <slot name="right"></slot>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'SplitPane',
  props: {
    value: {
      type: Number,
      default: 0.5
    },
    triggerWidth: {
      type: Number,
      default: 8
    },
    min: {
      type: Number,
      default: 0.1
    },
    max: {
      type: Number,
      default: 0.9
    }
  },
  data () {
    return {
      // value: 0.3,
      canMove: false,
      // 控制条的偏移量
      initOffset: 0
    }
  },
  computed: {
    leftOffsetPercent () {
      return `${ this.value * 100 }%`
    },
    triggerLeft () {
      console.log(`calc(${ this.value * 100 }% - ${ this.triggerWidth / 2 }px)`)
      return `calc(${ this.value * 100 }% - ${ this.triggerWidth / 2 }px)`
    }
  },
  methods: {
    handleClick () {
      this.value -= 0.02
    },
    handleMouseDown (event) {
      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('mouseup', this.handleMouseUp)
      this.initOffset = event.pageX - event.srcElement.getBoundingClientRect().left
      this.canMove = true
    },
    handleMouseMove (event) {
      // console.log(event.pageX)    --> 当前鼠标距离页面左侧的距离
      // console.log(this.$refs.outer.getBoundingClientRect())   --->  当前dom的大小，距上下左右的信息
      // console.log( event.pageX - this.$refs.outer.getBoundingClientRect().left)
      if (!this.canMove) { return }
      // const outerRect = this.$refs.outer.getBoundingClientRect()
      // const offset = event.pageX - this.initOffset + this.triggerWidth / 2 - outerRect.left
      // this.  = ( offset / outerRect.width )
      const outerRect = this.$refs.outer.getBoundingClientRect()
      let offsetPercent = (event.pageX - this.initOffset + this.triggerWidth / 2 - outerRect.left) / outerRect.width
      if (offsetPercent < this.min) {
        offsetPercent = this.min 
      }
      if (offsetPercent > this.max) {
        offsetPercent = this.max 
      }
      // this.value = offsetPercent 
      // this.$emit('input', offsetPercent)
      this.$emit('update:value', offsetPercent)
    },
    handleMouseUp (event) {
      this.canMove = false
    }
  }
}
</script>

<style lang="less">
.split-pane-wrapper{
  height: 100%;
  width: 100%;
  position: relative;
  .pane{
    position: absolute;
    top: 0;
    height: 100%;
    &-left{
      // width: 30%;
      background: palevioletred;
    }
    &-right{
      right: 0;
      bottom: 0;
      // left: 30%;
      background: paleturquoise;
    }
    &-trigger-con{
      height: 100%;
      background: red;
      position: absolute;
      z-index: 10;
      user-select: none;
      cursor: col-resize;
    }
  }
}
</style>

