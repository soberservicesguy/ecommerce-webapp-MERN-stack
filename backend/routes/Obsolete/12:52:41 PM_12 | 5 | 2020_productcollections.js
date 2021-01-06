require('../models/productcollection');


const base64_encode = require('../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
const ProductCollection = mongoose.model('ProductCollection');

// create a new productcollection with children

router.post('/create-productcollection-with-children', function(req, res, next){
	const newProductCollection = new ProductCollection({

		_id: new mongoose.Types.ObjectId(),
		serial_number: req.body.parent.serial_number,
		image_thumbnail: req.body.parent.image_thumbnail,
		title: req.body.parent.title,

	});

	newProductCollection.save(function (err, newProductCollection) {
		if (err) return console.log(err);




	newProductCollection.save();

	});

});

// find productcollection
	
router.get('/find-productcollection', function(req, res, next){

	ProductCollection.findOne({ serial_number: req.body.serial_number })
		.then((productcollection) => {

			productcollection[ image_thumbnail ] = base64_encode( productcollection[ 'image_thumbnail' ] )

			if (!productcollection) {

				res.status(401).json({ success: false, msg: "could not find productcollection" });

			} else {

				res.status(200).json(productcollection);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// get productcollections_list

router.get('/productcollections-list', function(req, res, next){

ProductCollection.
	find().
	limit(10).
	then((productcollections)=>{
		var newProductCollections_list = []
		productcollections.map((productcollection, index)=>{
			var newProductCollection = {}

			newProductCollection.serial_number = productcollection[ 'serial_number' ]
			newProductCollection.image_thumbnail = base64_encode( productcollection[ 'image_thumbnail' ] )
			newProductCollection.title = productcollection[ 'title' ]

			newProductCollections_list.push({...newProductCollection})
			newProductCollection = {}
		});

		return newProductCollections_list
	})

	.then((newProductCollections_list) => {

		if (!newProductCollections_list) {

			res.status(401).json({ success: false, msg: "could not find ProductCollections_list" });

		} else {

			res.status(200).json(newProductCollections_list);

		}

	})
	.catch((err) => {

		next(err);

	});
});

// get productcollections_list_with_children

router.get('/productcollections-list-with-children', function(req, res, next){

	ProductCollection.
		find().
		limit(10).
		populate('user').
		then((productcollections)=>{
			var newProductCollections_list = []
			productcollections.map((productcollection, index)=>{
				var newProductCollection = {}

				newProductCollection.serial_number = productcollection[ 'serial_number' ]
				newProductCollection.image_thumbnail = base64_encode( productcollection[ 'image_thumbnail' ] )
				newProductCollection.title = productcollection[ 'title' ]

				newProductCollections_list.push({...newProductCollection})
				newProductCollection = {}
			});

			return newProductCollections_list
		})

		.then((newProductCollections_list) => {

			if (!newProductCollections_list) {

				res.status(401).json({ success: false, msg: "could not find ProductCollections_list" });

			} else {

				res.status(200).json(newProductCollections_list);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// get productcollections_list_next_10_with_children

router.get('/productcollections-list-next-10-with-children', function(req, res, next){

	ProductCollection.
		find().
		skip(10).
		limit(10).
		populate('user').
		then((productcollections)=>{
			var newProductCollections_list = []
			productcollections.map((productcollection, index)=>{
				var newProductCollection = {}

				newProductCollection.serial_number = productcollection[ 'serial_number' ]
				newProductCollection.image_thumbnail = base64_encode( productcollection[ 'image_thumbnail' ] )
				newProductCollection.title = productcollection[ 'title' ]

				newProductCollections_list.push({...newProductCollection})
				newProductCollection = {}
			});

			return newProductCollections_list
		})

		.then((newProductCollections_list) => {

			if (!newProductCollections_list) {

				res.status(401).json({ success: false, msg: "could not find ProductCollections_list" });

			} else {

				res.status(200).json(newProductCollections_list);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// get productcollection with children

router.get('/productcollection-with-children', function(req, res, next){
	ProductCollection.
		findOne({serial_number:req.body.serial_number}).


		exec(function (err, productcollection_with_children) {
			if (err) return console.log(err);

			res.status(200).json(productcollection_with_children);
		});
})


// get productcollection with summarized children

router.get('/productcollection-with-summarized-children', function(req, res, next){
	ProductCollection.
		findOne({serial_number:req.body.serial_number}).


		exec(function (err, blogpost_with_children) {

			if (err) return console.log(err);


		res.status(200).json(productcollection_with_children);

	});
})

// get next 10 productcollections_list

router.get('/productcollections-next-10-list', function(req, res, next){

	ProductCollection.
		find().
		limit(10).
		skip(10).
		then( 
			(productcollections) => {
				var newProductCollections_list = []
				productcollections.map((productcollection, index) => {
					var newProductCollection = {}
	
					newProductCollection.serial_number = productcollection[ 'serial_number' ]
					newProductCollection.image_thumbnail = base64_encode( productcollection[ 'image_thumbnail' ] )
					newProductCollection.title = productcollection[ 'title' ]

					newProductCollections_list.push({...newProductCollection})
					newProductCollection = {}
					})
			})

			return newProductCollections_list

		.then((newProductCollections_list) => {

			if (!newProductCollections_list) {

				res.status(401).json({ success: false, msg: "could not find ProductCollections_list" });

			} else {

				res.status(200).json(newProductCollections_list);

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