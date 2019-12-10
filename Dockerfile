FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY nodemon.json /usr/src/app

RUN node -v
RUN npm install