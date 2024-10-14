var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET friend page. */
router.get('/friend', function (req, res, next) {
  res.render('home', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET register page. */
router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' });
});

// JWT 토큰 예시 (테스트 용도)
const jwt = require("jsonwebtoken");
const token = jwt.sign({ id: "kdkd" }, "shhhhh", {
  expiresIn: "1m",
  issuer: "kdpark",
});
console.log(token);

module.exports = router;
