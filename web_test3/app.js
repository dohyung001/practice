var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 라우터 객체
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 뷰 엔진 설정
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// 라우터 연결
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 404 처리
app.use(function (req, res, next) {
  res.status(404).render('404');
});

module.exports = app;