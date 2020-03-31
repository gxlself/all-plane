/*
 * @Description:
 * @Version: 1.0
 * @Authoe: gxlself
 * @Date: 2020-03-30 10:53:01
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, getName } from '@/utils/auth'

// create an axios instance
console.log('baseURL', process.env.VUE_APP_BASE_API)
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['authorization'] = `${getToken()},${getName()}`
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.status === 401 || response.data.status === 401) {
      Message({
        message: response.data.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      MessageBox.confirm('你的登录状态已经失效，请重新登录', '确认登录', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
      return Promise.reject(new Error(response.message || 'Error'))
    }
    if (response.status === 200 && response.data.code === 0) {
      return response.data
    }
    Message({
      message: response.data.msg || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(response.data.msg || 'Error'))
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error.message)
  }
)

export default service
