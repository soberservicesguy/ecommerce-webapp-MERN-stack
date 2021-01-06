const router = require('express').Router();

router.use('/users-portal', require('./users/user'));
router.use('/blogpostings', require('./blogposts/blogpost'));
router.use('/carousels', require('./carousels/carousel'));
router.use('/products', require('./products/product'));

router.use('/paypal', require('./orders/order_with_paypal'));
router.use('/stripe', require('./orders/order_with_stripe'));

// router.use('/paypal', require('./payments/paypal_payments'));
// router.use('/stripe', require('./payments/stripe_payments'));

module.exports = router;