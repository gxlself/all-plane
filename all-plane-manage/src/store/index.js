import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
// import state from './state'
// import actions from './actions'
// import mutations from './mutations'
// import getters from './getters'

let state = {
    token: '',
    loading: false,
    username: ''
}
let actions = {}
let mutations = {
    // 设置用户信息
    setUsername (state, info) {
        sessionStorage.setItem('token', info.token)
        sessionStorage.setItem('username', info.username)
        state.token = info.token;
        state.userInfo = info.user;    
    },
    // 清除用户信息
    clearStore (state, info) {
        sessionStorage.clear();
        state.token = '';
        state.username = '';
        router.push({path: '/login'});
    }
}
let getters = {
    // 获取用户名
    getUsername (state) {
        return state.userInfo;
    },
    // 获取token值
    getToken (state) {
        let token = sessionStorage.getItem('token')
        return state.token || token;
    }
}

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    strict: process.env.NODE_ENV !== 'production'
})

export default store