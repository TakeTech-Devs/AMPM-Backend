const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
    headerTitle:{
        type:String,
    },
    headerDescription:{
        type:String,
    },
    Landline:{
        type: String,
    },
    Mobile:{
        type: String,
    },
    Email:{
        type: String,
    }
})

module.exports = mongoose.model("Cinfo", contactInfoSchema);