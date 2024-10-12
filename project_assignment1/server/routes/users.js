const express = require('express');
const router = express.Router();

// 임시 사용자 데이터 저장소 (메모리에서 관리)
let users = [];

// ID 중복 체크
router.get('/check-id', (req, res) => {
  const { id } = req.query;
  const userExists = users.some(user => user.id === id);
  return res.json({ exists: userExists });
});

// 회원가입 처리
router.post('/register', (req, res) => {
  const { id, pw1, pw2 } = req.body;

  // ID 중복 체크
  if (users.some(user => user.id === id)) {
    return res.status(400).json({ success: false, message: '중복된 ID입니다' });
  }

  // 비밀번호 일치 여부 확인
  if (pw1 !== pw2) {
    return res.status(400).json({ success: false, message: '비빌번호가 일치하지 않습니다' });
  }

  // 사용자 등록
  users.push({ id, password: pw1 });
  return res.json({ success: true });
});

// 로그인 처리
router.post('/login', (req, res) => {
  const { id, pw } = req.body;

  // 사용자 확인
  const user = users.find(user => user.id === id && user.password === pw);
  if (user) {
    return res.json({ success: true, name: user.id });
  } else {
    return res.status(401).json({ success: false, message: 'ID 혹은 PW가 잘못되었습니다' });
  }
});

module.exports = router;