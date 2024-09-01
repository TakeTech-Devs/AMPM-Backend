const express = require('express'); 
const { contactUsForm } = require('../controllers/user');
const router = express.Router();


router.route('/contact').post(contactUsForm)


module.exports = router;