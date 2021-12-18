#!/usr/bin/env bash
docker image build -t ecommerce_blogposts ../Containers_Version/image_sources/blogposts
docker image build -t ecommerce_bulk_uploads ../Containers_Version/image_sources/bulk_uploads
docker image build -t ecommerce_carousels ../Containers_Version/image_sources/carousels
docker image build -t ecommerce_frontend ../Containers_Version/image_sources/frontend_service
docker image build -t ecommerce_orders ../Containers_Version/image_sources/orders
docker image build -t ecommerce_products ../Containers_Version/image_sources/products
docker image build -t ecommerce_users_module ../Containers_Version/image_sources/users_module