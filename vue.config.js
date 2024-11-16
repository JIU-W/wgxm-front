const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    port: process.env.VUE_APP_CLIENT_MANAGE_PORT,
    open: false,
	//disableHostCheck: true,
    //代理配置
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASEURL, //需要跨域的目标url
        changeOrigin: true, //通常设置为 true 以避免跨域问题。
                            //当设置为 true 时代理服务器会将请求的来源(origin)改为目标服务器的来源，从而绕过浏览器的同源策略。
        ws: true, //是否代理WebSocket请求
        pathRewrite: {
          '^/api': '' // 路径重写规则，将以/api开头的路径重写为空字符串("")，即移除/api前缀
        }//在开发环境中，前端应用通常会使用 /api 作为 API 请求的前缀，以便与静态资源请求区分开来。
        // 然而，后端 API 可能没有 /api 前缀。
        // 通过 pathRewrite 配置，你可以将前端请求路径中的 /api 前缀移除，使其与后端 API 路径匹配。
      }
    }
  },
  chainWebpack: config =>{
    config.plugin('html')//config.plugin('html')：获取或创建 HtmlWebpackPlugin
        .tap(args => {
          args[0].title = "wgxm管理系统";
          return args;
        })
  }
}

