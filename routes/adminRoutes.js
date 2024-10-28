const express = require('express'); 
const { adminRegistration, adminLogin, logout, resellerApproval, homeHeader, homeHighlight, batteriesSection, homeContactUs, aboutHeader, ourMission, weDoSection, contactInfo, getContactUsData, getAllOrders, updateOrder, resellerList, consumerList, adminList } = require('../controllers/admin');
const { isAdmin, authorizeRoles } = require('../middleware/auth');
const router = express.Router();



router.route('/admin-register').post(adminRegistration);
router.route('/admin-login').post(adminLogin);
router.route('/logout').get(logout);
// router.route('/admins').get(isAdmin, authorizeRoles("admin"), adminList);
router.route('/admins').get(adminList);

// Reseller
router.route('/reseller/approve/:id').put(isAdmin, authorizeRoles("admin"), resellerApproval);
// router.route('/resellers').get(isAdmin, authorizeRoles("admin"), resellerList);
router.route('/resellers').get(resellerList);

// Consumer
// router.route('/consumer').get(isAdmin, authorizeRoles("admin"), consumerList);
router.route('/consumer').get( consumerList);

// Home
router.route('/create-homeHeader').post(isAdmin, authorizeRoles("admin"), homeHeader);
router.route('/create-homeHighlight').post(isAdmin, authorizeRoles("admin"), homeHighlight);
router.route('/create-homeBatteries').post(isAdmin, authorizeRoles("admin"), batteriesSection);
router.route('/create-homeContact').post(isAdmin, authorizeRoles("admin"), homeContactUs);

// About 
router.route('/create-aboutHeader').post(isAdmin, authorizeRoles("admin"), aboutHeader);
router.route('/create-aboutMission').post(isAdmin, authorizeRoles("admin"), ourMission);
router.route('/create-aboutWeDo').post(isAdmin, authorizeRoles("admin"), weDoSection);

// Contact Info
router.route('/create-contactInfo').post(isAdmin, authorizeRoles("admin"), contactInfo);


// ContactUs Data
router.route('/get-contactUs').get(isAdmin, authorizeRoles("admin"), getContactUsData);

// Order
// router.route('/get-allOrders').get(isAdmin, authorizeRoles("admin"), getAllOrders)
router.route('/get-allOrders').get(getAllOrders)
router.route('/admin/order/:id').put(isAdmin, authorizeRoles("admin"), updateOrder)


module.exports = router;