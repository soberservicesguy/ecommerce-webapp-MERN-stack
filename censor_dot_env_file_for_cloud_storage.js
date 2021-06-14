// var arguments_supplied = process.argv.slice(2);
// var gcp_keyFilename = arguments_supplied[0]
// var gcp_projectId = arguments_supplied[1]
// var gcp_bucket = arguments_supplied[2]


const fs = require('fs')

const file_path = './App/backend/.env'

const regex_pattern1 = /^gcp_keyFilename/
const regex_pattern2 = /^gcp_projectId/
const regex_pattern3 = /^gcp_bucket/
const regex_pattern4 = /^aws_s3_accessKeyId/
const regex_pattern5 = /^aws_s3_secretAccessKey/
const regex_pattern6 = /^aws_s3_bucket/


async function censor_dot_env_file_for_cloud_storage(){

	var file_lines_content = fs.readFileSync(file_path).toString().split("\n");

	let file_lines_without_matched_reges = file_lines_content.filter((line) => {
		return regex_pattern1.test(line) === false && regex_pattern2.test(line) === false && regex_pattern3.test(line) === false && regex_pattern4.test(line) === false && regex_pattern5.test(line) === false && regex_pattern6.test(line) === false && line !== ''
	})

	let final_lines_content = [
		...file_lines_without_matched_reges,
		`\ngcp_keyFilename=''`,		
		`\ngcp_projectId=''`,		
		`\ngcp_bucket=''`,	
		`\aws_s3_accessKeyId=''`,	
		`\aws_s3_secretAccessKey=''`,	
		`\aws_s3_bucket=''`,	
			
	]

	final_lines_content = final_lines_content.join("\n")	

	await fs.writeFile(file_path, final_lines_content, function (err) {
	  if (err) return console.log(err);
	});

}


censor_dot_env_file_for_cloud_storage()

module.exports = censor_dot_env_file_for_cloud_storage