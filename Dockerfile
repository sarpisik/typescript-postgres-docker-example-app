FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY .env /usr/src/app

RUN node -v
RUN npm install