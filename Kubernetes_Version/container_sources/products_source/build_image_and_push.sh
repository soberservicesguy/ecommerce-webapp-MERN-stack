
#!/usr/bin/env bash

docker image build -t ecommerce_products_2 .
docker image tag ecommerce_products_2 soberservicesguy/portfolio-images:ecommerce_products_2
docker image push soberservicesguy/portfolio-images:ecommerce_products_2