# 状态管理

> **课程主要内容**<br>
1、 Bus <br>
2、 Vuex-基础-state&getters <br>
3、 Vuex-基础-mutation&action/module <br>
4、 Vuex-进阶 <br>

一般在项目中，使用状态管理，使用的是vue官方提供的vuex。它适合于比较大型复杂的项目，当我们的多组件之间共享的变得非常复杂的时候使用vuex。当项目是一个比较简单的项目的时候，可以使用bus，来满足需求
## 父子组件传值
1、 新建一个store页面, 然后再路由中注册
```
store在路由中注册
  {
    path: '/store',
    component: () => import('@/views/store.vue')
  },

```
2、 在 components 里面新建一个组件 AInput.vue。AInput.vue里面有一个input标签，给标签绑定一个input事件 

```
AInput.vue:

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
```
3、在store.vue中使用AInput组件，首先 将组件引进来 ，然后

```
<template>
  <div>
    <p>这是store页面</p>
    
    <a-input v-model="inputValue"></a-input>
    <p>{{ inputValue }}</p>
  </div>
</template>
 // _c 我们之前在vue.config.js中定义了 该符号表示components文件夹路径
import AInput from '_c/AInput'
export default {
  name: 'store',
  data () {
    return {
      inputValue: ''
    }
  },
  components: {
      AInput
  }
}
```
4、 运行效果
![image](A651A84A5C7C4D53A8F62EC37F8B9E08)

5、 解析代码：
v-model这个指令是一个双向绑定，直接绑定一个值，然后再组件内需要入下实现

首先，在AInput组件中，绑定一个input事件，当input里面的值输入修改的话，会触发事件input事件，从而执行 handleInput 方法。 input里面值的显示是通过value属性进行设置，显示的值是value的值。 

```
<!--v-model其实是一个语法糖-->
<a-input v-model="inputValue"></a-input>
<!-- 上面那种写法是下面这种写法的简写方法 -->
<a-input :value="inputValue" @input="handleInput"></a-input>
<!--下面这种写法，需要自己写一个handleInput方法-->
methods: {
    handleInput (val) {
        this.inputValue = val
    }
}

```



## 兄弟组件传值
兄弟组件的传值分为两种，一种是有相同的父级，可以通过父级进行传值，另一种就是没有相同的父级，但是我们可以通过bus传值
### 兄弟组件-有相同的父组件传值
创建一个AShow组件

```
<template>
  <div>
    <p>AShow: {{ content }} </p>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: [String, Number],
      default: ''
    }
  }
}
```
在store.vue里面引入代码

```
<template>
  <div>
    <p>这是store页面</p>
    <a-input @input="handleInput"></a-input>
    <a-show :content="inputValue"></a-show>
  </div>
</template>
 // _c 我们之前在vue.config.js中定义了 该符号表示components文件夹路径
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
```
效果展示：
![image](7FE38A35E4ED490AB0372FEFC5B8ADE7)

可以看到在AInput上面触发的事件， 在父组件中给子组件绑定input事件（方法：handleInput），当input事件触发之后，将传过来的值赋值给 inputValue；这个值再传给 <a-show> 中的content属性。


### 兄弟组件-没有相同的父组件传值
跨文件的两个属性是如何通信的，之前我们定义了 tel组件 和 email组件，他们相当于两个页面组件，我们在 app.vue 里面使用了两个命名视图

```
<router-view key="email" name="email" />
<router-view key="tel" name="tel" />
```
他们两个通信如果想通信的话，就需要用到bus，这种简单场景下，就可以用bus

在src文件夹 -> lib文件夹里面创建一个bus.js

```
// 引入vue
import Vue from 'vue'
// 创建一个bus实例
const Bus = new Vue()
// 将bus导出
export default Bus
```

创建好 bus 之后， 在main.js里面我们把 bus 引入

```
import Bus from './lib/bus'
```
把bus注册到根实例里面

```
Vue.prototype.$bus = Bus
```

在email.vue 这个组件里面

```
<template>
  <div class="email"> 
    // 定义一个按钮，绑定一个click事件，定义handleClick方法
    <button @click="handleClick">按我</button>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick () {
      // 把on-click事件提交给bus
      this.$bus.$emit('on-click', 'hello')
    }
  },
  // 生命周期钩子
  mounted () {
    // 查看有没有注册成功bus
    console.log(this.$bus)
  }
}
</script>
<style scoped>
.email {
  border: 1px solid green;
}
</style>
```
在tel 里面，接受email.vue组件里面穿过来的事件

```
<template>
  <div class="tel">
    <p>{{ message }}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      message: ''
    }
  },
  mounted () {
    // 给bus添加一个事件监听， 监听on-click事件
    this.$bus.$on('on-click', (mes) => {
      this.message = mes
    })
  }
}
</script>
<style scoped>
.tel{
  border: 1px solid red;
}
</style>
```
原理：
$emit()这个方法，可以触发当前实例上的一些事件
$on() 这个方法，给当前事件，绑定一个事件监听。

我们的on-click事件，是绑定在this.$bus 这个vue实例上，所以我们在this.$bus实例上监听这个on-click响应事件, 这样就可以有一个响应了。

如果我们在email组件中

```
<template>
  <div class="email"> 
    // 定义一个按钮，绑定一个click事件，定义handleClick方法
    <button @click="handleClick">按我</button>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick () {
      // 把on-click事件提交给this
      this.$emit('on-click', 'hello')
    }
  },
  // 生命周期钩子
  mounted () {
    // 查看有没有注册成功bus
    console.log(this.$bus)
    // 在这里监听on-click事件
    this.$on('on-click', (mes) => {
      console.log(mes)
    })
  }
}
</script>
<style scoped>
.email {
  border: 1px solid green;
}
</style>
```
效果：在当前组件上，绑定一个 on-click 事件，也在当前组件内监听一个 on-click事件
![image](E4A01019F9334D84A4298BF82252E440)
