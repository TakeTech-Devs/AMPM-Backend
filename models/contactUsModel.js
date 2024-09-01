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
    }
})

module.exports = mongoose.model("ContactUs", contactUsSchema);