FROM node:16.6.1-buster

#RUN npm install --build-from-source zeromq@6.0.0-beta.5 
EXPOSE 3000

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./

RUN npm install

COPY ./frontend ./

CMD ["npm", "start"]
