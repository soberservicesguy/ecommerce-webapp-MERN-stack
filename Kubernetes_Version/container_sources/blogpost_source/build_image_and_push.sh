









#!/usr/bin/env bash

docker image build -t ecommerce_blogpost_11 .
docker image tag ecommerce_blogpost_11 soberservicesguy/portfolio-images:ecommerce_blogpost_11
docker image push soberservicesguy/portfolio-images:ecommerce_blogpost_11
