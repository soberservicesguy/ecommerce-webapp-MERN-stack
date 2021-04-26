# FROM nginx:latest as production-stage

FROM nginx:latest
RUN mkdir /app
COPY ./build /app
COPY nginx.conf /etc/nginx/nginx.conf