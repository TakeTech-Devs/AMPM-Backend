const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6,
    },
    discountType: {
        type: String,
        required: true,
        enum: ['percentage', 'fixed'],
    },
    discountValue: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        min: 0,
    },
    minPurchaseAmount: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

couponSchema.pre('save', function (next) {
    const now = new Date();
    if (this.expiryDate < now) {
        this.isActive = false;
    }
    next();
});


module.exports = mongoose.model("Coupon", couponSchema);