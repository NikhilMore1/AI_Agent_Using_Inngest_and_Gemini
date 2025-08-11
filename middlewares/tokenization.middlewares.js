import jwt from 'jsonwebtoken';
const authenticate = async(req , res ,next) =>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(404).json({
            message:"not authorized barear token not found"
        });
    }
}