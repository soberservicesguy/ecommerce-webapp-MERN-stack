require('./db_settings')
var fs = require('fs');
const mongoose = require('mongoose');

require('../models/blogpost');

const BlogPost = mongoose.model('BlogPost');

const {resolve} = require('path')
require('dotenv').config({path: resolve(__dirname,"../.env")})

BlogPost.deleteMany({}, ()=>null)
