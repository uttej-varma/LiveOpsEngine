const express=require("express");
const router=express.Router();
const bodyParser=require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const User=require("../model/Reglog");
//Registration
router.post("/register",async (req,res)=>{
   try{
    const user=await User.findOne({userName:req.body.userName});
    if(user)
    {
        return res.status(200).json({
            message:"userName already exist"
        })
    }
    else{
        await User.create(req.body);
        res.status(201).json({
            message:"user Registered Successfully"
        })
    }
     
   }
   catch(e){
    res.status(400).json({
        message:e.message
    })
   }
})
//login
router.post("/login",async (req,res)=>{
    try{
        const user=await User.findOne({userName:req.body.userName});
    //  console.log(user);
     if(user && user.password===req.body.password)
     {
         return res.status(200).json({
             message:"logged in successfully"
         })
     }
     else if(user){
         
         res.status(200).json({
             message:"invalid credentials"
         })
     }
     else{
        res.status(200).json({
            message:"user should register"
        })
     }
      
    }
    catch(e){
     res.status(400).json({
         message:e.message
     })
    }
 })

module.exports=router;