
const mongoose = require('mongoose');
require('dotenv').config();

require('../models/carousel');
require('../models/productcollection');
require('../models/product');
require('../models/order');
require('../models/user');
require('../models/blogpost');
const Carousel = mongoose.model('Carousel');
const ProductCollection = mongoose.model('ProductCollection');
const Product = mongoose.model('Product');
const Order = mongoose.model('Order');
const User = mongoose.model('User');
const Blogpost = mongoose.model('Blogpost');

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


Carousel.
	find()
	.then((carousels) => {

		if (!carousels) {

		    console.log('no carousels exist')

		} else {

		    console.log('Number of carousels are', carousels.length)
		    console.log('carousels are', carousels)

		}
	})
	.catch((err) => {
		console.log(err)
});




ProductCollection.
	find()
	.then((productcollections) => {

		if (!productcollections) {

		    console.log('no productcollections exist')

		} else {

		    console.log('Number of productcollections are', productcollections.length)
		    console.log('productcollections are', productcollections)

		}
	})
	.catch((err) => {
		console.log(err)
});




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




Order.
	find()
	.then((orders) => {

		if (!orders) {

		    console.log('no orders exist')

		} else {

		    console.log('Number of orders are', orders.length)
		    console.log('orders are', orders)

		}
	})
	.catch((err) => {
		console.log(err)
});




User.
	find()
	.then((users) => {

		if (!users) {

		    console.log('no users exist')

		} else {

		    console.log('Number of users are', users.length)
		    console.log('users are', users)

		}
	})
	.catch((err) => {
		console.log(err)
});




Blogpost.
	find()
	.then((blogposts) => {

		if (!blogposts) {

		    console.log('no blogposts exist')

		} else {

		    console.log('Number of blogposts are', blogposts.length)
		    console.log('blogposts are', blogposts)

		}
	})
	.catch((err) => {
		console.log(err)
});



// showing carousel and populating children

Carousel.
	find(). 


	exec(function (err, carousels) {

	    if (err){
	      console.log('ERROR', err);
	    } 

	    console.log('carousel is %s', carousels)});// showing productcollection and populating children

ProductCollection.
	find(). 


	exec(function (err, productcollections) {

	    if (err){
	      console.log('ERROR', err);
	    } 

	    console.log('productcollection is %s', productcollections)});