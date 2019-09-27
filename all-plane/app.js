var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');

// 引入各个接口需要的文件
var routerIndex = require('./router/index')
var manage = require('./manage/index');
var mobile = require('./mobile/index');

// 实例express
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//设置跨域访问
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3334');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
};

app.use(allowCrossDomain)
// 默认的路由（不需要拦截的登录注册）
app.use('/', routerIndex)
//拦截器
app.use(function (err, req, res, next) {
  //当token验证失败时会抛出如下错误
  if (err.name === 'UnauthorizedError') {   
    //这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
    res.status(401).send('invalid token...');
  }
});

// 前后路由开始
app.use('/manage', manage);
app.use('/mobile', mobile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  res.send({code: -1, msg: '无此接口', status: 404});
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  res.send({code: -1, msg: err, status: err.status || 500});
});

module.exports = app;
