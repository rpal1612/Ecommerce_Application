// writing the logic to register a user
const bcrypt=require("bcryptjs")
const user_model=require("../models/user_model")
const jwt=require("jsonwebtoken")
const secret = require("../configs/auth.config")
// const express=require("express")
// const app=express()
exports.signup=async(req,res)=>{
    //logic to create the user
    /*1 read the req body
     2. insert the data in collection in mongodb
      3. return the response to the user*/
      const request_body=req.body
      const userObj={
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
        userType:request_body.userType,
        password:bcrypt.hashSync(request_body.password,8)
      }
//201: something sent successfully ......500 : internal server error
      try{
            const user_created=await user_model.create(userObj)
            //return this user
            res.status(201).send(user_created)
      }catch(err){
        console.log("error while registering the user:",err)
        res.status(500).send({
            message:"some error happened while registering the user"
        })
      }
}
// app.use(express.json())
exports.signin=async(req,res)=>{
      //check if the userId is present in the system
      const user=await user_model.findOne({userId:req.body.userId})
      if(user==null){
            res.status(400).send({
                  message:"User Id passed is invalid"
            })
      }
      //check if the password is correct 
      const isPasswordValid=bcrypt.compareSync(req.body.password,user.password)
      if(!isPasswordValid){
            return res.status(401).send({
                  message:"Wrong password passes"
            })
      }
      //using JWT we will create(sign) access token with given TTl and return
      const token=jwt.sign({id:user.userId},secret.secret,{
            expiresIn : 120 //2 mins
      })
      res.status(200).send({
            name : user.name,
            userId:user.userId,
            email:user.email,
            userType:user.userType,
            accessToken:token
      })

}   