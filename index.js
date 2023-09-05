const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes")
const weatherRoutes = require("./routes/weatherRoutes")
const coordinationsRoutes = require("./routes/coordinatesRoutes")
require('dotenv').config();

app.enable("trust proxy");
app.use(cors({ origin: process.env.WEATHER_APP, credentials: true }));

app.use(express.json()); // for parsing application/json we use it as middleware in pipeline return the req.body
app.use(express.urlencoded({ extended: true }))

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(`connected to ${process.env.DATABASE_MONGOURL}`))
  .catch(() => console.log(`failed coonection to ${process.env.DATABASE_MONGOURL}`));

app.get('/', (req, res) => {
  console.log(process.env.DATABASE_MONGOURL)
  console.log(process.env.PORT)
  console.log(process.env.WEATHER_APP)
  res.send('hello world')
})
app.use("/user", userRoutes)
app.use("/weather", weatherRoutes)
app.use("/coordinations", coordinationsRoutes)

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}...`));

module.exports = app;