















#!/usr/bin/env bash

docker image build -t ecommerce_user_module_19 .
docker image tag ecommerce_user_module_19 soberservicesguy/portfolio-images:ecommerce_user_module_19
docker image push soberservicesguy/portfolio-images:ecommerce_user_module_19
