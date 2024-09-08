const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8085,
    /* disableHostCheck: true, */
    allowedHosts: 'all',
    //https: true
  },
  chainWebpack: config =>{
    config.plugin('html')
        .tap(args => {
          args[0].title = "wgxm管理系统";
          return args;
        })
  }
})
