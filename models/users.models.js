import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        nuique:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"user",
        enum:["user","moderator","admin"],
    },
    skills:[String],
    createdAt:{
        type:Date,
        default:Date.now,

    }
},{timestamps:true});

const userModel = mongoose.model("User",userSchema);

export default userModel;