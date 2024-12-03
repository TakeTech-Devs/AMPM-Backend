const express = require('express'); 
const { consumerRegistration, consumerLogin, getProfile, logout, updateProfile, updatePassword } = require('../controllers/consumer');
const { isConsummer } = require('../middleware/auth');
const router = express.Router();


router.route('/register').post(consumerRegistration);
router.route('/login').post(consumerLogin);

router.route('/logout').get(logout)
router.route('/profile').get(isConsummer ,getProfile);
router.route('/profile/update').put(isConsummer ,updateProfile);
router.route('/password/update').put(isConsummer ,updatePassword);


module.exports = router;