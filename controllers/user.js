const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorhandler');
const ContactUs = require('../models/contactUsModel');
const Subscribe = require('../models/subscribeModel');

exports.contactUsForm = catchAsyncError(async(req, res, next) =>{
    
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

exports.subscribeForm = catchAsyncError(async(req, res, next) =>{
    const { email } = req.body;

    const subscriber = await Subscribe.findOne({ email })
    if(subscriber){
        return next(new ErrorHandler("Email already exist", 500));
    }

    await Subscribe.create({ email });

    res.status(200).json({
        success: true,
        message: "Thank You For Subscribe Us"
    });
    
})