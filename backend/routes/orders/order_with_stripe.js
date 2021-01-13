require('../../models/order');
require('../../models/user');
require('../../models/product');

const base64_encode = require('../../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
const Order = mongoose.model('Order');
const Product = mongoose.model('Product');
const User = mongoose.model('User');
const passport = require('passport');

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

let getProductDetails = () => {
	return { currency: "EUR", amount: 9900 };
};

// SENDING PUBLISHABLE KEY
router.get("/public-key", (req, res) => {
	res.send({ publicKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

router.get("/product-details", (req, res) => {
	let data = getProductDetails();
	res.send(data);
});


router.post("/create-payment-intent", async (req, res) => {
	
	// BODY IS ASSIGNED OPTIONS OBJECT IE options = {payment_method_types: ["card"]} 
	const body = req.body; // req.body = { stripeToken, stripeTokenType, stripeEmail, payment_method_types  or amything additional}
	// GETTING PRODUCT DETAILS FROM OWN SERVER
	const productDetails = getProductDetails();

    // const {email} = req.body;

	// CREATING DICT WITH PAYLOAD FROM POST REQUEST AND PRODUCT DETAILS
	const options = {
		// stripe fields
		...body,
		amount: productDetails.amount,
		currency: productDetails.currency,
		metadata: {integration_check: 'accept_a_payment'},
		receipt_email: email,
		// additional fields
	};

	// CREATE PAYMENT INTENT BY RUNNING SINGLE FUNCTION BY PASSING ABOVE DICT
	try {

		const paymentIntent = await stripe.paymentIntents.create(options);
		res.json(paymentIntent); // this sends payment intent IN THE FORM OF SECRET

	} catch (err) {

		res.json(err);

	}

});



// WEBHOOKS IS AN HTTP ENDPOINT THAT RECIEVES EVENTS FROM STRIPE ABOUT SUCCESSFUL TRANSACTION OR DISPUTE OR FAILURE
// Webhook handler for asynchronous events.
router.post("/webhook", async (req, res) => {

	let data;
	let eventType;

	// Check if webhook signing is configured.
	if (process.env.STRIPE_WEBHOOK_SECRET) {

		// Retrieve the event by verifying the signature using the raw body and secret.
		let event;
		// GET STRIPE SINGATURE FROM HEADERS OF REQUEST
		let signature = req.headers["stripe-signature"];

		try {

			// CREATE AN EVENT FROM REQUEST PAYLOAD AND ABOVE SIGNATURE
			event = stripe.webhooks.constructEvent(
				// ???
				req.rawBody,
				signature,
				process.env.STRIPE_WEBHOOK_SECRET
			);

		} catch (err) {

			console.log(`⚠️ Webhook signature verification failed.`);
			return res.sendStatus(400);

		}
		// // IF ABOVE TRY BLOCK SUCCEEDED , THEN EXTRACT DATA FROM EVENT, AND EVENT TYPE
		// // Extract the object from the event.
		data = event.data;
		eventType = event.type;

	} else {

		// Webhook signing is recommended, but if the secret is not configured in `config.js`,
		// retrieve the event data directly from the request body.
		// STRIPE WEBHOOK SECRET IS NOT SET, THEN BOTTOM CODE WILL RUN
		data = req.body.data;
		eventType = req.body.type;

	}

	// IF PAYMENT SUCCEEDED THEN IT WILL CONSOLE LOG
	if (eventType === "payment_intent.succeeded") {
		// Fulfill any orders, e-mail receipts, etc
		console.log("💰 Payment received!");
	}

	// IF PAYMENT FAILED THEN IT WILL CONSOLE LOG
	if (eventType === "payment_intent.payment_failed") {
		// Notify the customer that their order was not fulfilled
		console.log("❌ Payment failed.");
	}

	res.sendStatus(200);

});


const currency = "USD"

router.post('/create-order-with-stripe', passport.authenticate('jwt', { session: false }), async function(req, res, next){
	
	let products_in_order = req.body.products // carries only product endpoints and variations including quantity
	let final_order_content = []
	let order_amount = 0
	let product_objects = []

	products_in_order.map((ordered_product) => {
		
		delete ordered_product.price
		delete ordered_product.initial_quantity

		Product.findOne(ordered_product)
		.then((product_found) => {

			product_objects.push(product_found)

			final_order_content.push({
				// paypal fields
				name: product_found.title,
				sku: product_found.endpoint,
				price: product_found.price,
				quantity: ordered_product.initial_quantity,
				currency: currency,
				// additional fields
				product_size: ordered_product.product_size,
				product_color: ordered_product.product_color,
			})

			order_amount += product_found.price * ordered_product.initial_quantity

		})

	})

	const newOrder = new Order({

		_id: new mongoose.Types.ObjectId(),
		// user: ,
		products: product_objects,
		order_amount: order_amount,

	});

	newOrder.save(async function (err, newOrder) {

		if (err){
			res.status(404).json({ success: false, msg: 'couldnt create blogpost database entry'})
			return console.log(err)
		}
		// assign user object then save
		User.findOne({ phone_number: req.user.user_object.phone_number }) // using req.user from passport js middleware
		.then(async (user) => {
			if (user){

				newOrder.user = user
				newOrder.save()

			// now working on stripe

				// BODY IS ASSIGNED OPTIONS OBJECT IE options = {payment_method_types: ["card"]} 
				const body = req.body; // req.body = { stripeToken, stripeTokenType, stripeEmail, payment_method_types  or amything additional}

			    // const {email} = req.body;

				// CREATING DICT WITH PAYLOAD FROM POST REQUEST AND PRODUCT DETAILS
				const options = {
					// stripe fields
					...body,
					amount: order_amount,
					currency: currency,
					metadata: {integration_check: 'accept_a_payment'},
					receipt_email: email,
					// additional fields
				};

				// CREATE PAYMENT INTENT BY RUNNING SINGLE FUNCTION BY PASSING ABOVE DICT
				try {

					const paymentIntent = await stripe.paymentIntents.create(options);
					res.json(paymentIntent); // this sends payment intent IN THE FORM OF SECRET

				} catch (err) {

					res.json(err);

				}

			} else {

				res.status(200).json({ success: false, msg: "user doesnt exists, try logging in again" });

			}
		})
		.catch((err) => {

			next(err);

		});

	})

})





// USED FOR CANCELLED PAYMENT
router.get('/cancel', (req, res) => {
	res.send('Cancelled')
});



// get blogposts_list_with_children
// USED
router.get('/carousels-list-with-children', function(req, res, next){
	console.log('called')

	Carousel.
	find().
	limit(10).
	then((carousels)=>{
		var newOrders_list = []
		carousels.map((carousel, index)=>{
			var newOrder = {}

			newOrder.image_filepath = base64_encode( carousel[ 'image_filepath' ] )
			newOrder.title = carousel[ 'title' ]

			newOrder.push({...newOrder})
			newOrder = {}
		});

		return newOrders_list
	})
	.then((newOrders_list) => {

		if (!newOrders_list) {

			res.status(401).json({ success: false, msg: "could not find Carousels_list" });

		} else {

			res.status(200).json(newOrders_list);

		}

	})
	.catch((err) => {

		console.log(err)
		next(err);

	});
});































// create a new order with children

router.post('/create-order-with-children', function(req, res, next){
	const newOrder = new Order({

		_id: new mongoose.Types.ObjectId(),
		serial_number: req.body.parent.serial_number,

	});

	newOrder.save(function (err, newOrder) {
		if (err) return console.log(err);



		const newUser = new User({

			_id: new mongoose.Types.ObjectId(),
			user_name: req.body.children.user_name,
			password: req.body.children.password,
			phone_number: req.body.children.phone_number,

		//assigning parent
			orders:newOrder._id,

		});

		newOrder.users.push(newUser._id)

	newOrder.save();

	});

});

// find order
	
router.get('/find-order', function(req, res, next){

	Order.findOne({ serial_number: req.body.serial_number })
		.then((order) => {
			if (!order) {

				res.status(401).json({ success: false, msg: "could not find order" });

			} else {

				res.status(200).json(order);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// find user
	
router.get('/find-user', function(req, res, next){

	User.findOne({ phone_number: req.body.phone_number })
		.then((user) => {
			if (!user) {

				res.status(401).json({ success: false, msg: "could not find user" });

			} else {

				res.status(200).json(user);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// create order with undefined

router.post('/create-order-with-user', function(req, res, next){
	
	var order_object = req.body.order_object
	var user_object = req.body.user_object

	var newOrder = new Order({
		_id: new mongoose.Types.ObjectId(),
		...order_object
	})

	newOrder.save(function (err, newOrder) {
		if (err) return console.log(err);

			User.
			findOne({...user_object})
		.then((user) => {
			
			if( !user ){
			
				console.log('no User found')
			
			} else {
			
				newOrder.user = user
				res.status(200).json( newOrder )
			
			}
		})
		.catch((err) => {
			console.log(err)
		})
	})
})



// get orders_list

router.get('/orders-list', function(req, res, next){

Order.
	find().
	limit(10).
	then((orders)=>{
		var newOrders_list = []
		orders.map((order, index)=>{
			var newOrder = {}

			newOrder.serial_number = order[ 'serial_number' ]

			newOrders_list.push({...newOrder})
			newOrder = {}
		});

		return newOrders_list
	})

	.then((newOrders_list) => {

		if (!newOrders_list) {

			res.status(401).json({ success: false, msg: "could not find Orders_list" });

		} else {

			res.status(200).json(newOrders_list);

		}

	})
	.catch((err) => {

		next(err);

	});
});

// get orders_list_with_children

router.get('/orders-list-with-children', function(req, res, next){

	Order.
		find().
		limit(10).
		populate('user').
		then((orders)=>{
			var newOrders_list = []
			orders.map((order, index)=>{
				var newOrder = {}

				newOrder.serial_number = order[ 'serial_number' ]

				newOrders_list.push({...newOrder})
				newOrder = {}
			});

			return newOrders_list
		})

		.then((newOrders_list) => {

			if (!newOrders_list) {

				res.status(401).json({ success: false, msg: "could not find Orders_list" });

			} else {

				res.status(200).json(newOrders_list);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// get orders_list_next_10_with_children

router.get('/orders-list-next-10-with-children', function(req, res, next){

	Order.
		find().
		skip(10).
		limit(10).
		populate('user').
		then((orders)=>{
			var newOrders_list = []
			orders.map((order, index)=>{
				var newOrder = {}

				newOrder.serial_number = order[ 'serial_number' ]

				newOrders_list.push({...newOrder})
				newOrder = {}
			});

			return newOrders_list
		})

		.then((newOrders_list) => {

			if (!newOrders_list) {

				res.status(401).json({ success: false, msg: "could not find Orders_list" });

			} else {

				res.status(200).json(newOrders_list);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// get order with children

router.get('/order-with-children', function(req, res, next){
	Order.
		findOne({serial_number:req.body.serial_number}).

		populate('user').

		exec(function (err, order_with_children) {
			if (err) return console.log(err);

			res.status(200).json(order_with_children);
		});
})


// get order with summarized children

router.get('/order-with-summarized-children', function(req, res, next){
	Order.
		findOne({serial_number:req.body.serial_number}).

		populate('user').

		exec(function (err, blogpost_with_children) {

			if (err) return console.log(err);


			var current_user = order_with_children.user
			new_user = []

			current_users.map((user, index)=>{
				var newUser = {}

	
				newUser.user_name = user[ 'user_name' ]
				newUser.password = user[ 'password' ]
				newUser.phone_number = user[ 'phone_number' ]

				new_users.push({...newUser})
				newUser = {}
			});

			order_with_children.users = new_users

		res.status(200).json(order_with_children);

	});
})

// get next 10 orders_list

router.get('/orders-next-10-list', function(req, res, next){

	Order.
		find().
		limit(10).
		skip(10).
		then( 
			(orders) => {
				var newOrders_list = []
				orders.map((order, index) => {
					var newOrder = {}
	
					newOrder.serial_number = order[ 'serial_number' ]

					newOrders_list.push({...newOrder})
					newOrder = {}
					})
			})

			return newOrders_list

		.then((newOrders_list) => {

			if (!newOrders_list) {

				res.status(401).json({ success: false, msg: "could not find Orders_list" });

			} else {

				res.status(200).json(newOrders_list);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// create User

router.post('/create-user', function(req, res, next){

	User.findOne({
		user_name: req.body.user_name,
		password: req.body.password,
		phone_number: req.body.phone_number,
	})
	.then((user) => {

		if (!user) {


			const newUser = new User({
				_id: new mongoose.Types.ObjectId(),
				user_name: req.body.user_name,
				password: req.body.password,
				phone_number: req.body.phone_number,
			});

			newUser.save(function (err, newUser) {

				if (err) return console.log(err);

				res.status(200).json({success: true})
				
			})

		} else {

			res.status(401).json({ success: false, msg: "user already registered, try another or login" })

		}

	})
	.catch((err) => {

		console.log(err)
		// next(err)

	});
})


module.exports = router;