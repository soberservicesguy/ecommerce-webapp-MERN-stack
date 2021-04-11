FROM node:latest
# FROM node:10

WORKDIR /usr/src/app   
# means where our app will live in the container

# we getting both files package-lock.json and package.json
# these are used to install depencies like requirements.txt in python
#  ./ means copying in the above set work directory	
COPY package.json .
COPY package-lock.json .



# this is the command to run to install dependencies
RUN npm install

# copies your app assuming you are in your app folder, into container
COPY . .

# expose so that it can be accessed by other containers or yourself to access its service
EXPOSE 3001

# generating jwt key pair
CMD ["node", "generate_jwt_Keypair"] 

# generating push notification key pair
CMD ["node", "generate_push_Keypair"] 

# is the command that starts the app / container or python run.py as in python
CMD ["node", "server"]   


# ITS SAME IN ALL, JUST REMOVE DEPENDENCIES NOT NEEDED IN PACKAGE.JSON