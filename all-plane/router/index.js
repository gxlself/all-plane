var express = require('express');
var md5 = require('md5');
var router = express.Router();
var { sqlTodo } = require('../utils/sql') 
var { createToken, verify } = require('../utils/jwt')
var logger = require('../utils/log').useLog('login')
const { sMsg, eMsg, cMsg } = require('../utils/send')
const { checkString } = require('../utils/util')

// 管理系统登录
router.post('/manage/login', function(req, res, next) {
  const { username, password } = req.body
  if (!checkString(username)) {
    res.send(eMsg('username is invalid'))
    return
  }
  if (!checkString(password)) {
    res.send(eMsg('password is invalid'))
    return
  }
  const _username = md5(username)
  const _password = md5(password)
  const queryLoginSql = `select username,password,o_username from m_users where username='${_username}' and password='${_password}';`
  logger.trace(`系统登录SQL ====== ${queryLoginSql}`)
  sqlTodo(queryLoginSql)
    .then(results => {
      if (results.length === 0) {
        res.send(cMsg('账号与密码不匹配'))
      } else {
        const currentUser = results[0]
        checkTokenInvalid(currentUser.o_username, res)
      }
    })
    .catch(err => {
      logger.error(`登录出错-err.message ====== ${err.message}`)
      res.send(eMsg('数据库错误， 请稍候再试'))
    })
});

// 校验token值 有效期直接返回 否则重新生成
function checkTokenInvalid(username, res) {
  const queryToken = `SELECT * FROM m_token WHERE username='${username}'`
  logger.trace(`登录查找token-SQL ====== ${queryToken}`)
  sqlTodo(queryToken)
    .then(results => {
      if (results.length === 0) {
        saveToToken (username, res)
      } else {
        let token = results[0].token
        let a_token = results[0].a_token
        verify(a_token)
          .then(ver => {
            if (ver.username === username) {
              res.send(sMsg({ token, username }))
            } else {
              saveToToken (username, res, false)
            }
          })
          .catch(err => {
            // token出错后 再次更新
            saveToToken (username, res, false)
          })
      }
    })
    .catch(err => {
      res.send({ code: -1, msg: err.message, status: 200, data: null });
    })
}
// 存储token值 isInsert true 是新增token false 为更细token
function saveToToken(username, res, isInsert = true) {
  let newAllToken = createToken({ username });
  let t = newAllToken.split('.')
  let token = t[2]
  let saveTokenSql = ''
  if (isInsert) {
    saveTokenSql = `INSERT INTO m_token VALUES('${token}', '${newAllToken}', '${username}')`
  } else {
    saveTokenSql = `UPDATE m_token SET a_token='${newAllToken}', token='${token}' WHERE username='${username}'`
  }
  logger.trace(`存储token值-SQL ====== ${saveTokenSql}`)
  sqlTodo(saveTokenSql)
    .then(results => {
      res.send(sMsg({ token, username }))
    })
    .catch(err => {
      logger.error(`存储token值 ====== ${err.message || '失败，请重试'}`)
      res.send(eMsg('失败，请重试'))
    })
}

module.exports = router;
