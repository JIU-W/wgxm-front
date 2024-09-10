import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Register from "@/views/Register.vue"
import NotFind from '@/views/404NotFind.vue'
import Manager from '@/views/Manager.vue'
import Home from '@/views/manager/Home.vue'
import AdminPerson from '@/views/manager/AdminPerson.vue'
import Password from '@/views/manager/Password.vue'
import Admin from '@/views/manager/Admin.vue'
import Notice from '@/views/manager/Notice.vue'

import store from "@/store";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Manager,
        redirect: '/home',
        children: [
            {path: '/home', meta: { name: '系统首页' }, component: Home},
            {path: '/adminPerson', meta: { name: '个人信息' }, component: AdminPerson},
            {path: '/password', meta: { name: '修改密码' }, component: Password},
            {path: '/admin', meta: { name: '管理员信息' }, component: Admin},
            {path: '/notice', meta: { name: '公告信息' }, component: Notice},
        ]

    },
    {path: '/login', meta: { name: '登录' }, component: Login},
    {path: '/register', meta: { name: '注册' }, component: Register},
    {path:'*', meta: { name: '无法访问' }, component: NotFind}
]

const router = new VueRouter({
    routes,
    mode: "history"
})

//全局前置导航守卫(在路由切换时触发，用于控制页面访问权限)
const noAuthUrl =['/login', '/register']
router.beforeEach((to, from, next) => {
    // 1. to    往哪里去， 到哪去的路由信息对象
    // 2. from  从哪里来， 从哪来的路由信息对象
    // 3. next() 是否放行
    //  如果next()调用，就是放行
    //  next(路径) 拦截到某个路径页面

    if (noAuthUrl.includes(to.path)) {
        //非权限页面，直接放行
        next()
        return
    }

    //从vuex拿到token
    const token = store.getters.token
    //是权限页面，需要判断是否有token
    if (token) {
        next()//有，放行
    } else {
        next('/login')//没有，拦截到登录页
    }

})

export default router
