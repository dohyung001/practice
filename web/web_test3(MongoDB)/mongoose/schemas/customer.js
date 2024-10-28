const mongoose = require("mongoose");

const {Schema} = mongoose;

//스키마 설정
const customerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required: true,
        unique:true
    }
})

//스키마(커서터머) 모델
const Customer = mongoose.model('customer',customerSchema);

module.exports = Customer;