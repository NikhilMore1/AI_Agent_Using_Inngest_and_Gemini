import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/users.models';
import { inngestClient } from '../Inngest/client';


const signup = async(req,res) =>{
    const {email,password,skills = []} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password,12);
        const user = await userModel.create({
            email,
            password:hashedPassword,
            skills,
        });
        await inngestClient.send({
            name:"user/signup",
            data:{
                email
            }
        })

        const token = jwt.sign(
        {_id:user._id,role:user.role},
        process.env.JWT_SECRATE,
        )

        res.json({
            user,
            token
        })
    }catch(error){
       res.status(500).json({
        message:"Controller error in signup",error
       })
    }
};


const login = async(req,res) =>{
    const {email,password} = req.body;
    try{
       const resp =  userModel.findOne({email});
        if(!resp){
           return res.status(404).json({
                message:"User not in our database"
            })

            const isMatch = await bcrypt.compare(password,resp.password);
            if(!isMatch){
                return res.status(400).json({
                    message:"Invalid credentials please try again"
                });
            }
            const token = jwt.sign(
                {_id:resp._id,role:resp.role},
                process.env.JWT_SECRATE
            );

            console.log({resp,token});
            
        }
    }catch(error){
        res.status(500).json({
            error,
            message: "Login failed in controllers side"
        })
    }
}


const logout = async(req, res) =>{
    try{
       const reqToken =  req.headers.authorization.split(" ")[1];   
       if(!reqToken){
        return res.status(401).json({
            message:error+" unautorized access"
        });
        jwt.verify(reqToken,process.env.JWT_SECRATE,(error,decoded)=>{
            if(error){
                return res.status(401).json({
                    message:"unathorized access permission not granted"
                });
            }
        })
        res.json({
            message:"Logout successfully"
        })
       } 
    }catch(error){
        res.status(500).json({
            message:"Controller error in logout",error
        })
    }
}


const updateUser = async(req,res) =>{
    const {skills = [], role, email} = req.body;
    try{
        if(req.user?.role !== "admin"){
            res.status(404).json({
                message:"Forbidden accesss"
            });
            const user = await userModel.findOne({email});
            if(!user){
                res.status(404).json({
                    message:"could not find the user"
                })


            }

            await userModel.updateOne(
                {email},
                {skills:skills.length?skills:user.skills,role}
            )
            return res.json({
                message:"User updation done "
            })
        }
    }catch(error){
        res.status(500).json({
            message:"Controller error in updation wordk not done"
        })
    }
}

const getDetails = async(req,res) =>{
    
    try{
        if(req.user.role !== "admin"){
            return res.status(403).json({
                message:"Forbidden access, you are not admin"
            })
        }

        const user = await userModel.find().select("-pass")
        return res.json(user);
        }catch(error){
            res.status(500).json({
                message:"controller error at the fetchin the data useing getDetails methods"
            })
    }
}

 export default {
    signup,
    login,
    updateUser,
    getDetails,
    logout
 }