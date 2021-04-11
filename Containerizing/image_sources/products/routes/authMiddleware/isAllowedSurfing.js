module.exports.isAllowedSurfing = (req, res, next) => {
	// console.log(req.user.user_object)
	// console.log(req.user.isLoggedIn)
    if ( req.user.user_object && req.user.user_object.isLoggedIn ) {

	// access user payload from passport jwt authentication middleware with req.user
	// check user privilege

		let required_privilege = req.user.user_object.privileges.filter(
			function(privilege_object){
				return privilege_object.privilege_name === 'allow_surfing'
			}
		)

		if (required_privilege){

			// attach payload for next middleware
			req.local = 'I am a payload from previous middleware'
			next();

		} else {

			res.status(200).json({ msg: 'isAllowedSurfing Privilege missing' });			
		
		}

    } else {

        res.status(200).json({ msg: 'You are not authorized to surf' });

    }
}

