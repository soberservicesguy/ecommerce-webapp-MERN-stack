const router = require('express').Router();

router.use('/blogpostings', require('./blogposts/blogpost'));

module.exports = router;