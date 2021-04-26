const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	user_name:String,
	phone_number:String,
	hash:String,
	salt:String,
	isLoggedIn: Boolean,
	user_image:  { type: Schema.Types.ObjectId, ref: 'Image' },

// other model links
	orders:[{ type: Schema.Types.ObjectId, ref: 'Order'  }],
	privileges: [{ type: Schema.Types.ObjectId, ref: 'Privilege'  }],
	total_orders:0,

})

	
UserSchema.pre('save', function(next) {
	this.total_orders = this.orders.length

    next();

});

UserSchema.post('save', function() {

	// console.log('SAVED CONDITION')
    // console.log(this)

});

mongoose.model('User', UserSchema);