
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarouselSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	serial_number:Number,
	image_thumbnail:String,
	title:String,

// other model links

})

mongoose.model('Carousel', CarouselSchema);
	
CarouselSchema.pre('save', function(next) {

    next();

});
