/*
 * @Description: 用户信息
 * @Version: 1.0
 * @Authoe: gxlself
 * @Date: 2020-03-31 13:02:24
 */

const { sMsg, eMsg } = require('../utils/send')
const logger = require('../utils/log').useLog('userinfo')

const userinfo = (req, res, next) => {
  res.send(sMsg())
}
module.exports = {
  userinfo
}