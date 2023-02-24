const express=require("express");
const router=express.Router();
const bodyParser=require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const fs=require("fs");
const Offer=require("../model/OfferModel");
const multer  = require('multer');
//storing local destination and filename while storing
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
     
      cb(null, file.originalname+"---"+Date.now());
    }
  })
//uploading image in folder
  const upload = multer({ storage: storage })
//multer middlewear
//creating offer
router.post("/offer",upload.single("presentImage"),async (req,res)=>{
 
    try{
        
        const data=await Offer.create({
            offer_title:req.body.offer_title,
            offer_description:req.body.offer_description,
            content:req.body.content,
            schedule:req.body.schedule,
            target:req.body.target,
            pricing:req.body.pricing,
            offer_image:{
                data:fs.readFileSync("images/"+req.file.filename),
                contentType:"image/png"
            }
        })
        res.status(200).json({
            message:"successfully created",
            data
        });
            
    }
    catch(e){
      res.status(400).json({
        status:"failed",
        message:e.message
      })
    }
})
//Creating an Offer or updating an existing one
router.put("/offer",async (req,res)=>{
    try{
       if(req.query.offer_id.length>0)
       {
        const exist=await Offer.find({offer_id:req.query.offer_id});
        if(exist){
            await Offer.updateOne({offer_id:req.query.offer_id},req.body);
            return res.status(201).json({
                message:"offer successfully updated",
            })
        }
       }
       else{
        const data=await Offer.create(req.body);
        if(data)
        {
         return res.status(201).json({
                message:"offer successfully created",
                data
            })
        }
        res.status(400).json({
            message:"failed to create Offer"
        })
        
       }
    }
    catch(e){
        res.status(400).json({
            message:e.message
        })
    }
    
})
//getting particular orders
router.get("/offer",async (req,res)=>{
    try{
        const data= await Offer.find();
        if(data.length>0)
        {
            return res.status(200).json({
                message:"successfully fetched the data",
                data
            })
        }
        
    }
    catch(e){
        res.status(400).json({
            message:e.message
        })
    }
})
//deleting an order
router.delete("/offer",async (req,res)=>{
    try{
       const data= await Offer.findOne({offer_id:req.query.id});
       console.log(data);
       if(data)
       {
        await Offer.deleteOne({offer_id:req.query.id})
       return res.status(200).json({
            message:"deleted successfully"
        })
       }
       res.status(200).json({
        message:"Data not found"
       })
    }
    catch(e){
        res.status(400).json({
            message:e.message
        })
    }
})
module.exports=router;