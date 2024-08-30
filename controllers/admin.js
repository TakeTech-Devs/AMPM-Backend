const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorhandler');
const sendToken = require('../utils/token')
const Admin = require('../models/adminModel');
const Reseller = require('../models/resellerModel');
const Home = require('../models/homeModel');
const About = require('../models/aboutUsModel');


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

// Home Section

// Home Header

exports.homeHeader = catchAsyncError (async (req, res, next) => {
    
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

exports.homeHighlight = catchAsyncError(async(req, res, next) =>{

    const { highlightOne, highlightTwo, highlightThree } = req.body

    const update ={
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

exports.batteriesSection = catchAsyncError(async (req, res, next) =>{

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

exports.homeContactUs = catchAsyncError (async (req, res, next) => {

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

exports.getHome = catchAsyncError (async (req, res, next) =>{
    const home = await Home.find();

    res.status(200).json({
        success: true,
        home,
    })
})

//  About Section

// About Header

exports.aboutHeader = catchAsyncError(async (req, res, next) =>{
    const { headerTitle, headerDescription } = req.body

    const update ={
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

exports.ourMission = catchAsyncError(async (req, res, next) =>{

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

exports.weDoSection = catchAsyncError(async (req, res, next) =>{

    const { weDoTitle, weDoDescription } = req.body

    const  update ={
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

exports.getAbout = catchAsyncError (async(req, res, next) =>{
    const about = await About.find();

    res.status(200).json({
        success: true,
        about
    })
})