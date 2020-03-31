const { sMsg, eMsg } = require('../utils/send')
const logger = require('../utils/log').useLog('userinfo')

const userinfo = (req, res, next) => {
  res.send(sMsg())
}
module.exports = {
  userinfo
}