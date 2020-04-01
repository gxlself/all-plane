/*
 * @Description: 用户信息
 * @Version: 1.0
 * @Authoe: gxlself
 * @Date: 2020-03-31 13:02:24
 */

const { sMsg, eMsg } = require('../utils/send')
const { sqlTodo } = require('../utils/sql')
const logger = require('../utils/log').useLog('userinfo')

const userinfo = (req, res, next) => {
  res.send(sMsg())
}

const queryPeople = async (req, res, next) => {
  res.send(sMsg())
  const listSQL = `SELECT o_username,role,status FROM m_users`
  const countSQL = `SELECT COUNT(*) AS count FROM m_users`
  Promise.all(sqlTodo(listSQL), sqlTodo(countSQL))
    .then(values => {
      const list = values[0].map(item => {
        item.password = ''
        return item
      })
      const count = values[1][0].count
      res.send(sMsg(list, count))
    })
    .catch(err => {
      console.log(`queryPeople ====== ${err.message}`)
      logger.error(`启用/禁用菜单异常 SQL ====== ${querySQL} | ${countSQL}`)
      res.send(eMsg())
    })
}

module.exports = {
  userinfo,
  queryPeople
}