
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	user_name:String,
	phone_number:String,
	hash:String,
	salt:String,
	isLoggedIn: Boolean,

// other model links
	orders:[{ type: Schema.Types.ObjectId, ref: 'Order'  }],
	total_orders:0,

})

mongoose.model('User', UserSchema);
	
UserSchema.pre('save', function(next) {
	this.total_orders = this.orders.length

    next();

});