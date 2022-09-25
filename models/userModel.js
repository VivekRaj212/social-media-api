const mongoose= require("mongoose");
const validate= require("password-validator");

// Defining Schema
const userSchema= new mongoose.Schema({

    name: {type: String, required: true},
    email: {type:String,required: true},
    password: {type:String,required:true, min: 8,max: 20, unique: true},
    user_name: {type: String, required: true, unique: true},
    gender: {type:String, enum: ["male", "female","other"]},
    mobile_num: {type: String, required: true, min: 10, max: 12 },
    profile: {type: String, default: ""},
    isAdmin: {type: Boolean, default: false},
    followers: {type: Array,default: []},
    followings: {type: Array, default:[]},
    count_followers: {type:Number},
    count_followings: {type:Number}

},
{timestamps: true}
)

// Model
const UserModel= mongoose.model("User",userSchema);

module.exports= UserModel;