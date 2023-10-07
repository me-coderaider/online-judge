# node block
FROM node:18-alpine AS frontend

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# nginx block
FROM nginx:1.25-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=frontend /app/build .

ENTRYPOINT [ "nginx","-g","daemon off;" ]