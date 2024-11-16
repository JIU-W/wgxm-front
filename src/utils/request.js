/* 封装axios用于发送请求 */
import axios from 'axios'
import router from "@/router";

import lodash from 'lodash';
import { Loading } from 'element-ui';
import store from "@/store";

// 创建一个新的axios实例
const request = axios.create({
    baseURL: '/api',
    timeout: 5000,
})

// 创建一个 Loading 实例
let loadingInstance = null;
// 节流函数，用于控制 Loading 的显示和隐藏
//showLoading：控制 Loading 的显示
const showLoading = lodash.throttle(() => {
    loadingInstance = Loading.service({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
}, 300, { leading: true, trailing: false });
//hideLoading：控制 Loading 的隐藏
const hideLoading = lodash.throttle(() => {
    if (loadingInstance) {
        loadingInstance.close();
        loadingInstance = null;
    }
}, 300, { leading: false, trailing: true });


//添加请求拦截器(在发送请求时触发，用于控制请求权限和处理请求)
request.interceptors.request.use(function (config) {
    //在发送请求之前做些什么

    //请求时：打开loading。 添加loading提示：节流处理/友好提示
    // 显示 Loading
    showLoading();

    //请求拦截器中，统一携带 token。只要有token，就在请求时携带，便于请求需要授权的接口。
    const token = store.getters.token
    if (token) {
        config.headers['authentication'] = token
        //config.headers.platform = 'H5'
    }
    config.headers['Content-Type'] = 'application/json;charset=utf-8'; //设置请求头格式


    return config
}, function (error) {
    // 隐藏 Loading
    hideLoading();
    //对请求错误做些什么
    return Promise.reject(error)
})

//添加响应拦截器
request.interceptors.response.use(function (response){
    // 对响应数据做点什么
    const res = response.data
    if (res.code === '401') {
        router.push('/login')
    }
    /*if (res.code !== 200) {
        //响应拦截器：统一处理错误
        this.$message.error(res.msg)
        return Promise.reject(res.msg)
    }else{
        //没有错误，走业务核心逻辑，清除loading效果
        //Toast.clear()
    }*/

    // 隐藏 Loading
    hideLoading();
    return res
},function(error){
    // 隐藏 Loading
    hideLoading();
    //对响应错误做点什么
    return Promise.reject(error)
})



export default request
