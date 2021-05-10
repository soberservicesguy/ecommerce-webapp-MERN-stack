














#!/usr/bin/env bash

docker image build -t ecommerce_carousels_16 .
docker image tag ecommerce_carousels_16 soberservicesguy/portfolio-images:ecommerce_carousels_16
docker image push soberservicesguy/portfolio-images:ecommerce_carousels_16
