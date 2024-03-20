import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    token:{
        type:String,
        required: true,
    },
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
    }
})

const Token = mongoose.model('token', tokenSchema);

export default Token;