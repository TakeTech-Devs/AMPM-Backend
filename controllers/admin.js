const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorhandler');
const sendToken = require('../utils/token')
const Admin = require('../models/adminModel');
const Reseller = require('../models/resellerModel');


// admin Registration

exports.adminRegistration = catchAsyncError(async(req, res, next) => {
    const { name, email, password } = req.body;

    const admin = await Admin.create({
        name,
        email,
        password
    })

    try {
        res.status(200).json({
            success: true,
            message: "Registration Successfull"
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

// admin login

exports.adminLogin = catchAsyncError(async(req, res, next) =>{

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select('+password')

    if (!admin) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    const isPasswordMatch = await admin.comparePassword(password)

    if (!isPasswordMatch) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    sendToken(admin, 200, res)
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


// Approve - reseller

exports.resellerApproval = catchAsyncError(async (req, res, next) =>{

    const reseller = await Reseller.findById(req.params.id);

    if(!reseller){
        return next(new ErrorHandler('Reseller not found', 404));
    };

    reseller.approvalStatus = !reseller.approvalStatus;

    await reseller.save();

    const message = reseller.approvalStatus ? 'Reseller Approve Successfeully' : 'Reseller Disapprove Successfully';

    res.status(200).json({
        success: true,
        message: message,
    });

})