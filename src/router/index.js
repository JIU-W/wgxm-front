import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Register from "@/views/Register.vue"
import NotFind from '@/views/404NotFind.vue'
import Manager from '@/views/Manager.vue'
import Home from '@/views/manager/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Manager,
        redirect: '/home',
        children: [
            {path: '/home', component: Home}
        ]

    },
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path:'*',component: NotFind}
]

const router = new VueRouter({
    routes
})

//全局前置导航守卫(在路由切换时触发，用于控制页面访问权限)
/*router.beforeEach((to, from, next) => {



})*/


export default router
