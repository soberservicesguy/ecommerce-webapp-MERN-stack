















#!/usr/bin/env bash

docker image build -t ecommerce_bulk_upload_17 .
docker image tag ecommerce_bulk_upload_17 soberservicesguy/portfolio-images:ecommerce_bulk_upload_17
docker image push soberservicesguy/portfolio-images:ecommerce_bulk_upload_17
