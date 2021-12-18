const express = require('express');
const path = require('path');
const passport = require('passport');
// const cors = require("cors");

// const bodyParser = require("body-parser"); // commented out since we using app.use(express.json()); // app.use(express.urlencoded({extended: true}));

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require('./config/database');
// Must first load the models
require('./models/user');
require('./models/push_user');
		
require('./models/blogpost');

// Must first load the models
require('./models/user');
require('./models/push_user');
		
// Pass the global passport object into the configuration function
require('./config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({extended: true}));


try {
	app.use(require('./config/cors_policy'))
} catch (err){
	console.log('couldnt incorporate cors policy')
}


/**
 * -------------- ROUTES ----------------
 */
// LOAD BACKEND ROUTES FIRST, FOR REQUESTS FROM BACKEND
// Imports all of the routes from ./routes/index.js
app.use(require('./routes'));

/**
 * -------------- INCLUDING REACT FRONTEND ----------------
 */
// LOAD FRONTEND FOR ALL REQUESTS OTHER THAN BACKEND ROUTER, IE FOR REACT-ROUTER-DOM
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res){
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});





// --------------------------PUSH NOTIFICATIONS start here-------------------------------

// const webpush = require("web-push");
// app.use(express.static(path.join(__dirname, "push_notifications")));

// // app.use(bodyParser.json()); // commented out since we using express own alternative for it

// // public and private keys are generated using some command on terminal
// const publicVapidKey =
// 	"";
// const privateVapidKey = "";


// webpush.setVapidDetails(
// 	"mailto:test@test.com",
// 	publicVapidKey,
// 	privateVapidKey
// );

// --------------------------PUSH NOTIFICATIONS ends here-------------------------------






// --------------------------STRIPE starts here-------------------------------

const env = require("dotenv").config({ path: "./.env" });

// GIVING SRIPE SECRET KEY

// NOT USING STRIPE FROM HERE
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const { resolve } = require("path");

// app.use(
// 	express.json({
// 		// We need the raw body to verify webhook signatures.
// 		// Let's compute it only when hitting the Stripe webhook endpoint.
// 		verify: function(req, res, buf) {
// 			if (req.originalUrl.startsWith("/webhook")) {
// 				req.rawBody = buf.toString();
// 			}
// 		}
// 	})
// );

// --------------------------STRIPE ends here-------------------------------

module.exports = app;