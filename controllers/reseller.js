const Reseller = require('../models/resellerModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorhandler');
const sendToken = require("../utils/token");


// Reseller Registration 

exports.resellerRegistration = catchAsyncError(async(req, res, next) =>{

    const { fullName, businessName, businessType, abn, businessEmail, businessWebsite, password } = req.body;

    const reseller = await Reseller.create({
        fullName, businessName, businessType, abn, businessEmail, businessWebsite, password
    });

    // res.status(200).json({
    //     success: true,
    //     message: "Registration Successfull"
    // });

    try {
        res.status(200).json({
            success: true,
            message: "Apply Successfull"
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }

});


// Reseller Login

exports.resellerLogin = catchAsyncError(async(req, res, next) =>{

    const { businessEmail, password } = req.body;

    if (!businessEmail || !password){
        return next(new ErrorHandler("Please Enter Email and Password", 400));
    }

    const reseller = await Reseller.findOne({ businessEmail }).select("+password");

    if(!reseller){
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

     if (!reseller.approvalStatus) {
        return next(new ErrorHandler("Your account is not approved yet. Please contact support.", 403));
    }

    const isPasswordMatched = await reseller.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    
    sendToken( reseller, 200, res)
})