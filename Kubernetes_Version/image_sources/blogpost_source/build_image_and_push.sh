#!/usr/bin/env bash

docker image build -t ecommerce_blogpost_1 .
docker image tag ecommerce_blogpost_1 soberservicesguy/portfolio-images:ecommerce_blogpost_1
docker image push soberservicesguy/portfolio-images:ecommerce_blogpost_1
