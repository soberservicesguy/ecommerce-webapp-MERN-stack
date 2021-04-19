
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	serial_number:String,

// other model links
	user:{ type: Schema.Types.ObjectId, ref: 'User' },

})

mongoose.model('Order', OrderSchema);
	
OrderSchema.pre('save', function(next) {

    next();

});
