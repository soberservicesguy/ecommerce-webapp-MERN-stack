


















#!/usr/bin/env bash

docker image build -t ecommerce_products_20 .
docker image tag ecommerce_products_20 soberservicesguy/portfolio-images:ecommerce_products_20
docker image push soberservicesguy/portfolio-images:ecommerce_products_20
