const express = require('express'); 
const { contactUsForm, subscribeForm, applyCoupon, cancelOrder } = require('../controllers/user');
const router = express.Router();


router.route('/contact').post(contactUsForm)
router.route('/subscribe').post(subscribeForm)
router.route('/apply-coupon').post(applyCoupon)
router.route('/cancel/order/:id').put(cancelOrder)


module.exports = router;