// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { AjaxPlugin } from 'vux'
import { isIos, isIphonX, isMobile } from './utils/util'

Vue.config.productionTip = false
// 使用vux的ajax请求
Vue.use(AjaxPlugin)

Vue.prototype.isIos = isIos()
Vue.prototype.isIphonX = isIphonX()
Vue.prototype.isMobile = isMobile()

console.log(`isIos: ${Vue.prototype.isIos}`)
console.log(`isIphonX: ${Vue.prototype.isIphonX}`)
console.log(`isMobile: ${Vue.prototype.isMobile}`)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
