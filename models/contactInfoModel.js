const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
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