const axios = require("axios");


exports.CoordinatesOfAddress = async (req, res, next) => {
  try {
    const { data, status } = await axios.get(
      process.env.WEATHER_API,
      {
        params: {
          key: process.env.WEATHER_KEY,
          q: req.body.address,
          language: "en"
        }
      }
    );
    if (status == 200)
      return res.status(status).send(data)
  }
  catch (err) {
    next(err.message)
  }

}


exports.AdressOfCoords = async (req, res, next) => {
  try {
    const { data, status } = await axios.get(
      process.env.WEATHER_API,
      {
        params: {
          key: process.env.WEATHER_KEY,
          q: `${req.body.lat}+${req.body.lng}`,
          language: "en"
        }
      }
    );

    if (status == 200)
      return res.status(status).send(data)
  }
  catch (err) {
    next(err.message)
  }
}


