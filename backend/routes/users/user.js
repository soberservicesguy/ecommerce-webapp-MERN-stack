// for using jwt in subsequest requests, put the jwt in 'bearer token` OR Authorization key in header of request'
// ALSO IN REACT / REACT NATIVE PUT IT IN EVERY REQUEST OTHERWISE route will not be shown

// passport jwt strategy checks jwt token in each request to verify the user is valid or should be entertained or not
// passport local strategy checks session ie user.loggedin / isauthenticated methods, once user is logged in it can do what he is allowed to do untill he logs out

const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const utils = require('../../lib/utils');
const passport = require('passport');
const { isAllowedSurfing } = require('../authMiddleware/isAllowedSurfing')
const get_allowed_privileges_list = require("../../handy_functions/get_allowed_privileges_list")


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

    User.findOneAndUpdate({ phone_number: req.body.phone_number }, { $set:{ isLoggedIn:true } }, { new: true }, async (err, user) => {
        if (err) {

            res.status(401).json({ success: false, msg: "could not find user" });

        }

        if (!user) {
            res.status(401).json({ success: false, msg: "could not find user" });
        }

    // Function defined at bottom of app.js
        const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

        if (isValid) {

            const tokenObject = utils.issueJWT(user);

            console.log('user before privileges')
            console.log(user)

            let privileges_list = await get_allowed_privileges_list(user)

            console.log({privileges_list})

            res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires, privileges: privileges_list });


        } else {

            res.status(401).json({ success: false, msg: "you entered the wrong password" });

        }
        // console.log(user);
    })
    .catch((err1) => {

        next(err1);

    });

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