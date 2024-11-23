const express = require('express'); 
const { contactUsForm, subscribeForm, applyCoupon } = require('../controllers/user');
const router = express.Router();


router.route('/contact').post(contactUsForm)
router.route('/subscribe').post(subscribeForm)
router.route('/apply-coupon').post(applyCoupon)


module.exports = router;