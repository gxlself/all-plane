var express = require('express');
var router = express.Router();
var md5 = require('md5');
var { selectData } = require('../utils/sql') 

router.post('/manage/login', function(req, res, next) {
  const username = md5(req.body.username)
  const password = md5(req.body.password)
  const sql = `select username,password from m_users where username='${username}' and password='${password}';`
  console.log('/manage/login', req.body)
  selectData(sql, (results, fields) => {
    if (results.length === 0) {
      res.send({code: 1, msg: '查无此人', status: 200});
    } else {
      res.send({code: 0, msg: 'ok', status: 200, token: 'username'});
    }
  }, err => {
    console.log('/manage/login', err)
    res.send({code: 2, msg: '数据库查询错误', status: 200});
  })
});

module.exports = router;
