const router = require('express').Router();

router.use('/carousels', require('./carousels/carousel'));
router.use('/products', require('./products/product'));

router.use('/users', require('./users/user'));
router.use('/users', require('./users/sign_up'));

router.use('/paypal', require('./orders/order_with_paypal'));
router.use('/stripe', require('./orders/order_with_stripe'));

router.use('/blogpostings', require('./blogposts/blogpost'));

router.use('/uploads', require('./uploads/bulk_blogpost_upload'));
router.use('/uploads', require('./uploads/bulk_product_upload'));
router.use('/uploads', require('./uploads/bulk_carousel_upload'));


// router.use('/testing', require('./tests'))

module.exports = router;


