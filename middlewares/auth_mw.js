/*
create a mw will check if the request is proper and correct 
*/
const user_model=require("../models/user_model")
const jwt=require("jsonwebtoken")
const auth_congif=require("../configs/auth.config")
const verifySignUpBody=async (req,res,next)=>{
    try{
        //check for the name 
        if(!req.body.name){
            return res.status(400).send({
                message :"Failed ! name wasn't provided"
            })
        }
        //check for email
        if(!req.body.email){
            return res.status(400).send({
                message :"Failed ! Email wasn't provided"
            })
        }
        //check for userID
        if(!req.body.userId){
            return res.status(400).send({
                message :"Failed ! UserId wasn't provided"
            })
        }
        //check if the user with same userid is already present 
        const user=await user_model.findOne({userId:req.body.userId})
        if(user){
            return res.status(400).send({
                message:"Failed ! user with same userId is already present"
            })
        }
        next()
        }
    catch(err){
        console.log("Error while validating the request of object",err)
        res.status(500).send({
            message :"Error while validating the request body"
        })
    }
}
const verifySignInBody=async (req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            message:"userId is not valid"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message:"Password is not valid"
        })
    }
    next()
}
const verifyToken=async(req,res,next)=>{
    //check if token is present or not it the header
    const token=req.headers['x-access-token']
    if(!token){
        return res.status(403).send({
            message:"No token found !!UnAuthorized"
        })
    }
    //if valid token
    jwt.verify(token,auth_congif.secret,async(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"UnAuthorized !"
            })
        }
        const user=await user_model.findOne({userId:decoded.id})
        if(!user){
            return res.status(400).send({
                message:"UnAuthorized ! user for this token doen't exists"
            })
        }
        //set user info in req body
        req.user=user
        //move to next step
        next()
    })
}

const isAdmin=async(req,res,next)=>{
    const user = req.user
    if(user && user.userType =="ADMIN"){
        next()
    }else{
        return res.status(403).send({
            message:"Only admins users are allowed to acess this endpoint"
        })
    }
}

module.exports={
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody,
    verifyToken : verifyToken,
    isAdmin : isAdmin
}