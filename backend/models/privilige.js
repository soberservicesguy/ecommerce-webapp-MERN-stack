
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrivilegeSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,
	privilege_name:String,
	total_users:0,

// other model links
	users:[{ type: Schema.Types.ObjectId, ref: 'User'  }],

})

mongoose.model('Privilege', PrivilegeSchema);
	
PrivilegeSchema.pre('save', function(next) {

	this.total_users = this.users.length
    next();

});

// allow_surfing
// allow_product_uploading
// allow_blogpost_uploading