FROM node:16.6.1-buster

#RUN npm install --build-from-source zeromq@6.0.0-beta.5 
EXPOSE 3000

WORKDIR /app
COPY ./frontend .

RUN npm install

CMD npm start