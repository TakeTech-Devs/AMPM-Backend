const express = require('express'); 
const { getHome, getAbout } = require('../controllers/admin');
const router = express.Router();

router.route('/get-home').get(getHome)
router.route('/get-about').get(getAbout)

module.exports = router;