const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorhandler');
const sendToken = require('../utils/token')
const Admin = require('../models/adminModel');
const Reseller = require('../models/resellerModel');
const Home = require('../models/homeModel');
const About = require('../models/aboutUsModel');
const Cinfo = require('../models/contactInfoModel');
const ContactUs = require('../models/contactUsModel');
const Order = require('../models/orderModel');
const Consummer = require('../models/consumerModel');
const Product = require('../models/productModel');
const Coupon = require('../models/discountCouponModel');
const mongoose = require('mongoose');
const Subscribe = require('../models/subscribeModel');
const Testimonial = require('../models/testimonialModel');
const sendEmail = require('../utils/sendEmail');



// admin Registration

exports.adminRegistration = catchAsyncError(async (req, res, next) => {
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

exports.adminLogin = catchAsyncError(async (req, res, next) => {

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


// Delete Admin

exports.deleteAdmin = catchAsyncError(async (req, res, next) => {

    const admin = await Admin.findByIdAndDelete(req.params.id);

    if (!admin) {
        return next(new ErrorHandler('Admin not found', 404));
    };

    return res.status(200).json({
        success: true,
        message: 'Admin deleted successfully',
    });
})

// Update Admin

exports.updateAdmin = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body; // Adjust fields based on your Admin model schema.

    // Ensure the admin exists
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
        return next(new ErrorHandler('Admin not found', 404));
    }

    // Update the admin fields
    admin.name = name || admin.name; // Update only if a new value is provided
    admin.email = email || admin.email;
    admin.password = password || admin.password;

    await admin.save();

    return res.status(200).json({
        success: true,
        message: 'Admin updated successfully',
        admin,
    });
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


exports.getAdminProfile = catchAsyncError(async (req, res, next) => {

    const user = await Admin.findById(req.admin.id);

    res.status(200).json({
        success: true,
        user,
    });
})

exports.adminList = catchAsyncError(async (req, res, next) => {

    const admin = await Admin.find();

    res.status(200).json({
        success: true,
        admin,
    });

})

// Rwseller 

// Approve - reseller

exports.resellerApproval = catchAsyncError(async (req, res, next) => {

    const reseller = await Reseller.findById(req.params.id);

    if (!reseller) {
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

exports.resellerList = catchAsyncError(async (req, res, next) => {

    const { duration } = req.query;
    let startDate;
    let filter = {};

    if (duration === "3months") {
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 3);
    } else if (duration === "6months") {
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 6);
    } else if (duration === "1year") {
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
    }

    if (startDate) {
        filter.createdAt = { $gte: startDate };
    }

    const reseller = await Reseller.find(filter);

    res.status(200).json({
        success: true,
        reseller,
    });
})

// Consumer

exports.consumerList = catchAsyncError(async (req, res, next) => {

    const { duration } = req.query;
    let startDate;
    let filter = {};


    if (duration === "3months") {
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 3);
    } else if (duration === "6months") {
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 6);
    } else if (duration === "1year") {
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
    }

    if (startDate) {
        filter.createdAt = { $gte: startDate };
    }

    const consumers = await Consummer.find(filter);

    res.status(200).json({
        success: true,
        consumers,
    });

})

// Home Section

// Home Header

exports.homeHeader = catchAsyncError(async (req, res, next) => {

    const { headerTitle, headerDescription, headerPointOne, headerPointTwo, headerPointThree } = req.body

    const update = {
        headerTitle,
        headerDescription,
        headerPointOne,
        headerPointTwo,
        headerPointThree
    };

    const options = {
        new: true,
        upsert: true,
        useFindAndModify: false
    };

    const updateHomeHeader = await Home.findOneAndUpdate({}, update, options);

    res.status(200).json({
        success: true,
        message: 'Home Header Updated Successfully',
        updateHomeHeader
    })
})


// Home Highlight 

exports.homeHighlight = catchAsyncError(async (req, res, next) => {

    const { highlightOne, highlightTwo, highlightThree } = req.body

    const update = {
        highlightOne,
        highlightTwo,
        highlightThree
    }

    const options = {
        new: true,
        upsert: true,
        useFindAndModify: false
    };

    const updateHomeHighlight = await Home.findOneAndUpdate({}, update, options)

    res.status(200).json({
        success: true,
        message: 'Home Highlight Updated Successfully',
        updateHomeHighlight
    })
})

// Home Batteries Section

exports.batteriesSection = catchAsyncError(async (req, res, next) => {

    const { batteriesHeading, batteriesDescription } = req.body

    const update = {
        batteriesHeading,
        batteriesDescription
    }

    const options = {
        new: true,
        upsert: true,
        useFindAndModify: false
    };

    const updateBatteriesSection = await Home.findOneAndUpdate({}, update, options);

    res.status(200).json({
        success: true,
        message: 'Batteries Section Updated Successfully',
        updateBatteriesSection
    })
})


// Home Contact Us

exports.homeContactUs = catchAsyncError(async (req, res, next) => {

    const { ContactUS, ContactUSDescription } = req.body

    const update = {
        ContactUS,
        ContactUSDescription
    };

    const options = {
        new: true,
        upsert: true,
        useFindAndModify: false
    };

    const updateHomeContactUs = await Home.findOneAndUpdate({}, update, options)

    res.status(200).json({
        success: true,
        message: 'Home Contact Us Updated Successfully',
        updateHomeContactUs
    })
})

// Get Home

exports.getHome = catchAsyncError(async (req, res, next) => {
    const home = await Home.find();

    res.status(200).json({
        success: true,
        home,
    })
})

//  About Section

// About Header

exports.aboutHeader = catchAsyncError(async (req, res, next) => {
    const { headerTitle, headerDescription } = req.body

    const update = {
        headerTitle,
        headerDescription
    };

    const options = {
        new: true,
        upsert: true,
        useFindAndModify: false
    };

    const updateAboutHeader = await About.findOneAndUpdate({}, update, options);

    res.status(200).json({
        success: true,
        message: 'About Header Updated Successfully',
        updateAboutHeader
    })
})

// About Our Mission

exports.ourMission = catchAsyncError(async (req, res, next) => {

    const { ourMissionTitle, ourMissionDescription } = req.body

    const update = {
        ourMissionTitle,
        ourMissionDescription
    };

    const options = {
        new: true,
        upsert: true,
        useFindAndModify: false
    };

    const updateMission = await About.findOneAndUpdate({}, update, options);

    res.status(200).json({
        success: true,
        message: 'Our Mission Updated Successfully',
        updateMission
    })
})

// About What we do

exports.weDoSection = catchAsyncError(async (req, res, next) => {

    const { weDoTitle, weDoDescription } = req.body

    const update = {
        weDoTitle,
        weDoDescription
    };

    const options = {
        new: true,
        upsert: true,
        useFindAndModify: false
    };

    const updateWeDoSection = await About.findOneAndUpdate({}, update, options);

    res.status(200).json({
        success: true,
        message: 'What We Do Section Updated Successfully',
        updateWeDoSection
    })
})


// Get About 

exports.getAbout = catchAsyncError(async (req, res, next) => {
    const about = await About.find();

    res.status(200).json({
        success: true,
        about
    })
})

// Contact Info 

exports.contactInfo = catchAsyncError(async (req, res, next) => {

    const { headerTitle, headerDescription, Landline, Mobile, Email } = req.body;

    const update = {
        headerTitle,
        headerDescription,
        Landline,
        Mobile,
        Email
    };

    const options = {
        new: true,
        upsert: true,
        useFindAndModify: false
    };

    const updateContactInfo = await Cinfo.findOneAndUpdate({}, update, options);

    res.status(200).json({
        success: true,
        message: 'Contact Info Updated Successfully',
        updateContactInfo
    });

})

// Get Contact Info

exports.getContactInfo = catchAsyncError(async (req, res, next) => {

    const contactInfo = await Cinfo.find();

    res.status(200).json({
        success: true,
        contactInfo
    })
})


// Contact Us Form

// Get Contact Us Form Data

exports.getContactUsData = catchAsyncError(async (req, res, next) => {

    const contactUsData = await ContactUs.find();

    res.status(200).json({
        success: true,
        contactUsData
    })
})

// Order

// Get All Orders

exports.getAllOrders = catchAsyncError(async (req, res, next) => {

    // const orders = await Order.find();

    // if (!orders) {
    //     return next(new ErrorHandler("Order Not Found", 404));
    // }

    // let totalAmount = 0;
    // orders.forEach((order) => {
    //     totalAmount += order.totalPrice;
    // });

    // res.status(200).json({
    //     success: true,
    //     orders,
    //     totalAmount,
    // });

    const { duration } = req.query;
    let startDate;
    let filter = {};

    // Set the start date based on the duration query parameter
    if (duration === "3months") {
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 3);
    } else if (duration === "6months") {
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 6);
    } else if (duration === "1year") {
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
    }

    // Apply the date filter if startDate is set
    if (startDate) {
        filter.createdAt = { $gte: startDate };
    }

    // Fetch orders based on the filter
    const orders = await Order.find(filter);

    if (!orders || orders.length === 0) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    // Calculate the total amount
    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    // Send the response
    res.status(200).json({
        success: true,
        orders,
        totalAmount,
    });
});

// Update Order Status

exports.updateOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("Already Delivered", 400));
    }

    if (req.body.status === "Shipped") {
        order.shippedAt = Date.now();
        // order.orderItems.forEach(async (i) => {
        //     await updateStock(i.product, i.quantity)
        // });
    }

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }



    const shippingemail = order.shippingInfo?.email;

    // console.log("Email:", shippingemail)

    const itemsList = order.orderItems
        .map(item => `- ${item.name} (Quantity: ${item.quantity}) (Price: ${item.price})`)
        .join("\n");

    let customMessage = "";

    if (req.body.status === "Shipped") {
        customMessage = `Hello, your order with ID ${order._id} has been shipped. 
You can expect delivery soon. Here are the items in your order:\n\n${itemsList}\n\nStay tuned for more updates!`;
    } else if (req.body.status === "Delivered") {
        customMessage = `Hello, your order with ID ${order._id} has been delivered. 
Thank you for shopping with us! Here are the items in your order:\n\n${itemsList}\n\nWe hope to see you again.`;
    }

    if (shippingemail && customMessage) {
        try {
            await sendEmail({
                email: shippingemail,
                subject: "Order Status 🛒",
                message: customMessage,
            })
        } catch (error) {
            return next(new ErrorHandler(error.message, 500))
        }
    }

    await order.save({ validateBeforeSave: false });

    try {
        res.status(200).json({
            success: true
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
});

// Product

// Product Header 

exports.productHeader = catchAsyncError(async (req, res, next) => {
    const { headerTitle, headerDescription } = req.body

    const update = {
        headerTitle,
        headerDescription
    };

    const options = {
        new: true,
        upsert: true,
        useFindAndModify: false
    };

    const updateProductHeader = await Product.findOneAndUpdate({}, update, options);

    res.status(200).json({
        success: true,
        message: 'Product Header Updated Successfully',
        updateProductHeader
    })
})


// Amaron Battery

exports.amaronBattery = catchAsyncError(async (req, res, next) => {


    const { batteryTitle, batteryDescription } = req.body;

    const update = {
        batteryTitle,
        batteryDescription
    }

    const options = {
        new: true,
        upsert: true,
        useFindAndModify: false
    }

    const updateAmaronBattery = await Product.findOneAndUpdate({}, update, options);

    res.status(200).json({
        success: true,
        message: 'Amaron Battary Updated Successfully',
        updateAmaronBattery
    })

})

// Battery Card

exports.batteryCard = catchAsyncError(async (req, res, next) => {

    const { batteryCardOne, batteryCardTwo, batteryCardThree } = req.body;

    const update = {
        batteryCardOne,
        batteryCardTwo,
        batteryCardThree
    }

    const options = {
        new: true,
        upsert: true,
        useFindAndModify: false
    }

    const updateBatteryCard = await Product.findOneAndUpdate({}, update, options);

    res.status(200).json({
        success: true,
        message: 'Battary Card Updated Successfully',
        updateBatteryCard
    })
})

// Feature Product

exports.featureProduct = catchAsyncError(async (req, res, next) => {

    const { featureProduct, featureProductPoints } = req.body;

    const update = {
        featureProduct,
        featureProductPoints
    }

    const options = {
        new: true,
        upsert: true,
        useFindAndModify: false
    }

    const updateFeatureProduct = await Product.findOneAndUpdate({}, update, options);

    res.status(200).json({
        success: true,
        message: 'Amaron Battary Updated Successfully',
        updateFeatureProduct
    })
})

// Delete Feature Product Point

exports.deleteFeatureProductPoint = catchAsyncError(async (req, res, next) => {
    const { id } = req.params; // Product ID from URL parameter
    const { pointToRemove } = req.body; // Point to remove from featureProductPoints array

    if (!pointToRemove) {
        return res.status(400).json({
            success: false,
            message: 'Please specify the point to remove.'
        });
    }

    const update = { $pull: { featureProductPoints: pointToRemove } };
    const options = { new: true, useFindAndModify: false };

    const updatedProduct = await Product.findByIdAndUpdate(id, update, options);

    if (!updatedProduct) {
        return res.status(404).json({
            success: false,
            message: 'Product not found.'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Feature product point removed successfully.',
        product: updatedProduct
    });
});

// Get Product Page Data

exports.getProductData = catchAsyncError(async (req, res, next) => {

    const productData = await Product.find();

    res.status(200).json({
        success: true,
        productData
    });


})

// Coupon

// Create Coupon

exports.creatediscountCoupon = catchAsyncError(async (req, res, next) => {
    const { code, discountType, discountValue, minPurchaseAmount, expiryDate } = req.body;

    const discountValueDecimal = mongoose.Types.Decimal128.fromString(parseFloat(discountValue).toFixed(2));
    const minPurchaseAmountDecimal = mongoose.Types.Decimal128.fromString(parseFloat(minPurchaseAmount).toFixed(2));

    const existingCoupon = await Coupon.findOne({ code });

    if (existingCoupon) {
        return next(new ErrorHandler("Coupon code already exists", 400));
    }

    const newCoupon = new Coupon({
        code,
        discountType,
        discountValue: discountValueDecimal,
        minPurchaseAmount: minPurchaseAmountDecimal,
        expiryDate,
    });

    await newCoupon.save();

    res.status(200).json({
        success: true,
        message: 'Coupon created successfully.',
        coupon: newCoupon
    });
})

// Get All Coupons

exports.getdiscountCoupon = catchAsyncError(async (req, res, next) => {

    const discountCoupons = await Coupon.find();

    // Convert Decimal128 fields to strings in the response
    const formattedCoupons = discountCoupons.map((coupon) => ({
        ...coupon._doc, // Spread other fields
        discountValue: coupon.discountValue.toString(), // Convert Decimal128 to string
        minPurchaseAmount: coupon.minPurchaseAmount.toString(), // Convert Decimal128 to string
    }));

    res.status(200).json({
        success: true,
        discountCoupon: formattedCoupons, // Send formatted coupons
    });


})

// Active Deactive Coupons

exports.couponAvailability = catchAsyncError(async (req, res, next) => {

    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
        return next(new ErrorHandler('Coupon not found', 404));
    };

    coupon.isActive = !coupon.isActive;

    await coupon.save();

    const message = coupon.isActive ? 'Coupon Active' : 'Coupon Deactive';

    res.status(200).json({
        success: true,
        message: message,
    });

})

// delete Coupon

exports.deleteCoupon = catchAsyncError(async (req, res, next) => {

    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    if (!coupon) {
        return next(new ErrorHandler('Coupon not found', 404));
    };

    return res.status(200).json({
        success: true,
        message: 'Coupon deleted successfully',
    });
})

// Subscribe

exports.subscriberList = catchAsyncError(async (req, res, next) => {

    const subscribers = await Subscribe.find();

    res.status(200).json({
        success: true,
        subscribers
    });

})

// Testimonial

// Create Testimonial

exports.createTestimonial = catchAsyncError(async (req, res, next) => {

    const { name, role, testimonial, rating } = req.body

    await Testimonial.create({
        name,
        role,
        testimonial,
        rating
    })

    res.status(200).json({
        success: true,
        message: 'Testimonial created successfully',
    })
})

// Get Testimonial

exports.testimonialList = catchAsyncError(async (req, res, next) => {

    const testimonialList = await Testimonial.find();

    res.status(200).json({
        success: true,
        testimonialList
    });

})