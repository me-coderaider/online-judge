FROM node:18-alpine

RUN makedir /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm","start" ]