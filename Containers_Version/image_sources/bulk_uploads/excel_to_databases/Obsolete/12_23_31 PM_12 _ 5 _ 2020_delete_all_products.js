require('./db_settings')
var fs = require('fs');
const mongoose = require('mongoose');

require('../models/product');

const Product = mongoose.model('Product');

const {resolve} = require('path')
require('dotenv').config({path: resolve(__dirname,"../.env")})

Product.deleteMany({}, ()=>null)
