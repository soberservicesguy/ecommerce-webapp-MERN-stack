const path = require('path')

function checkFileTypeForVideos(file, cb){
	// Allowed ext
	let filetypes = /mp4|avi|flv/;
	// Check ext
	let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	let mimetype = filetypes.test(file.mimetype);

	if(mimetype && extname){
		return cb(null,true);
	} else {
		cb('Error: mp4, avi,flv Videos Only!');
	}
}

function checkFileTypeForImages(file, cb){

	// Allowed ext
	let filetypes_for_image = /jpeg|jpg|png|gif/

	// Check ext
	let extname_for_image = filetypes_for_image.test( path.extname(file.originalname).toLowerCase() );

	// Check mime
	let mimetype_for_image = filetypes_for_image.test( file.mimetype );

		
	if (mimetype_for_image && extname_for_image) {
		cb(null, true);
	} else {
		cb('Error: jpeg, jpg, png, gif Images Only!');
	}

}

// works when image field is kept image_upload
function checkFileTypeForImageAndVideo(image_fieldname, video_fieldname){ 

	// return checkFileTypeForImageAndVideo(file, cb){
	return (file, cb) => {
		// Allowed ext
		let filetypes_for_image = /jpeg|jpg|png|gif/
		// let filetypes_for_video = /xlsx|xls/
		let filetypes_for_video = /mp4|mov|avi|flv/;

		// Check ext
		let extname_for_image = filetypes_for_image.test( path.extname(file.originalname).toLowerCase() );
		let extname_for_video = filetypes_for_video.test( path.extname(file.originalname).toLowerCase() );

		// Check mime
		let mimetype_for_image = filetypes_for_image.test( file.mimetype );
		let mimetype_for_video = filetypes_for_video.test( file.mimetype );

		if (file.fieldname === image_fieldname) { // if uploading resume
			
			if (mimetype_for_image && extname_for_image) {
				cb(null, true);
			} else {
				cb('Error: jpeg, jpg, png, gif Images Only!');
			}

		} else { // else uploading images

			if (mimetype_for_video && extname_for_video) {
				cb(null, true);
			} else {
				cb('Error: mp4, mov, avi, flv Videos Only!');
			}

		}
	}

}

// works when excel sheet field is kept excel_sheet
function checkFileTypeForImagesAndExcelSheet(file, cb){

	// Allowed ext
	let filetypes_for_image = /jpeg|jpg|png|gif/
	// let filetypes_for_excelsheet = /xlsx|xls/
	let filetypes_for_excelsheet = /[A-Za-z]+/

	// Check ext
	let extname_for_image = filetypes_for_image.test( path.extname(file.originalname).toLowerCase() );
	let extname_for_excelsheet = filetypes_for_excelsheet.test( path.extname(file.originalname).toLowerCase() );

	// Check mime
	let mimetype_for_image = filetypes_for_image.test( file.mimetype );
	let mimetype_for_excelsheet = filetypes_for_excelsheet.test( file.mimetype );


	if (file.fieldname === "excel_sheet") { // if uploading resume
		
		if (mimetype_for_excelsheet && extname_for_excelsheet) {
			cb(null, true);
		} else {
			cb('Error: only .xlsx, .xls for excel files');
		}

	} else { // else uploading images

		if (mimetype_for_image && extname_for_image) {
			cb(null, true);
		} else {
			cb('Error: jpeg, jpg, png, gif Images Only!');
		}

	}

}


function checkFileTypeForVideosAndExcelSheet(file, cb){

	let filetypes_for_video = /mp4|mov|avi|flv/;
	let filetypes_for_excelsheet = /[A-Za-z]+/

	// Allowed ext
	let extname_for_video = filetypes_for_video.test( path.extname(file.originalname).toLowerCase() );
	let extname_for_excelsheet = filetypes_for_excelsheet.test( path.extname(file.originalname).toLowerCase() );

	// Check mime
	let mimetype_for_video = filetypes_for_video.test( file.mimetype );
	let mimetype_for_excelsheet = filetypes_for_excelsheet.test( file.mimetype );

	if (file.fieldname === "excel_sheet") { // if uploading resume
		
		if (mimetype_for_excelsheet && extname_for_excelsheet) {
			cb(null, true);
		} else {
			cb('Error: only .xlsx, .xls for excel files');
		}

	} else { // else uploading videos

		if (mimetype_for_video && extname_for_video) {
			cb(null, true);
		} else {
			cb('Error: mp4, mov, avi, flv Videos Only!');
		}

	}

}

module.exports = {
	checkFileTypeForImages,
	checkFileTypeForVideos,
	checkFileTypeForImageAndVideo,
	checkFileTypeForImagesAndExcelSheet,
	checkFileTypeForVideosAndExcelSheet,
}