const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var endpoint_number = 393893

const OrderSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	endpoint:String,
	timestamp_of_order:String,

	order_phone_number_field:String,
	order_address_field:String,

// other model links
	user:{ type: Schema.Types.ObjectId, ref: 'User' },
	products:[{ type: Schema.Types.ObjectId, ref: 'Product' }],

	total_products: Number,

	order_amount: Number,
})

OrderSchema.pre('save', function(next) {

	endpoint_number += 1

	this.endpoint = String( endpoint_number )
	this.timestamp_of_order = String( Date.now() )

	this.total_products = this.products.length
	
    next();

});

OrderSchema.post('save', function() {

	// console.log('SAVED CONDITION')
    // console.log(this)

});

mongoose.model('Order', OrderSchema);