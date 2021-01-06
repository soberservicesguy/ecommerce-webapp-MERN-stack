require('../models/order');
require('../models/user');


const base64_encode = require('../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
const Order = mongoose.model('Order');
const User = mongoose.model('User');

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