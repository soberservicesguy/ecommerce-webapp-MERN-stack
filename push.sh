#!/usr/bin/expect -f
. ../../pipeline/push.sh --source-only

appName='ecommerce'

# Set docker image location
dockerLocation='Local'
# dockerLocation='DockerRegistery'

# change for each project
baseURL_for_Heroku='https://ecommerce-mern-stack-web.herokuapp.com'
mongodb_prod_string="mongodb+srv://DBuser:AnimatioN1010@simpleclusterforandroid.enzb4.mongodb.net/Appointment_Web_App_DB?retryWrites=true&w=majority"
aws_s3_accessKeyId='AKIAW2YVB4HUQ6HZSVOX'
aws_s3_secretAccessKey='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'
aws_s3_bucket='portfolio-apps-mern-native'
paypal_client_id='AQye1v_Efj97EIvqKjfKKYG8JL2vKbtwVda0-gThF-f5wnxhPmn9DfBQaA3JRVkyjnRwjrb-5osgVNtG'
paypal_client_secret='EC18QpJ154o-o1y2lsLtM4IXsxOhXzRHdubgvbgJf2fsVzYZGQdVqhnf7oE8cn4vW_APN3sHnHUs_htS'
stripe_public_key='pk_test_51I98eiADpqLOsbfMg7Sqh5TvQFPRvifh1U1za4bv3wDhEwbQdShvbzQ37NNLfd8sAENcd845FPSUjYZatN9dHHf700QcVrGvdq'
stripe_private_key='sk_test_51I98eiADpqLOsbfMbkWlNoifhK1MloLBAcqTBlGMqbOBTuTiaI5njBY6QEGDQtOemxTDpTAsOKPDzWX8tKVoLbKD00jqWgtlIf'

# almost same in all
baseURL_for_App='http://localhost:3001'
baseURL_for_Containerized_Version='http://localhost:80'
baseURL_for_Kubernetes_Version='http://hello-world.info:80'

# FIXED FOR ALL
frontendURL_for_App='http://localhost:3000'
frontendURL_for_Containerized_Version=$baseURL_for_Containerized_Version
frontendURL_for_Kubernetes_Version=$baseURL_for_Kubernetes_Version
frontendURL_for_Heroku=$baseURL_for_Heroku
utilities_file_path='./App/frontend/src/utilities.js'
app_frontend_file_path='./App/frontend/'
app_backend_file_path='./App/backend/'
app_backend_env_file_path='./App/backend/.env'
docker_images_path='./Containers_Version/image_sources'
kubernetes_containers_path='./Kubernetes_Version/container_sources'
kubernetes_path='./Kubernetes_Version'
production_db_mode='production'


updateBackendRoutesIntoContainersAndKubernetesFolders $app_backend_file_path $docker_images_path $kubernetes_containers_path
generateVersionAppBuildAndCopyToBackend $baseURL_for_App $utilities_file_path
generateVersionContainerBuildAndCopyToBackend $baseURL_for_Containerized_Version $utilities_file_path  
generateVersionKubernetesBuildAndCopyToBackend $baseURL_for_Kubernetes_Version $utilities_file_path
generateDockerImages $kubernetes_containers_path $kubernetes_path $dockerLocation $appName $kubernetes_containers_path $kubernetes_path
deployApp $baseURL_for_Heroku $app_backend_file_path $docker_images_path $kubernetes_containers_path $baseURL_for_Containerized_Version $baseURL_for_Kubernetes_Version $utilities_file_path $aws_s3_accessKeyId $aws_s3_secretAccessKey $aws_s3_bucket $app_backend_env_file_path $mongodb_prod_string $production_db_mode $paypal_client_id $paypal_client_secret $stripe_public_key $stripe_private_key
createNewGithubPR $baseURL_for_App $app_backend_file_path $docker_images_path $kubernetes_containers_path $baseURL_for_Containerized_Version $baseURL_for_Kubernetes_Version $app_backend_env_file_path