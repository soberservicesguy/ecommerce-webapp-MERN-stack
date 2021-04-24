// for using jwt in subsequest requests, put the jwt in 'bearer token` OR Authorization key in header of request'
// ALSO IN REACT / REACT NATIVE PUT IT IN EVERY REQUEST OTHERWISE route will not be shown

// passport jwt strategy checks jwt token in each request to verify the user is valid or should be entertained or not
// passport local strategy checks session ie user.loggedin / isauthenticated methods, once user is logged in it can do what he is allowed to do untill he logs out
require('../../models/blogpost');
require('../../models/image');
require('../../models/product');
require('../../models/carousel');

const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const Product = mongoose.model('Product');
const BlogPost = mongoose.model('BlogPost');
const Image = mongoose.model('Image');
const Carousel = mongoose.model('Carousel');

const utils = require('../../lib/utils');
const passport = require('passport');
const { isAllowedSurfing } = require('../authMiddleware/isAllowedSurfing')
const get_allowed_privileges_list = require("../../handy_functions/get_allowed_privileges_list")

const {
    get_image_to_display,
    // store_video_at_tmp_and_get_its_path,
    // delete_video_at_tmp,
    get_multer_storage_to_use,
    // get_multer_storage_to_use_alternate,
    // get_multer_storage_to_use_for_bulk_files,
    get_file_storage_venue,
    get_file_path_to_use,
    // get_file_path_to_use_for_bulk_files,
    // get_snapshots_storage_path,
    // get_snapshots_fullname_and_path,

    // gcp_bucket,
    // save_file_to_gcp_storage,
    save_file_to_gcp,
    // save_file_to_gcp_for_bulk_files,
    use_gcp_storage,
    // get_file_from_gcp,
    
    use_aws_s3_storage,
    // save_file_to_s3,
    // get_file_from_aws,
    // save_file_to_aws_s3,
    // save_file_to_aws_s3_for_bulk_files,

    checkFileTypeForImages,
    // checkFileTypeForImageAndVideo,
    // checkFileTypeForImagesAndExcelSheet,
} = require('../../config/storage/')


router.get('/protected', passport.authenticate('jwt', { session: false }), isAllowedSurfing, (req, res, next) => {
    // // payload recieved from passport.authenticate jwt middleware
    // console.log(req.user.msg)
    // console.log(req.user.user_object)

    // // payload recieved from last middleware
    // console.log(req.local)

    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!", privileges: req.user.privileges});
});


// Validate an existing user and issue a JWT
router.post('/login', async function(req, res, next){

    console.log('INCOMING LOGIN')

    User.findOneAndUpdate({ phone_number: req.body.phone_number }, { $set:{ isLoggedIn:true } }, { new: true }, async (err, user) => {
        if (err) {

            res.status(200).json({ success: false, msg: "could not find user" });
            console.log({ success: false, msg: "could not find user" })
            return

        }

        if (!user) {
            res.status(200).json({ success: false, msg: "could not find user" });
            console.log({ success: false, msg: "could not find user" })
            return

        }

    // Function defined at bottom of app.js
        const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

        if (isValid) {

            const tokenObject = utils.issueJWT(user);

            let privileges_list = await get_allowed_privileges_list(user)

            // console.log('user before privileges')
            // console.log(user)

            let user_image = await Image.findOne({ _id: user.user_image })
            let user_avatar_image_to_use = await get_image_to_display(user_image.image_filepath, user_image.object_files_hosted_at)

            let user_details = {
                // user_cover_image: user_cover_image_to_use,
                user_image: user_avatar_image_to_use,
                user_name: user.user_name,
                phone_number: user.phone_number,
            }


            res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires, privileges: privileges_list, user_details: user_details })
            console.log({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires, privileges: privileges_list, user_details: user_details })
            return


        } else {

            res.status(200).json({ success: false, msg: "you entered the wrong password" });
            console.log({ success: false, msg: "you entered the wrong password" })
            return

        }
        // console.log(user);
    })
    .catch((err1) => {

        next(err1);

    });

});


router.get('/delete-all-users', async (req, res, next) => {

    await User.deleteMany({}, ()=>null)
    res.status(200).json({ success: true, message: 'all users deleted'});

});

router.get('/delete-all-carousels', async (req, res, next) => {

    await Carousel.deleteMany({}, ()=>null)
    res.status(200).json({ success: true, message: 'all carousels deleted'});

});


router.get('/delete-all-products', async (req, res, next) => {

    await Product.deleteMany({}, ()=>null)
    res.status(200).json({ success: true, message: 'all products deleted'});

});

router.get('/delete-all-images', async (req, res, next) => {

    await Image.deleteMany({}, ()=>null)
    res.status(200).json({ success: true, message: 'all images deleted'});

});

router.get('/delete-all-blogposts', async (req, res, next) => {

    console.log('INCOMING')
    await BlogPost.deleteMany({}, ()=>null)
    res.status(200).json({ success: true, message: 'all blogposts deleted'});

});



// DEPRECATED
//  User.findOne({ phone_number: req.body.phone_number })
//  .then((user) => {

//      console.log(user)

//      if (!user) {
//          res.status(401).json({ success: false, msg: "could not find user" });
//      }

//      // Function defined at bottom of app.js
//      const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

//      if (isValid) {

//          const tokenObject = utils.issueJWT(user);
//          res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });

//      } else {

//          res.status(401).json({ success: false, msg: "you entered the wrong password" });

//      }

//  })
//  .catch((err) => {
//      next(err);
//  });
// });

// Register a new user
router.post('/register', function(req, res, next){

    const saltHash = utils.genPassword(req.body.password);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        user_name: req.body.user_name,
        phone_number: req.body.phone_number,
        hash: hash,
        salt: salt,
    });

    try {
    
        newUser.save()
        .then((user) => {
            res.json({ success: true, user: user });
        });

    } catch (err) {
        
        res.json({ success: false, msg: err });
    
    }

});

module.exports = router;