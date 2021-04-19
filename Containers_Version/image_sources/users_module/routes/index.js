const router = require('express').Router();

router.use('/users', require('./users/user'));
router.use('/users', require('./users/sign_up'));


module.exports = router;