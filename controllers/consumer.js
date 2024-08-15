const Consummer = require ('../models/consumerModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorhandler');
const sendToken = require('../utils/token')



// Consumer Registration 

exports.consumerRegistration = catchAsyncError(async(req, res, next) =>{

    const {firstName, lastName, email, phone, address, subrub, state, pinCode, password} = req.body;

    const consumer = await Consummer.create({
        firstName, lastName, email, phone, address, subrub, state, pinCode, password
    });

    // res.status(200).json({
    //     success: true,
    //     message: "Registration Successfull"
    // });

    try {
        res.status(200).json({
            success: true,
            message: "Registration Successfull"
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }

});

// Consumer Login

exports.consumerLogin = catchAsyncError(async(req, res, next) =>{

    const { email, password } = req.body;

    if (!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password", 400));
    }

    const consumer = await Consummer.findOne({ email }).select("+password");

    if(!consumer){
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await consumer.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    
    sendToken(consumer, 200, res)
})