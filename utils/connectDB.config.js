import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import {DATABASE_NAME} from '../databaseName.js'; 
const connectDB = async()=>{
    try{
        const connection = await mongoose.connect(`${process.env.MONGO_URI}/${DATABASE_NAME}`);
        console.log(connection.connection.host);
        
    }catch(error){
        console.log(error);
    }
}

export default connectDB;