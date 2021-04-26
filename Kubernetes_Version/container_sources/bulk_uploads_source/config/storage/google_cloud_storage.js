const env = require("dotenv").config({ path: "../../.env" });

const path = require('path')
const { Storage } = require("@google-cloud/storage");
const gcp_storage = new Storage({
	keyFilename: env.gcp_keyFilename,
	projectId: evn.gcp_projectId,
})

let gcp_bucket = env.gcp_bucket

function get_file_from_gcp(complete_file_name){

	let the_bucket = gcp_storage.bucket(gcp_bucket)
	// return the_bucket.file(complete_file_name).createReadStream()
	// remoteReadStream.pipe(someLocalWriteStream);

	let the_file = the_bucket.file(complete_file_name)
	let fileContents = new Buffer('');

	return new Promise(function(resolve, reject){

		the_file.createReadStream()
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



function save_file_to_gcp(timestamp, file_payload){

	let the_bucket = gcp_storage.bucket(gcp_bucket)
	let the_file

	try{

		console.log('FILE BEING SAVED AT GCP')
		console.log(`${file_payload.fieldname}s/${path.basename( file_payload.originalname, path.extname( file_payload.originalname ) ) + '-' + timestamp + path.extname( file_payload.originalname )}`)
		the_file = the_bucket.file(`${file_payload.fieldname}s/${path.basename( file_payload.originalname, path.extname( file_payload.originalname ) ) + '-' + timestamp + path.extname( file_payload.originalname )}`);
		return the_file.save(file_payload.buffer)

	} catch (err){

		console.log(err)

	}

	// let file_write_stream = the_file.createWriteStream();

	// console.log('finish1')

	// return new Promise(function(resolve, reject){
	// 	file_write_stream.on('error', (err) => {
	// 		console.log('saving file error', err);
	// 		next(err);
	// 		reject()
	// 			console.log('finish2')

	// 		return;
	// 	})
	// 	.on('finish', () => {
	// 		console.log(`${file_payload.originalname} uploaded to gcp`)
	// console.log('finish3')

	// 	})
	// 	// .end( file_payload.buffer ); // as seen in https://stackoverflow.com/questions/43171193/retrieving-images-from-google-cloud-storage-in-node-js-without-public-url#_=_
	// 	.on('end', function () {
	// 		// res.end();
	// 			console.log('finish4')

	// 		resolve()
	// 	});
	// })

}

// USE THIS WAY save_file_to_gcp_for_bulk_files( get_proper_date(timestamp), 'bulk_ads', req.files['das'][0] )
async function save_file_to_gcp_for_bulk_files(timestamp, folder_name, file){

	let the_bucket = gcp_storage.bucket(gcp_bucket)
	let the_file

	try{

		the_file = the_bucket.file(`${folder_name}/${timestamp}/${file.originalname}`)
		await the_file.save(file.buffer)

	} catch (err){

		console.log(err)

	}

}

// being used for snapshots
async function save_file_to_gcp_storage(file, filename_to_set, path_to_upload){

	console.log('file.buffer')
	console.log(file)

	let FS = require('fs').promises

	let fileContent = await FS.readFile(file)

	let the_bucket = gcp_storage.bucket(gcp_bucket)
	let the_file

	try {

		the_file = the_bucket.file(`${path_to_upload}/${filename_to_set}`)
		let response = the_file.save(fileContent)
		// console.log('the_file.save(fileContent)')
		// console.log(response)
		return response
		// return the_file.save(fileContent)

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




module.exports = {
	save_file_to_gcp_storage,
	gcp_storage,
	gcp_bucket,
	get_file_from_gcp,
	save_file_to_gcp,
	save_file_to_gcp_for_bulk_files,
}