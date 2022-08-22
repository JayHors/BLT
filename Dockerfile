FROM node:alpine

COPY package.json package-lock.json ./

RUN npm i

COPY . .

CMD npm start

