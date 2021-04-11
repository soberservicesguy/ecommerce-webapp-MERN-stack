# BUILDING REACT APP
FROM node:latest as build-stage
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY ./ .

RUN npm run build



# CREATING NGINX CONTAINER
FROM nginx:latest as production-stage

RUN mkdir /app

COPY --from=build-stage /app/build /app

COPY nginx.conf /etc/nginx/nginx.conf











# DEPREACTED (PRE BUILT EXPRESS APP HAVING REACT FRONTEND)
# FROM node:latest
# WORKDIR /usr/src/app   
# COPY package.json .
# COPY package-lock.json .
# RUN npm install
# COPY . .
# EXPOSE 3001
# CMD ["npm", "start"]