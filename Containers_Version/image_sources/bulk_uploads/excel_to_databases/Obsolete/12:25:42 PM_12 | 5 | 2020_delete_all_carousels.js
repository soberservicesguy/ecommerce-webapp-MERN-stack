require('./db_settings')
var fs = require('fs');
const mongoose = require('mongoose');

require('../models/carousel');

const Carousel = mongoose.model('Carousel');

const {resolve} = require('path')
require('dotenv').config({path: resolve(__dirname,"../.env")})

Carousel.deleteMany({}, ()=>null)
