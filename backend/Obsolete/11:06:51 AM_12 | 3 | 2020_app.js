const express = require('express');
const path = require('path');
const passport = require('passport');
const cors = require("cors");

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
		
// Pass the global passport object into the configuration function
require('./config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// setting up cors
app.use(
  cors({
    origin: "http://localhost:3001", // restrict calls to those this address
    methods: ['GET', 'POST'] // only allow GET, POST requests
  })
);


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


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
// COMMENTED OUT SINCE IT WILL BE IMPORTED BY SERVER AND http SERVER WILL LISTEN INSTEAD
// app.listen(3000);




// --------------------------PUSH NOTIFICATIONS start here-------------------------------

const webpush = require("web-push");
app.use(express.static(path.join(__dirname, "push_notifications")));

// app.use(bodyParser.json()); // commented out since we using express own alternative for it

// public and private keys are generated using some command on terminal
const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

// SEARCH ABOUT BOTTOM ???
webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// --------------------------PUSH NOTIFICATIONS ends here-------------------------------





// --------------------------PAYPAL starts here-------------------------------

const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AaU8tQfmz1_MFDTKuf84yYERXvdDt2ZFJVrxhNW_49DazF4A_F0VBuKyV5_nntyEdZqUa5Oq9ZBj65GV',
  'client_secret': 'EAZ8aFDU4lHHLy1bQqULYWqznf3dBknXZW3AH__zFC0bUs8AGUyR6RNbm-jHvqtikX7PsSqMO5vxuvKm'
});

// --------------------------PAYPAL ends here-------------------------------





// --------------------------STRIPE starts here-------------------------------

const env = require("dotenv").config({ path: "./.env" });

// GIVING SRIPE SECRET KEY
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { resolve } = require("path");

app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function(req, res, buf) {
      if (req.originalUrl.startsWith("/webhook")) {
        req.rawBody = buf.toString();
      }
    }
  })
);

// --------------------------STRIPE ends here-------------------------------

module.exports = app;