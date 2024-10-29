const express = require('express');
const User = require('../schemas/User');
const connectDB = require('../mongoose');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth');  // 미들웨어 가져오기
const jwt = require('jsonwebtoken');
require('dotenv').config();

connectDB();  // 서버가 시작될 때 MongoDB에 연결합니다.

// ID 중복 체크
router.get('/check-id', async (req, res) => {
  try {
    const { id } = req.query;
    const userExists = await User.findOne({ id });
    res.json({ exists: !!userExists });
  } catch (error) {
    console.error('ID 중복 체크 에러:', error);
    res.status(500).json({ message: 'ID 중복 체크 중 오류가 발생했습니다.' });
  }
});

// 회원가입 처리
router.post('/register', async (req, res) => {
  try {
    const { id, pw1, pw2 } = req.body;

    // ID 중복 체크
    if (await User.findOne({ id })) {
      return res.status(400).json({ success: false, message: '중복된 ID입니다' });
    }

    // 비밀번호 일치 여부 확인
    if (pw1 !== pw2) {
      return res.status(400).json({ success: false, message: '비밀번호가 일치하지 않습니다' });
    }

    // 사용자 등록
    const newUser = new User({ id, password: pw1 });
    await newUser.save();
    res.json({ success: true });
  } catch (error) {
    console.error('회원가입 에러:', error);
    res.status(500).json({ message: '회원가입 중 오류가 발생했습니다.' });
  }
});

// 로그인 처리
router.post('/login', async (req, res) => {
  try {
    const { id, pw } = req.body;
    const user = await User.findOne({ id, password: pw });

    if (user) {
      // JWT 토큰 발급
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ success: true, message: '로그인 성공', name: user.id, token });
    } else {
      res.status(401).json({ success: false, message: 'ID 혹은 PW가 잘못되었습니다' });
    }
  } catch (error) {
    console.error('로그인 에러:', error);
    res.status(500).json({ message: '로그인 중 오류가 발생했습니다.' });
  }
});

// /home 라우트 보호하기
router.get('/home', verifyToken, (req, res) => {
  res.json({ message: `접속한 ID: ${req.decoded.id}`, name: req.decoded.id });
});

module.exports = router;