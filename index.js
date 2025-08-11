import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/connectDB.config.js';
const app = express();
dotenv.config();

app.use(express.json({
    limit:'50mb'
}));

app.use(cors());
app.use(express.urlencoded({
    limit:'50mb', 
    extended:true
}));
app.use(express.static("public"));

connectDB()
.then(()=>{
    console.log("Database connected successfully");
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
        
    })
})
.catch((error)=>{
    console.log(error);
})