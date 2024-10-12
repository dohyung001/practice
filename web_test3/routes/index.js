var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page with name */
router.get('/home', function (req, res, next) {
  const { name } = req.query;
  if (name) {
    res.render('home', { title: `Welcome, ${name}!` });
  } else {
    res.redirect('/login'); // name이 없으면 로그인 페이지로 리다이렉트
  }
});

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET register page. */
router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' });
});



module.exports = router;