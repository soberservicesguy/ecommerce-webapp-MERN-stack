require('./db_settings')
var fs = require('fs');
const mongoose = require('mongoose');

require('../models/blogpost');

const Blogpost = mongoose.model('Blogpost');

const {resolve} = require('path')
require('dotenv').config({path: resolve(__dirname,"../.env")})

Blogpost.deleteMany({}, ()=>null)
