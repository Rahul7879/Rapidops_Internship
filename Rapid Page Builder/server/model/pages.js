import mongoose from "mongoose";

const Pages = mongoose.model("Pages", {
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    body:{
        type: String
    },
    isdraft : {
        type: Boolean
    }
})

export default Pages;