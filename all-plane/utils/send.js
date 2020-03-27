const successMsg = function(data = null, msg = "请求成功", code = 0, status = 200) {
  return {
    data,
    code,
    msg,
    status,
  }
}
const errorMsg = function(msg = "请求失败", code = -1, status = 200) {
  return {
    code,
    msg,
    status,
  }
}
const catchMsg = function(msg = "请求异常", code = 1, status = 200) {
  return {
    code,
    msg,
    status,
  }
}
const tokenMsg = function(msg = "token is invalid", code = 0, status = 401) {
  return {
    code,
    msg,
    status,
  }
}
const noRouteMsg = function(msg = "无此接口", code = -1, status = 404) {
  return {
    code,
    msg,
    status,
  }
}
module.exports = {
  sMsg: successMsg,
  eMsg: errorMsg,
  cMsg: catchMsg,
  tMsg: tokenMsg,
  nMsg: noRouteMsg,
}