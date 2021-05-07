// require('../../models/image');
require('../../models/product');
require('../../models/image');
require('../../models/user');

const passport = require('passport');
const { isAllowedSurfing } = require('../authMiddleware/isAllowedSurfing')
const { isAllowedUploadingProducts } = require('../authMiddleware/isAllowedUploadingProducts')

const base64_encode = require('../../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
// const Image = mongoose.model('Image');
const Product = mongoose.model('Product');
const User = mongoose.model('User');
const Image = mongoose.model('Image');


const multer = require('multer');
const path = require('path')

const fs = require('fs')


const {
	get_multer_disk_storage_for_bulk_files_path_only,
	get_filepath_to_save_with_bulk_uploading,
	store_excel_file_at_tmp_and_get_its_path,
	get_multer_storage_to_use,
	get_multer_storage_to_use_for_bulk_files,
	get_file_storage_venue,
	get_file_path_to_use,
	get_file_path_to_use_for_bulk_files,

	use_gcp_storage,
	use_aws_s3_storage,

	save_file_to_gcp,
	save_file_to_gcp_for_bulk_files,
	gcp_bucket,

	get_snapshots_storage_path,

	save_file_to_aws_s3,
	save_file_to_aws_s3_for_bulk_files,

	get_multer_disk_storage_for_bulk_files,

	checkFileTypeForImages,
	checkFileTypeForImageAndVideo,
	checkFileTypeForImagesAndExcelSheet,
} = require('../../config/storage/')

let timestamp
let currentDate
let currentTime




// Init Upload
function bulk_upload_product_categories(timestamp, folder_name){

	return multer({
		storage: get_multer_storage_to_use_for_bulk_files(timestamp, folder_name),
		limits:{fileSize: 200000000}, // 1 mb
		fileFilter: function(req, file, cb){
			checkFileTypeForImagesAndExcelSheet(file, cb);
		}
	}).fields([
		// { name: 'excel_sheet', maxCount: 1 }, // NO EXCEL SHEET NEEDED 
		{ name: 'product_category_images_upload', maxCount: 1000 }
	])  // these are the fields that will be dealt
	// .single('product_category_images_upload'); 
	// .array('photos', 12)

} 


// create blogpost with undefined
// USED IN CREATING BLOGPOST
router.post('/bulk-upload-product-categories', passport.authenticate('jwt', { session: false }), isAllowedUploadingProducts, function(req, res, next){
	
	// console.log('OUTER LOG')
	// console.log(req.body)

	timestamp = new Date()
	currentDate = timestamp.toLocaleDateString("en-US").split("/").join(" | ");
	currentTime = timestamp.toLocaleTimeString("en-US").split("/").join(" | ");

	bulk_upload_product_categories( `${currentDate}_${currentTime}`, 'bulk_product_categories' )(req, res, (err) => {
		if(err){

			console.log(err)

		} else {

			let filename_without_format
			let images = req.files['product_category_images_upload']

			{(async () => {

				if (use_gcp_storage){

					// await save_file_to_gcp_for_bulk_files( `${currentDate}_${currentTime}`, 'bulk_product_categories', req.files['excel_sheet'][0] )
					

					images = req.files['product_category_images_upload']
					Promise.all(images.map(async (image_file) => {
						await save_file_to_gcp_for_bulk_files( `${currentDate}_${currentTime}`, 'bulk_product_categories', image_file )
					}))

					// await save_file_to_gcp_for_bulk_files( `${currentDate}_${currentTime}`, 'bulk_product_categories', excel_file )

					console.log('SAVED TO GCP')

				} else if (use_aws_s3_storage) {

					// await save_file_to_aws_s3_for_bulk_files( `${currentDate}_${currentTime}`, 'bulk_product_categories', req.files['excel_sheet'][0])

					// await save_file_to_aws_s3_for_bulk_files( `${currentDate}_${currentTime}`, 'bulk_product_categories', excel_file )					
					
					images = req.files['product_category_images_upload']
					Promise.all(images.map(async (image_file) => {
						await save_file_to_aws_s3_for_bulk_files( `${currentDate}_${currentTime}`, 'bulk_product_categories', image_file )
					}))
					
					console.log('SAVED TO AWS')

				} else {

					console.log('SAVED TO DISK STORAGE')

				}


				try {

					// creating image db objects
					Promise.all(images.map(async (image_file) => {

						let image_filepath_value

						if (use_gcp_storage || use_aws_s3_storage){

							image_filepath_value = `bulk_product_categories/${currentDate}_${currentTime}/${image_file.originalname}`

						} else {

							image_filepath_value = get_file_path_to_use_for_bulk_files(`${currentDate}_${currentTime}`,'bulk_product_categories', image_file.originalname)

						}


						filename_without_format = path.basename( image_file.originalname, path.extname( image_file.originalname ) )
						let newImage = new Image({
							_id: new mongoose.Types.ObjectId(),
							category: 'product_category',
							product_category_name: filename_without_format,
							image_filepath: image_filepath_value,
							// image_filepath: get_file_path_to_use_for_bulk_files(`${currentDate}_${currentTime}`,'bulk_product_categories', image_file.originalname),
							// image_filepath: `${get_filepath_to_save_with_bulk_uploading('bulk_product_categories', `${currentDate}_${currentTime}`)}${image_file.originalname}`,
							object_files_hosted_at: get_file_storage_venue(),
						});
						// there is no title or name attribute in image db, therefore adding a field in its object so that it can be filtered in sheet_to_class
					// NO NEED TO USE ANY EXCEL SHEET, SINCE THE IMAGE NAMES ARE USED AS CATEGORY NAMES
						await newImage.save()

					}))

					res.status(200).json({ success: true, msg: 'new product categories created'});	

				} catch (err){
					console.log(err)
					res.status(200).json({ success: false, msg: "new products NOT created, try again" });
				}


			})()}


		}
	})
})




module.exports = router;