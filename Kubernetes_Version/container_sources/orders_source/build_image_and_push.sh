















#!/usr/bin/env bash

docker image build -t ecommerce_orders_18 .
docker image tag ecommerce_orders_18 soberservicesguy/portfolio-images:ecommerce_orders_18
docker image push soberservicesguy/portfolio-images:ecommerce_orders_18
