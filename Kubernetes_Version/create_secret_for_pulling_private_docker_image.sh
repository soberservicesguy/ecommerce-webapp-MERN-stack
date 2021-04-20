kubectl create secret generic regcred \
    --from-file=.dockerconfigjson=./docker_config.json \
    --type=kubernetes.io/dockerconfigjson