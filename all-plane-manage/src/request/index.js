import axios from 'axios'
import router from '../router'
import config from '../config'

const service = axios.create({
  baseURL: config.baseURL, // 请求主地址
  timeout: 50000 // 超时时间
})

/* -------请求拦截器-------- */
service.interceptors.request.use(request => {
  let token = sessionStorage.getItem('token')
  if (!token) {
    router.push({path: '/login'})
  } else {
    request.headers.Authorization = token
  }
}, error => {
  return Promise.reject(error)
})

/* -------响应拦截器-------- */
service.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status >= 400) {
    router.push({path: '/login'})
  }
  return Promise.reject(error)
})

module.exports = service
