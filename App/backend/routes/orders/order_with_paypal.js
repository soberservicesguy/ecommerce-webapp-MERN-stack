require('../../models/order');
require('../../models/user');
require('../../models/product');

require('dotenv').config({ path: "../../.env" })

const axios = require('axios');

const paypal = require('paypal-rest-sdk');
paypal.configure({
	'mode': 'sandbox', //sandbox or live
	'client_id': process.env.paypal_client_id,
	'client_secret': process.env.paypal_client_secret
});

console.log(`id is ${process.env.paypal_client_id}`)
console.log(`secret is ${process.env.paypal_client_secret}`)

// const braintree = require("braintree");
// const gateway = new braintree.BraintreeGateway({
// 	environment: braintree.Environment.Sandbox,
// 	merchantId: process.env.braintree_merchantId,
// 	publicKey: process.env.braintree_publicKey,
// 	privateKey: process.env.braintree_privateKey
// });


const base64_encode = require('../../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
const Order = mongoose.model('Order');
const Product = mongoose.model('Product');
const User = mongoose.model('User');
const passport = require('passport');

const { get_all_product_objects_and_order_amount_for_paypal } = require('../handy_functions/get_all_product_objects_and_order_amount_for_paypal')

const currency = "USD"

var paypal_access_token = null
async function get_paypal_access_token(){

	try{

		let response = await axios(
		    {
		        method: 'post',
		        url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
		        data: 'grant_type=client_credentials', // => this is mandatory x-www-form-urlencoded. DO NOT USE json format for this
		        headers: {
		            'Accept': 'application/json',
		            'Content-Type': 'application/x-www-form-urlencoded',// => needed to handle data parameter
		            'Accept-Language': 'en_US',
		        },
		        auth: {
		            username: process.env.paypal_client_id,
		            password: process.env.paypal_client_secret
		        },

		    });


		console.log(response.data)
		paypal_access_token = response.data.access_token

	} catch (error){
		console.log('Error while getting paypal access token')
		console.log(error)		
	}
					
}

// get_paypal_access_token() // getting and storing paypal's access token when app is loaded


async function get_client_token_from_paypal_for_transaction(){

	try{

		const header_config = {
		    headers: { Authorization: `Bearer ${paypal_access_token}` }
		};

		const bodyParameters = {
		   key: "value" // dummy
		};

		let response = await axios.post( 
			'https://api-m.sandbox.paypal.com/v1/identity/generate-token',
			bodyParameters,
			header_config
		)

		console.log(response.data)
		let clientToken = response.data.client_token
		return clientToken

	} catch (error){
		console.log('Error while getting paypal access token')
		console.log(error)		
	}

}

	// axios.get(utils.baseUrl + '/products/find-product',
	// 	{params: {endpoint: endpoint } }
	// )
	// .then((response) => {
	// 	this.props.set_current_item_in_cart( response.data )

	// 	this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))
	// 	this.props.navigation.navigate('Individual-Cart-Item', {
	// 		itemId: 86,
	// 		otherParam: 'anything you want here',
	// 	})

	// })
	// .catch((error) => {
	// 	console.log(error);
	// })	

router.post('/create-order-with-paypal', passport.authenticate('jwt', { session: false }), async function(req, res, next){

	let products_in_order = req.body.products
	let {order_amount, product_objects, final_order_content} = await get_all_product_objects_and_order_amount_for_paypal(req.body.products)

	const newOrder = new Order({

		_id: new mongoose.Types.ObjectId(),
		// user: ,
		products: product_objects,
		order_amount: order_amount,

		order_phone_number_field: req.body.phone_number,
		order_delivery_address_field: req.body.delivery_address,
	});

	newOrder.save(async function (err, newOrder) {

		if (err){
			res.status(404).json({ success: false, msg: 'couldnt create blogpost database entry'})
			return console.log(err)
		}
		// assign user object then save
		await User.findOne({ phone_number: req.user.user_object.phone_number }) // using req.user from passport js middleware
		.then((user) => {
			if (user){

				newOrder.user = user
				newOrder.save()

			// now working on paypal
				const create_payment_json = {
					"intent": "sale",
					"payer": {
						"payment_method": "paypal"
					},
					"redirect_urls": {
						"return_url": "http://localhost:3000/orders",
						"cancel_url": "http://localhost:3000/products",
						// "return_url": "http://localhost:3001/success",
						// "cancel_url": "http://localhost:3001/cancel",
					},
					"transactions": [
						{
							"item_list": {
								"items": final_order_content
							},
							"amount": {
								"currency": currency,
								"total": String(order_amount),
							},
							"description": "simple ecommerce order at our website"
						}
					]
				};

				// getting approval url from payment.links and redirecting to approval url
				// approval url is paypals external url which lets you pay from users own paypal account
				// this does not create the payment but it opens paypal approval url for user to authorize the payment 	
			// COMMENTED OUT
				console.log('CONTACTING PAYPAL')
				paypal.payment.create(create_payment_json, function (error, payment) {
					if (error) {
						console.log(error);
					} else {
						// console.log(payment) // this can be done to see payment
						for(let i = 0;i < payment.links.length;i++){
							if(payment.links[i].rel === 'approval_url'){
								// res.redirect(payment.links[i].href); // DOESNT WORK DUE TO CORS IN FRONTEND
								res.json({forwardLink: payment.links[i].href});

							}
						}
					}
				});


			} else {

				res.status(200).json({ success: false, msg: "user doesnt exists, try logging in again" });

			}
		})
		.catch((err) => {

			next(err);

		});

	})

})


router.post('/create-order-with-paypal-native', passport.authenticate('jwt', { session: false }), async function(req, res, next){

	let products_in_order = req.body.products

	console.log('products_in_order')
	console.log(products_in_order)

	let {order_amount, product_objects, final_order_content} = await get_all_product_objects_and_order_amount_for_paypal(req.body.products)

	const newOrder = new Order({

		_id: new mongoose.Types.ObjectId(),
		// user: ,
		products: product_objects,
		order_amount: order_amount,

		order_phone_number_field: req.body.phone_number,
		order_delivery_address_field: req.body.delivery_address,
	});

	newOrder.save(async function (err, newOrder) {

		if (err){
			res.status(404).json({ success: false, msg: 'couldnt create blogpost database entry'})
			return console.log(err)
		}
		// assign user object then save
		await User.findOne({ phone_number: req.user.user_object.phone_number }) // using req.user from passport js middleware
		.then(async (user) => {
			if (user){

				newOrder.user = user
				newOrder.save()



			// now working on paypal
				const create_payment_json = {
					"intent": "sale",
					"payer": {
						"payment_method": "paypal"
					},
					"redirect_urls": {
						// "return_url": "http://localhost:3000/orders",
						// "cancel_url": "http://localhost:3000/products",
						"return_url": "http://localhost:3001/success",
						"cancel_url": "http://localhost:3001/cancel-native",
					},
					"transactions": [
						{
							"item_list": {
								"items": final_order_content
							},
							"amount": {
								"currency": currency,
								"total": String(order_amount),
							},
							"description": "simple ecommerce order at our website"
						}
					]
				};

				// getting approval url from payment.links and redirecting to approval url
				// approval url is paypals external url which lets you pay from users own paypal account
				// this does not create the payment but it opens paypal approval url for user to authorize the payment 	
			// COMMENTED OUT
				console.log('CONTACTING PAYPAL')
				paypal.payment.create(create_payment_json, function (error, payment) {
					if (error) {
						console.log(error);
					} else {
						// console.log(payment) // this can be done to see payment
						for(let i = 0;i < payment.links.length;i++){
							if(payment.links[i].rel === 'approval_url'){
								// res.redirect(payment.links[i].href); // DOESNT WORK DUE TO CORS IN FRONTEND
								res.json({forwardLink: payment.links[i].href});

							}
						}
					}
				});


				// console.log('CONTACTING PAYPAL')
				// await get_paypal_access_token()

				// let client_token = await get_client_token_from_paypal_for_transaction()

				// res.status(200).json({ success: true, client_token: client_token, currency:currency, total_amount:String(order_amount) })


			} else {

				res.status(200).json({ success: false, msg: "user doesnt exists, try logging in again" });

			}
		})
		.catch((err) => {

			next(err);

		});

	})

})


// USED FOR SUCCESSIVE PAYMENT
router.get('/success', (req, res) => {

	const payerId = req.query.PayerID; // is supplied by paypals approval url if payment successfull
	const paymentId = req.query.paymentId; // is supplied by paypals approval url if payment successfull
	const execute_payment_json = {"payer_id": payerId};

	// this executes the payment finally
	paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
		if (error) {
			console.log(error.response);
			throw error;
		} else {

			console.log(JSON.stringify(payment));
			// res.send('Success');


			res.set('Content-Type', 'text/html');
			// res.send(Buffer.from('<h2>Test String</h2>'));
			res.send(Buffer.from(`
				<!DOCTYPE html>
				<html lang="en">
				    <head>
				        <meta charset="UTF-8" />
				        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
				        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
				        <title>success</title>
				    </head>
				    <body>
				        <h1>Transaction successfull!</h1>
				    </body>
				</html>
			`));
		}
	});

});



// USED FOR CANCELLED PAYMENT
router.get('/cancel', (req, res) => {

	res.json({forwardLink:'http://localhost:3000/orders'});
	// res.send('Cancelled')

});

router.get('/cancel-native', (req, res) => {

	res.set('Content-Type', 'text/html');
	// res.send(Buffer.from('<h2>Test String</h2>'));
	res.send(Buffer.from(`
		<!DOCTYPE html>
		<html lang="en">
		    <head>
		        <meta charset="UTF-8" />
		        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
		        <title>cancelled</title>
		    </head>
		    <body>
		        <h1>Transaction un-successfull!</h1>
		    </body>
		</html>
	`));

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