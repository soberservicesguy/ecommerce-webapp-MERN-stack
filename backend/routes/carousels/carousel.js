require('../../models/carousel');
require('../../models/blogpost');
require('../../models/user');
require('../../models/image');

const passport = require('passport');
const { isAllowedSurfing } = require('../authMiddleware/isAllowedSurfing')
const { isAllowedCreatingCarousels } = require('../authMiddleware/isAllowedCreatingCarousels')

const base64_encode = require('../../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
const Carousel = mongoose.model('Carousel');
const User = mongoose.model('User');
const Image = mongoose.model('Image');

const multer = require('multer');
const path = require('path')

// Set The Storage Engine
const carousel_image_storage = multer.diskStorage({
	destination: path.join(__dirname , '../../assets/images/uploads/carousel_images'),
	filename: function(req, file, cb){
		// file name pattern fieldname-currentDate-fileformat
		// filename_used_to_store_image_in_assets_without_format = file.fieldname + '-' + Date.now()
		// filename_used_to_store_image_in_assets = filename_used_to_store_image_in_assets_without_format + path.extname(file.originalname)

		filename_used_to_store_image_in_assets = file.originalname
		cb(null, file.originalname);

	}
});

// Check File Type
function checkFileTypeForCarouselImage(file, cb){
	// Allowed ext
	let filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	let mimetype = filetypes.test(file.mimetype);

	if(mimetype && extname){
		return cb(null,true);
	} else {
		cb('Error: jpeg, jpg, png, gif Images Only!');
	}
}

// Init Upload
const upload_carousel_image = multer({
	storage: carousel_image_storage,
	limits:{fileSize: 20000000}, // 1 mb
	fileFilter: function(req, file, cb){
		checkFileTypeForCarouselImage(file, cb);
	}
}).single('carousel_image'); // this is the field that will be dealt
// .array('blogpost_image_main', 12)




// create blogpost with undefined
// USED IN CREATING BLOGPOST
router.post('/create-carousel-with-user', passport.authenticate('jwt', { session: false }), isAllowedCreatingCarousels, function(req, res, next){
	
	// console.log('OUTER LOG')
	// console.log(req.body)

	upload_carousel_image(req, res, (err) => {
		if(err){

			console.log(err)

		} else {

			if(req.file == undefined){

				res.status(404).json({ success: false, msg: 'File is undefined!',file: `uploads/${req.file.filename}`})

			} else {
				// console.log('INNER LOG')
				// console.log(req.body)

			// image is uploaded , now saving image in db
				const newCarousel = new Carousel({

					_id: new mongoose.Types.ObjectId(),
					image_filepath: `./assets/images/uploads/carousel_images/${filename_used_to_store_image_in_assets}`,
					title: req.body.title,
					// endpoint: req.body.endpoint, // this will be taken care in db model

				});

				newCarousel.save(function (err, newCarousel) {

					if (err){
						res.status(404).json({ success: false, msg: 'couldnt create blogpost database entry'})
						return console.log(err)
					}
					// assign user object then save
					User.findOne({ phone_number: req.user.user_object.phone_number }) // using req.user from passport js middleware
					.then((user) => {
						if (user){

							newCarousel.user = user
							newCarousel.save()


							// in response sending new image too with base64 encoding
							let base64_encoded_image = base64_encode(newCarousel.image_filepath)

							let new_carousel_slide = {
								title: newCarousel.title,
								image_filepath: base64_encoded_image,
							}

							res.status(200).json({ success: true, msg: 'new user saved', new_carousel: new_carousel_slide});	

						} else {

							res.status(200).json({ success: false, msg: "user doesnt exists, try logging in again" });

						}
					})
					.catch((err) => {

						next(err);

					});

				})

				// not needed, this is used only in multer
				// res.status(200).json({ success: true, msg: 'File Uploaded!',file: `uploads/${req.file.filename}`})
			}
		}
	})
})


// get blogposts_list_with_children
// USED
router.get('/carousels-list-with-children', function(req, res, next){
	console.log('called')

	Carousel.
	find().
	limit(10).
	then((carousels)=>{
		var newCarousels_list = []
		carousels.map((carousel, index)=>{
			var newCarousel = {}

			newCarousel.image_filepath = base64_encode( carousel[ 'image_filepath' ] )
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

		console.log(err)
		next(err);

	});
});



























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