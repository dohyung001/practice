var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//라우터 객체
var indexRouter = require('./routes/index'); //인덱스와 관련된 파일 경로
var usersRouter = require('./routes/users'); //유저스와 관련된 파일 경로
const tokenRouter = require("./routes/token"); //토큰 라우터 파일 경로
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//뷰 엔진 연결
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

//라우터 객체 연결
app.use("/", indexRouter); //index경로와 관련된 파일 주소 라우팅
app.use('/users', usersRouter); //users경로 와 관련된 파일 라우팅

app.use("/token", tokenRouter); //토큰경로와 관련된 파이 라우팅



//404 처리
/*
app.use(function (req, res, next) {
  res.status(404).send('ㅈㅅ 404에요.');
});
*/
//404페이지와 연결
app.use(function (req, res, next) {
  res.status(404).render('404');
});

module.exports = app;
