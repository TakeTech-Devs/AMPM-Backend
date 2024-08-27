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

    const consumer = await Consummer.findById(req.consummer.id);
    
    res.status(200).json({
        success: true,
        consumer,
    });
})

// Update Profile

exports.updateProfile = catchAsyncError(async (req, res, next) =>{

    const newUserData = {
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        email: req.body.email, 
        phone: req.body.phone, 
        address: req.body.address, 
        subrub: req.body.subrub, 
        state: req.body.state, 
        pinCode: req.body.pinCode
    };

    const consummer = await Consummer.findByIdAndUpdate(req.consummer.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    })

    res.status(200).json({
        success: true,
        consummer
    });
})