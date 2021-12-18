#!/usr/bin/env bash

# minikube start
echo "enabling kubernetes to access docker daemon"
echo 'running eval $(minikube docker-env)'
eval $(minikube docker-env)

echo " "
echo "running minikube image load ecommerce_blogposts"
echo " "
minikube image load ecommerce_blogposts

echo " "
echo "running minikube image load ecommerce_bulk_uploads"
echo " "
minikube image load ecommerce_bulk_uploads

echo " "
echo "running minikube image load ecommerce_carousels"
echo " "
minikube image load ecommerce_carousels

echo " "
echo "running minikube image load ecommerce_frontend"
echo " "
minikube image load ecommerce_frontend

echo " "
echo "running minikube image load ecommerce_orders"
echo " "
minikube image load ecommerce_orders

echo " "
echo "running minikube image load ecommerce_products"
echo " "
minikube image load ecommerce_products

echo " "
echo "running minikube image load ecommerce_users_module"
echo " "
minikube image load ecommerce_users_module