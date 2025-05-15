import mongoose from "mongoose";

const commentSchema =  new mongoose.Schema({
    content :    {type:String, required : true},
    user :       {type: mongoose.Types.ObjectId, ref : 'User', required : true},
    event :      {type: mongoose.Types.ObjectId, ref : 'Event', required : true},
    createdAt :  {type: Date, default: Date.now}
})

export default mongoose.model('Comment', commentSchema)