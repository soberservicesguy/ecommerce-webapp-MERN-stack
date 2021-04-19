
const mongoose = require('mongoose');
require('dotenv').config();

require('../models/product');
const Product = mongoose.model('Product');

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the '.env' file.  To implement this, place the following
 * string into the '.env' file
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


Product.
	find()
	.then((products) => {

		if (!products) {

		    console.log('no products exist')

		} else {

		    console.log('Number of products are', products.length)
		    console.log('products are', products)

		}
	})
	.catch((err) => {
		console.log(err)
});
