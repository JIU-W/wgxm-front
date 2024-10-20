import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/manager.css'//引入全局样式

import request from '@/utils/request'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$baseUrl = process.env.VUE_APP_BASEURL;

Vue.use(ElementUI,{size: "small", zIndex: 3000})

Vue.prototype.$request = request

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
