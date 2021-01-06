require('./db_settings')
var fs = require('fs');
const mongoose = require('mongoose');

require('../models/productcollection');

const ProductCollection = mongoose.model('ProductCollection');

const {resolve} = require('path')
require('dotenv').config({path: resolve(__dirname,"../.env")})

ProductCollection.deleteMany({}, ()=>null)
