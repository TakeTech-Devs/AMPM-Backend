const express = require('express'); 
const { isAuthorized } = require('../middleware/auth');
const { newOrder, myOrders, getSingleOrderDetails } = require('../controllers/order');
const router = express.Router();

router.route('/order/new').post(isAuthorized, newOrder);

router.route('/order/me').get(isAuthorized, myOrders)
router.route('/order/:id').get(isAuthorized, getSingleOrderDetails)



module.exports = router;