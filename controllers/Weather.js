const axios = require("axios")

exports.current = async (req, res, next) => {
  try {
    const { data, status } = await axios.get(
      process.env.WEATHER_API_ONE,
      {
        params: {
          lat: req.body.coordinates.lat,
          lon: req.body.coordinates.lng,
          exclude: "minutely,hourly,alerts",
          appid: process.env.WEATHER_APPID,
          units: "metric"
        }
      }
    );
    console.log(data)
    if (status == 200)
      return res.status(status).send(data)
  }
  catch (err) {
    next(err.message)
  }

}