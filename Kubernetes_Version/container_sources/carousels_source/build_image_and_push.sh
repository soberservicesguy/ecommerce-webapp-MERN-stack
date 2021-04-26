



#!/usr/bin/env bash

docker image build -t ecommerce_carousels_5 .
docker image tag ecommerce_carousels_5 soberservicesguy/portfolio-images:ecommerce_carousels_5
docker image push soberservicesguy/portfolio-images:ecommerce_carousels_5
