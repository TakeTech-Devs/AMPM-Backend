const express = require('express'); 
const { resellerRegistration, resellerLogin } = require('../controllers/reseller');
const router = express.Router();



router.route('/register').post(resellerRegistration);
router.route('/login').post(resellerLogin);

module.exports = router;