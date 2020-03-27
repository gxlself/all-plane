var express = require('express');
var router = express.Router();
var { sqlTodo } = require('../utils/sql');
var Base64 = require('js-base64').Base64;
var { currentTime } = require('../utils/util')
const { sMsg, eMsg, cMsg } = require('../utils/send')
var logger = require('../utils/log').useLog('message')

/* 登出 */
router.get('/loginout', function(req, res, next) {
  var requestAuthorization = req.headers.authorization.split(',')[0]
  var requestUsername = req.headers.authorization.split(',')[1]
  const delDataSql = `DELETE FROM m_token WHERE token='${requestAuthorization}' && username='${requestUsername}'`
  sqlTodo(delDataSql)
    .then(result => {
      res.send(sMsg('loginout is success'));
    })
    .catch(err => {
      res.send(eMsg());
    })
});

/* 新建公告 */
router.post('/message/addMessage', function(req, res, next) {
  let title = Base64.encode(req.body.title)
  let theme = Base64.encode(req.body.theme)
  let content = Base64.encode(req.body.content)
  let create_date = currentTime()
  let last_modify = currentTime()
  const saveMessageSql = `INSERT INTO m_message (title, theme, content, status, create_user, create_date, last_modify) VALUES('${title}', '${theme}', '${content}', ${req.body.status}, '${req.body.username}', '${create_date}', '${last_modify}')`
  logger.trace(`新建公告SQL ====== ${saveMessageSql}`)
  sqlTodo(saveMessageSql)
    .then(result => {
      res.send(sMsg('保存成功'))
    })
    .catch(err => {
      logger.error(`新建公告异常 ====== ${err.message}`)
      res.send(eMsg('保存失败'))
    })
});

module.exports = router;
