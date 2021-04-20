#!/usr/bin/env bash
bash create_secret_for_pulling_private_docker_image.sh

kubectl apply -f volume-persistent.yaml
kubectl apply -f volume-claimed.yaml

kubectl apply -f mongodb-configmap.yaml
kubectl apply -f mongodb-secret.yaml
kubectl apply -f mongodb-depl-serv.yaml

kubectl apply -f frontend-depl-serv.yaml

kubectl apply -f timetable-depl-serv.yaml
kubectl apply -f blogpost-depl-serv.yaml
kubectl apply -f bulk-upload-depl-serv.yaml
kubectl apply -f carousels-upload-depl-serv.yaml
kubectl apply -f orders-upload-depl-serv.yaml
kubectl apply -f products-upload-depl-serv.yaml
kubectl apply -f users-module-depl-serv.yaml

kubectl apply -f ingress.yaml