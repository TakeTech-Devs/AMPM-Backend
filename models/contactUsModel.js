const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    company:{
        type:String
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type: Boolean,
        default: false,
    },
    resolveDate:{
        type:Date,
        default: null
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model("ContactUs", contactUsSchema);