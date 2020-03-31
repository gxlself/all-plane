/*
 * @Description: 权限处理
 * @Version: 1.0
 * @Authoe: gxlself
 * @Date: 2020-03-30 10:53:02
 */

const { sMsg, eMsg } = require('../utils/send')
const logger = require('../utils/log').useLog('permission')
const permission = (req, res, next) => {
  res.send(sMsg())
}
module.exports = {
  permission
}
