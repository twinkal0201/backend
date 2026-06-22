const mongoose=require("mongoose");


const PostSchema=mongoose.Schema({
    postdata:String,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    createAt:{type:Date,default:Date.now}
});

module.exports=mongoose.model("post",PostSchema);