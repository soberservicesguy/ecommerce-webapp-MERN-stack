


#!/usr/bin/env bash

docker image build -t ecommerce_blogpost_4 .
docker image tag ecommerce_blogpost_4 soberservicesguy/portfolio-images:ecommerce_blogpost_4
docker image push soberservicesguy/portfolio-images:ecommerce_blogpost_4
