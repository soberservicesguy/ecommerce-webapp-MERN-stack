#!/usr/bin/env bash
kubectl delete -f mongodb-depl-serv.yaml
kubectl delete -f frontend-depl-serv.yaml
kubectl delete -f timetable-depl-serv.yaml
kubectl delete -f blogpost-depl-serv.yaml
kubectl delete -f bulk-upload-depl-serv.yaml
kubectl delete -f carousels-upload-depl-serv.yaml
kubectl delete -f orders-upload-depl-serv.yaml
kubectl delete -f products-upload-depl-serv.yaml
kubectl delete -f users-module-depl-serv.yaml
kubectl delete -f ingress.yaml