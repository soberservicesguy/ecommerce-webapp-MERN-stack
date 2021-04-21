require('./db_settings')
var fs = require('fs');
const mongoose = require('mongoose');

require('../models/product');

const Product = mongoose.model('Product');

const {resolve} = require('path')
require('dotenv').config({path: resolve(__dirname,"../.env")})


function bulk_delete_all_products(){
	Product.deleteMany({}, ()=>null)
}

module.exports = bulk_delete_all_products