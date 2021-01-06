//http://www.hacksparrow.com/base64-encoding-decoding-in-node-js.html
var fs = require('fs');
const path = require("path");

// function to encode file data to base64 encoded string
function base64_encode(file) {

    const bitmap = fs.readFileSync(path.join(__dirname, '..', file));

    // give file argument as /assets/images/samosa.jpeg

    return new Buffer(bitmap).toString('base64');
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}

// convert image to base64 encoded string

// var base64str = base64_encode('salvarDocumento.png');
// console.log(base64str);
// convert base64 string back to image 
// base64_decode(base64str, 'copy_salvarDocumento.png');




// https://gist.github.com/crspiccin/790796a68e7178404de4

module.exports = base64_encode;


// <img 
// 	src={`data:image/jpg;base64, ${item.image}`}
// 	width={100}
// 	height={100}
// />
