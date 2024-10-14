//token.js

const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//미들웨어 활용
const { verifyToken } = require("./middlewares");

const router = express.Router();

//토큰 생성
router.post("/", async (req, res) => {

  try {
    const id = "myid";
    const nick = "kdpark";
    const token = jwt.sign(  //싸인
      { //페이로드
        id,
        nick,
      },
      process.env.JWT_SECRET, //비밀키
      {
        expiresIn: "1m",
        issuer: "hcclab",
      });

    return res.json({  //json형식으로 발급
      code: 200,
      message: " 토큰이  발급되었습니다 .",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: " 서버  에러 ",
    });
  }
});

//토큰 테스트 
router.get("/test", verifyToken, (req, res) => {
  res.json(req.decoded);
});

module.exports = router;
