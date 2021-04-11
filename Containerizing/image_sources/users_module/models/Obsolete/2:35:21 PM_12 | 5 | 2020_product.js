
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	serial_number:Number,
	image_thumbnail:String,
	title:String,
	price:String,
	initial_quantity:String,
	product_size:String,
	product_color:String,

// other model links

})

mongoose.model('Product', ProductSchema);
	
ProductSchema.pre('save', function(next) {

    next();

});
