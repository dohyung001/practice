//쿼리를 보내고 리턴을 받는 파일(쿼리 보내기 환경 설정(index)을 하는 파일)

const mysql = require("mysql"); //sql모듈 사용하겠다
const sql = require("./sql.js"); //sql을 저기서 가져오겠다

//dotenv사용 선언.env의 파일에 선언된 변수활용
require('dotenv').config({
    path:'.env',
});

// 데이터베이스 환경설정(.env안의 내용을 써야 노출이 안됨)
const pool = mysql.createPool(
    {
        connectionLimit: process.env.MYSQL_LIMIT,
        host:process.env.MYSQL_HOST,
        port:process.env.MYSQL_PORT,
        user:process.env.MYSQL_USERNAME,
        password:process.env.MYSQL_PASSWORD,
        database:process.env.MYSQL_DB
    }
)

//쿼리를 보내고 받아온 값을 리턴하는 코드(고정)
const query = async (alias, values) => {
    return new Promise((resolve, reject) => {
      pool.query(sql[alias], values, (error, results) => {
        if (error) {
          console.log(error);
          reject({
            error,
          });
        } else resolve(results);
      });
    });
  };
  
  module.exports={
    query,
  };