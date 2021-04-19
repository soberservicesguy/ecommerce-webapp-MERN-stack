require('../models/blogpost');


const base64_encode = require('../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
const BlogPost = mongoose.model('BlogPost');

// create a new blogpost with children

router.post('/create-blogpost-with-children', function(req, res, next){
	const newBlogPost = new BlogPost({

		_id: new mongoose.Types.ObjectId(),
		image_thumbnail: req.body.parent.image_thumbnail,
		title: req.body.parent.title,
		date_of_publishing: req.body.parent.date_of_publishing,
		author_name: req.body.parent.author_name,
		first_para: req.body.parent.first_para,
		endpoint: req.body.parent.endpoint,
		initial_tags: req.body.parent.initial_tags,
		second_para: req.body.parent.second_para,
		qouted_para: req.body.parent.qouted_para,
		source_of_qoutation: req.body.parent.source_of_qoutation,
		third_para: req.body.parent.third_para,
		fourth_para: req.body.parent.fourth_para,
		all_tags: req.body.parent.all_tags,
		author_details: req.body.parent.author_details,

	});

	newBlogPost.save(function (err, newBlogPost) {
		if (err) return console.log(err);




	newBlogPost.save();

	});

});

// find blogpost
	
router.get('/find-blogpost', function(req, res, next){

	BlogPost.findOne({ serial_number: req.body.serial_number })
		.then((blogpost) => {

			blogpost[ image_thumbnail ] = base64_encode( blogpost[ 'image_thumbnail' ] )

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

// create blogpost with undefined

router.post('/create-blogpost-with-user', function(req, res, next){
	
	var blogpost_object = req.body.blogpost_object
	var user_object = req.body.user_object

	var newBlogPost = new BlogPost({
		_id: new mongoose.Types.ObjectId(),
		...blogpost_object
	})

	newBlogPost.save(function (err, newBlogPost) {
		if (err) return console.log(err);

			User.
			findOne({...user_object})
		.then((user) => {
			
			if( !user ){
			
				console.log('no User found')
			
			} else {
			
				newBlogPost.user = user
				res.status(200).json( newBlogPost )
			
			}
		})
		.catch((err) => {
			console.log(err)
		})
	})
})



// get blogposts_list

router.get('/blogposts-list', function(req, res, next){

BlogPost.
	find().
	limit(10).
	then((blogposts)=>{
		var newBlogPosts_list = []
		blogposts.map((blogpost, index)=>{
			var newBlogPost = {}

			newBlogPost.image_thumbnail = base64_encode( blogpost[ 'image_thumbnail' ] )
			newBlogPost.title = blogpost[ 'title' ]
			newBlogPost.date_of_publishing = blogpost[ 'date_of_publishing' ]
			newBlogPost.author_name = blogpost[ 'author_name' ]
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

		next(err);

	});
});

// get blogposts_list_with_children

router.get('/blogposts-list-with-children', function(req, res, next){

	BlogPost.
		find().
		limit(10).
		populate('user').
		then((blogposts)=>{
			var newBlogPosts_list = []
			blogposts.map((blogpost, index)=>{
				var newBlogPost = {}

				newBlogPost.image_thumbnail = base64_encode( blogpost[ 'image_thumbnail' ] )
				newBlogPost.title = blogpost[ 'title' ]
				newBlogPost.date_of_publishing = blogpost[ 'date_of_publishing' ]
				newBlogPost.author_name = blogpost[ 'author_name' ]
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

			next(err);

		});
});

// get blogposts_list_next_10_with_children

router.get('/blogposts-list-next-10-with-children', function(req, res, next){

	BlogPost.
		find().
		skip(10).
		limit(10).
		populate('user').
		then((blogposts)=>{
			var newBlogPosts_list = []
			blogposts.map((blogpost, index)=>{
				var newBlogPost = {}

				newBlogPost.image_thumbnail = base64_encode( blogpost[ 'image_thumbnail' ] )
				newBlogPost.title = blogpost[ 'title' ]
				newBlogPost.date_of_publishing = blogpost[ 'date_of_publishing' ]
				newBlogPost.author_name = blogpost[ 'author_name' ]
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

			next(err);

		});
});

// get blogpost with children

router.get('/blogpost-with-children', function(req, res, next){
	BlogPost.
		findOne({serial_number:req.body.serial_number}).


		exec(function (err, blogpost_with_children) {
			if (err) return console.log(err);

			res.status(200).json(blogpost_with_children);
		});
})


// get blogpost with summarized children

router.get('/blogpost-with-summarized-children', function(req, res, next){
	BlogPost.
		findOne({serial_number:req.body.serial_number}).


		exec(function (err, blogpost_with_children) {

			if (err) return console.log(err);


		res.status(200).json(blogpost_with_children);

	});
})

// get next 10 blogposts_list

router.get('/blogposts-next-10-list', function(req, res, next){

	BlogPost.
		find().
		limit(10).
		skip(10).
		then( 
			(blogposts) => {
				var newBlogPosts_list = []
				blogposts.map((blogpost, index) => {
					var newBlogPost = {}
	
					newBlogPost.image_thumbnail = base64_encode( blogpost[ 'image_thumbnail' ] )
					newBlogPost.title = blogpost[ 'title' ]
					newBlogPost.date_of_publishing = blogpost[ 'date_of_publishing' ]
					newBlogPost.author_name = blogpost[ 'author_name' ]
					newBlogPost.first_para = blogpost[ 'first_para' ]

					newBlogPosts_list.push({...newBlogPost})
					newBlogPost = {}
					})
			})

			return newBlogPosts_list

		.then((newBlogPosts_list) => {

			if (!newBlogPosts_list) {

				res.status(401).json({ success: false, msg: "could not find BlogPosts_list" });

			} else {

				res.status(200).json(newBlogPosts_list);

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