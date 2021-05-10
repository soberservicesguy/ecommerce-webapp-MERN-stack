














#!/usr/bin/env bash

docker image build -t ecommerce_blogpost_16 .
docker image tag ecommerce_blogpost_16 soberservicesguy/portfolio-images:ecommerce_blogpost_16
docker image push soberservicesguy/portfolio-images:ecommerce_blogpost_16
