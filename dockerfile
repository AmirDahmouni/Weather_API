FROM node:14-alpine

EXPOSE 3000

COPY package*.json /usr/app

WORKDIR /usr/app

RUN npm install

CMD [ "npm", "run", "start" ]
