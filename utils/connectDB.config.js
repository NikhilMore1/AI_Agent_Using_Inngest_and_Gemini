import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import {DATABASE_NAME} from '../databaseName.js'; 
const connectDB = async()=>{
    try{
        const connect = await mongoose.connect(`${process.env.MONGO_URI}/${DATABASE_NAME}`);
        console.log(connect.connection.host);
    }catch(error){
        console.log("Database connection error "+error);
        throw new Error(error);
    }
}

export default connectDB;