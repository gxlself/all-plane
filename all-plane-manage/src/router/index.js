import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const customRouter = [
  {
    path: '/',
    redirect: '/login'
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
    redirect: '/manage/message/list',
    children: [
      {
        path: '/manage/message',
        name: 'Message',
        redirect: '/manage/message/list',
        children: [
          {
            path: '/manage/message/list',
            name: 'ManageList',
            component: resolve => { require(['../views/message/list.vue'], resolve) }
          },
          {
            path: '/manage/message/add',
            name: 'ManageAdd',
            component: resolve => { require(['../views/message/add.vue'], resolve) }
          }
        ]
      },
      {
        path: '/system',
        name: 'System',
        redirect: '/system/list',
        children: [
          {
            path: 'system/list',
            name: 'SystemList',
            component: resolve => { require(['../views/system/system.vue'], resolve) }
          },
          {
            path: 'system/add',
            name: 'SystemAdd',
            component: resolve => { require(['../views/message/add.vue'], resolve) }
          }
        ]
      },
    ]
  },
  { 
    path: '*', 
    component: resolve => { require(['../views/error/404.vue'], resolve) },
  }
]

export default new Router({
  routes: customRouter
})

    // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: resolve => { require(['../views/login.vue'], resolve) }
  // },