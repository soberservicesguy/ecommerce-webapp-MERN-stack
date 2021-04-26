
#!/usr/bin/env bash

docker image build -t ecommerce_blogpost_2 .
docker image tag ecommerce_blogpost_2 soberservicesguy/portfolio-images:ecommerce_blogpost_2
docker image push soberservicesguy/portfolio-images:ecommerce_blogpost_2
