const express = require("express");
const connectDB = require('../../mongoose/index.js');
const Customer = require("../../mongoose/schemas/customer.js");
const router = express.Router();

connectDB.connect();  // 비동기 호출로 연결 시작


router.get("/", async (req, res) => {
    try {
        //const customers = await Customer.find();
        //const customers = await Customer.find({name:'kdpark'}).exec();
        const customers = await Customer.findById('671edd6fc4725e33b11d8742').exec();

        console.log(customers);
        res.send(customers);
    } catch (error) {
        res.status(500).send({ message: '데이터를 가져오는 중 오류가 발생했습니다.' });
    }
});

router.post("/", async (req, res) => {
    console.log('POST 요청을 받았습니다.');
});

router.put("/", async (req, res) => {
    console.log('PUT 요청을 받았습니다.');
});

router.delete("/", async (req, res) => {
    console.log('DELETE 요청을 받았습니다.');
});

module.exports = router;
