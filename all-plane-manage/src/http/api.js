
import service from './request'
const api = {};
/*------登录、登出 接口------*/
api.login = function(data) {
  return service({url:"/login", method: 'post', data: data}).then(res => {
    if (res.status == 200) {
      return res.data
    }
  })
}
api.loginout = function(data) {
  return service({url:"/loginout", method: 'get', data: data}).then(res => {
    if (res.status == 200) {
      return res.data
    }
  })
}

// 新建公告信息 type=1  提交到审核  type=2  保存到草稿
api.addMessage = function(data) {
  return service({url:"/message/addMessage", method: 'post', data: data}).then(res => {
    if (res.status == 200) {
      return res.data
    }
  })
}

// 新建公告信息 type=1  提交到审核  type=2  保存到草稿
api.queryMessage = function(params) {
  return service({url:"/message/queryMessage", method: 'get', params: params}).then(res => {
    if (res.status == 200) {
      return res.data
    }
  })
}
export default api