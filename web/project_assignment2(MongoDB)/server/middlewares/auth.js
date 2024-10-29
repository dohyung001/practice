const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer 토큰 형식에서 토큰 추출

  if (!token) {
    return res.status(403).json({ message: '토큰이 없습니다.' });
  }

  try {
    req.decoded = jwt.verify(token, process.env.JWT_SECRET); // 토큰 검증
    return next(); // 검증 통과 시 다음 미들웨어로 이동
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({ code: 419, message: '토큰이 만료되었습니다.' });
    }
    return res.status(401).json({ code: 401, message: '유효하지 않은 토큰입니다.' });
  }
};