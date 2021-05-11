















#!/usr/bin/env bash

docker image build -t ecommerce_blogpost_17 .
docker image tag ecommerce_blogpost_17 soberservicesguy/portfolio-images:ecommerce_blogpost_17
docker image push soberservicesguy/portfolio-images:ecommerce_blogpost_17
