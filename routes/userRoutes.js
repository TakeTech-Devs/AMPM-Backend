const express = require('express'); 
const { contactUsForm, subscribeForm } = require('../controllers/user');
const router = express.Router();


router.route('/contact').post(contactUsForm)
router.route('/subscribe').post(subscribeForm)


module.exports = router;