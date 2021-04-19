require('../../models/image');
require('../../models/user');
require('../../models/product');

const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const Image = mongoose.model('Image');
const Product = mongoose.model('Product');

const passport = require('passport');
const utils = require('../../lib/utils');

const multer = require('multer');
const path = require('path');

const base64_encode = require('../../lib/image_to_base64')

var filename_used_to_store_image_in_assets = ''
var filename_used_to_store_image_in_assets_without_format = ''

// Set The Storage Engine
const image_storage = multer.diskStorage({
	destination: path.join(__dirname , '../../assets/images/uploads/product_image'),
	filename: function(req, file, cb){
		// file name pattern fieldname-currentDate-fileformat
		// filename_used_to_store_image_in_assets_without_format = file.fieldname + '-' + Date.now()
		// filename_used_to_store_image_in_assets = filename_used_to_store_image_in_assets_without_format + path.extname(file.originalname)

		filename_used_to_store_image_in_assets = file.originalname
		cb(null, file.originalname);

	}
});

// Init Upload
const product_image_upload = multer({
	storage: image_storage,
	limits:{fileSize: 10000000}, // 1 mb
	fileFilter: function(req, file, cb){
		checkFileTypeForProductImage(file, cb);
	}
}).single('upload_images_by_user'); // this is the field that will be dealt

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

router.post('/protected-image-upload', passport.authenticate('jwt', { session: false }), (req, res, next) => {

	console.log('OUTER LOG')
	console.log(req.body)

	product_image_upload(req, res, (err) => {
		if(err){

			console.log(err)

		} else {

			if(req.file == undefined){

				res.status(404).json({ success: false, msg: 'File is undefined!',file: `uploads/${req.file.filename}`})

			} else {
				// console.log('INNER LOG')
				// console.log(req.body)

			// image is uploaded , now saving image in db
				const newImage = new Image({

					_id: new mongoose.Types.ObjectId(),
					image_filepath: `./assets/images/uploads/images_uploaded_by_user/${filename_used_to_store_image_in_assets}`,

				});

				newImage.save(function (err, newImage) {

					if (err){
						res.status(404).json({ success: false, msg: 'couldnt create image database entry'})
						return console.log(err)
					}
					// assign user object then save
					User.findOne({ phone_number: req.user.user_object.phone_number }) // using req.user from passport js middleware
					.then((user) => {
						if (user){

							newImage.user = user
							newImage.save()

							// in response sending new image too with base64 encoding
							let base64_encoded_image = base64_encode(newImage.image_filepath)
							res.status(200).json({ success: true, msg: 'new user saved', new_image: base64_encoded_image});	

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

module.exports = router