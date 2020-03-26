var express = require('express');
var router = express.Router();
var md5 = require('md5');
var { sqlTodo } = require('../utils/sql') 
var jwt = require('jsonwebtoken');
var { sign } = require('../config/config')
var logger = require('../utils/log').useLog('login')

// 管理系统登录
router.post('/manage/login', function(req, res, next) {
  const username = md5(req.body.username)
  const password = md5(req.body.password)
  const queryLoginSql = `select username,password,o_username from m_users where username='${username}' and password='${password}';`
  logger.trace(`系统登录SQL ====== ${queryLoginSql}`)
  sqlTodo(queryLoginSql, (results, fields) => {
    const currentUser = results[0]
    if (results.length === 0) {
      res.send({code: 1, msg: '查无此人', status: 200});
    } else {
      jwt.sign({username: currentUser.o_username}, sign, function(err, token) {
        const t = token.split('.')
        const queryToken = `SELECT username FROM m_token WHERE username='${currentUser.o_username}'`
        logger.trace(`登录查找token-SQL ====== ${queryToken}`)
        sqlTodo(queryToken, results => {
          if (results.length == 0) {
            saveToToken(token, t[2], currentUser.o_username, res)
          } else {
            updateToken(token, t[2], currentUser.o_username, res)
          }
        }, err => {
          logger.error(`登录查找token ====== ${err.message || '数据库错误， 请稍候再试'}`)
          res.send({code: -2, msg: '数据库错误， 请稍候再试', status: 200});
        })
      })
    }
  }, err => {
    console.log('/manage/login', err)
    res.send({code: 2, msg: '数据库查询错误', status: 200});
  })
});
// 存储token值
function saveToToken (a_token, token, username, res) {
  const saveTokenSql = `INSERT INTO m_token VALUES('${token}', '${a_token}', '${username}')`
  logger.trace(`存储token值-SQL ====== ${saveTokenSql}`)
  sqlTodo(saveTokenSql, results => {
    res.send({
      code: 0, 
      msg: 'ok', 
      status: 200, 
      data: { token, username }
    });
  }, err => {
    logger.error(`存储token值-SQL ====== ${err.message || '失败，请重试'}`)
    res.send({code: -1, msg: '失败，请重试', status: 200});
  })
}
// 更新token值
function updateToken(a_token, token, username, res) {
  const updateTokenSql = `UPDATE m_token SET a_token='${a_token}',token='${token}',username='${username}'`
  logger.trace(`存储token值-SQL ====== ${updateTokenSql}`)
  sqlTodo(updateTokenSql, results => {
    res.send({
      code: 0, 
      msg: 'ok', 
      status: 200, 
      data: { token, username }
    });
  }, err => {
    logger.error(`更新token值-SQL ====== ${err.message || '失败，请重试'}`)
    res.send({code: -1, msg: '失败，请重试', status: 200});
  })
}

module.exports = router;
