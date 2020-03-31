const { sMsg, eMsg } = require('../utils/send')
const logger = require('../utils/log').useLog('permission')
const permission = (req, res, next) => {
  res.send(sMsg())
}
module.exports = {
  permission
}
