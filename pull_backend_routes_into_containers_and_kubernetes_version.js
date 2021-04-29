// 'App/backend/routes'
// loop over above and check if it is included in list of folders available below
// 'Kubernetes_Version/container_sources/${folder}/routes'
// 'Kubernetes_Version/image_sources/${folder}/routes'

const ncp = require('ncp').ncp;
const fs = require('fs')


let app_path = './App/backend/'
let docker_images_path = './Containers_Version/image_sources' // here are services having app.js
let kubernetes_containers_path = './Kubernetes_Version/container_sources'



let all_docker_image_folders = []

function get_all_docker_images_folder_names(){
	fs.readdirSync(docker_images_path).forEach(async folder => {
		all_docker_image_folders.push(folder)
	})

	return all_docker_image_folders

}

all_docker_image_folders = get_all_docker_images_folder_names()


let all_kubernetes_image_folders = []

function get_all_kubernetes_images_folder_names(){
	fs.readdirSync(kubernetes_containers_path).forEach(async folder => {
		all_kubernetes_image_folders.push(folder)
	})

	return all_kubernetes_image_folders

}

all_kubernetes_image_folders = get_all_kubernetes_images_folder_names()



async function pull_backend_routes_into_containers_and_kubernetes_version(){

	let kubernetes_folder
	let docker_folder
// looping over App/backend/routes
	fs.readdirSync(`${app_path}/routes`).map(async (app_folder, index) => {

		// console.log(`Dealing with app folder ${app_folder}`)

		kubernetes_folder = all_kubernetes_image_folders[index]
		docker_folder = all_docker_image_folders[index]

		// console.log({kubernetes_folder})
		// console.log({docker_folder})


		let folder_source
		let folder_destination


		try {

			fs.readdirSync(`${docker_images_path}/${docker_folder}/routes`).map(async (folder_in_docker) => {
			
				// console.log(`Reading ${docker_images_path}/${docker_folder}/routes`)
				// console.log(`Folder found in docker directory ${folder_in_docker}`)

				if ( String(app_folder) === String(folder_in_docker) ){


					folder_source = `${app_path}routes/${app_folder}`
					folder_destination = `${docker_images_path}/${docker_folder}/routes/${app_folder}`

					// console.log({folder_source, folder_destination})

					ncp(folder_source, folder_destination, function (err) {
					    if (err) {
					        // console.error(err);
					    }  
					    // console.log(`${folder_source} Folders copied recursively`);
					})

				}
			
			})

			fs.readdirSync(`${kubernetes_containers_path}/${kubernetes_folder}/routes`).map(async (folder_in_kubernetes) => {
			
			
				// console.log(`Reading ${kubernetes_containers_path}/${kubernetes_folder}/routes`)
				// console.log(`Folder found in docker directory ${folder_in_kubernetes}`)

				if ( String(app_folder) === String(folder_in_kubernetes) ){


					folder_source = `${app_path}routes/${app_folder}`
					folder_destination = `${kubernetes_containers_path}/${kubernetes_folder}/routes/${app_folder}`

					// console.log({folder_source, folder_destination})

					ncp(folder_source, folder_destination, function (err) {
					    if (err) {
					        // console.error(err);
					    }  
					    // console.log(`${folder_source} Folders copied recursively`);
					})

				}
			
			})
		} catch (error) {

		}




	})

}

pull_backend_routes_into_containers_and_kubernetes_version()

module.exports = pull_backend_routes_into_containers_and_kubernetes_version