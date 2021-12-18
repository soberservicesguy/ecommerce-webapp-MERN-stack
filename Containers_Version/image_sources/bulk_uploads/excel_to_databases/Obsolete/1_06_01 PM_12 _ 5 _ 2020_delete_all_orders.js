require('./db_settings')
var fs = require('fs');
const mongoose = require('mongoose');

require('../models/order');
require('../models/user');

const Order = mongoose.model('Order');
const User = mongoose.model('User');

const {resolve} = require('path')
require('dotenv').config({path: resolve(__dirname,"../.env")})

Order.deleteMany({}, ()=>null)
User.deleteMany({}, ()=>null)
