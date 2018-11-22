// 引入Mock
import Mock from 'mockjs'
import { getUserInfo } from './response/user'
const Random = Mock.Random

// 后面定义的接口模拟器都定义在中间位置
Mock.mock(/\/getUserInfo/, getUserInfo);

Mock.setup({
  timeout: 0
})

Random.extend({
  fruit() {
    const fruit = ['apple', 'peach', 'lemon']
    return this.pick(fruit)
  }
})


// 最后要导出Mock
export default Mock
