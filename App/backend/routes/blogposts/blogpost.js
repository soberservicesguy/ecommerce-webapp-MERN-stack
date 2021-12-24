require('../../models/blogpost');
require('../../models/user');
require('../../models/image');

const passport = require('passport');
const { isAllowedSurfing } = require('../authMiddleware/isAllowedSurfing')
const { isAllowedWritingBlogposts } = require('../authMiddleware/isAllowedWritingBlogposts')

const base64_encode = require('../../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
const BlogPost = mongoose.model('BlogPost');
const User = mongoose.model('User');
const Image = mongoose.model('Image');

const multer = require('multer');
const path = require('path')

const {
	get_image_to_display,
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
// const image_storage = multer.diskStorage({
// 	destination: path.join(__dirname , '../../assets/images/uploads/blogpost_image_main'),
// 	filename: function(req, file, cb){
// 		// file name pattern fieldname-currentDate-fileformat
// 		// filename_used_to_store_image_in_assets_without_format = file.fieldname + '-' + Date.now()
// 		// filename_used_to_store_image_in_assets = filename_used_to_store_image_in_assets_without_format + path.extname(file.originalname)

// 		filename_used_to_store_image_in_assets = file.originalname
// 		cb(null, file.originalname);

// 	}
// });

// Check File Type
// function checkFileTypeForBlogpostImage(file, cb){
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
function upload_main_image_by_user_of_blog(timestamp){

	return multer({
		storage: get_multer_storage_to_use(timestamp),
		limits:{fileSize: 200000000}, // 1 mb
		fileFilter: function(req, file, cb){
			checkFileTypeForImages(file, cb);
		}
	}).single('blogpost_image_main'); // this is the field that will be dealt
	// .array('blogpost_image_main', 12)

}




// create blogpost with undefined
// USED IN CREATING BLOGPOST
router.post('/create-blogpost-with-user', passport.authenticate('jwt', { session: false }), isAllowedWritingBlogposts, function(req, res, next){
	
	// console.log('OUTER LOG')
	// console.log(req.body)

	timestamp = Date.now()

	upload_main_image_by_user_of_blog(timestamp)(req, res, (err) => {

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

					const newBlogpostImage = new Image({

						_id: new mongoose.Types.ObjectId(),
						category: 'blogpost_image',
						image_filepath: get_file_path_to_use(req.file, 'blogpost_image_mains', timestamp),
						object_files_hosted_at: get_file_storage_venue(),
					});

					await newBlogpostImage.save()



				// image is uploaded , now saving image in db
					const newBlogPost = new BlogPost({

						_id: new mongoose.Types.ObjectId(), 
						image_thumbnail_filepath: newBlogpostImage._id,
						// image_thumbnail_filepath: get_file_path_to_use(req.file, 'blogpost_image_mains', timestamp),
						// image_thumbnail_filepath: `./assets/images/uploads/blogpost_image_main/${filename_used_to_store_image_in_assets}`,
						object_files_hosted_at: get_file_storage_venue(),
						title: req.body.title,
						first_para: req.body.first_para,
						initial_tags: req.body.initial_tags,
						second_para: req.body.second_para,
						third_para: req.body.third_para,
						fourth_para: req.body.fourth_para,
						all_tags: req.body.all_tags,
						// timestamp_of_uploading: String( Date.now() ),
						// endpoint: req.body.endpoint, // this will be taken care in db model

					});

					newBlogPost.save(async function (err, newBlogPost) {

						if (err){
							res.status(404).json({ success: false, msg: 'couldnt create blogpost database entry'})
							return console.log(err)
						}
						// assign user object then save
						User.findOne({ phone_number: req.user.user_object.phone_number }) // using req.user from passport js middleware
						.then(async (user) => {
							if (user){

								newBlogPost.user = user
								newBlogPost.save()
								user.save()


								let image_object = await Image.findOne({_id:newBlogPost.image_thumbnail_filepath})

								let base64_encoded_image = await get_image_to_display(image_object.image_filepath, image_object.object_files_hosted_at)

								let new_blogpost = {
									endpoint: newBlogPost.endpoint, 
									title: newBlogPost.title,
									image_thumbnail_filepath: base64_encoded_image,
									initial_tags: newBlogPost.initial_tags,
									first_para: newBlogPost.first_para,
									second_para: newBlogPost.second_para,
									third_para: newBlogPost.third_para,
									fourth_para: newBlogPost.fourth_para,
									all_tags: newBlogPost.all_tags,
								}

								console.log('BLOGPOST CREATED')
								res.status(200).json({ success: true, msg: 'new user saved', new_blogpost: new_blogpost});	

							} else {

								console.log('BLOGPOST NOT CREATED')
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

	let image_object = await Image.findOne({_id:req.query.image_object_id})
	let base64_encoded_image = await get_image_to_display(image_object.image_filepath, image_object.object_files_hosted_at)
	res.status(200).json({success: true, image: base64_encoded_image});

})

router.get('/get-image-stream', async function(req, res, next){

	let image_object = await Image.findOne({_id:req.query.image_object_id})
	get_image_as_stream(image_object.image_filepath, image_object.object_files_hosted_at, res)

})


// get blogposts_list_with_children
// USED
router.get('/blogposts-list', function(req, res, next){
	// console.log('called')

	BlogPost.
	find().
	limit(9).
	then(async (blogposts)=>{
		// console.log(blogposts)
		var blogposts_list = []

		let all_blogposts = await Promise.all(blogposts.map(async (blogpost, index)=>{

			var newBlogPost = {}

			let image_object = await Image.findOne({_id:blogpost.image_thumbnail_filepath})

			newBlogPost.image_thumbnail_filepath = blogpost.image_thumbnail_filepath
			// newBlogPost.image_thumbnail_filepath = await get_image_to_display(image_object.image_filepath, image_object.object_files_hosted_at)
			// newBlogPost.image_thumbnail_filepath = base64_encode( blogpost[ 'image_thumbnail_filepath' ] )
			newBlogPost.title = blogpost[ 'title' ]
			newBlogPost.timestamp_of_uploading = blogpost[ 'timestamp_of_uploading' ]
			newBlogPost.initial_tags = blogpost[ 'initial_tags' ]
			newBlogPost.endpoint = blogpost[ 'endpoint' ]
			newBlogPost.first_para = blogpost[ 'first_para' ]
			
			newBlogPost.second_para = blogpost[ 'second_para' ]
 			newBlogPost.third_para = blogpost[ 'third_para' ]
			newBlogPost.fourth_para = blogpost[ 'fourth_para' ]
			newBlogPost.all_tags = blogpost[ 'all_tags' ]

			blogposts_list.push({...newBlogPost})
			newBlogPost = {}
		}))

		return blogposts_list
	})
	.then((blogposts_list) => {

		if (blogposts_list.length > 0) {

			res.status(200).json({success:true, blogposts_list:blogposts_list})

		} else {

			// console.log(blogposts_list)
			res.status(200).json({ success: false, msg: "could not find BlogPosts_list" });

		}

	})
	.catch((err) => {

		console.log(err)
		next(err);

	});
});




// find blogpost
	
router.get('/find-blogpost', async function(req, res, next){

	BlogPost.findOne({ endpoint: req.body.endpoint })
	.then(async (blogpost) => {

		let base64_encoded_image = await get_image_to_display(blogpost.image_thumbnail_filepath, blogpost.object_files_hosted_at)
		blogpost[ image_thumbnail_filepath ] = base64_encoded_image

		if (!blogpost) {

			res.status(401).json({ success: false, msg: "could not find blogpost" });

		} else {

			res.status(200).json(blogpost);

		}

	})
	.catch((err) => {

		next(err);

	});

});

module.exports = router;