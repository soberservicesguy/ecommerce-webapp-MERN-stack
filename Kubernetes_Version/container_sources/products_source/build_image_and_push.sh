

















#!/usr/bin/env bash

docker image build -t ecommerce_products_19 .
docker image tag ecommerce_products_19 soberservicesguy/portfolio-images:ecommerce_products_19
docker image push soberservicesguy/portfolio-images:ecommerce_products_19
