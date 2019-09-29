import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => { require(['../views/login.vue'], resolve) }
    },
    {
      path: '/manage',
      name: 'manage',
      component: resolve => { require(['../views/index.vue'], resolve) },
      children: [
        {
          path: '',
          redirect: '/system'
        },
        {
          path: '/system',
          name: 'system',
          component: resolve => { require(['../views/system/system.vue'], resolve) }
        },
        {
          path: '/message',
          name: 'message',
          component: resolve => { require(['../views/system/message.vue'], resolve) }
        }
      ]
    }
  ]
})
