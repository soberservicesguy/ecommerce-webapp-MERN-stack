const router = require('express').Router();

router.use('/carousels', require('./carousels/carousel'));

module.exports = router;