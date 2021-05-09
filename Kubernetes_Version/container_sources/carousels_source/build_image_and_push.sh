













#!/usr/bin/env bash

docker image build -t ecommerce_carousels_15 .
docker image tag ecommerce_carousels_15 soberservicesguy/portfolio-images:ecommerce_carousels_15
docker image push soberservicesguy/portfolio-images:ecommerce_carousels_15
