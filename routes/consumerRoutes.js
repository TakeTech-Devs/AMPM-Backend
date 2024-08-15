const express = require('express'); 
const { consumerRegistration, consumerLogin } = require('../controllers/consumer');
const router = express.Router();


router.route('/register').post(consumerRegistration);
router.route('/login').post(consumerLogin);


module.exports = router;