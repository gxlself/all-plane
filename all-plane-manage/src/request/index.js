import config from '../config'
import router from '../router/index'
const axios = require('axios')

const service = axios.create({
  baseURL: config.baseURL, // 请求主地址
  timeout: 50000 // 超时时间
})

/* -------请求拦截器-------- */
service.interceptors.request.use(request => {
  let token = sessionStorage.getItem('token')
  if (!token) {
    router.push({name: 'login'})
  } else {
    request.headers.Authorization = token
  }
  return request
}, error => {
  return Promise.reject(error)
})

/* -------响应拦截器-------- */
service.interceptors.response.use(response => {
  return response
}, error => {
  if (error && error.response.status >= 400) {
    router.push({path: '/login'})
  }
  return Promise.reject(error)
})

export default service
