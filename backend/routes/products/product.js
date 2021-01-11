require('../../models/product');
require('../../models/user');
require('../../models/image');

const base64_encode = require('../../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const Image = mongoose.model('Image');
const Product = mongoose.model('Product');

const multer = require('multer');
const path = require('path')

const passport = require('passport');
const { isAllowedSurfing } = require('../authMiddleware/isAllowedSurfing')
const { isAllowedUploadingProducts } = require('../authMiddleware/isAllowedUploadingProducts')


// Set The Storage Engine
const product_image_storage = multer.diskStorage({
	destination: path.join(__dirname , '../../assets/images/uploads/product_images'),
	filename: function(req, file, cb){
		// file name pattern fieldname-currentDate-fileformat
		// filename_used_to_store_image_in_assets_without_format = file.fieldname + '-' + Date.now()
		// filename_used_to_store_image_in_assets = filename_used_to_store_image_in_assets_without_format + path.extname(file.originalname)

		filename_used_to_store_image_in_assets = file.originalname
		cb(null, file.originalname);

	}
});

// Check File Type
function checkFileTypeForProductImage(file, cb){
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
const upload_product_image = multer({
	storage: product_image_storage,
	limits:{fileSize: 20000000}, // 1 mb
	fileFilter: function(req, file, cb){
		checkFileTypeForProductImage(file, cb);
	}
}).single('product_image'); // this is the field that will be dealt
// .array('product_images', 12)




// create blogpost with undefined
// USED IN CREATING BLOGPOST
router.post('/create-product-with-user', passport.authenticate('jwt', { session: false }), isAllowedUploadingProducts, function(req, res, next){
	
	// console.log('OUTER LOG')
	// console.log(req.body)

	upload_product_image(req, res, (err) => {
		if(err){

			console.log(err)

		} else {

			if(req.file == undefined){

				res.status(404).json({ success: false, msg: 'File is undefined!',file: `uploads/${req.file.filename}`})

			} else {
				// console.log('INNER LOG')
				// console.log(req.body)

			// image is uploaded , now saving image in db
				const newProduct = new Product({

					_id: new mongoose.Types.ObjectId(),
					image_thumbnail_filepath: `./assets/images/uploads/product_images/${filename_used_to_store_image_in_assets}`,
					title: req.body.title,
					category: req.body.category,
					product_size: req.body.product_size,
					product_color: req.body.product_color,
					price: req.body.price,
					// timestamp_of_uploading: String( Date.now() ),
					// endpoint: req.body.endpoint, // this will be taken care in db model

				});

				newProduct.save(function (err, newProduct) {

					if (err){
						res.status(404).json({ success: false, msg: 'couldnt create Product database entry'})
						return console.log(err)
					}
					// assign user object then save
					User.findOne({ phone_number: req.user.user_object.phone_number }) // using req.user from passport js middleware
					.then((user) => {
						if (user){

							newProduct.user = user
							newProduct.save()


							// in response sending new image too with base64 encoding
							let base64_encoded_image = base64_encode(newProduct.image_thumbnail_filepath)

							let new_product = {

								image_thumbnail_filepath: base64_encoded_image,								
								title: newProduct.title,
								category: newProduct.category,
								product_size: newProduct.product_size,
								product_color: newProduct.product_color,
								price: newProduct.price,

							}

							res.status(200).json({ success: true, msg: 'new product saved', new_product: new_product});	

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



// USED
// get products_list
router.get('/products-list', function(req, res, next){

	Product
	// .distinct('title', {initial_quantity: 0}) // .distinct(fieldName, query)
	// .distinct('title', {initial_quantity: 0}) // .distinct(fieldName, query)
	.limit(10)
	.then((products) => {
		var products_list = []
		products.map((product, index)=>{

			products_list.push({
				category: product.category,
				image_thumbnail_filepath: base64_encode( product.image_thumbnail_filepath ),
				title: product.title,
				product_size: product.product_size,
				product_color: product.product_color,
				price: product.price,
				endpoint: product.endpoint,
			})

		});

		return products_list

	})
	.then((products_list) => {

		if (products_list.length > 0){

			res.status(200).json(products_list);
	
		} else {

			res.status(401).json({ success: false, msg: "could not find Products list" });

		}

	})
	.catch((err) => {

		next(err);

	});
});


// USED
// find variations available based on single input
// takes req.query.title and searches products having same title and extracts variations from it
// also gives further narrowed options if anothing else other than title is supplied in the payload
router.get('/get-all-variations', function(req, res, next){
	
	var all_variations = {product_size:[], product_color:[]}

	// delete all keys of payload attributes (variation attributes which are null)
	let product_payload = req.query
	Object.keys(product_payload).map((key) => {
		if ( product_payload[key] === null || product_payload[key] === undefined || product_payload[key] === '' ){
			console.log('found match')
			delete product_payload[key]
		}
	})
	Product
	.find(product_payload)
	.then((products) => {
	// variation attributes are product_size, product_color 
		products.map((product) => {

			if ( product.product_size && !all_variations['product_size'].includes(product.product_size) ){

				all_variations['product_size'].push(product.product_size)

			}

			if ( product.product_color && !all_variations['product_color'].includes(product.product_color) ){

				all_variations['product_color'].push(product.product_color)

			}

		})

		return all_variations

	})
	.then((all_variations) => {

		if (all_variations['product_color'].length > 0 || all_variations['product_size'].length > 0){

			console.log('VARIATIONS SENT')
			console.log(all_variations)
			res.status(200).json(all_variations);
	
		} else {

			console.log('COULDNT FIND VARUATION')
			res.status(401).json({ success: false, msg: "could not find variations" });

		}

	})
	.catch((err) => {

		next(err);

	});


});



// find product
// USED 
router.get('/find-product', function(req, res, next){

	Product.findOne({ endpoint: req.body.endpoint })
	.then((product) => {

		product[ image_thumbnail_filepath ] = base64_encode( product[ 'image_thumbnail_filepath' ] )

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

			// newProduct.serial_number = product[ 'serial_number' ]
			newProduct.image_thumbnail_filepath = base64_encode( product[ 'image_thumbnail_filepath' ] )
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



module.exports = router;