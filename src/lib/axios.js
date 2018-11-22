import axios from 'axios'
import { baseURL } from '@/config'

// baseUrl = baseURL 这种写法是es6里面的写法，相当于
// baseUrl = baseUrl || baseURL

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      // 全局中写的配置
      baseUrl: this.baseUrl,
      header: {
        // 
      }
    }
    return config
  }
  // 添加拦截器
  interceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      // 添加一个全局的loading
      // 
      console.log(config)   // -> 显示的请求拦截，里面有请求的所有信息
      if (!Object.keys(this.queue).length) {
        // 队列里面没有请求,可以添加一个全局的loading
        // Spin.show()
      }

      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 添加响应拦截器
    instance.interceptors.response.use(res => {
      console.log(res)
      // 删除栈里面的url
      delete this.queue[url]
      // 在这里可以对返回的值进行处理，
      const { data, status } = res
      return { data, status }
    }, error => {
      delete this.queue[url]
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    // 使用Object.assign方法将(this.getInsideConfig(), options) 这两个对象合并在一个对象里面，如果两个里面有相同的key，后面的key对应的值会覆盖前面的key对应的值
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url) 
    return instance(options)
  }
}
export default HttpRequest