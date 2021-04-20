/**
 * This module will generate a public and private keypair and save to current directory
 * 
 * Make sure to save the private key elsewhere after generated!
 */

var push = require('web-push');
const fs = require('fs');

let vapidKeys = push.generateVAPIDKeys();

// console.log(vapidKeys);


// Create the public key file
fs.writeFileSync(__dirname + '/keys/push_pub.pem', vapidKeys['publicKey']); 

// Create the private key file
fs.writeFileSync(__dirname + '/keys/push_priv.pem', vapidKeys['privateKey']);
