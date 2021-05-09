import path from "path"
import Resizer from "react-image-file-resizer";

const resize_image = (file) => {

	// let file_extension = path.extname( file.name ).toUpperCase().replace(".", "")
	let file_extension = path.extname( file.name ).replace(".", "")
	console.log(`file extension is ${file_extension}`)

	return new Promise((resolve) => {
		Resizer.imageFileResizer(
			file,  // Is the file of the image which will resized.
			800,  // Is the maxWidth of the resized new image. ratio is preserved)
			500, // Is the maxHeight of the resized new image. ratio is preserved)
			file_extension, // Is the compressFormat of the resized new image. JPEG, PNG or WEBP.
			85, // Is the quality of the resized new image. A number between 0 and 100. Used for the JPEG compression.(if no compress is needed, just set it to 100)
			0, // Is the degree of clockwise rotation to apply to uploaded image.
			(uri) => {
				resolve(uri);
			}, // Is the callBack function of the resized new image URI.
			"file", // Is the output type of the resized new image. base64 / blob / file 
		);
	});

}



export default resize_image