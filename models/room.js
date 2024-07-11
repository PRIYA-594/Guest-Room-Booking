const { Timestamp } = require("bson");
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ownerid:{
        type:String,
        required:true
    },
    squarefeet:{
        type:Number,
    },
    minimumBook:
    {
        type:Number,
        required:true
    },
    maximumBook:{
        type:Number,
        required:true
    },
    rentPerDay:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
     
    },
    address:{
        type:String,
        required:true
    },
    imageUrls:[],
    currentBookings: [{
        bookingid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        },
        fromdate:{
            type:String
        },
        todate: {
            type:String
        },
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: String
    }],
},{timestamps:true});

const roomModel = mongoose.model('rooms',roomSchema);

module.exports=roomModel;