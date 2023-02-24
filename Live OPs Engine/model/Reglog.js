const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;


const regLogSchema=new Schema(
    {
       userName:{type:String,require:true},
       password:{type:String,require:true}


    },{timestamps:true}
);
const regLogModel=mongoose.model("reglog",regLogSchema);
module.exports=regLogModel;