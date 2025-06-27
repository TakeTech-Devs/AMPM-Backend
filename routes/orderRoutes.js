const express = require('express'); 
const { isAuthorized } = require('../middleware/auth');
const { newOrder, myOrders, getSingleOrderDetails, getInvoice } = require('../controllers/order');
const router = express.Router();

router.route('/order/new').post(isAuthorized, newOrder);

router.route('/order/me').get(isAuthorized, myOrders)
router.route('/order/:id').get(isAuthorized, getSingleOrderDetails)
router.route('/invoice/:id').get(getInvoice)



module.exports = router;