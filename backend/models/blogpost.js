const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var endpoint_number = 393893

const BlogPostSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	image_thumbnail_filepath:String,
	title:String,
	// author_name:String,
	first_para:String,
	initial_tags:String,
	second_para:String,
	// qouted_para:String,
	// source_of_qoutation:String,
	third_para:String,
	fourth_para:String,
	all_tags:String,
	// author_details:String,
	endpoint:String,
	timestamp_of_uploading:String,

// other model links
	user:{ type: Schema.Types.ObjectId, ref: 'User' },

})

BlogPostSchema.pre('save', function(next) {

	endpoint_number += 1

	this.endpoint = String( endpoint_number )
	this.timestamp_of_uploading = String( Date.now() )
	
    next();

});

BlogPostSchema.post('save', function() {

	console.log('SAVED CONDITION')
    console.log(this)

});

mongoose.model('BlogPost', BlogPostSchema);