FROM node:14-alpine

ENV DATABASE_MONGOURL=mongodb+srv://mongo:YgD9GS9lvQnBnPiB@cluster1.oj4tccv.mongodb.net/ \
  WEATHER_API=https://api.opencagedata.com/geocode/v1/json? \
  WEATHER_APP=https://weather-app-snowy-sigma.vercel.app/ \
  WEATHER_API_ONE=https://api.openweathermap.org/data/2.5/onecall? \
  WEATHER_APPID=1b825daf58d455d1161c0dd1607a1aec \
  WEATHER_KEY=1d7356a2b0f4402dbe619a494fc90f21 \
  PORT=3000 \
  JWT_SECRET=jwtweather2023

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
