// below is recieved from
const push = require("web-push"); 
const axios = require('axios');

var fs = require('fs');

const mongoose = require('mongoose');
require('../models/push_user');
const PushUser = mongoose.model('PushUser');


const {resolve} = require('path')
require('dotenv').config({path: resolve(__dirname,"../.env")})

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://localhost:27017/database_name
 * DB_STRING_PROD=<your production database string>
 */ 

const devConnection = process.env.DB_STRING;
const prodConnection = process.env.DB_STRING_PROD;

// Connect to thae correct environment database
if (process.env.NODE_ENV === 'production') {
    mongoose.connect(prodConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });

} else {

    mongoose.connect(devConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });
}


PushUser.
  find(
  // { Product:  }
  ).
  // where('name.last').equals('Ghost').
  // where('age').gt(17).lt(66).
  // where('likes').in(['vaporizing', 'talking']).
  // limit(10)
  // sort('-occupation').
  // select('name occupation').
  // exec(callback)
  

  .then((push_users) => {

    console.log(push_users)

    push_users.map(
      (user_credentials, index) => {
        push.sendNotification(user_credentials, 'text message')
        .catch(err => console.error(err));
      }
    )
  }