const express = require('express'); 
const { adminRegistration, adminLogin, logout, resellerApproval } = require('../controllers/admin');
const { isAdmin, authorizeRoles } = require('../middleware/auth');
const router = express.Router();



router.route('/admin-register').post(adminRegistration);
router.route('/admin-login').post(adminLogin);

router.route('/logout').get(logout);

router.route('/reseller/approve/:id').put(isAdmin, authorizeRoles("admin"), resellerApproval)

module.exports = router;