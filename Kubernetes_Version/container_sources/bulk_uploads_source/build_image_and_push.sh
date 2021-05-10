














#!/usr/bin/env bash

docker image build -t ecommerce_bulk_upload_16 .
docker image tag ecommerce_bulk_upload_16 soberservicesguy/portfolio-images:ecommerce_bulk_upload_16
docker image push soberservicesguy/portfolio-images:ecommerce_bulk_upload_16
