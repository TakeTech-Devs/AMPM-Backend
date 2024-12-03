const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pin: {
            type: Number,
            required: true
        },
        phone: {
            type: Number,
        },
        email: {
            type: String,
            required: true
        }
    },
    orderItems: [
        {
            product:{
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        }
    ],
    oredeBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    // paymentInfo: {
    //     id: {
    //         type: String,
    //         required: true
    //     },
    //     status: {
    //         type: String,
    //         required: true
    //     },
    // },
    paidAt: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },
    shippedAt:{
        type:Date,
        default: null
    },
    deliveredAt: {
        type: Date,
        default: null
    },
    cancelAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Order", orderSchema);