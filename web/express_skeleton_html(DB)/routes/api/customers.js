const express = require("express");
const mysql = require('../../mysql/index.js'); //폴더안의 모듈(함수)사용 가능
const router = express.Router();

//데이터 베이스에 쿼리 보내고 받는 api함수들

//customerList 조회
router.get("/",async(req,res)=>{
    const customers = await mysql.query("customerList");
    console.log(customers);
    res.send(customers);
});

//customerInsert 삽입
router.post("/insert",async(req,res)=>{
    const result = await mysql.query("customerInsert",req.body.param);
    res.send(result);
});

//customerUpdate 수정
//변수가 두 개 필요한데 프론트에서 두개 넘기면 차례대로 ? ? 에 들어감
router.put("/update",async(req,res)=>{
    const result = await mysql.query("customerUpdate",req.body.param);
    res.send(result);
});

//customerDelete 삭제
//param대신 id를 URL로 받아서 전송
router.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params;
    const result = await mysql.query("customerDelete",id);
    res.send(result);
});





module.exports =router; //라우터 연결
