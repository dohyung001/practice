var express = require('express');
var router = express.Router();

// 임시 사용자 데이터 저장 
let users = [];

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// ID 중복 체크 라우트
router.get('/check-id', function (req, res, next) {
  const { id } = req.query;
  const userExists = users.some(user => user.id === id);
  res.json({ exists: userExists });
});

// 회원가입 라우트
router.post('/register', function (req, res, next) {
  const { id, pw1, pw2 } = req.body;

  // ID 중복 체크
  const userExists = users.some(user => user.id === id);
  if (userExists) {
    return res.status(400).send('ID already exists');
  }

  // 비밀번호 일치 여부 확인
  if (pw1 !== pw2) {
    return res.status(400).send('Passwords do not match');
  }

  // 새 사용자 등록
  users.push({ id, password: pw1 });
  return res.redirect('/login');
});

// 로그인 라우트
router.post('/login', function (req, res, next) {
  const { id, pw } = req.body;

  // ID와 비밀번호 일치 여부 확인
  const user = users.find(user => user.id === id && user.password === pw);
  if (user) {
    return res.redirect(`/home?name=${id}`);
  } else {
    return res.status(401).send('Invalid ID or password');
  }
});

// 홈 라우트
router.get('/home', function (req, res, next) {
  const { name } = req.query;
  if (name) {
    res.render('home', { title: `Welcome ${name}` });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;