 <template>
  <div>
    <!-- vue的内置组件 slot插槽 -->
    <slot name="left"></slot><span ref="number" :class="countClass" :id="eleId"></span><slot name="right"></slot>
  </div>
</template>

<script>
import CountUp from 'countup'
// 引入less文件
import './count-to'
export default {
  name: 'CountTo',
  computed: {
    eleId () {
      return `count_up${this._uid}`
    },
    countClass () {
      return [
        'count-to-number',
        this.className
      ]
    }
  },
  data () {
    return {
      counter: {}
    }
  },
  props: {
    /**
     * @description 起始值
     */
    startVal: {
      type: Number,
      default: 0
    },
    /**
     * @description 最终值
     */
    endVal: {
      type: Number,
      required: true
    },
    /**
     * @description 小说点后保存几位小数
     */
    decimals: {
      type: Number,
      default: 0
    },
    /**
     * @description 动画延迟开始时间
     */
    delay: {
      type: Number,
      default: 0
    },
    /**
     * @description 渐变时长
     */
    duration: {
      type: Number,
      default: 1
    },
    /**
     * @description 是否使用变速效果
     */
    useEasing: {
      type: Boolean,
      default: false
    },
    /**
     * @description 是否使用分组
     */
    useGrouping: {
      type: Boolean,
      default: true
    },
    /**
     * @description 分组隔开使用的符号
     */
    separator: {
      type: String,
      default: ','
    },
    /**
     * @description 整数和小数隔开使用的符号
     */
    decimal: {
      type: String,
      default: '.'
    },
    className: {
      type: String,
      default: ''
    }
  },
  methods: {
    getCount () {
      // 获取当前span标签中数值是多少 (父组件调用子组件方法)
      console.log(this.$refs.number.innerText)
      return this.$refs.number.innerText
    },
    emitEndEvent () {
      setTimeout(() => {
        this.$emit('on-animation-end', Number(this.getCount()))
      }, this.duration * 1000 + 5)
    }
  },
  watch: {
    endVal (newVal, oldVal) {
      this.counter.update(newVal)
      this.emitEndEvent()
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 创建实例
      this.counter = new CountUp(this.eleId, this.startVal, this.endVal, this.decimals, this.duration, {
        useEasing: this.useEasing,
        useGrouping: this.useGrouping,
        separator: this.separator,
        decimal: this.decimal
      }),
      setTimeout(() => {
        this.counter.start()
      }, this.delay);
    })
  },
}
</script>
