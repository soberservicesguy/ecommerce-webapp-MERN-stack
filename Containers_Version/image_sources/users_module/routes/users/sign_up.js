require('../../models/image');
require('../../models/user');
require('../../models/privilige');


const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const Image = mongoose.model('Image');
const Privilege = mongoose.model('Privilege');

const passport = require('passport');
const utils = require('../../lib/utils');

const multer = require('multer');
const path = require('path');

const {
	// get_image_to_display,
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
	checkFileTypeForImageAndVideo,
	// checkFileTypeForImagesAndExcelSheet,
} = require('../../config/storage/')

let timestamp


var filename_used_to_store_image_in_assets = ''
var filename_used_to_store_image_in_assets_without_format = ''

// Set The Storage Engine
// const image_storage = multer.diskStorage({
// 	destination: path.join(__dirname , '../../assets/images/uploads/avatar_image'),
// 	filename: function(req, file, cb){
// 		// file name pattern fieldname-currentDate-fileformat
// 		filename_used_to_store_image_in_assets_without_format = file.fieldname + '-' + Date.now()
// 		filename_used_to_store_image_in_assets = filename_used_to_store_image_in_assets_without_format + path.extname(file.originalname)

// 		cb(null, filename_used_to_store_image_in_assets);

// 	}
// });

// Check File Type
// function checkFileTypeForUserAvatar(file, cb){
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
function user_avatar_image_upload(timestamp){

	return multer({
		storage: get_multer_storage_to_use(timestamp),
		limits:{fileSize: 2000000}, // 1 mb
		fileFilter: function(req, file, cb){
			checkFileTypeForImages(file, cb);
		}
	}).single('avatar_image'); // this is the field that will be dealt

}



// router.post('/protected-avatar-image-upload', passport.authenticate('jwt', { session: false }), (req, res, next) => {
router.post('/signup-and-get-privileges',async  (req, res, next) => {

	console.log('INCOMING')

//	here there will be no req.body due to multer 
	// console.log('OUTER LOG')
	// console.log(req.body)

	timestamp = Date.now()

	user_avatar_image_upload(timestamp)(req, res, (err) => {
	// wrapping in IIFE since await requires async keyword which cant be applied to above multer function
		{(async () => {
			if(err){

				console.log(err)

			} else {

				if(req.file == undefined){

					console.log('File is undefined!')
					res.status(404).json({ success: false, msg: 'File is undefined!',file: `uploads/${req.file.filename}`})
					return

				} else {

					let newUser
					let newImage

					if (use_gcp_storage){

						await save_file_to_gcp(timestamp, req.file)

					} else if (use_aws_s3_storage) {

						console.log('SAVED AUTOMATICALLY TO AWS')

					} else {

					}



				// saving image
					try{

						newImage = new Image({

							_id: new mongoose.Types.ObjectId(),
							image_filepath: get_file_path_to_use(req.file, 'avatar_images', timestamp),
							// image_filepath: `./assets/images/uploads/avatar_image/${filename_used_to_store_image_in_assets}`,

						});
						// await newImage.save()
						// await new Image({args}).save shortcut

					} catch (image_error){

						console.log('couldnt create image database entry')
						res.status(404).json({ success: false, msg: 'couldnt create image database entry'})
						return
					}

				// creating user, which needs image object
					try{
						let user_found = await User.findOne({ phone_number: req.body.phone_number })
						if (!user_found){
							const saltHash = utils.genPassword(req.body.password);		
							const salt = saltHash.salt;
							const hash = saltHash.hash;

							newUser = new User({

								_id: new mongoose.Types.ObjectId(),
								user_name: req.body.user_name,
								phone_number: req.body.phone_number,
								user_image: newImage,
								hash: hash,
								salt: salt,

							});
							// await newUser.save()

						} else {

							console.log('user already exists')
							res.status(200).json({ success: false, msg: "user already exists, try another" });
							return
						}

					} catch (err){
						console.log(err)
					}

					// getting privileges to assign
					let privileges_list = []					
					if ( req.body.privileges_selected === 'Basic' ){

						privileges_list.push('allow_surfing')

					} else if ( req.body.privileges_selected === 'Products control' ){

						privileges_list.push('is_allowed_product_upload')

					} else if ( req.body.privileges_selected === 'Carousels control' ){

						privileges_list.push('is_allowed_carousel_upload')

					} else if ( req.body.privileges_selected === 'Blogposts control' ){

						privileges_list.push('is_allowed_writing_blopost')

					} else if ( req.body.privileges_selected === 'Total control' ){

						privileges_list.push('allow_surfing')
						privileges_list.push('is_allowed_product_upload')
						privileges_list.push('is_allowed_carousel_upload')
						privileges_list.push('is_allowed_writing_blopost')

					} else {
					}

					// going to assign privileges
					let all_work = await Promise.all(privileges_list.map(async (privilege_name, index) => {

						let privilege = await Privilege.findOne({ privilege_name: privilege_name })

						if (!privilege){

							const newPrivilege = new Privilege({

								_id: new mongoose.Types.ObjectId(),
								privilege_name: privilege_name,

							})
																		
							newPrivilege.users.push(newUser)
							await newPrivilege.save()

							newUser.privileges.push(newPrivilege)

						} else if (privilege) {

							privilege.users.push(newUser)
							await privilege.save()

							newUser.privileges.push(privilege)

						} else {
						}

					}))

					newImage.user = newUser
					await newImage.save()
					await newUser.save()
					res.status(200).json({ success: true, msg: 'new user saved' });
					return

				}
			}
		})()}

	})

})

module.exports = router