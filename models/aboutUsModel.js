const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    headerTitle: {
        type: String,
    },
    headerDescription: {
        type: String,
    },
    ourMissionTitle:{
        type:String
    },
    ourMissionDescription:{
        type:String
    },
    weDoTitle:{
        type:String
    },
    weDoDescription:{
        type:String
    }
})

module.exports = mongoose.model("About", aboutSchema);