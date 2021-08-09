FROM node:16.6.1-buster as build

WORKDIR /app

COPY ./frontend ./
RUN npm ci

RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]