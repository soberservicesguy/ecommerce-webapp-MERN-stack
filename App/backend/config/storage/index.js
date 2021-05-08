const fs = require('fs')
const FS = require('fs').promises
const multer = require('multer');
const path = require('path')
const env = require("dotenv").config({ path: "../../.env" });
const use_gcp_storage = ( process.env.GOOGLE_CLOUD_STORAGE_ENABLED === 'true' ) ? true : false
const use_aws_s3_storage = ( process.env.AWS_S3_STORAGE_ENABLED === 'true' ) ? true : false
const { gcp_storage, save_file_to_gcp, gcp_bucket, save_file_to_gcp_for_bulk_files, get_file_from_gcp, save_file_to_gcp_storage, get_image_from_gcp_as_stream} = require('./google_cloud_storage')
const { get_multers3_storage, s3_bucket, save_file_to_aws_s3, save_file_to_aws_s3_for_bulk_files, get_file_from_aws, save_file_to_s3, get_image_from_aws_as_stream } = require('./aws_s3_storage')
const { get_multer_disk_storage, get_multer_disk_storage_for_bulk_files, get_multer_disk_storage_for_bulk_files_path_only } = require('./disk_storage')
const { checkFileTypeForImages, checkFileTypeForImageAndVideo, checkFileTypeForImagesAndExcelSheet, checkFileTypeForVideos, checkFileTypeForVideosAndExcelSheet} = require('./file_filters')
const base64_encode = require('../../lib/image_to_base64')

let folder_name_to_use_for_snapshots = 'upload_thumbnails'

function get_filepath_to_save_with_bulk_uploading(folder_name, timestamp){

	let filepath
	if (use_gcp_storage){
	
		filepath = `https://storage.googleapis.com/${gcp_bucket}/${folder_name}/${timestamp}/`
	
	} else if (use_aws_s3_storage){
	
		filepath = `http://s3.amazonaws.com/${s3_bucket}/${folder_name}/${timestamp}/` 
	
	} else {
	
		filepath = get_multer_disk_storage_for_bulk_files(timestamp, folder_name)
	
	}

	return filepath
}



async function get_image_to_display(image_path_field, image_host_field){

	let cloud_resp

	let image

	if (image_host_field === 'gcp_storage'){

		cloud_resp = await get_file_from_gcp(image_path_field)
		image = cloud_resp.toString('base64')

	} else if (image_host_field === 'aws_s3'){

		console.log('ATTEMPTING TO GET')
		cloud_resp = await get_file_from_aws(image_path_field)
		image = cloud_resp.toString('base64')

	} else {

		image = base64_encode( image_path_field )

	}

	return image

}


// async function store_video_at_tmp_and_get_its_path(file_payload, video_path_for_local_storage){
function store_video_at_tmp_and_get_its_path(file_payload, video_path_for_local_storage){

	if (use_gcp_storage || use_aws_s3_storage){
		let promise 
		// return new Promise(function(resolve, reject) {
			return FS.writeFile(`/tmp/${file_payload.originalname}`, file_payload.buffer)
			.then(() => {
				return `/tmp/${file_payload.originalname}`			
			})
			.catch(() => {
		        console.log(err)
		        // reject()
			})
		// })



		// let promise = await FS.writeFile(`/tmp/${file_payload.originalname}`, file_payload.buffer)
		// return `/tmp/${file_payload.originalname}`

		// return fs.writeFile(`/tmp/${file_payload.originalname}`, file_payload.buffer, function(err) {
		//     if(err) {
		//         return console.log(err);
		//     }
		//     console.log("The file was saved!");
		// 	return `/tmp/${file_payload.originalname}`
		// })


	} else {

		// returning the old video_path
		return video_path_for_local_storage
		
	}

}


function store_excel_file_at_tmp_and_get_its_path(file_payload, filepath_for_local_storage){

	// let fileContent = await FS.readFile(file)

// console.log('file_payload')
	// console.log(file_payload)
	// console.log(Object.keys(file_payload))
	// console.log(typeof file_payload.buffer)
	// console.log(file_payload.buffer)

	if (use_gcp_storage || use_aws_s3_storage){
		let promise 
		// return new Promise(function(resolve, reject) {
			return FS.writeFile(`/tmp/${file_payload.originalname}`, file_payload.buffer)
			.then(() => {
				return `/tmp/${file_payload.originalname}`			
			})
			.catch((err) => {
		        console.log(err)
		        // reject()
			})
		// })
		// let promise = await FS.writeFile(`/tmp/${file_payload.originalname}`, file_payload.buffer)
		// return `/tmp/${file_payload.originalname}`

		// return fs.writeFile(`/tmp/${file_payload.originalname}`, file_payload.buffer, function(err) {
		//     if(err) {
		//         return console.log(err);
		//     }
		//     console.log("The file was saved!");
		// 	return `/tmp/${file_payload.originalname}`
		// })


	} else {

		// returning the old video_path
		return filepath_for_local_storage
		
	}

}



function delete_video_at_tmp(){

	if (use_gcp_storage || use_aws_s3_storage){
		
	} else {
		// not needed since its stored in /tmp 
	}

}


function get_multer_storage_to_use(timestamp){
	if (use_gcp_storage){
	
		return multer.memoryStorage()
	
	} else if (use_aws_s3_storage){
	
		return get_multers3_storage(timestamp)
	
	} else {
	
		return get_multer_disk_storage(timestamp)
	
	}
}


// USED WHILE SAVING VIDEOS, THEY ARE MANUALLY SAVED IN AWS TOO, BENEFIT IS THAT WE CAN MAKE SCREENSHOTS EASILY
function get_multer_storage_to_use_alternate(timestamp){
	if (use_gcp_storage){
	
		return multer.memoryStorage()
	
	} else if (use_aws_s3_storage){
	
		return multer.memoryStorage()
	
	} else {
	
		return get_multer_disk_storage(timestamp)
	
	}
}


function get_multer_storage_to_use_for_bulk_files(timestamp, folder_name){
	if (use_gcp_storage){
	
		return multer.memoryStorage()
	
	} else if (use_aws_s3_storage){
	
		return multer.memoryStorage()
	
	} else {
	
		return get_multer_disk_storage_for_bulk_files(timestamp, folder_name)
	
	}
}



function get_file_storage_venue(){
	if (use_gcp_storage){
	
		return 'gcp_storage'
	
	} else if (use_aws_s3_storage){
	
		return 'aws_s3'
	
	} else {
	
		return 'disk_storage'
	
	}
}


function get_file_path_to_use(file_to_save, folder_name, timestamp){

	let filename_to_use

	if (use_gcp_storage){

		// since  gcp doesnt use multer therefore originalname property should be used as there is no filename property by default
		filename_to_use = path.basename( file_to_save.originalname, path.extname( file_to_save.originalname ) ) + '-' + timestamp + path.extname( file_to_save.originalname )
		// return `https://storage.googleapis.com/${gcp_bucket}/${folder_name}/${filename_to_use}` 
		return `${folder_name}/${filename_to_use}` 

	} else if (use_aws_s3_storage){

		filename_to_use = path.basename( file_to_save.originalname, path.extname( file_to_save.originalname ) ) + '-' + timestamp + path.extname( file_to_save.originalname )
		// return `http://s3.amazonaws.com/${s3_bucket}/${folder_name}/${filename_to_use}`
		return `${folder_name}/${filename_to_use}` 

	} else {

		// filename_to_use = path.basename( file_to_save.filename, path.extname( file_to_save.filename ) ) + '-' + timestamp + path.extname( file_to_save.filename )	
		filename_to_use = path.basename( file_to_save.filename, path.extname( file_to_save.filename ) )  + path.extname( file_to_save.filename )	
		return `assets/uploads/${folder_name}/${filename_to_use}`	
	}	
}

// used for videos
function get_file_path_to_use_alternate(file_to_save, folder_name, timestamp){

	let filename_to_use

	if (use_gcp_storage){

		// since  gcp doesnt use multer therefore originalname property should be used as there is no filename property by default
		filename_to_use = path.basename( file_to_save.originalname, path.extname( file_to_save.originalname ) ) + '-' + timestamp + path.extname( file_to_save.originalname )
		// filename_to_use = path.basename( file_to_save.originalname, path.extname( file_to_save.originalname ) )  + path.extname( file_to_save.originalname )
		// return `https://storage.googleapis.com/${gcp_bucket}/${folder_name}/${filename_to_use}` 
		return `${folder_name}/${filename_to_use}` 

	} else if (use_aws_s3_storage){

		filename_to_use = path.basename( file_to_save.originalname, path.extname( file_to_save.originalname ) ) + '-' + timestamp + path.extname( file_to_save.originalname )
		// return `http://s3.amazonaws.com/${s3_bucket}/${folder_name}/${filename_to_use}`
		return `${folder_name}/${filename_to_use}` 

	} else {


		filename_to_use = path.basename( file_to_save.filename, path.extname( file_to_save.filename ) ) + path.extname( file_to_save.filename )	
		return `assets/uploads/${folder_name}/${filename_to_use}`	
	}	
}



function get_file_path_to_use_for_bulk_files(timestamp, folder_name, file_to_save){

	// let filename_to_use = path.basename( file_to_save, path.extname( file_to_save ) ) + '-' + timestamp + path.extname( file_to_save )
	let filename_to_use = file_to_save

	// console.log('filename_to_use')
	// console.log(filename_to_use)

	// console.log(`assets/uploads/${folder_name}/${filename_to_use}`)

	if (use_gcp_storage){

		// return `${bucket_name}/${file_to_save}` 
		return `https://storage.googleapis.com/${gcp_bucket}/${folder_name}/${timestamp}/${filename_to_use}` 

	} else if (use_aws_s3_storage){

		// return `${bucket_name}/${file_to_save}`
		return `http://s3.amazonaws.com/${s3_bucket}/${folder_name}/${timestamp}/${filename_to_use}`

	} else {

		return `assets/uploads/${folder_name}/${timestamp}/${filename_to_use}`

	}	
}



function get_snapshots_storage_path(){

	if (use_gcp_storage || use_aws_s3_storage){
	
		return '/tmp'
		
	} else {
	
		return `assets/uploads/${folder_name_to_use_for_snapshots}`
	
	}	

}


function get_snapshots_fullname_and_path(folder_name, filename_without_format, timestamp){
	if (use_gcp_storage || use_aws_s3_storage){

		return `${folder_name}/${filename_without_format}-${timestamp}_.png`

	} else {

		return `assets/uploads/${folder_name}`

	}
}

function get_image_as_stream(complete_file_name, image_host_field, res){

	if (image_host_field === 'gcp_storage'){

		get_image_from_gcp_as_stream(complete_file_name, res)

	} else if (image_host_field === 'aws_s3'){

		get_image_from_aws_as_stream(complete_file_name, res)

	} else {

		var stream = fs.createReadStream(complete_file_name);		

		res.writeHead(200, {'Content-Type': 'image/jpg' });

		stream.on('error', function(err) {
			console.log(err)
			return
		})

		stream.on('data', function(data) {
			res.write(data);
		})

		stream.on('end', function() {
			res.end();
		});

	}	

}


module.exports = {
	get_filepath_to_save_with_bulk_uploading,
	store_excel_file_at_tmp_and_get_its_path,
	get_multer_disk_storage_for_bulk_files,
	get_file_path_to_use_alternate,
	get_image_to_display,
	store_video_at_tmp_and_get_its_path,
	delete_video_at_tmp,
	get_multer_storage_to_use,
	get_multer_storage_to_use_alternate,
	get_multer_storage_to_use_for_bulk_files,
	get_file_storage_venue,
	get_file_path_to_use,
	get_file_path_to_use_for_bulk_files,
	get_snapshots_storage_path,
	get_snapshots_fullname_and_path,
	get_image_as_stream,

	gcp_bucket,
	save_file_to_gcp_storage,
	save_file_to_gcp,
	save_file_to_gcp_for_bulk_files,
	use_gcp_storage,
	get_file_from_gcp,

	s3_bucket,
	use_aws_s3_storage,
	save_file_to_s3,
	get_file_from_aws,
	save_file_to_aws_s3,
	save_file_to_aws_s3_for_bulk_files,

	checkFileTypeForImages,
	checkFileTypeForVideos,
	checkFileTypeForImageAndVideo,
	checkFileTypeForImagesAndExcelSheet,
	checkFileTypeForVideosAndExcelSheet,
	get_multer_disk_storage_for_bulk_files_path_only,
}