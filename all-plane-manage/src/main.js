// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import config from './config'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from './http/api'

Vue.config.productionTip = false
Vue.prototype.baseUrl = config.baseUrl;

Vue.use(ElementUI);
Vue.prototype.api = api

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
