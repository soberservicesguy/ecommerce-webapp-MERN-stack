FROM node:latest
# FROM node:10

WORKDIR /usr/src/app   

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3006

CMD ["node", "generate_jwt_Keypair"] 

CMD ["node", "generate_push_Keypair"] 

CMD ["node", "server"]