











#!/usr/bin/env bash

docker image build -t ecommerce_carousels_13 .
docker image tag ecommerce_carousels_13 soberservicesguy/portfolio-images:ecommerce_carousels_13
docker image push soberservicesguy/portfolio-images:ecommerce_carousels_13
