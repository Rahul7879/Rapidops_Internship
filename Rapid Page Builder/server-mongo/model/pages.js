import mongoose from "mongoose";

const pageSchema =  mongoose.Schema({
    email:{
        type:String,
    },
    title: {
        type: String,
    },
    subtitle: {
        type: String,
    },
    body:{
        type: String,
    },
    url:{
        type: String,
    },
    isdraft : {
        type: Boolean,
    },
    ishide:{
        type: Boolean,
    },
    status:{
        type:String,
    },
    file:{
        type:String,
    },
    publishDate:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now, 
      },
}); 

const Pages = mongoose.model("Pages", pageSchema);

export default Pages;
