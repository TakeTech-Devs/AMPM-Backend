const catchAsyncError = require('../middleware/catchAsyncError');
const Order = require('../models/orderModel');
const ErrorHandler = require('../utils/errorhandler');

// New Order 

exports.newOrder = catchAsyncError(async (req, res, next) =>{
    const {
        shippingInfo,
        orderItems,
        user,
        paymentInfo,
        totalPrice,
    } = req.body

    const orderExist = await Order.findOne({ paymentInfo });

    if (orderExist) {
        return next(new ErrorHandler("Order Already Placed", 400));
    }


    const orderedBy = req.consumer ? req.consumer._id : req.reseller ? req.reseller._id : null;

    if (!orderedBy) {
        return next(new ErrorHandler("Unauthorized access", 401));
    }

    const order = await Order.create({
        shippingInfo,
        orderItems,
        user,
        paymentInfo,
        totalPrice,
        paidAt: Date.now(),
        oredeBy: orderedBy,
    })

    res.status(201).json({
        success: true,
        order,
    });
})

// Get Logged In User Orders

exports.myOrders = catchAsyncError(async (req, res, next) =>{
    let userId;

    // Determine if the logged-in user is a consumer or a reseller
    if (req.consumer) {
        userId = req.consumer._id;
    } else if (req.reseller) {
        userId = req.reseller._id;
    } else {
        return next(new ErrorHandler("Unauthorized access", 401));
    }

    const orders = await Order.find({ oredeBy: userId });

    if (!orders || orders.length === 0) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
        success: true,
        orders,
    });
})

// Get Single Order Details

exports.getSingleOrderDetails = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});