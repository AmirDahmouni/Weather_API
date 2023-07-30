const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes")
const weatherRoutes = require("./routes/weatherRoutes")
const coordinationsRoutes = require("./routes/coordinatesRoutes")
require('dotenv').config();

app.enable("trust proxy");
app.use(cors({ origin: `http://localhost:3000`, credentials: true }));
app.use(express.json()); // for parsing application/json we use it as middleware in pipeline return the req.body
app.use(express.urlencoded({ extended: true }))


mongoose.connect(process.env.DATABASE_MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(`connected to ${process.env.DATABASE_MONGOURL}`))
  .catch(() => console.log(`failed coonection to ${process.env.DATABASE_MONGOURL}`));


app.use("/user", userRoutes)
app.use("/weather", weatherRoutes)
app.use("/coordinations", coordinationsRoutes)


const server = app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}...`));

module.exports = server;