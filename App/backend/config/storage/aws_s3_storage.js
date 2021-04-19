const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const path = require( 'path' );
const fs = require('fs')
const FS = require('fs').promises

let s3_bucket = 'portfolio-social-app'

s3_params = {
	accessKeyId: 'AKIAW2YVB4HUU247OPCY',
	secretAccessKey: '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',
	Bucket: s3_bucket, // bucket name
// not needed
	// region: 'Asia Pacific (Singapore) ap-southeast-1',
	// s3BucketEndpoint:true,
	// endpoint:"http://" + s3_bucket + ".s3.amazonaws.com",	
}

const s3 = new aws.S3(s3_params)


// const multers3_storage = multerS3({
// 	s3: s3,
// 	bucket: s3_bucket, // bucket name
// 	acl: 'aws-exec-read',
// 	key: function (req, file, cb) {
// 		cb(null, `${'avatar_images'}/${path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + timestamp_in_aws_multer + path.extname( file.originalname )}`)
// 	}
// })

function get_multers3_storage(timestamp){

	return multerS3({
		s3: s3,
		bucket: s3_bucket, // bucket name
		acl: 'aws-exec-read',
		key: function (req, file, cb) {
			cb(null, `${file.fieldname}s/${path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + timestamp + path.extname( file.originalname )}`)
		}
	})

}

function get_file_from_aws(complete_file_name){

	// console.log('complete_file_name')
	// console.log(complete_file_name)

	let params = { Bucket:s3_bucket, Key: complete_file_name }
	let fileContents = new Buffer('');

	return new Promise(function(resolve, reject){

		s3.getObject(params).createReadStream()
		.on('error', function(err) {

			console.log(err)
			reject()

		})
		.on('data', function(chunk) {

			fileContents = Buffer.concat([fileContents, chunk]);

		})
		.on('end', function() {

			resolve(fileContents)

		});


	})

}



// USED WHEN MULTER IS USING RAM STORAGE
function save_file_to_aws_s3(file_payload, timestamp){

	let filename_to_use
	let params
	console.log('timestamp')
	console.log(timestamp)

	if (typeof timestamp === 'undefined' || timestamp === null){

		filename_to_use = `${file_payload.originalname}`

	} else {

		filename_to_use = `${path.basename( file_payload.originalname, path.extname( file_payload.originalname ) ) + '-' + timestamp + path.extname( file_payload.originalname )}`

		console.log('filename_to_use')
		console.log(filename_to_use)
	}

			
			params = {
				Bucket:s3_bucket, 
				Key:`${file_payload.fieldname}s/${filename_to_use}`, 
				// Body: file_payload,
				Body: file_payload.buffer,
			}

		// } else {

			// params = {
			// 	Bucket:s3_bucket, 
			// 	Key:`${file_path}/${file_payload}`, 
			// 	Body: file_payload 
			// }

		// }

	// } else {

		// console.log('PATH IS BELOW')
		// console.log( path.basename( file_payload.originalname, path.extname( file_payload.originalname ) ) + '-' + timestamp + path.extname( file_payload.originalname ) )
		// console.log( `${file_payload.fieldname}s/${path.basename( file_payload.originalname, path.extname( file_payload.originalname ) ) + '-' + timestamp + path.extname( file_payload.originalname )}` )

	// 	if (typeof file_path === 'undefined' || file_path === null){

	// 		params = {
	// 			Bucket:s3_bucket, 
	// 			Key:`${file_payload.fieldname}s/${path.basename( file_payload.originalname, path.extname( file_payload.originalname ) ) + '-' + timestamp + path.extname( file_payload.originalname )}`, 
	// 			Body: file_payload 
	// 		}

	// 	} else {

	// 		params = {
	// 			Bucket:s3_bucket, 
	// 			Key:`${file_path}/${path.basename( file_payload.originalname, path.extname( file_payload.originalname ) ) + '-' + timestamp + path.extname( file_payload.originalname )}`, 
	// 			Body: file_payload 
	// 		}

	// 	}

	// }


	// let fileContent = await FS.readFile(file_payload)

	// var params = {
	// 	Body: fileContent, 
	// 	Bucket:s3_bucket, 
	// 	Key: `${path_to_upload}/${filename_to_set}`, // only filename and not path
	// };


	console.log('CAME OUT') 
	let response = s3.putObject(params).promise()
	return response
	// return s3.putObject(params, function(err, resp){
	// 	if (err === null) {
	// 		console.log('RESPONSE')
	// 		console.log(resp)
	// 	}
	// 	console.log(`${file_payload} FILE SAVED PROBABLY`)
	// })

	// let params = {...s3_params, Key:file_name_with_path, Body: file_content}
	// let conditions = {partSize: 10 * 1024 * 1024, queueSize: 1}
	// new aws.S3.upload(params, conditions, function(err, data){
	// 	console.log(err, data);
	// })

}

// USED WHEN FILE IS READ FROM SOMEWHERE AND IS BEING UPLOADED
async function save_file_to_s3(file, filename_to_set, path_to_upload){

	console.log('file.buffer')
	console.log(file)

	let fileContent = await FS.readFile(file)

	var params = {
		Body: fileContent, 
		Bucket:s3_bucket, 
		Key: `${path_to_upload}/${filename_to_set}`, // only filename and not path
	};

	try {

		let response = s3.putObject(params).promise()
		return response

	} catch (err){
		console.log(err)
	}

	// return await fs.readFileAsync(file, async (error, fileContent) => {
	// 	// if unable to read file contents, throw exception
	// 	console.log('fileContent')
	// 	console.log(fileContent)

	// 	if (error) { throw error; }

	// 	var params = {
	// 		Body: fileContent, 
	// 		Bucket:s3_bucket, 
	// 		Key: `${path_to_upload}/${filename_to_set}`, // only filename and not path
	// 	};

	// 	try {

	// 		let response = await s3.putObject(params).promise()
	// 		// let response = await s3.putObject(params).promise()
	// 		// console.log('response')
	// 		// console.log(response)
	// 		return response

	// 	} catch (err){
	// 		console.log(err)
	// 	}

	// });


	// var params = {
	// 	Body: file.buffer, 
	// 	Bucket:s3_bucket, 
	// 	Key: `${file_path}/${file.originalname}`, 
	// };

	// return s3.putObject(params, function(err, resp) {
	// 	if (err === null) {
	// 		console.log('RESPONSE')
	// 		console.log(resp)
	// 	}
	// 	console.log(`${file} FILE SAVED PROBABLY`)
	// });
}

// WRONG, TRY TO COPY save_file_to_aws_s3 AND RECREATE IT
// USER THIS WAY save_file_to_aws_s3_for_bulk_files( get_proper_date(timestamp), 'bulk_ads', req.files['das'][0] )
async function save_file_to_aws_s3_for_bulk_files(timestamp, folder_name, file){

	let params = { 
		Bucket:s3_bucket, 
		Key:`${folder_name}/${timestamp}/${file.originalname}`, 
		Body: file.buffer
	}

	return s3.putObject(params, function(resp){
		console.log(resp)
	})


	// let s3_client = new aws.S3.client
	// return s3_client.putObject(params, function(resp){
	// 	console.log(resp)
	// })

}

module.exports = {
	save_file_to_s3,
	get_multers3_storage,
	s3_bucket,

	get_file_from_aws,
	save_file_to_aws_s3,
	save_file_to_aws_s3_for_bulk_files,
}