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

const {
	get_image_to_display,
	get_image_as_stream,
	store_video_at_tmp_and_get_its_path,
	delete_video_at_tmp,
	get_multer_storage_to_use,
	get_multer_storage_to_use_alternate,
	// get_multer_storage_to_use_for_bulk_files,
	get_file_storage_venue,
	get_file_path_to_use,
	// get_file_path_to_use_for_bulk_files,
	// get_snapshots_storage_path,
	get_snapshots_fullname_and_path,

	// gcp_bucket,
	// save_file_to_gcp_storage,
	save_file_to_gcp,
	// save_file_to_gcp_for_bulk_files,
	use_gcp_storage,
	get_file_from_gcp,
	
	use_aws_s3_storage,
	// save_file_to_s3,
	get_file_from_aws,
	save_file_to_aws_s3,
	// save_file_to_aws_s3_for_bulk_files,

	checkFileTypeForImages,
	// checkFileTypeForImageAndVideo,
	// checkFileTypeForImagesAndExcelSheet,
} = require('../../config/storage/')

let timestamp


// Set The Storage Engine
// const product_image_storage = multer.diskStorage({
// 	destination: path.join(__dirname , '../../assets/images/uploads/product_images'),
// 	filename: function(req, file, cb){
// 		// file name pattern fieldname-currentDate-fileformat
// 		// filename_used_to_store_image_in_assets_without_format = file.fieldname + '-' + Date.now()
// 		// filename_used_to_store_image_in_assets = filename_used_to_store_image_in_assets_without_format + path.extname(file.originalname)

// 		filename_used_to_store_image_in_assets = file.originalname
// 		cb(null, file.originalname);

// 	}
// });


// Check File Type
// function checkFileTypeForProductImage(file, cb){
// 	// Allowed ext
// 	let filetypes = /jpeg|jpg|png|gif/;
// 	// Check ext
// 	let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
// 	// Check mime
// 	let mimetype = filetypes.test(file.mimetype);

// 	if(mimetype && extname){
// 		return cb(null,true);
// 	} else {
// 		cb('Error: jpeg, jpg, png, gif Images Only!');
// 	}
// }

// Init Upload
function upload_product_image(timestamp){

	return multer({
		storage: get_multer_storage_to_use(timestamp),
		limits:{fileSize: 20000000}, // 1 mb
		fileFilter: function(req, file, cb){
			checkFileTypeForImages(file, cb);
		}
	}).single('product_image'); // this is the field that will be dealt
	// .array('product_images', 12)

}




// create blogpost with undefined
// USED IN CREATING BLOGPOST
router.post('/create-product-with-user', passport.authenticate('jwt', { session: false }), isAllowedUploadingProducts, function(req, res, next){
	

	timestamp = Date.now()

	upload_product_image(timestamp)(req, res, (err) => {

		{(async () => {

			if(err){

				console.log(err)

			} else {

				if(req.file == undefined){

					res.status(404).json({ success: false, msg: 'File is undefined!',file: `uploads/${req.file.filename}`})

				} else {
					// console.log('INNER LOG')
					// console.log(req.body)

					if (use_gcp_storage){

						await save_file_to_gcp(timestamp, req.file)

					} else if (use_aws_s3_storage) {

						console.log('SAVED AUTOMATICALLY TO AWS')

					} else {

					}

					const newProductImage = new Image({

						_id: new mongoose.Types.ObjectId(),
						category: 'product_image',
						image_filepath: get_file_path_to_use(req.file, 'product_images', timestamp),
						object_files_hosted_at: get_file_storage_venue(),
					});

					await newProductImage.save()


				// image is uploaded , now saving image in db
					const newProduct = new Product({

						_id: new mongoose.Types.ObjectId(),
						image_thumbnail_filepath: newProductImage._id,
						// image_thumbnail_filepath: get_file_path_to_use(req.file, 'product_images', timestamp),
						// image_thumbnail_filepath: `./assets/images/uploads/product_images/${filename_used_to_store_image_in_assets}`,
						title: req.body.title,
						category: req.body.category,
						product_size: req.body.product_size,
						product_color: req.body.product_color,
						price: req.body.price,
						// timestamp_of_uploading: String( Date.now() ),
						// endpoint: req.body.endpoint, // this will be taken care in db model

					});

					newProduct.save(async function (err, newProduct) {

						if (err){
							res.status(404).json({ success: false, msg: 'couldnt create Product database entry'})
							return console.log(err)
						}
						// assign user object then save
						User.findOne({ phone_number: req.user.user_object.phone_number }) // using req.user from passport js middleware
						.then(async (user) => {
							if (user){

								newProduct.user = user
								newProduct.save()
								user.save()


								let image_object = await Image.findOne({_id:newProduct.image_thumbnail_filepath})

								// in response sending new image too with base64 encoding
								let base64_encoded_image = await get_image_to_display(image_object.image_filepath, image_object.object_files_hosted_at)

								let new_product = {

									image_thumbnail_filepath: base64_encoded_image,								
									title: newProduct.title,
									category: newProduct.category,
									product_size: newProduct.product_size,
									product_color: newProduct.product_color,
									price: newProduct.price,
									endpoint: newProduct.endpoint,

								}

								console.log('PRODUCT CREATED')
								res.status(200).json({ success: true, msg: 'new product saved', new_product: new_product});	

							} else {

								console.log('PRODUCT NOT CREATED')
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

		})()}

	})
})


router.get('/get-image', async function(req, res, next){

	// console.log('FETCHING PRODUCT IMAGE')

	// console.log('req.query')
	// console.log(req.query)

	let image_object = await Image.findOne({_id:req.query.image_object_id})
	let base64_encoded_image = await get_image_to_display(image_object.image_filepath, image_object.object_files_hosted_at)
	res.status(200).json({success: true, image: base64_encoded_image});

})

router.get('/get-image-stream', async function(req, res, next){

	let image_object = await Image.findOne({_id:req.query.image_object_id})
	get_image_as_stream(image_object.image_filepath, image_object.object_files_hosted_at, res)

})



// USED
// get products_list
router.get('/products-list', async function(req, res, next){

	// console.log('CALLED')

	Product
	.find()
	.limit(10)
	// .distinct('title') // .distinct(fieldName, query)
	// .distinct('title', {initial_quantity: 0}) // .distinct(fieldName, query)
	// .distinct('title', {initial_quantity: 0}) // .distinct(fieldName, query)
	.then(async (products) => {

		var products_list = []
		let image_object
		let base64_encoded_image

		// res.writeHead(200, {
		// 	'Content-Type': 'text/plain',
		// 	'Transfer-Encoding': 'chunked'
		// })

		let all_products = await Promise.all(products.map(async (product, index)=>{


			image_object = await Image.findOne({_id:product.image_thumbnail_filepath})
			// base64_encoded_image = await get_image_to_display(image_object.image_filepath, image_object.object_files_hosted_at)

		// base64_encoded_image = await get_image_to_display(product_image.image_filepath, product_image.object_files_hosted_at)



			// res.write(
			// 	JSON.stringify({
			// 		type: "stream",
			// 		chunk: {
			// 			category: product.category,
			// 			image_thumbnail_filepath: base64_encoded_image,
			// 			// image_thumbnail_filepath: base64_encode( product.image_thumbnail_filepath ),
			// 			title: product.title,
			// 			product_size: product.product_size,
			// 			product_color: product.product_color,
			// 			price: product.price,
			// 			endpoint: product.endpoint,
			// 		}
			// 	})
			// +'\n')

			products_list.push({
				category: product.category,
				// image_thumbnail_filepath: base64_encoded_image,
				image_thumbnail_filepath: product.image_thumbnail_filepath, //
				title: product.title,
				product_size: product.product_size,
				product_color: product.product_color,
				price: product.price,
				endpoint: product.endpoint,
			})

		}))

		return products_list
		// res.end()
	})
	.then((products_list) => {

		if (products_list.length > 0){

			// console.log('PRODUCTS SENT')
			// console.log(products_list)
			res.status(200).json({success: true, products_list:products_list});
	
		} else {

			console.log('NO PRODUCTS SENT')
			res.status(200).json({success: false});

		}

	})
	.catch((err) => {

		next(err);

	});
});





router.get('/products-categories', async function(req, res, next){

	let all_product_categories = []
	// let product_categories = await Image.find({category:'product_category'}).distinct('product_category_name')
	let product_images = await Image.find({category:'product_category'})

	// console.log('product_images')
	// console.log(product_images)

	let base64_encoded_image
	let all_product_images = await Promise.all(product_images.map(async (product_image) => {

		// console.log('product_image')
		// console.log(product_image)

		base64_encoded_image = await get_image_to_display(product_image.image_filepath, product_image.object_files_hosted_at)


		all_product_categories.push({
			product_category_name: product_image.product_category_name,
			image_filepath:base64_encoded_image,
		})

	}))


	if (all_product_categories.length > 0){

		res.status(200).json({success: true, categories: all_product_categories})	    

	} else {

		res.status(200).json({ success: false, msg: "could not get categories" });

	}

})



router.get('/get-price', function(req, res, next){


	Product.findOne({ product_size: req.query.product_size,  product_color:req.query.product_color, title: req.query.title})
	.then(async (product) => {

		if (product){

			let price = product.price
			res.status(200).json({price: price});
		
		} else {

			console.log('NO MATCHING PRODUCT FOUND')
			res.status(401).json({ success: false, msg: "could not find product" });

		}

	})
	.catch((err) => {

		next(err);

	});


})

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

			res.status(200).json(all_variations);
	
		} else {

			res.status(401).json({ success: false, msg: "could not find variations" });

		}

	})
	.catch((err) => {

		next(err);

	});


});



// find product
// USED 
router.get('/find-product', async function(req, res, next){

	Product.findOne({ endpoint: req.body.endpoint })
	.then(async (product) => {

		let base64_encoded_image = await get_image_to_display(product.image_thumbnail_filepath, product.object_files_hosted_at)
		product[ image_thumbnail_filepath ] = base64_encoded_image

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


// get products_list_with_children
router.get('/products-list-with-children', async function(req, res, next){

	Product.
	find().
	limit(10).
	then(async (products)=>{
		var newProducts_list = []
		products.map(async (product, index)=>{
			var newProduct = {}

			// newProduct.serial_number = product[ 'serial_number' ]
			let base64_encoded_image = await get_image_to_display(product.image_thumbnail_filepath, product.object_files_hosted_at)

			newProduct.image_thumbnail_filepath = base64_encoded_image
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

router.get('/products-list-next-10-with-children', async function(req, res, next){

	Product.
	find().
	skip(10).
	limit(10).
	then(async (products)=>{
		var newProducts_list = []
		products.map(async (product, index)=>{
			var newProduct = {}
			let base64_encoded_image = await get_image_to_display(product.image_thumbnail, product.object_files_hosted_at)
			newProduct.serial_number = product[ 'serial_number' ]
			newProduct.image_thumbnail = base64_encoded_image
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