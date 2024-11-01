const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    headerTitle: {
        type: String,
    },
    headerDescription: {
        type: String,
    },
    batteryTitle: {
        type: String,
    },
    batteryDescription: {
        type: String,
    },
    batteryCardOne: {
        type: String,
    },
    batteryCardTwo: {
        type: String,
    },
    batteryCardThree: {
        type: String,
    },
    featureProduct: {
        type: String,
    },
    featureProductPoints: {
        type: [String],  // Define it as an array of strings
        default: []
    }
})

module.exports = mongoose.model("Product", productSchema);