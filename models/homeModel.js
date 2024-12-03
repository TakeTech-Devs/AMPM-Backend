const mongoose = require('mongoose');


const homeSchema = new mongoose.Schema({
    headerTitle: {
        type: String,
    },
    headerDescription: {
        type: String,
    },
    headerPointOne: {
        type: String,
    },
    headerPointTwo: {
        type: String,
    },
    headerPointThree: {
        type: String,
    },
    highlightOne:{
        type: String,
    },
    highlightTwo:{
        type: String,
    },
    highlightThree:{
        type: String,
    },
    batteriesHeading: {
        type: String,
    },
    batteriesDescription: {
        type: String,
    },
    reviewsHeading:{
        type: String,
    },
    reviewsDescription:{
        type: String,
    },
    ContactUS: {
        type: String,
    },
    ContactUSDescription:{
        type: String,
    }
});

module.exports = mongoose.model("Home", homeSchema);