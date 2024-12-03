const mongoose = require('mongoose');


const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
    },
    testimonial: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Testimonial", testimonialSchema);