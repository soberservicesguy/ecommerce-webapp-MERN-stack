const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	object_files_hosted_at: {type:String, enum:['gcp_storage', 'aws_s3', 'disk_storage',]},

	image_filepath:String,
// other model links
	user:{ type: Schema.Types.ObjectId, ref: 'User' },
	blogpost:{ type: Schema.Types.ObjectId, ref: 'Blogpost' },
	product:{ type: Schema.Types.ObjectId, ref: 'Product' },

})

ImageSchema.pre('save', function(next) {

    next();

});

ImageSchema.post('save', function() {

	// console.log('SAVED CONDITION')
    // console.log(this)

});


mongoose.model('Image', ImageSchema);