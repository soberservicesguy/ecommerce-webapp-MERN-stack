const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt; // extracts jwt from header
const fs = require('fs');
const path = require('path');
const User = require('mongoose').model('User');
const get_allowed_privileges_list = require("../handy_functions/get_allowed_privileges_list")

const pathToKey = path.join(__dirname, '../keys/', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
};

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {

	// The JWT payload is passed into the verify callback
	passport.use(new JwtStrategy(options, function(jwt_payload, done) {

		// console.log('BELOW IS JWT PAYLOAD')
		// console.log(jwt_payload);
		
		// We will assign the `sub` property on the JWT to the database ID of user
		// User.findOne({_id: jwt_payload.sub}, function(err, user) {
		User.findOne({_id: jwt_payload.sub})
		.populate('privileges')
		.exec(function(err, user) {

			// This flow look familiar?  It is the same as when we implemented
			// the `passport-local` strategy
			if (err) {
				return done(err, false);
			}
			if (user) {

				// console.log('USER IS BELOW')
				// console.log(user)

			// adding privileges payload to req.user so that every request on protected route is privilege protected
				let privileges_list = get_allowed_privileges_list(user)

				// overwriting user and incorporating any other payload, since only user can be the payload from this middleware
				user = { user_object: user, privileges: privileges_list, msg: "I am from passport js payload" }

				return done(null, user);
				// return done(null, payload); // this wont work, since user is the only possible payload with done, so just overwrite it 

			} else {
				console.log('REQUEST REJECTED BY PASSPORT JS')
				return done(null, false);
			}
			
		});
		
	}));
}