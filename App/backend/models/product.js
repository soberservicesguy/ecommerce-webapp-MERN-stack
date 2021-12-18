const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var endpoint_number = 393893

const ProductSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	object_files_hosted_at: {type:String, enum:['gcp_storage', 'aws_s3', 'disk_storage',]},

	// serial_number:Number,
	category:String,
	image_thumbnail_filepath: { type: Schema.Types.ObjectId, ref: 'Image' },
	title:String,

	initial_quantity:Number,
	product_size:String,
	product_color:String,

	price:String,

	endpoint:{type:String, default:null},
	timestamp_of_uploading:String,

// other model links

})

ProductSchema.pre('save', function(next) {

	if (this.endpoint === null){

		endpoint_number += 1

		this.endpoint = String( endpoint_number )
		this.timestamp_of_uploading = String( Date.now() )

		this.initial_quantity = 1

	}
	
    next();

});

ProductSchema.post('save', function() {

	// console.log('SAVED CONDITION')
    // console.log(this)

});


mongoose.model('Product', ProductSchema);