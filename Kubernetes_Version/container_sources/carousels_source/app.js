const express = require('express');
const path = require('path');
const passport = require('passport');
// const cors = require("cors");

// const bodyParser = require("body-parser"); // commented out since we using app.use(express.json()); // app.use(express.urlencoded({extended: true}));

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require('./config/database');
		
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


app.use(require('./routes'));

// app.use(require('./routes/carousels/carousel'));

const env = require("dotenv").config({ path: "./.env" });


module.exports = app;