var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/friend', function (req, res, next) {
  res.render('hello', { title: 'Express' });
});


//JWT토큰 예시
const jwt = require("jsonwebtoken");
const token = jwt.sign({ id: "kdkd" }, "shhhhh", {
  expiresIn: "1m",
  issuer: "kdpark",
});
console.log(token);
module.exports = router;
