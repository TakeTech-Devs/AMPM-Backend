const express = require('express'); 
const { resellerRegistration, resellerLogin, logout, getProfile, updateProfile, updatePassword } = require('../controllers/reseller');
const { isReseller } = require('../middleware/auth');
const router = express.Router();



router.route('/register').post(resellerRegistration);
router.route('/login').post(resellerLogin);

router.route('/logout').get(logout)
router.route('/profile').get(isReseller ,getProfile);
router.route('/profile/update').put(isReseller ,updateProfile);
router.route('/password/update').put(isReseller ,updatePassword);

module.exports = router;