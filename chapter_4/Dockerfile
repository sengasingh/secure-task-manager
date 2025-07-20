# use an official NodeJS runtime as a parent image
FROM node:22-alpine

# set the working directory in the container
WORKDIR /app

# copy the package.json & package-lock.json to container
COPY package*.json .

# install dependencies
RUN npm install 

# copy rest of application code
COPY . .

# expose the port that the app runs on
EXPOSE 5003

# define command to run application
CMD ["node", "./src/server.js"]