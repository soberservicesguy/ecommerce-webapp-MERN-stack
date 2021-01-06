require('./db_settings')
var fs = require('fs');
const mongoose = require('mongoose');

require('../models/order');
// require('../models/user');

const Order = mongoose.model('Order');
// const User = mongoose.model('User');

const {resolve} = require('path')
require('dotenv').config({path: resolve(__dirname,"../.env")})

function bulk_delete_all_orders(){
	Order.deleteMany({}, ()=>null)
}

module.exports = bulk_delete_all_orders