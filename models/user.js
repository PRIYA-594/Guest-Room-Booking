const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
       // unique:true
    },
    phone:{
        type:Number,
        required:true
    },
   password:{
    type:String,
    required:true
   },
    isHouseOwner:{
        type:Boolean,
        default:false
    }
},{timestamps:true,});

const userModel = mongoose.model("user",userSchema);

module.exports=userModel;