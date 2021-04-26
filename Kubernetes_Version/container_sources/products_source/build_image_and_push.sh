






#!/usr/bin/env bash

docker image build -t ecommerce_products_8 .
docker image tag ecommerce_products_8 soberservicesguy/portfolio-images:ecommerce_products_8
docker image push soberservicesguy/portfolio-images:ecommerce_products_8
