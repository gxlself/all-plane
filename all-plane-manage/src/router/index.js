import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/Index',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: resolve => { require(['../views/login.vue'], resolve) }
    }
  ]
})
