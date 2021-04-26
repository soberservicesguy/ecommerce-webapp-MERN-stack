module.exports.isAllowedCreatingCarousels = (req, res, next) => {

    if (req.user.user_object && req.user.user_object.isLoggedIn) {

    // access user payload from passport jwt authentication middleware with req.user
    // check user privilege

        let required_privilege = req.user.user_object.privileges.filter(
            function(privilege_object){
                return privilege_object.privilege_name === 'is_allowed_carousel_upload'
            }
        )

        if (required_privilege){

            // attach payload for next middleware
            req.local = 'I am a payload from previous middleware'
            next();

        } else {

            res.status(401).json({ msg: 'isAllowedCreatingCarousels Privilege missing' });            
        
        }

    } else {

        res.status(401).json({ msg: 'You are not authorized to use this resource' });

    }
}

