require('../models/product');


const base64_encode = require('../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
const Product = mongoose.model('Product');

// create a new product with children

router.post('/create-product-with-children', function(req, res, next){
	const newProduct = new Product({

		_id: new mongoose.Types.ObjectId(),
		serial_number: req.body.parent.serial_number,
		image_thumbnail: req.body.parent.image_thumbnail,
		title: req.body.parent.title,
		price: req.body.parent.price,
		initial_quantity: req.body.parent.initial_quantity,
		product_size: req.body.parent.product_size,
		product_color: req.body.parent.product_color,

	});

	newProduct.save(function (err, newProduct) {
		if (err) return console.log(err);




	newProduct.save();

	});

});

// find product
	
router.get('/find-product', function(req, res, next){

	Product.findOne({ serial_number: req.body.serial_number })
		.then((product) => {

			product[ image_thumbnail ] = base64_encode( product[ 'image_thumbnail' ] )

			if (!product) {

				res.status(401).json({ success: false, msg: "could not find product" });

			} else {

				res.status(200).json(product);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// get products_list

router.get('/products-list', function(req, res, next){

Product.
	find().
	limit(10).
	then((products)=>{
		var newProducts_list = []
		products.map((product, index)=>{
			var newProduct = {}

			newProduct.serial_number = product[ 'serial_number' ]
			newProduct.image_thumbnail = base64_encode( product[ 'image_thumbnail' ] )
			newProduct.title = product[ 'title' ]

			newProducts_list.push({...newProduct})
			newProduct = {}
		});

		return newProducts_list
	})

	.then((newProducts_list) => {

		if (!newProducts_list) {

			res.status(401).json({ success: false, msg: "could not find Products_list" });

		} else {

			res.status(200).json(newProducts_list);

		}

	})
	.catch((err) => {

		next(err);

	});
});

// get products_list_with_children

router.get('/products-list-with-children', function(req, res, next){

	Product.
		find().
		limit(10).
		populate('user').
		then((products)=>{
			var newProducts_list = []
			products.map((product, index)=>{
				var newProduct = {}

				newProduct.serial_number = product[ 'serial_number' ]
				newProduct.image_thumbnail = base64_encode( product[ 'image_thumbnail' ] )
				newProduct.title = product[ 'title' ]

				newProducts_list.push({...newProduct})
				newProduct = {}
			});

			return newProducts_list
		})

		.then((newProducts_list) => {

			if (!newProducts_list) {

				res.status(401).json({ success: false, msg: "could not find Products_list" });

			} else {

				res.status(200).json(newProducts_list);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// get products_list_next_10_with_children

router.get('/products-list-next-10-with-children', function(req, res, next){

	Product.
		find().
		skip(10).
		limit(10).
		populate('user').
		then((products)=>{
			var newProducts_list = []
			products.map((product, index)=>{
				var newProduct = {}

				newProduct.serial_number = product[ 'serial_number' ]
				newProduct.image_thumbnail = base64_encode( product[ 'image_thumbnail' ] )
				newProduct.title = product[ 'title' ]

				newProducts_list.push({...newProduct})
				newProduct = {}
			});

			return newProducts_list
		})

		.then((newProducts_list) => {

			if (!newProducts_list) {

				res.status(401).json({ success: false, msg: "could not find Products_list" });

			} else {

				res.status(200).json(newProducts_list);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// get product with children

router.get('/product-with-children', function(req, res, next){
	Product.
		findOne({serial_number:req.body.serial_number}).


		exec(function (err, product_with_children) {
			if (err) return console.log(err);

			res.status(200).json(product_with_children);
		});
})


// get product with summarized children

router.get('/product-with-summarized-children', function(req, res, next){
	Product.
		findOne({serial_number:req.body.serial_number}).


		exec(function (err, blogpost_with_children) {

			if (err) return console.log(err);


		res.status(200).json(product_with_children);

	});
})

// get next 10 products_list

router.get('/products-next-10-list', function(req, res, next){

	Product.
		find().
		limit(10).
		skip(10).
		then( 
			(products) => {
				var newProducts_list = []
				products.map((product, index) => {
					var newProduct = {}
	
					newProduct.serial_number = product[ 'serial_number' ]
					newProduct.image_thumbnail = base64_encode( product[ 'image_thumbnail' ] )
					newProduct.title = product[ 'title' ]

					newProducts_list.push({...newProduct})
					newProduct = {}
					})
			})

			return newProducts_list

		.then((newProducts_list) => {

			if (!newProducts_list) {

				res.status(401).json({ success: false, msg: "could not find Products_list" });

			} else {

				res.status(200).json(newProducts_list);

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