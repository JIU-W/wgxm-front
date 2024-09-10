import { getInfo, setInfo } from '@/utils/storage'

export default {
    namespaced: true,
    state () {
        return {
            userInfo: getInfo()
        }
    },
    mutations: {
        setUserInfo (state, obj) {
            //添加数据到vuex
            state.userInfo = obj
            //添加数据到本地(持久化)
            setInfo(obj)
        },
    },
    actions: {
        //退出登录
        logout (context) {
            context.commit('setUserInfo', {})
        }
    }
}
