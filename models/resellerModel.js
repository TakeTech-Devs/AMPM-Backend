const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resellerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    businessType: {
        type: String,
        required: true
    },
    abn: {
        type: String,
        required: true
    },
    businessEmail: {
        type: String,
        required: true
    },
    businessWebsite: {
        type: String,
        default: "N.A."
    },
    businessPassword: {
        type: String,
        required: true
    },
    approvalStatus: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: "reseller"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

//password hashing
resellerSchema.pre("save", async function (next) {
    if (!this.isModified("businessPassword")) {
        next();
    }
    this.businessPassword = await bcrypt.hash(this.businessPassword, 10);
});

// compare Password
resellerSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.businessPassword);
}

// JWT token
resellerSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
};

module.exports = mongoose.model("Reseller", resellerSchema);