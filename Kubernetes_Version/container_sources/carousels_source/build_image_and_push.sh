



















#!/usr/bin/env bash

docker image build -t ecommerce_carousels_21 .
docker image tag ecommerce_carousels_21 soberservicesguy/portfolio-images:ecommerce_carousels_21
docker image push soberservicesguy/portfolio-images:ecommerce_carousels_21
