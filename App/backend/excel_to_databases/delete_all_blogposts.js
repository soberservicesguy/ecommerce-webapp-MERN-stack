require('./db_settings')
var fs = require('fs');
const mongoose = require('mongoose');

require('../models/blogpost');

const BlogPost = mongoose.model('BlogPost');

const {resolve} = require('path')
require('dotenv').config({path: resolve(__dirname,"../.env")})

function bulk_delete_all_blogposts(){
	BlogPost.deleteMany({}, ()=>null)
}

module.exports = bulk_delete_all_blogposts