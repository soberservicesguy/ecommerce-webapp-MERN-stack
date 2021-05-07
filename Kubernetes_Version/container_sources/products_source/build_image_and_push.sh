









#!/usr/bin/env bash

docker image build -t ecommerce_products_11 .
docker image tag ecommerce_products_11 soberservicesguy/portfolio-images:ecommerce_products_11
docker image push soberservicesguy/portfolio-images:ecommerce_products_11
