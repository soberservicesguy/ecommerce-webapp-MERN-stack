
#!/usr/bin/env bash

docker image build -t ecommerce_bulk_upload_2 .
docker image tag ecommerce_bulk_upload_2 soberservicesguy/portfolio-images:ecommerce_bulk_upload_2
docker image push soberservicesguy/portfolio-images:ecommerce_bulk_upload_2
