const fs = require('fs')
const YAML = require('yaml')



const regex_pattern_for_first_line_having_docer_image = /^docker image build\s\-t\s\w.*/
const regex_pattern_for_image_version = /(?<=\w.*_)\d+/

let docker_image_name
let docker_image_name_without_version
let docker_image_current_version
let incremented_docker_image_name
let final_content = []
let final_content_to_use
let docker_image_file_path
let all_image_directories = []
let all_deployment_files = []
let docker_images = []
let images_path = './Kubernetes_Version/container_sources'
let deployments_and_services_path = './Kubernetes_Version'

let details_dict_for_deployment = {}

function get_all_image_directories(){
	fs.readdirSync(images_path).forEach(async folder => {
		all_image_directories.push(folder)
	})

	return all_image_directories
}

function get_all_deployment_files(){
	fs.readdirSync(deployments_and_services_path).forEach(async folder => {
		all_deployment_files.push(folder)
	})

	return all_deployment_files

}

all_image_directories = get_all_image_directories()
all_deployment_files = get_all_deployment_files()

async function set_docker_build_index_for_all_images(){

	let deployment_file

	all_image_directories.map(async (folder) => {

		final_content_to_use = ''
		final_content = []

		docker_image_file_path = `${images_path}/${folder}/build_image_and_push.sh` 


		var file_lines_content = fs.readFileSync(docker_image_file_path).toString().split("\n");

		let first_instance_of_docker_image_name = file_lines_content.filter((line) => {

			return regex_pattern_for_first_line_having_docer_image.test(line) === true

		})

		first_instance_of_docker_image_name = first_instance_of_docker_image_name[0]

		docker_image_name = first_instance_of_docker_image_name.replace('docker image build -t ', '')

		docker_image_name = docker_image_name.replace(' .', '')

		// console.log({docker_image_name})
		docker_images.push(docker_image_name)

		// console.log(docker_image_name)
		// console.log(first_instance_of_docker_image_name)


		docker_image_current_version = docker_image_name.match(regex_pattern_for_image_version)
		if (docker_image_current_version !== null){

			docker_image_current_version = docker_image_current_version[0]
			incremented_docker_image_name = docker_image_name.replace(/\_\d+/g, `_${Number(docker_image_current_version) + 1}`)

			file_lines_content.map((line) => {
				// let final_line = line.replace(docker_image_name, incremented_docker_image_name)
				let final_line = line.replace(new RegExp(docker_image_name, 'g'), incremented_docker_image_name)
				// console.log(line)
				// console.log(final_line)
				final_content.push(`\n${final_line}`)
			})

			final_content_to_use = final_content.join("")	

			final_content_to_use.replace(new RegExp('\n', 'g'), '')

			// console.log(final_content_to_use)



			await fs.writeFile(docker_image_file_path, final_content_to_use, function (err) {
			  if (err) return console.log(err);
			});
		}

		// console.log(docker_image_current_version)

		// console.log(docker_image_name)
		// console.log(incremented_docker_image_name)

	});

	// console.log(file_lines_content)
	// console.log('docker_images')
	// console.log(docker_images)
	return docker_images

}



let tokens_of_first_docker_image_name
let number_of_matched_tokens_list = []
let matched_tokens
let total_common_tokens
let common_tokens

async function get_deployment_file_base_names(docker_images){
	
	let deployment_file_base_names = []

	docker_images = await set_docker_build_index_for_all_images()
	// console.log(docker_images)


	tokens_of_first_docker_image_name = docker_images[0].split("_")
	// return tokens_of_first_docker_image_name

	docker_images.map((docker_image) => {

		matched_tokens = 0

		tokens_of_first_docker_image_name.map((token) => {

			if ( docker_image.includes(token) ){

				matched_tokens += 1

			} else {

			}
			
		})

		number_of_matched_tokens_list.push(matched_tokens)

	})

	// console.log(number_of_matched_tokens_list)
	total_common_tokens = Math.min.apply(null, number_of_matched_tokens_list)
	// console.log(total_common_tokens)

	common_tokens = tokens_of_first_docker_image_name.slice(0, total_common_tokens)

	let docker_image_tokens = []
	docker_images.map((docker_image) => {

		docker_image_tokens = docker_image.split("_")

		common_tokens.map((common_token) => {
			
			let index = docker_image_tokens.indexOf( common_token );
			
			if (index > -1) {
				docker_image_tokens.splice(index, 1);
			}
						
			
		})	

		docker_image_tokens = docker_image_tokens.join("_")

		docker_image_tokens = docker_image_tokens.replace(/\_\d+/, "")

		docker_image_tokens = docker_image_tokens.split("_").join("-")
		// console.log({docker_image_tokens})
		// console.log('THIS')
		// console.log(docker_image)


		deployment_file_base_names.push( {docker_image_tokens:docker_image_tokens, docker_image_final:docker_image} )
	})

	// return { deployment_file_base_names, docker_images }

	await set_docker_image_in_deployment_file(deployment_file_base_names)
}


// let { deployment_file_base_names } = get_deployment_file_base_names(docker_images)
get_deployment_file_base_names(docker_images)

async function set_docker_image_in_deployment_file(deployment_file_base_names){

	// console.log(all_deployment_files)
	// console.log({deployment_file_base_names})

	let line_having_container_reference = []

	deployment_file_base_names.map(async (file_base_name_dict) => {

		file_base_name = file_base_name_dict.docker_image_tokens
		docker_image_final = file_base_name_dict.docker_image_final

		// console.log('docker_image_final')
		// console.log(docker_image_final)
		// console.log('HERE')
		// console.log(docker_image_final)
		docker_without_version = docker_image_final.replace(/\_\d+/, "")

		docker_image_base_name_original = file_base_name_dict.docker_image_tokens

		// console.log('docker_image_base_name_original')
		// console.log(docker_image_base_name_original)
		docker_image_base_name = docker_image_base_name_original.split("-").join("_")

		all_deployment_files.map(async (deployment_file) => {

			// console.log('deployment_file')
			// console.log(deployment_file)

			// console.log({deployment_file, file_base_name})

			if ( deployment_file.includes(file_base_name) ){


				try{


					const file_lines_content = fs.readFileSync(`${deployments_and_services_path}/${deployment_file}`, 'utf8')
					// console.log('file_lines_content')
					// console.log(file_lines_content)

					let file_lines_content_line_list = YAML.stringify(file_lines_content).split("\n")
					
					// console.log(file_lines_content_line_list)

					// console.log('docker_image_base_name')
					// console.log(docker_image_base_name_original)
					// console.log({docker_image_final})
					// console.log({docker_without_version})


					line_having_container_reference = file_lines_content_line_list.filter(
						function(line){
							return new RegExp(docker_without_version).test(line) === true
						}
					)

					line_having_container_reference = line_having_container_reference[0]

					// console.log('line_having_container_reference')
					// console.log(line_having_container_reference)

					let index = file_lines_content_line_list.indexOf( line_having_container_reference );
					
					if (index > -1) {
						file_lines_content_line_list.splice(index, 1);
					}

					let docker_version_only = docker_image_final.match(/\_\d+/)

					// let newline = line_having_container_reference.replace(/\_\d+/, `_${docker_image_final}`)
					let newline = line_having_container_reference.replace(/\_\d+/, docker_version_only)
						
					// file_lines_content_line_list[index] = newline

					file_lines_content_line_list.splice(index, 0, newline);

	


					// console.log(file_lines_content_line_list); 
					// array = [2, 9]
					


					let  final_content_to_write  = []
					file_lines_content_line_list.map((single_line) => {

						// console.log(single_line)
						// if ( single_line !== '>' && single_line !== '|-' && single_line !== ""){

							final_content_to_write.push( single_line.replace(/^\s\s/, '') )

						// }
					})

					final_content_to_write = final_content_to_write.filter((line) => {
						return line !== '>' && line !== '|-' && line !== "" && line !== '>-'
					})


					// console.log('file_lines_content_line_list')
					// console.log(final_content_to_write)

					final_content_to_write = final_content_to_write.join("\n")	

					await fs.writeFile(`${deployments_and_services_path}/${deployment_file}`, final_content_to_write, function (err) {
					  if (err) return console.log(err);
					});


					// line_having_container_reference = YAML.stringify(line_having_container_reference).split('- "')

					// console.log('line_having_container_reference')
					// console.log(line_having_container_reference)

				} catch (err){
					// console.log(err)
				}

			}

		})

	})

}

module.exports = set_docker_build_index_for_all_images