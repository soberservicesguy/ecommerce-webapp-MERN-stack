const path = require('path')
const multer = require('multer');
const fs = require('fs')
const env = require("dotenv").config({ path: "../../.env" });
const use_gcp_storage = ( process.env.GOOGLE_CLOUD_STORAGE_ENABLED === 'true' ) ? true : false
const use_aws_s3_storage = ( process.env.AWS_S3_STORAGE_ENABLED === 'true' ) ? true : false

let path_for_saving_files = '../../assets/uploads/'

if (use_gcp_storage === false && use_aws_s3_storage === false){

	// all are exact plural  of fieldnames

	let all_links = [
	// images
		// './assets/uploads/advertisement_images',
		// './assets/uploads/avatar_images',
		// './assets/uploads/book_images',
		// './assets/uploads/cover_images',
		// './assets/uploads/page_images',
		// './assets/uploads/social_post_images',
		// './assets/uploads/sport_images',

	// videos
		'./assets/uploads/videos_uploaded_by_user',

		// './assets/uploads/social_post_videos',
		// './assets/uploads/thumbnails_for_social_videos',
	]

	Promise.all(all_links.map(async (dirpath) => {

		try {

			await fs.promises.mkdir(dirpath, { recursive: true })
			console.log(`created ${dirpath}`)

		} catch (err){

			console.log(`was already created probably${dirpath}`)
			console.log(err)

		}

	}))

}



function get_multer_disk_storage(timestamp){
	// currentDate = new Date().toLocaleDateString("en-US").split("/").join(" | ");
	// currentTime = new Date().toLocaleTimeString("en-US").split("/").join(" | ");

	return multer.diskStorage({
		destination: async function(req, file, cb){

			let file_path = path.join(__dirname , `${path_for_saving_files}/${file.fieldname}s`)

			await fs.access(file_path, function(err) {
		// adding directories is not working
				// if (err && err.code === 'ENOENT') {
				// 	fs.mkdir(file_path); //Create dir in case not found
				// }
			});

			cb(null, file_path)	

		},

		filename: function(req, file, cb){

			// let file_format = file.fieldname + '-' + timestamp + path.extname(file.originalname)
			let file_format = path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + timestamp + path.extname(file.originalname)
			cb(null, file_format);

		},
	})

}

// USED FOR BULK UPLOADS
function get_multer_disk_storage_for_bulk_files(timestamp, folder_name){

	return multer.diskStorage({
		destination: async function(req, file, cb){

			fs.mkdir( path.join(__dirname , `${path_for_saving_files}/${folder_name}/${timestamp}`), { recursive: true }, (err) => {
				if (err) throw err;
			})

			let file_path = path.join(__dirname , `${path_for_saving_files}/${folder_name}/${timestamp}`)



		//  create directory if not exists is not working, so created all manually
			// await fs.access(file_path, function(err) {
				// if (err && err.code === 'ENOENT') {
				// 	fs.mkdir(file_path, { recursive: true }); //Create dir in case not found
				// }
			// });

			console.log('FILES WILL BE SAVED HERE')
			console.log(file_path)

			cb(null, file_path)	

		},

		filename: function(req, file, cb){

			// let file_format = file.fieldname + '-' + timestamp + path.extname(file.originalname)
			// let file_format = path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + timestamp + path.extname(file.originalname)
			let file_format = file.originalname
			cb(null, file_format);

		},
	})

}



// NOT NEEDED ANYMORE
// const image_storage = multer.diskStorage({
// 	destination: path.join(__dirname , '../../assets/uploads/avatar_image'),
// 	filename: function(req, file, cb){
// 		// file name pattern fieldname-currentDate-fileformat
// 		filename_used_to_store_image_in_assets_without_format = file.fieldname + '-' + Date.now()
// 		filename_used_to_store_image_in_assets = filename_used_to_store_image_in_assets_without_format + path.extname(file.originalname)

// 		cb(null, filename_used_to_store_image_in_assets);

// 	}
// });


// const cover_and_avatar_storage = multer.diskStorage({
// 	// destination: path.join(__dirname , '../../assets/bulk_blogposts/'),
// 	destination:function(req, file, cb){
// 		// let file_path = `./uploads/${type}`;
// 		currentDate = new Date().toLocaleDateString("en-US").split("/").join(" | ");
// 		currentTime = new Date().toLocaleTimeString("en-US").split("/").join(" | ");

// 		if (file.fieldname === "avatar_image") {

// 			let file_path = path.join(__dirname , '../../assets/uploads/avatar_image/')
// 			console.log(file_path)
// 			cb(null, file_path)	

// 		} else {

			
// 			let file_path = path.join(__dirname , `../../assets/uploads/cover_image/`)
// 			console.log(file_path)
// 			cb(null, file_path)	

// 		}

// 	},
// 	filename: function(req, file, cb){
// 		// file name pattern fieldname-currentDate-fileformat
// 		// filename_used_to_store_image_in_assets_without_format = file.fieldname + '-' + Date.now()
// 		// filename_used_to_store_image_in_assets = filename_used_to_store_image_in_assets_without_format + path.extname(file.originalname)

// 		filename_used_to_store_image_in_assets = file.originalname
// 		cb(null, file.originalname);

// 	}
// });


module.exports = {
	get_multer_disk_storage,
	get_multer_disk_storage_for_bulk_files,
}