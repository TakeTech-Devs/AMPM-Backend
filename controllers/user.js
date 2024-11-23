const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorhandler');
const ContactUs = require('../models/contactUsModel');
const Subscribe = require('../models/subscribeModel');
const Coupon = require('../models/discountCouponModel');

exports.contactUsForm = catchAsyncError(async (req, res, next) => {

    const { name, email, phone, company, message } = req.body;

    const contactus = await ContactUs.create({
        name,
        email,
        phone,
        company,
        message
    });

    try {
        res.status(200).json({
            success: true,
            message: "Message Successfull Send"
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }

})

exports.subscribeForm = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;

    const subscriber = await Subscribe.findOne({ email })
    if (subscriber) {
        return next(new ErrorHandler("Email already exist", 500));
    }

    await Subscribe.create({ email });

    res.status(200).json({
        success: true,
        message: "Thank You For Subscribe Us"
    });

})

exports.applyCoupon = catchAsyncError(async (req, res, next) => {

    const { couponCode, subtotal } = req.body;

    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) {
        return next(new ErrorHandler("Invalid coupon code", 404));
    }

    if (!coupon.isActive) {
        return next(new ErrorHandler("Coupon is no longer active", 400));
    }

    if (subtotal < parseFloat(coupon.minPurchaseAmount.toString())) {
        return next(
            new ErrorHandler(
                `Minimum purchase amount to apply this coupon is $${parseFloat(
                    coupon.minPurchaseAmount.toString()
                )}`,
                400
            )
        );
    }


    let discountValue = 0;
    if (coupon.discountValue) {
        discountValue = parseFloat(coupon.discountValue.toString());
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
        discount = (subtotal * discountValue) / 100;
    } else if (coupon.discountType === 'fixed') {
        discount = discountValue;
    }

    discount = Math.min(discount, subtotal);

    const totalAfterDiscount = subtotal - discount;

    res.status(200).json({
        success: true,
        message: "Coupon applied successfully",
        discount,
        totalAfterDiscount,
    });

})