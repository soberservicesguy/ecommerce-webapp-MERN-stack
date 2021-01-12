const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var endpoint_number = 393893

const ProductSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	// serial_number:Number,
	category:String,
	image_thumbnail_filepath:String,
	title:String,

	initial_quantity:Number,
	product_size:String,
	product_color:String,

	price:String,

	endpoint:String,
	timestamp_of_uploading:String,

// other model links

})

ProductSchema.pre('save', function(next) {

	endpoint_number += 1

	this.endpoint = String( endpoint_number )
	this.timestamp_of_uploading = String( Date.now() )

	this.initial_quantity = 0
	
    next();

});

ProductSchema.post('save', function() {

	console.log('SAVED CONDITION')
    console.log(this)

});


mongoose.model('Product', ProductSchema);