const path = require('path')
// 首先我们需要先定义一个方法
const resolve = dir => {
  return path.join(__dirname, dir)
}

// 定义BASE_URL常量，我们分两种情况，当前是在开发环境还是要打包编译
// 如果当前是开发环境（procution），那这种情况下我们的路径设置为了 /iview-admin/ 如果不是，路径为 /
const BASE_URL = process.env.NODE_ENV === 'procution' ? '/iview-admin/' : '/'
// 在上面一个 / (斜线) 代表你的项目是要指定在域名的根目录下，如果你的项目要指定在 iview-admin 下，那么你就需要这样写（'/iview-admin/'）

module.exports = {
  // 在每次保存的时候是否使用ESlint检查代码
  lintOnSave: false,
  // 定义项目的基本路径
  baseUrl: BASE_URL,
  // 颗粒化的配置一下webpack,它是一个方法，
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  // 打包时不生成.map文件，会减少我们打包的体积，加快打包速度
  productionSourceMap: false,
  // 跨域配置
  devServer: {
    proxy: 'http://localhost:4000'
  }
}
