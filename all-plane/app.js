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
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
