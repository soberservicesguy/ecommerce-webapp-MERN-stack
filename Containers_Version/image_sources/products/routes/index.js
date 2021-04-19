const router = require('express').Router();

router.use('/products', require('./products/product'));

module.exports = router;