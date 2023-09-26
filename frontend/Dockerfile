FROM node:18-alpine

RUN makedir /app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm","start" ]