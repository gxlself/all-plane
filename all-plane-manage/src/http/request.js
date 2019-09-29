
import axios from 'axios';
import router from '../router';
import config from '../config';
import { Loading } from 'element-ui';
import Vue from 'vue';

let vm = new Vue();

/********** 定义loading变量 **********/
let loading;        

//**** 使用Element loading-start 方法
function startLoading() {    
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
//**** 使用Element loading-close 方法
function endLoading() {    
    loading.close();
}
//**** 那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//**** 声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//**** 调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading();
    }
    needLoadingRequestCount++
}
export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
        needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        endLoading();
    }
}

/********** 创建axios实例 **********/ 
const service = axios.create({
    baseURL: config.baseUrl, // 请求主地址
    timeout: 50000           // 请求超时时间
})

/********** 请求拦截器 对请求参数进行处理 **********/
service.interceptors.request.use(config => {
    showFullScreenLoading();
    let token = sessionStorage.getItem('token');
    let username = sessionStorage.getItem('username');
    if (!token){
        if (location.hash !== '#/login') {
            router.push({path: '/login'})
        }
        let timer = setTimeout(() => {
            tryHideFullScreenLoading()
            clearTimeout(timer)
        }, 1000) 
    } else {
        config.headers.Authorization = token + ',' + username;
    }
    return config
}, error => {
    let timer = setTimeout(() => {
        tryHideFullScreenLoading()
        clearTimeout(timer)
    }, 1000) 
    return Promise.reject(error)
})

/********** 响应拦截器 对响应参数进行处理 **********/
service.interceptors.response.use(response => {
    if (response.data.status >= 400) {
        vm.$message({ showClose: true, message: '登录状态失效', type: 'error', duration: 1000, onClose: () => {
            router.push({path: '/login'})
        }})
    }
    let timer = setTimeout(() => {
        tryHideFullScreenLoading()
        clearTimeout(timer)
    }, 1000)
    return response
}, error => {
    if (error.response.status === 401) {
        router.push({path: '/login'})
    }
    let timer = setTimeout(() => {
        tryHideFullScreenLoading()
        clearTimeout(timer)
    }, 1000) 
    return Promise.reject(error)
})

export default service;