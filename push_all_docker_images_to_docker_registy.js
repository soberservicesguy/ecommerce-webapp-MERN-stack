const { exec, execSync } = require('child_process');
const fs = require('fs')




let containers_sources = './Kubernetes_Version/container_sources'

let all_image_folders = []

function get_all_deployment_files(){
	fs.readdirSync(containers_sources).forEach(async folder => {
		all_image_folders.push(folder)
	})

	return all_image_folders

}


all_image_folders = get_all_deployment_files()

function push_all_docker_images_to_docker_registy(){

	let file_to_execute
	all_image_folders.map((image_folder) => {

		// console.log(image_folder)
		// let output
		// output = execSync(`cd Kubernetes_Version/container_sources/${image_folder} && bash build_image_and_push.sh`, {encoding: 'utf8'})


		exec(`cd Kubernetes_Version/container_sources/${image_folder} && bash build_image_and_push.sh`, (err, stdout, stderr) => {
			if (err) {
				console.log(err)
				return;
			}

			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);

		});

	})

}

push_all_docker_images_to_docker_registy()

module.exports = push_all_docker_images_to_docker_registy