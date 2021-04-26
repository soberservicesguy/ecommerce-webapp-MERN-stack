var arguments_supplied = process.argv.slice(2);
var url_to_set = arguments_supplied[0]


const fs = require('fs')

const file_path = './App/frontend/src/utilities.js'

// const regex_for_uncommented_baseUrl = /\s+baseUrl/
const regex_for_uncommented_baseUrl = /(?<!\/\/)\s+baseUrl/



async function set_baseURL_in_utilities(){
	var file_lines_content = fs.readFileSync(file_path).toString().split("\n");


	let file_lines_with_matched_regex = file_lines_content.filter((line) => {
		return regex_for_uncommented_baseUrl.test(line) === true
	})


	file_lines_with_matched_regex = file_lines_with_matched_regex[0]
	
	// console.log('file_lines_with_matched_regex')
	// console.log(file_lines_with_matched_regex)

	const index = file_lines_content.indexOf( file_lines_with_matched_regex );
	
	let newLine = `\tbaseUrl: '${url_to_set}',`

	if (index > -1) {
		file_lines_content.splice(index, 1);
		file_lines_content.splice(index, 0, newLine);
	}
	

	let final_content_to_write = file_lines_content.join("\n")	


	// console.log(final_content_to_write); 


	await fs.writeFile(file_path, final_content_to_write, function (err) {
		if (err) return console.log(err);
	});


}

set_baseURL_in_utilities()


module.exports = set_baseURL_in_utilities