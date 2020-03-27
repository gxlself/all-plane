var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var { sqlTodo } = require('./utils/sql')
var { sign } = require('./config/config')
var log4js = require("./utils/log");

// 引入各个接口需要的文件
var routerIndex = require('./router/index')
var manage = require('./manage/index');
var mobile = require('./mobile/index');
var system = require('./system/index');

// 实例express
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 配置日志输出
log4js.configure();
let reqLog = log4js.useLog('request')
let tokenLog = log4js.useLog('token')

//设置跨域访问
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3335');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'authorization,content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
};
app.use(allowCrossDomain)

// 默认的路由（不需要拦截的登录注册）
app.use('/', routerIndex)

//拦截器
app.use(function (req, res, next) {
  try{
    var requestAuthorization = req.headers.authorization.split(',')[0]
    var requestUsername = req.headers.authorization.split(',')[1]
  } catch(e) {
    res.send({code: -1, msg: '无效token', status: 401});
    return
  }
  const sqlLog = `SELECT a_token,username FROM m_token WHERE token='${requestAuthorization}'`
  reqLog.trace(`请求进入host ===== ${req.headers.host}`)
  reqLog.trace(`请求进入referer ===== ${req.headers.referer}`)
  reqLog.trace(`请求进入user-agent ===== ${req.headers['user-agent']}`)
  tokenLog.info(`登录SQL执行 ====== ${sqlLog}`)
  tokenLog.info(`校验token ====== ${requestAuthorization}`)
  sqlTodo(sqlLog, (result, fields) => {
    if (result.length <= 0) {
      res.send({code: -1, msg: '无效token', status: 401});
    } else {
      const token = result[0].a_token
      const username = result[0].username
      jwt.verify(token, sign, (err, decoded) => {
        //当token验证失败时会抛出如下错误
        if (err) {
          res.send({code: -1, msg: 'token失效', status: 401});
        } else {
          if (username === requestUsername) {
            next()
          } else {
            res.send({code: -1, msg: '无效token', status: 401});
          }
        }
      })
    }
  }, error => {
    tokenLog.error(`校验token ====== ${error.manage || '数据库查询错误'}`)
    res.send({code: -2, msg: '数据库查询错误-token', status: 401});
  })
});

// 前后路由开始
app.use('/manage', manage);
app.use('/mobile', mobile);
app.use('/system', system);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  reqLog.warn(`请求warn ====== 无此接口`)
  res.send({code: -1, msg: '无此接口', status: 404});
});

// error handler
app.use(function(err, req, res, next) {
  reqLog.error(`请求error ====== ${err.message}`)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  res.send({code: -1, msg: err, status: err.status || 500});
});

module.exports = app;
