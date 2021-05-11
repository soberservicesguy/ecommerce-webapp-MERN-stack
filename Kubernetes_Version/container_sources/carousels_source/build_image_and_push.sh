















#!/usr/bin/env bash

docker image build -t ecommerce_carousels_17 .
docker image tag ecommerce_carousels_17 soberservicesguy/portfolio-images:ecommerce_carousels_17
docker image push soberservicesguy/portfolio-images:ecommerce_carousels_17
