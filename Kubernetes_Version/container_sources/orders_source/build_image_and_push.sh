



















#!/usr/bin/env bash

docker image build -t ecommerce_orders_22 .
docker image tag ecommerce_orders_22 soberservicesguy/portfolio-images:ecommerce_orders_22
docker image push soberservicesguy/portfolio-images:ecommerce_orders_22
