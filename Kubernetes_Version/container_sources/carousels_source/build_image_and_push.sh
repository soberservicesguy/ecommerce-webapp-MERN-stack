
#!/usr/bin/env bash

docker image build -t ecommerce_carousels_2 .
docker image tag ecommerce_carousels_2 soberservicesguy/portfolio-images:ecommerce_carousels_2
docker image push soberservicesguy/portfolio-images:ecommerce_carousels_2
