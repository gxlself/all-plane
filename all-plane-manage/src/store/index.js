import Vue from 'vue'
import Vuex from 'vuex'
import { login, loginout } from '../http/login'

let state = {
    avatar: '',
    token: '',
    loading: false,
    username: ''
}

let actions = {
    login({ commit }, userInfo) {
        const {username, password} = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            loginout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                // removeToken()
                // resetRouter()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            // removeToken()
            // resolve()
        })
    },
    // dynamically modify permissions
    changeRoles({ commit, dispatch }, role) {
        return new Promise(async resolve => {
            const token = role + '-token'

            commit('SET_TOKEN', token)
            // setToken(token)

            // const { roles } = await dispatch('getInfo')

            // resetRouter()

            // generate accessible routes map based on roles
            // const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
            // dynamically add accessible routes
            // router.addRoutes(accessRoutes)
            resolve()
        })
    }
}

let mutations = {
    // token设置
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    // 清除用户信息
    CLEAR_INFO (state, info) {
        sessionStorage.clear();
        state.token = '';
        state.username = '';
    },
    // 账户
    SET_USERNAME: (state, name) => {
        state.username = name
    },
    // 头像
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    // 角色
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

let getters = {
    // 获取用户名
    getUsername: state => state.username,
    getAvatar: state => state.avatar,
    // 获取token值
    getToken: state => state.token || sessionStorage.getItem('token')
}

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
})

export default store