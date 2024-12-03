const express = require('express'); 
const { getHome, getAbout, getContactInfo } = require('../controllers/admin');
const router = express.Router();

router.route('/get-home').get(getHome)
router.route('/get-about').get(getAbout)
router.route('/get-contactInfo').get(getContactInfo)

module.exports = router;