


















#!/usr/bin/env bash

docker image build -t ecommerce_user_module_22 .
docker image tag ecommerce_user_module_22 soberservicesguy/portfolio-images:ecommerce_user_module_22
docker image push soberservicesguy/portfolio-images:ecommerce_user_module_22
