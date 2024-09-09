/* 封装axios用于发送请求 */
import axios from 'axios'

//api替换路径！！！！！

// 创建一个新的axios实例
const request = axios.create({
    baseURL: 'http://localhost:9010',
    timeout: 5000,
})


//添加请求拦截器(在发送请求时触发，用于控制请求权限和处理请求)
request.interceptors.request.use(function (config) {
    //在发送请求之前做些什么


    return config
}, function (error) {
    //对请求错误做些什么
    return Promise.reject(error)
})

//添加响应拦截器
request.interceptors.response.use(function (response){
    // 对响应数据做点什么
    const res = response.data
    /*if (res.code !== 200) {
        //响应拦截器：统一处理错误
        this.$message.error(res.msg)
        return Promise.reject(res.msg)
    }else{
        //没有错误，走业务核心逻辑，清除loading效果
        //Toast.clear()
    }*/
    return res
},function(error){
    //对响应错误做点什么
    return Promise.reject(error)
})



export default request
