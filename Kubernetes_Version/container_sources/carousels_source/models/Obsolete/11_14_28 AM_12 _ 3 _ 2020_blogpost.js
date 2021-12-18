
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogpostSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	image_thumbnail:String,
	title:String,
	date_of_publishing:String,
	author_name:String,
	first_para:String,
	endpoint:String,
	initial_tags:String,
	second_para:String,
	qouted_para:String,
	source_of_qoutation:String,
	third_para:String,
	fourth_para:String,
	all_tags:String,
	author_details:String,

// other model links

})

mongoose.model('Blogpost', BlogpostSchema);
	
BlogpostSchema.pre('save', function(next) {

    next();

});
