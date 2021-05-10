














#!/usr/bin/env bash

docker image build -t ecommerce_orders_17 .
docker image tag ecommerce_orders_17 soberservicesguy/portfolio-images:ecommerce_orders_17
docker image push soberservicesguy/portfolio-images:ecommerce_orders_17
