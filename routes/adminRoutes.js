const express = require('express'); 
const { adminRegistration, adminLogin, logout, resellerApproval, homeHeader, homeHighlight, batteriesSection, homeContactUs, aboutHeader, ourMission, weDoSection } = require('../controllers/admin');
const { isAdmin, authorizeRoles } = require('../middleware/auth');
const router = express.Router();



router.route('/admin-register').post(adminRegistration);
router.route('/admin-login').post(adminLogin);

router.route('/logout').get(logout);

router.route('/reseller/approve/:id').put(isAdmin, authorizeRoles("admin"), resellerApproval);

// Home
router.route('/create-homeHeader').post(isAdmin, authorizeRoles("admin"), homeHeader);
router.route('/create-homeHighlight').post(isAdmin, authorizeRoles("admin"), homeHighlight);
router.route('/create-homeBatteries').post(isAdmin, authorizeRoles("admin"), batteriesSection);
router.route('/create-homeContact').post(isAdmin, authorizeRoles("admin"), homeContactUs);

// About 
router.route('/create-aboutHeader').post(isAdmin, authorizeRoles("admin"), aboutHeader);
router.route('/create-aboutMission').post(isAdmin, authorizeRoles("admin"), ourMission);
router.route('/create-aboutWeDo').post(isAdmin, authorizeRoles("admin"), weDoSection);


module.exports = router;