var arguments_supplied = process.argv.slice(2);
var aws_s3_accessKeyId = arguments_supplied[0]
var aws_s3_secretAccessKey = arguments_supplied[1]
var aws_s3_bucket = arguments_supplied[2]


const fs = require('fs')

const file_path = './App/backend/.env'

const regex_pattern1 = /^aws_s3_accessKeyId/
const regex_pattern2 = /^aws_s3_secretAccessKey/
const regex_pattern3 = /^aws_s3_bucket/


async function generate_dot_env_file_for_cloud_storage_for_aws_S3(){

	var file_lines_content = fs.readFileSync(file_path).toString().split("\n");

	let file_lines_without_matched_reges = file_lines_content.filter((line) => {
		return regex_pattern1.test(line) === false && regex_pattern2.test(line) === false && regex_pattern3.test(line) === false && line !== ''
	})

	let final_lines_content = [
		...file_lines_without_matched_reges,
		`\aws_s3_accessKeyId='${aws_s3_accessKeyId}'`,		
		`\aws_s3_secretAccessKey='${aws_s3_secretAccessKey}'`,		
		`\aws_s3_bucket='${aws_s3_bucket}'`,		
	]

	final_lines_content = final_lines_content.join("\n")	

	await fs.writeFile(file_path, final_lines_content, function (err) {
	  if (err) return console.log(err);
	});

}


generate_dot_env_file_for_cloud_storage_for_aws_S3()

module.exports = generate_dot_env_file_for_cloud_storage_for_aws_S3