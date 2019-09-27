import Vue from 'vue'
import Vuex from 'vuex'
// import state from './state'
// import actions from './actions'
// import mutations from './mutations'
// import getters from './getters'

let state = {}
let actions = {}
let mutations = {}
let getters = {}

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    strict: process.env.NODE_ENV !== 'production'
})

export default store