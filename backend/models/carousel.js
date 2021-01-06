const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var endpoint_number = 392893

const CarouselSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	endpoint:String,
	image_filepath:String,
	title:String,

// other model links
	user:{ type: Schema.Types.ObjectId, ref: 'User' },

})

CarouselSchema.pre('save', function(next) {

	endpoint_number += 1

	this.endpoint = String( endpoint_number )
	
    next();

});

CarouselSchema.post('save', function() {

	// console.log('SAVED CONDITION')
    // console.log(this)

});

mongoose.model('Carousel', CarouselSchema);