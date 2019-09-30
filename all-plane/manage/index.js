var express = require('express');
var router = express.Router();
var { sqlTodo } = require('../utils/sql');
var Base64 = require('js-base64').Base64;
var { currentTime } = require('../utils/util')

/* 登出 */
router.get('/loginout', function(req, res, next) {
  var requestAuthorization = req.headers.authorization.split(',')[0]
  var requestUsername = req.headers.authorization.split(',')[1]
  const delDataSql = `DELETE FROM m_token WHERE token='${requestAuthorization}' && username='${requestUsername}'`
  console.log('loginout')
  sqlTodo(delDataSql, result =>{
    res.send({code: 0, msg: '退出成功', status: 200});
  }, err => {
    console.log('/loginout', err)
    res.send({code: -1, msg: '退出成功', status: 200});
  })
});

/* 新建公告 */
router.post('/addMessage', function(req, res, next) {
  let title = Base64.encode(req.body.title)
  let theme = Base64.encode(req.body.theme)
  let content = Base64.encode(req.body.content)
  console.log(currentTime())
  let create_date = currentTime()
  let last_modify = currentTime()
  const saveMessageSql = `INSERT INTO m_message (title, theme, content, type, create_user, create_date, last_modify) VALUES('${title}', '${theme}', '${content}', ${req.body.type}, '${req.body.username}', '${create_date}', '${last_modify}')`
  
  sqlTodo(saveMessageSql, result =>{
    res.send({code: 0, msg: '保存成功', status: 200});
  }, err => {
    console.log('/addMessage', err)
    res.send({code: -1, msg: '保存失败', status: 200});
  })
});

module.exports = router;
