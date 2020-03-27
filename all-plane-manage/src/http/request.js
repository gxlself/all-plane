
import axios from 'axios';
import config from '../config';
import store from '../store/index'

const service = axios.create({
    baseURL: config.baseUrl, // 请求主地址
    timeout: 50000           // 请求超时时间
})

/********** 请求拦截器 对请求参数进行处理 **********/
service.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers.Authorization = store.getters.token + ',' + store.getters.username;
    }
    return config
}, error => {
    return Promise.reject(error)
})

/********** 响应拦截器 对响应参数进行处理 **********/
service.interceptors.response.use(response => {
    if (response.status === 200) {
        if (response.data.code === 0) {
            return response.data
        } else {
            return Promise.reject(new Error(response.data.msg || '请求异常'))
        }
    } else {
        return Promise.reject(new Error(response.message || 'Error'))
    }
}, error => {
    return Promise.reject(error)
})

export default service;