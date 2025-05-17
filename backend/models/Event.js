import mongoose from "mongoose";

const eventSchema =  new mongoose.Schema({
    title :       {type: String, required: true},
    description : {type : String},
    date :        {type: Date, required : true},
    location :    {type: String},
    organizer :   {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    category :    {type: mongoose.Schema.Types.ObjectId, ref : 'Category', required: true},
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt :   {type: Date, default: Date.now}

})

export default mongoose.model('Event', eventSchema)