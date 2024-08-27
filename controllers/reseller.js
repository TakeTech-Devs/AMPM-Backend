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

//Logout

exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});


// User Profile

exports.getProfile = catchAsyncError(async (req, res, next) =>{

    const reseller = await Reseller.findById(req.reseller.id);
    
    res.status(200).json({
        success: true,
        reseller,
    });
})


// Update Profile

exports.updateProfile = catchAsyncError(async (req, res, next) =>{

    const newUserData = {
        fullName: req.body.fullName, 
        businessName: req.body.businessName, 
        businessType: req.body.businessType, 
        abn: req.body.abn, 
        businessEmail: req.body.businessEmail, 
        businessWebsite: req.body.businessWebsite, 
    };

    const reseller = await Reseller.findByIdAndUpdate(req.reseller.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    })

    res.status(200).json({
        success: true,
        reseller
    });
})