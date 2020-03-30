// const createError = require('http-errors');
const express = require('express');
const { verify } = require('./utils/jwt')
const { sqlTodo } = require('./utils/sql')
const log4js = require("./utils/log");
const { tMsg, nMsg } = require('./utils/send')

// 引入各个接口需要的文件
const routerIndex = require('./router/index')
const manage = require('./manage/index');
const mobile = require('./mobile/index');
// const system = require('./system/index');

// 实例express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 配置日志输出
log4js.configure();
let reqLog = log4js.useLog('request')
let tokenLog = log4js.useLog('token')

//设置跨域访问
const allowCrossDomain = function(req, res, next) {
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
    res.send(tMsg());
    return
  }
  const sqlLog = `SELECT a_token,username FROM m_token WHERE token='${requestAuthorization}'`
  reqLog.trace(`请求进入host ===== ${req.headers.host}`)
  reqLog.trace(`请求进入referer ===== ${req.headers.referer}`)
  reqLog.trace(`请求进入user-agent ===== ${req.headers['user-agent']}`)
  tokenLog.info(`登录SQL执行 ====== ${sqlLog}`)
  tokenLog.info(`校验token ====== ${requestAuthorization}`)
  // 校验token以及用户名是否对应
  sqlTodo(sqlLog)
    .then(result => {
      if (result.length <= 0) {
        res.send(tMsg());
      } else {
        const token = result[0].a_token
        const username = result[0].username
        verify(token)
          .then(decode => {
            if (username === decode.username && requestUsername === username) {
              next()
            } else {
              res.send(tMsg());
            }
          }).catch(err => {
            res.send(tMsg());
          })
      }
    })
    .catch(err => {
      tokenLog.error(`校验token ====== ${error.manage || '数据库查询错误'}`)
      res.send({code: -2, msg: '数据库查询错误-token', status: 401});
    })
});

// 前后路由开始
app.use('/manage', manage);
app.use('/mobile', mobile);
// app.use('/system', system);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  reqLog.warn(`请求warn ====== 无此接口`)
  res.send(nMsg());
});

// error handler
app.use(function(err, req, res, next) {
  reqLog.error(`请求error ====== ${err.message}`)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // send error
  res.send(nMsg(err, -1, err.status || 500))
});

module.exports = app;
