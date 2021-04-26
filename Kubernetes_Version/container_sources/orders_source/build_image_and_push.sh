



#!/usr/bin/env bash

docker image build -t ecommerce_orders_6 .
docker image tag ecommerce_orders_6 soberservicesguy/portfolio-images:ecommerce_orders_6
docker image push soberservicesguy/portfolio-images:ecommerce_orders_6
