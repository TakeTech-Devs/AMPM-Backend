const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorhandler');
const ContactUs = require('../models/contactUsModel');

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