const catchAsyncError = require('../middleware/catchAsyncError');
const Order = require('../models/orderModel');
const ErrorHandler = require('../utils/errorhandler');
const PDFDocument = require('pdfkit');
const fs = require("fs");
const path = require("path");
const os = require('os');
// const puppeteer = require('puppeteer');
// const pdf = require('html-pdf-node');
const { toWords } = require('number-to-words');
const pdf = require('html-pdf')


// New Order 

exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        // paymentInfo,
        totalPrice,
    } = req.body

    // const orderExist = await Order.findOne({ paymentInfo });

    // if (orderExist) {
    //     return next(new ErrorHandler("Order Already Placed", 400));
    // }


    const orderedBy = req.consumer ? req.consumer._id : req.reseller ? req.reseller._id : null;

    if (!orderedBy) {
        return next(new ErrorHandler("Unauthorized access", 401));
    }

    const order = await Order.create({
        shippingInfo,
        orderItems,
        // paymentInfo,
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

exports.myOrders = catchAsyncError(async (req, res, next) => {
    let userId;

    if (req.consumer) {
        userId = req.consumer._id;
    } else if (req.reseller) {
        userId = req.reseller._id;
    } else {
        return next(new ErrorHandler("Unauthorized access", 401));
    }

    const orders = await Order.find({ oredeBy: userId });

    // if (!orders || orders.length === 0) {
    //     return next(new ErrorHandler("Order Not Found", 404));
    // }

    res.status(200).json({
        success: true,
        orders,
    });
})

// Get Single Order Details

exports.getSingleOrderDetails = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});


function convertPriceToWords(price) {
    const integerPart = Math.floor(price);
    const decimalPart = Math.round((price % 1) * 100);

    const words =
        toWords(integerPart) +
        (decimalPart > 0 ? ` and ${toWords(decimalPart)} paise` : '') +
        ' only';
    return words.charAt(0).toUpperCase() + words.slice(1); // Capitalize the first letter
}
// Get Invoice 

exports.getInvoice = catchAsyncError(async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return next(new ErrorHandler("Order Not Found", 404));
        }

        // Load the HTML template
        const templatePath = path.join(__dirname, '../assets/PagesDesign/Invoice.html');
        let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

        const logoPath = path.join(__dirname, "../assets/login-page-logo.png");
        const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });
        const logoDataUrl = `data:image/png;base64,${logoBase64}`;

        const totalPriceInWords = convertPriceToWords(order.totalPrice);

        // Replace placeholders with order data
        const orderItemsHtml = order.orderItems.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>₹${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        `).join('');

        htmlTemplate = htmlTemplate
            .replace('{{logoUrl}}', logoDataUrl)
            .replace('{{orderId}}', order._id)
            .replace('{{customerName}}', `${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`)
            .replace('{{customerAddress}}', `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}`)
            .replace('{{customerPhone}}', `${order.shippingInfo.phone}`)
            .replace('{{customerEmail}}', `${order.shippingInfo.email}`)
            .replace('{{date}}', new Date(order.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }))
            .replace('{{invoiceDate}}', new Date(order.deliveredAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }))
            .replace('{{orderItems}}', orderItemsHtml)
            .replace('{{totalPrice}}', `₹${order.totalPrice.toFixed(2)}`)
            .replace('{{totalPriceInWord}}', `${totalPriceInWords}`);

        // PDF options
        const options = {
            format: 'A4',
            orientation: 'portrait',
            border: '5mm',
        };

        // Convert HTML to PDF
        pdf.create(htmlTemplate, options).toBuffer((err, buffer) => {
            if (err) {
                console.error("Error generating PDF:", err);
                return next(new ErrorHandler("Error generating the invoice", 500));
            }

            // Send the PDF to the client
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=invoice_${req.params.id}.pdf`,
            });
            res.send(buffer);
        });
    } catch (error) {
        console.error("Error generating invoice:", error);
        return next(new ErrorHandler("Error generating the invoice", 500));
    } 
})