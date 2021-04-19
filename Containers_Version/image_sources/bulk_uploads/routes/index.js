const router = require('express').Router();

router.use('/uploads', require('./uploads/bulk_blogpost_upload'));
router.use('/uploads', require('./uploads/bulk_product_upload'));
router.use('/uploads', require('./uploads/bulk_carousel_upload'));
router.use('/uploads', require('./uploads/bulk_product_category_upload'));


module.exports = router;