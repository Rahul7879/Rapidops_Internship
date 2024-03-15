import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    isdraft : {
        type: Boolean,
        required:true
    },
    ishide:{
        type: Boolean,
        required:true
    }
}, { timestamps: true }); 

const Pages = mongoose.model("Pages", pageSchema);

export default Pages;
