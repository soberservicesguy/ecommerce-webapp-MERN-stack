const router = require('express').Router();


router.use('/paypal', require('./orders/order_with_paypal'));
router.use('/stripe-payments', require('./orders/order_with_stripe'));

// router.use('/testing', require('./tests'))

module.exports = router;


