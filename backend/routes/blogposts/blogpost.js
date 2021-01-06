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

// Set The Storage Engine
const image_storage = multer.diskStorage({
	destination: path.join(__dirname , '../../assets/images/uploads/blogpost_image_main'),
	filename: function(req, file, cb){
		// file name pattern fieldname-currentDate-fileformat
		// filename_used_to_store_image_in_assets_without_format = file.fieldname + '-' + Date.now()
		// filename_used_to_store_image_in_assets = filename_used_to_store_image_in_assets_without_format + path.extname(file.originalname)

		filename_used_to_store_image_in_assets = file.originalname
		cb(null, file.originalname);

	}
});

// Check File Type
function checkFileTypeForBlogpostImage(file, cb){
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
const upload_main_image_by_user_of_blog = multer({
	storage: image_storage,
	limits:{fileSize: 20000000}, // 1 mb
	fileFilter: function(req, file, cb){
		checkFileTypeForBlogpostImage(file, cb);
	}
}).single('blogpost_image_main'); // this is the field that will be dealt
// .array('blogpost_image_main', 12)




// create blogpost with undefined
// USED IN CREATING BLOGPOST
router.post('/create-blogpost-with-user', passport.authenticate('jwt', { session: false }), isAllowedWritingBlogposts, function(req, res, next){
	
	// console.log('OUTER LOG')
	// console.log(req.body)

	upload_main_image_by_user_of_blog(req, res, (err) => {
		if(err){

			console.log(err)

		} else {

			if(req.file == undefined){

				res.status(404).json({ success: false, msg: 'File is undefined!',file: `uploads/${req.file.filename}`})

			} else {
				// console.log('INNER LOG')
				// console.log(req.body)

			// image is uploaded , now saving image in db
				const newBlogPost = new BlogPost({

					_id: new mongoose.Types.ObjectId(),
					image_thumbnail_filepath: `./assets/images/uploads/blogpost_image_main/${filename_used_to_store_image_in_assets}`,
					title: req.body.title,
					first_para: req.body.first_para,
					initial_tags: req.body.initial_tags,
					second_para: req.body.second_para,
					qouted_para: req.body.qouted_para,
					third_para: req.body.third_para,
					fourth_para: req.body.fourth_para,
					all_tags: req.body.all_tags,
					// timestamp_of_uploading: String( Date.now() ),
					// endpoint: req.body.endpoint, // this will be taken care in db model

				});

				newBlogPost.save(function (err, newBlogPost) {

					if (err){
						res.status(404).json({ success: false, msg: 'couldnt create blogpost database entry'})
						return console.log(err)
					}
					// assign user object then save
					User.findOne({ phone_number: req.user.user_object.phone_number }) // using req.user from passport js middleware
					.then((user) => {
						if (user){

							newBlogPost.user = user
							newBlogPost.save()


							// in response sending new image too with base64 encoding
							let base64_encoded_image = base64_encode(newBlogPost.image_thumbnail_filepath)

							let new_blogpost = {
								title: newBlogPost.title,
								image_thumbnail_filepath: base64_encoded_image,
								initial_tags: newBlogPost.initial_tags,
								first_para: newBlogPost.first_para,
								second_para: newBlogPost.second_para,
								qouted_para: newBlogPost.qouted_para,
								third_para: newBlogPost.third_para,
								fourth_para: newBlogPost.fourth_para,
								all_tags: newBlogPost.all_tags,
							}

							res.status(200).json({ success: true, msg: 'new user saved', new_blogpost: new_blogpost});	

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
router.get('/blogposts-list-with-children', function(req, res, next){
	console.log('called')

	BlogPost.
	find().
	limit(10).
	then((blogposts)=>{
		var newBlogPosts_list = []
		blogposts.map((blogpost, index)=>{
			var newBlogPost = {}

			newBlogPost.image_thumbnail_filepath = base64_encode( blogpost[ 'image_thumbnail_filepath' ] )
			newBlogPost.title = blogpost[ 'title' ]
			newBlogPost.timestamp_of_uploading = blogpost[ 'timestamp_of_uploading' ]
			newBlogPost.initial_tags = blogpost[ 'initial_tags' ]
			newBlogPost.endpoint = blogpost[ 'endpoint' ]
			newBlogPost.first_para = blogpost[ 'first_para' ]

			newBlogPosts_list.push({...newBlogPost})
			newBlogPost = {}
		});

		return newBlogPosts_list
	})
	.then((newBlogPosts_list) => {

		if (!newBlogPosts_list) {

			res.status(401).json({ success: false, msg: "could not find BlogPosts_list" });

		} else {

			res.status(200).json(newBlogPosts_list);

		}

	})
	.catch((err) => {

		console.log(err)
		next(err);

	});
});




// find blogpost
	
router.get('/find-blogpost', function(req, res, next){

	BlogPost.findOne({ endpoint: req.body.endpoint })
	.then((blogpost) => {

		blogpost[ image_thumbnail_filepath ] = base64_encode( blogpost[ 'image_thumbnail_filepath' ] )

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