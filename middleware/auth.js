const ErrorHandler = require ('../utils/errorhandler');
const catchAsyncError = require ('./catchAsyncError');
const jwt = require('jsonwebtoken');
const Consummer = require ('../models/consumerModel');  
const Reseller = require('../models/resellerModel');
const Admin = require('../models/adminModel');

exports.isConsummer = catchAsyncError(async(req, res, next) =>{
    const { token } = req.cookies;

    // console.log(token)

    if(!token){
        return next(new ErrorHandler("Please Login to access this resource",401));
    }
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.consummer = await Consummer.findById(decodeData.id);
    next();
})

exports.isReseller = catchAsyncError(async(req, res, next) =>{
    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please Login to access this resource",401));
    }
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.reseller = await Reseller.findById(decodeData.id);

    next();
})

exports.isAdmin = catchAsyncError(async(req, res, next) =>{
    const { token } = req.cookies;


    if(!token){
        return next(new ErrorHandler("Please Login to access this resource",401));
    }
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = await Admin.findById(decodeData.id);

    next();
})

exports.isAuthorized = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    // Try to find the user as a consumer
    let user = await Consummer.findById(decodeData.id);
    if (user) {
        req.consumer = user;
    } else {
        // If not a consumer, try to find the user as a reseller
        user = await Reseller.findById(decodeData.id);
        if (user) {
            req.reseller = user;
        } else {
            return next(new ErrorHandler("User not found", 404));
        }
    }

    next();
});


    exports.authorizeRoles = (...roles)=>{
        return(req,res,next)=>{
            if(!roles.includes(req.admin.role)){
                return next(new ErrorHandler(`Role: ${req.admin.role} is not allowed to access this resouce`,403));
            }
            next();
        };
    }
