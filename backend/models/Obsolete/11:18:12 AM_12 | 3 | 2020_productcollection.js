
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductCollectionSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	serial_number:Number,
	image_thumbnail:String,
	title:String,

// other model links

})

mongoose.model('ProductCollection', ProductCollectionSchema);
	
ProductCollectionSchema.pre('save', function(next) {

    next();

});
