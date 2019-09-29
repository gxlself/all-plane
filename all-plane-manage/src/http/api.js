
import service from './request'
const api = {};
/*------登录接口------*/
api.login = function(data) {
  return service({url:"/login", method: 'post', data: data}).then(res => {
    if (res.status == 200) {
      return res.data
    }
  })
}

api.manage = function(data) {
  return service({url:"", method: 'get', data: data}).then(res => {
    if (res.status == 200) {
      return res.data
    }
  })
}
export default api