#!/usr/bin/env bash

docker image build -t ecommerce_user_module_2 .
docker image tag ecommerce_user_module_2 soberservicesguy/portfolio-images:ecommerce_user_module_2
docker image push soberservicesguy/portfolio-images:ecommerce_user_module_2
