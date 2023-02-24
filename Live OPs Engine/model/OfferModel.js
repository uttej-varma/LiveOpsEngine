const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;
const Sequence=require("./countSequence")

const offerSchema=new Schema(
    {
        offer_id:{type:String},
        offer_title:{type:String,require:true},
        offer_description:{type:String,default:"Hurry up! this is a limited period offer",required:true},
        offer_image:{
          data:Buffer,
          contentType : String
          
       },
        offer_sort_order:{type:Number,default:0,required:true},
        content:{type:Array,require:true,default:[{ "item_id": "ITEM-1","quantity": 10}, {"item_id": "ITEM-2", "quantity": 1}]},
        schedule:{type:Object,require:true,default: { "days_of_week": [1, 2, 3], "dates_of_month": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14], "months_of_year": [11]}},
        target:{type:String,require:true},
        pricing:{type:Array,required:true},


    },{timestamps:true}
);
offerSchema.pre('save',async function (next) {
  
        const sequence = await Sequence.findOneAndUpdate(
          { name: 'offer_sort_order' },
          { $inc: { nextVal: 1 } },
          { new: true, upsert: true }
        );
        this.offer_sort_order = sequence.nextVal;
        this.offer_id="Offer:"+this.offer_sort_order
      
      next();
  });
// offerSchema.pre('save', async function (next) {
//     if (!this.offer_sort_order) {
//       const count = await this.constructor.countDocuments();
//       this.offer_sort_order = count + 1;
//     }
//     next();
//   });
const offerModel=mongoose.model("offer",offerSchema);
module.exports=offerModel;