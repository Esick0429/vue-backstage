module.exports = {
  // publicPath : '/',
  publicPath: './', //本地跑
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    host: 'localhost',
    port: '8080', // 端口号
    https: false, // https: {type:Bollean}
    open: true, // 配置自动启动浏览器
    proxy: {
      '/api': {
        // 匹配所有以 '/api'开头的请求路径
        target: 'http://127.0.0.1:4000/api', // 代理目标的基础路径
        changeOrigin: true, // 支持跨域
        pathRewrite: {
          // 重写路径: 去掉路径中开头的'/api'
          '^/api': ''
        }
      }
    }
  }
}
