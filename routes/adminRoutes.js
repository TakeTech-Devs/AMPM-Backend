const express = require('express'); 
const { adminRegistration, adminLogin, logout, resellerApproval, homeHeader, homeHighlight, batteriesSection, homeContactUs, aboutHeader, ourMission, weDoSection, contactInfo, getContactUsData, getAllOrders, updateOrder, resellerList, consumerList, adminList, getAdminProfile, productHeader, amaronBattery, batteryCard, featureProduct, getProductData, deleteFeatureProductPoint } = require('../controllers/admin');
const { isAdmin, authorizeRoles } = require('../middleware/auth');
const router = express.Router();



router.route('/admin-register').post(adminRegistration);
router.route('/admin-login').post(adminLogin);
router.route('/logout').get(logout);
router.route('/profile').get(isAdmin ,getAdminProfile);
// router.route('/admins').get(isAdmin, authorizeRoles("admin"), adminList);
router.route('/admins').get(adminList);

// Reseller
// router.route('/reseller/approve/:id').put(isAdmin, authorizeRoles("admin"), resellerApproval);
router.route('/reseller/approve/:id').put(resellerApproval);
// router.route('/resellers').get(isAdmin, authorizeRoles("admin"), resellerList);
router.route('/resellers').get(resellerList);

// Consumer
// router.route('/consumer').get(isAdmin, authorizeRoles("admin"), consumerList);
router.route('/consumer').get( consumerList);

// Home
// router.route('/create-homeHeader').post(isAdmin, authorizeRoles("admin"), homeHeader);
router.route('/create-homeHeader').post(homeHeader);
// router.route('/create-homeHighlight').post(isAdmin, authorizeRoles("admin"), homeHighlight);
router.route('/create-homeHighlight').post(homeHighlight);
// router.route('/create-homeBatteries').post(isAdmin, authorizeRoles("admin"), batteriesSection);
router.route('/create-homeBatteries').post(batteriesSection);
// router.route('/create-homeContact').post(isAdmin, authorizeRoles("admin"), homeContactUs);
router.route('/create-homeContact').post(homeContactUs);

// About 
// router.route('/create-aboutHeader').post(isAdmin, authorizeRoles("admin"), aboutHeader);
router.route('/create-aboutHeader').post(aboutHeader);
// router.route('/create-aboutMission').post(isAdmin, authorizeRoles("admin"), ourMission);
router.route('/create-aboutMission').post(ourMission);
// router.route('/create-aboutWeDo').post(isAdmin, authorizeRoles("admin"), weDoSection);
router.route('/create-aboutWeDo').post(weDoSection);

// Contact Info
// router.route('/create-contactInfo').post(isAdmin, authorizeRoles("admin"), contactInfo);
router.route('/create-contactInfo').post(contactInfo);


// ContactUs Data
// router.route('/get-contactUs').get(isAdmin, authorizeRoles("admin"), getContactUsData);
router.route('/get-contactUs').get(getContactUsData);

// Order
// router.route('/get-allOrders').get(isAdmin, authorizeRoles("admin"), getAllOrders)
router.route('/get-allOrders').get(getAllOrders)
// router.route('/admin/order/:id').put(isAdmin, authorizeRoles("admin"), updateOrder)
router.route('/admin/order/:id').put(updateOrder)

// Product

router.route('/create-productHeader').post(productHeader)
router.route('/create-battery').post(amaronBattery)
router.route('/create-batteryCard').post(batteryCard)
router.route('/create-featureProduct').post(featureProduct)
router.route('/product/feature-point/:id').delete(deleteFeatureProductPoint)
router.route('/get-productData').get(getProductData)


module.exports = router;