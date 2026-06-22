const mongoose=require("mongoose");


const PostSchema=mongoose.Schema({
    content:String,
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    createAt:{type:Date,default:Date.now}
});

module.exports=mongoose.model("post",PostSchema);