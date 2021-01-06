require('../models/carousel');


const base64_encode = require('../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
const Carousel = mongoose.model('Carousel');

// create a new carousel with children

router.post('/create-carousel-with-children', function(req, res, next){
	const newCarousel = new Carousel({

		_id: new mongoose.Types.ObjectId(),
		serial_number: req.body.parent.serial_number,
		image_thumbnail: req.body.parent.image_thumbnail,
		title: req.body.parent.title,

	});

	newCarousel.save(function (err, newCarousel) {
		if (err) return console.log(err);




	newCarousel.save();

	});

});

// find carousel
	
router.get('/find-carousel', function(req, res, next){

	Carousel.findOne({ serial_number: req.body.serial_number })
		.then((carousel) => {

			carousel[ image_thumbnail ] = base64_encode( carousel[ 'image_thumbnail' ] )

			if (!carousel) {

				res.status(401).json({ success: false, msg: "could not find carousel" });

			} else {

				res.status(200).json(carousel);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// get carousels_list

router.get('/carousels-list', function(req, res, next){

Carousel.
	find().
	limit(10).
	then((carousels)=>{
		var newCarousels_list = []
		carousels.map((carousel, index)=>{
			var newCarousel = {}

			newCarousel.serial_number = carousel[ 'serial_number' ]
			newCarousel.image_thumbnail = base64_encode( carousel[ 'image_thumbnail' ] )
			newCarousel.title = carousel[ 'title' ]

			newCarousels_list.push({...newCarousel})
			newCarousel = {}
		});

		return newCarousels_list
	})

	.then((newCarousels_list) => {

		if (!newCarousels_list) {

			res.status(401).json({ success: false, msg: "could not find Carousels_list" });

		} else {

			res.status(200).json(newCarousels_list);

		}

	})
	.catch((err) => {

		next(err);

	});
});

// get carousels_list_with_children

router.get('/carousels-list-with-children', function(req, res, next){

	Carousel.
		find().
		limit(10).
		populate('user').
		then((carousels)=>{
			var newCarousels_list = []
			carousels.map((carousel, index)=>{
				var newCarousel = {}

				newCarousel.serial_number = carousel[ 'serial_number' ]
				newCarousel.image_thumbnail = base64_encode( carousel[ 'image_thumbnail' ] )
				newCarousel.title = carousel[ 'title' ]

				newCarousels_list.push({...newCarousel})
				newCarousel = {}
			});

			return newCarousels_list
		})

		.then((newCarousels_list) => {

			if (!newCarousels_list) {

				res.status(401).json({ success: false, msg: "could not find Carousels_list" });

			} else {

				res.status(200).json(newCarousels_list);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// get carousels_list_next_10_with_children

router.get('/carousels-list-next-10-with-children', function(req, res, next){

	Carousel.
		find().
		skip(10).
		limit(10).
		populate('user').
		then((carousels)=>{
			var newCarousels_list = []
			carousels.map((carousel, index)=>{
				var newCarousel = {}

				newCarousel.serial_number = carousel[ 'serial_number' ]
				newCarousel.image_thumbnail = base64_encode( carousel[ 'image_thumbnail' ] )
				newCarousel.title = carousel[ 'title' ]

				newCarousels_list.push({...newCarousel})
				newCarousel = {}
			});

			return newCarousels_list
		})

		.then((newCarousels_list) => {

			if (!newCarousels_list) {

				res.status(401).json({ success: false, msg: "could not find Carousels_list" });

			} else {

				res.status(200).json(newCarousels_list);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// get carousel with children

router.get('/carousel-with-children', function(req, res, next){
	Carousel.
		findOne({serial_number:req.body.serial_number}).


		exec(function (err, carousel_with_children) {
			if (err) return console.log(err);

			res.status(200).json(carousel_with_children);
		});
})


// get carousel with summarized children

router.get('/carousel-with-summarized-children', function(req, res, next){
	Carousel.
		findOne({serial_number:req.body.serial_number}).


		exec(function (err, blogpost_with_children) {

			if (err) return console.log(err);


		res.status(200).json(carousel_with_children);

	});
})

// get next 10 carousels_list

router.get('/carousels-next-10-list', function(req, res, next){

	Carousel.
		find().
		limit(10).
		skip(10).
		then( 
			(carousels) => {
				var newCarousels_list = []
				carousels.map((carousel, index) => {
					var newCarousel = {}
	
					newCarousel.serial_number = carousel[ 'serial_number' ]
					newCarousel.image_thumbnail = base64_encode( carousel[ 'image_thumbnail' ] )
					newCarousel.title = carousel[ 'title' ]

					newCarousels_list.push({...newCarousel})
					newCarousel = {}
					})
			})

			return newCarousels_list

		.then((newCarousels_list) => {

			if (!newCarousels_list) {

				res.status(401).json({ success: false, msg: "could not find Carousels_list" });

			} else {

				res.status(200).json(newCarousels_list);

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