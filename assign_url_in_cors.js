var arguments_supplied = process.argv.slice(2);
var baseURL_for_App = arguments_supplied[0]
var baseURL_for_Containerized_Version = arguments_supplied[1]
var baseURL_for_Kubernetes_Version = arguments_supplied[2]




const fs = require('fs')

let app_path = './App/backend/'
let docker_images_path = './Containers_Version/image_sources' // here are services having app.js
let kubernetes_containers_path = './Kubernetes_Version/container_sources'

let final_lines_content


async function write_cors_policy_for_App(){

	final_lines_content = `
const cors = require("cors");

let cors_policy = cors({
	origin: "${baseURL_for_App}", // restrict calls to those this address
	methods: ['GET', 'POST'] // only allow GET, POST requests
})

module.exports = cors_policy
`

	await fs.writeFile(`${app_path}/config/cors_policy.js`, final_lines_content, function (err) {
	  if (err) return console.log(err);
	});	

}

write_cors_policy_for_App()


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


async function write_cors_policy_for_docker_version(){

	final_lines_content = `
const cors = require("cors");

let cors_policy = cors({
	origin: "${baseURL_for_Containerized_Version}", // restrict calls to those this address
	methods: ['GET', 'POST'] // only allow GET, POST requests
})

module.exports = cors_policy
`

	all_docker_image_folders.map(async (docker_image_folder) => {

		try {

			await fs.writeFile(`${docker_images_path}/${docker_image_folder}/config/cors_policy.js`, final_lines_content, function (err) {
			  if (err) return console.log(err);
			});

		} catch (err){

		}

	})

}

write_cors_policy_for_docker_version()

async function write_cors_policy_for_kubernetes_version(){

	final_lines_content = `
const cors = require("cors");

let cors_policy = cors({
	origin: "${baseURL_for_Kubernetes_Version}", // restrict calls to those this address
	methods: ['GET', 'POST'] // only allow GET, POST requests
})

module.exports = cors_policy
`

	all_kubernetes_image_folders.map(async (kubernetes_image_folder) => {

		try {

			await fs.writeFile(`${kubernetes_containers_path}/${kubernetes_image_folder}/config/cors_policy.js`, final_lines_content, function (err) {
			  if (err) return console.log(err);
			});

		} catch (err){

		}

	})

}

write_cors_policy_for_kubernetes_version()