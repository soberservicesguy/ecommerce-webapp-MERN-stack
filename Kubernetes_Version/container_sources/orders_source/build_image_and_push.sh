


















#!/usr/bin/env bash

docker image build -t ecommerce_orders_21 .
docker image tag ecommerce_orders_21 soberservicesguy/portfolio-images:ecommerce_orders_21
docker image push soberservicesguy/portfolio-images:ecommerce_orders_21
