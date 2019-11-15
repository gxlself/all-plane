import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const customRouter = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: resolve => { require(['../views/login.vue'], resolve) }
  },
  {
    path: '/login',
    name: 'Login',
    component: resolve => { require(['../views/login.vue'], resolve) }
  },
  {
    path: '/manage',
    name: 'Manage',
    component: resolve => { require(['../views/index.vue'], resolve) },
    redirect: '/manage/system',
    children: [
      {
        path: 'system',
        name: 'System',
        component: resolve => { require(['../views/system/system.vue'], resolve) }
      },
      {
        path: 'message/add',
        name: 'MessageAdd',
        component: resolve => { require(['../views/message/add.vue'], resolve) }
      },
      {
        path: 'message/list',
        name: 'MessageList',
        component: resolve => { require(['../views/message/list.vue'], resolve) }
      }
    ]
  },
  // {
  //   name: 'error',
  //   path: '/404',
  //   component: resolve => { require(['../views/error/404.vue'], resolve) },
  // },
  { 
    path: '*', 
    component: resolve => { require(['../views/error/404.vue'], resolve) },
  }
]

export default new Router({
  routes: customRouter
})
