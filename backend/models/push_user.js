const mongoose = require('mongoose');

const PushUserSchema = new mongoose.Schema({
  endpoint:String,
  expirationTime:Date, //String,
  keys:{
			p256dh:String,
			auth:String,
		}
});

mongoose.model('PushUser', PushUserSchema);