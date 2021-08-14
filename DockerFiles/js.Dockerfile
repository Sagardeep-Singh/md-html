FROM node:16.6.1-buster

WORKDIR /app

COPY ./frontend /app

RUN rm -rf ./build

RUN npm i

RUN npm run build