const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;
const sequenceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nextVal: { type: Number, required: true }
  });
  
  const Sequence = mongoose.model('Sequence', sequenceSchema);
  Sequence.create({
    name:"offer_sort_order",
    nextVal:0
  })
  module.exports=Sequence